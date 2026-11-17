# Holo posts

One JSON file per blog post published from Holo (app.tryholo.ai). These files are written by
`POST /api/holo-webhook` when a post is approved and published in Holo. Do not add posts here by hand.

- A file here becomes `/blog/<slug>`, a card on `/blog`, and an entry in the sitemap on the next deploy.
- Its images live in `public/blog/holo/<slug>/`.
- To take a post down, delete its JSON file and its image folder, then merge. Holo has no unpublish event.
- Hand-written posts in `app/blog/<slug>/page.tsx` always win over a Holo post with the same slug.
