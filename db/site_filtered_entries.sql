-- Log of website form entries the junk filter caught (bots, out-of-area, sales pitches), plus the
-- bookkeeping for the weekly count-only summary. Used by lib/leadFilter.ts on newdesignpro.com.
--
-- Applied by hand to the Supabase project that holds the NDP Money data. Additive only: two new
-- tables, one key table and four functions. Nothing that already exists is changed.
--
-- Access model: the website only holds the project's publishable key, so the tables are closed to
-- every API role (row level security on, no policies, no grants). The site reaches them through the
-- functions below, and each one first checks a token that only the site knows. The database keeps
-- the token's SHA-256, never the token.
--
-- After applying, store the token hash once (replace <sha256 hex of LEAD_FILTER_LOG_TOKEN>):
--   insert into private.site_log_key (token_sha256) values ('<sha256 hex of LEAD_FILTER_LOG_TOKEN>');

create schema if not exists private;

create table public.site_filtered_entries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  form text not null check (char_length(form) between 1 and 40),
  reason text not null check (reason in ('hidden_field', 'zip_outside_fl', 'sales_pitch')),
  entry jsonb not null check (jsonb_typeof(entry) = 'object' and pg_column_size(entry) <= 8192)
);
comment on table public.site_filtered_entries is 'Website form entries caught by the junk filter. Never emailed, never sent to HubSpot. Rows older than 180 days are deleted by site_filtered_digest.';
create index site_filtered_entries_created_at_idx on public.site_filtered_entries (created_at);
alter table public.site_filtered_entries enable row level security;
revoke all on public.site_filtered_entries from public, anon, authenticated;

create table public.site_filtered_digests (
  week_start date primary key,
  through timestamptz not null,
  total integer not null check (total >= 0)
);
comment on table public.site_filtered_digests is 'One row per week in which the filtered-entry summary ran (Monday date, Eastern time). Guarantees at most one summary a week.';
alter table public.site_filtered_digests enable row level security;
revoke all on public.site_filtered_digests from public, anon, authenticated;

create table private.site_log_key (
  id boolean primary key default true check (id),
  token_sha256 text not null check (token_sha256 ~ '^[0-9a-f]{64}$')
);
alter table private.site_log_key enable row level security;
revoke all on private.site_log_key from public, anon, authenticated;

create function private.site_log_token_ok(p_token text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(p_token, '') <> '' and exists (
    select 1 from private.site_log_key k
    where k.token_sha256 = encode(sha256(convert_to(p_token, 'UTF8')), 'hex')
  );
$$;
revoke all on function private.site_log_token_ok(text) from public, anon, authenticated;

-- Saves one filtered entry. Returns false (and saves nothing) when the token is wrong.
create function public.site_log_filtered_entry(p_token text, p_form text, p_reason text, p_entry jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.site_log_token_ok(p_token) then
    return false;
  end if;
  insert into public.site_filtered_entries (form, reason, entry) values (p_form, p_reason, p_entry);
  return true;
end;
$$;

-- Counts entries since the last summary (or the last 7 days when there has been none).
-- p_claim = true also reserves this week's summary; a second claim in the same week gets already_ran.
-- Returns counts only, never the entries.
create function public.site_filtered_digest(p_token text, p_claim boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_week date := date_trunc('week', now() at time zone 'America/New_York')::date;
  v_through timestamptz := now();
  v_since timestamptz;
  v_total integer;
  v_by jsonb;
  v_rows integer := 0;
begin
  if not private.site_log_token_ok(p_token) then
    return null;
  end if;
  if p_claim and exists (select 1 from public.site_filtered_digests d where d.week_start = v_week) then
    return jsonb_build_object('claimed', false, 'already_ran', true, 'total', 0, 'by_reason', '{}'::jsonb, 'since', v_through);
  end if;
  select coalesce(max(d.through), v_through - interval '7 days') into v_since from public.site_filtered_digests d;
  select coalesce(sum(c.n), 0)::integer, coalesce(jsonb_object_agg(c.reason, c.n), '{}'::jsonb)
    into v_total, v_by
    from (
      select e.reason, count(*)::integer as n
      from public.site_filtered_entries e
      where e.created_at > v_since and e.created_at <= v_through
      group by e.reason
    ) c;
  if p_claim then
    insert into public.site_filtered_digests (week_start, through, total) values (v_week, v_through, v_total)
      on conflict (week_start) do nothing;
    get diagnostics v_rows = row_count;
    if v_rows = 0 then
      return jsonb_build_object('claimed', false, 'already_ran', true, 'total', 0, 'by_reason', '{}'::jsonb, 'since', v_through);
    end if;
    delete from public.site_filtered_entries e where e.created_at < v_through - interval '180 days';
  end if;
  return jsonb_build_object('claimed', v_rows = 1, 'total', v_total, 'by_reason', v_by, 'since', v_since);
end;
$$;

-- Gives this week's reservation back (used when the summary email failed to send).
create function public.site_release_filtered_digest(p_token text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.site_log_token_ok(p_token) then
    return false;
  end if;
  delete from public.site_filtered_digests d
    where d.week_start = date_trunc('week', now() at time zone 'America/New_York')::date;
  return true;
end;
$$;

revoke all on function public.site_log_filtered_entry(text, text, text, jsonb) from public, authenticated;
revoke all on function public.site_filtered_digest(text, boolean) from public, authenticated;
revoke all on function public.site_release_filtered_digest(text) from public, authenticated;
grant execute on function public.site_log_filtered_entry(text, text, text, jsonb) to anon;
grant execute on function public.site_filtered_digest(text, boolean) to anon;
grant execute on function public.site_release_filtered_digest(text) to anon;
