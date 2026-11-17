// Minimal GitHub client for the Holo webhook: read one file, and write several files to
// main in a single commit (Git Data API). Needs a fine-grained token with Contents: read
// and write on this repository only, in GH_HOLO_TOKEN.
const API = 'https://api.github.com';
const REPO = 'uservieira/ndp-wix-temp-1782173838';
const BRANCH = 'main';

export class GitHubError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const token = () => (process.env.GH_HOLO_TOKEN ?? '').trim();
export const hasGitHubToken = () => token() !== '';

async function gh(pathname: string, init: { method?: string; body?: unknown; raw?: boolean } = {}): Promise<Response> {
  return fetch(`${API}/repos/${REPO}${pathname}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: init.raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ndp-holo-webhook',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
    signal: AbortSignal.timeout(20_000),
  });
}

async function json<T>(res: Response, what: string): Promise<T> {
  if (!res.ok) throw new GitHubError(res.status, `GitHub ${what} failed (${res.status})`);
  return (await res.json()) as T;
}

const encodePath = (p: string) => p.split('/').map(encodeURIComponent).join('/');

// Text of a file on main, or null when it does not exist.
export async function readFile(filePath: string): Promise<string | null> {
  const res = await gh(`/contents/${encodePath(filePath)}?ref=${BRANCH}`, { raw: true });
  if (res.status === 404) return null;
  if (!res.ok) throw new GitHubError(res.status, `GitHub read failed (${res.status})`);
  return res.text();
}

export type FileWrite = { path: string; content: Buffer };

// Writes `files` and, inside `pruneDir`, removes every file not listed in `keep`, as one commit on main.
// Retries when main moved in between. Returns the new commit sha.
export async function commitFiles(o: { message: string; files: FileWrite[]; pruneDir?: string; keep?: string[] }): Promise<string> {
  const uploaded = new Map<string, string>(); // path -> blob sha, reused if main moves and we retry
  for (let attempt = 0; attempt < 3; attempt++) {
    const ref = await json<{ object: { sha: string } }>(await gh(`/git/ref/heads/${BRANCH}`), 'ref read');
    const head = ref.object.sha;
    const commit = await json<{ tree: { sha: string } }>(await gh(`/git/commits/${head}`), 'commit read');

    const stale: string[] = [];
    let existing = new Set<string>();
    if (o.pruneDir) {
      const res = await gh(`/contents/${encodePath(o.pruneDir)}?ref=${head}`);
      if (res.status !== 404) {
        const list = await json<{ path: string; type: string }[]>(res, 'folder read');
        existing = new Set(list.filter((e) => e.type === 'file').map((e) => e.path));
        const keep = new Set(o.keep ?? []);
        for (const p of existing) if (!keep.has(p)) stale.push(p);
      }
    }

    // Files already in the folder under the same content-hash name are identical; skip the upload.
    const uploads = o.files.filter((f) => !(o.pruneDir && existing.has(f.path) && f.path.startsWith(`${o.pruneDir}/`)));
    const blobs = await Promise.all(
      uploads.map(async (f) => {
        let sha = uploaded.get(f.path);
        if (!sha) {
          const blob = await json<{ sha: string }>(
            await gh('/git/blobs', { method: 'POST', body: { content: f.content.toString('base64'), encoding: 'base64' } }),
            'blob write',
          );
          sha = blob.sha;
          uploaded.set(f.path, sha);
        }
        return { path: f.path, mode: '100644', type: 'blob', sha: sha as string | null };
      }),
    );
    const tree = await json<{ sha: string }>(
      await gh('/git/trees', {
        method: 'POST',
        body: { base_tree: commit.tree.sha, tree: [...blobs, ...stale.map((p) => ({ path: p, mode: '100644', type: 'blob', sha: null }))] },
      }),
      'tree write',
    );
    const next = await json<{ sha: string }>(
      await gh('/git/commits', { method: 'POST', body: { message: o.message, tree: tree.sha, parents: [head] } }),
      'commit write',
    );
    const moved = await gh(`/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: { sha: next.sha, force: false } });
    if (moved.ok) return next.sha;
    // 422 = main moved since we read it; rebuild on the new head.
    if (moved.status !== 422) throw new GitHubError(moved.status, `GitHub branch update failed (${moved.status})`);
  }
  throw new GitHubError(409, 'GitHub branch kept moving; try again');
}
