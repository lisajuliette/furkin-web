-- Database objects the Furkin website needs, in the shared Supabase project.
--
-- The app repository owns the database and its migrations. Do NOT run this from the website repository.
-- Lisa hands this file to the app repository, which adds it as a migration (skipping anything that already exists:
-- the app's milestone 5 may already have created public_invite_preview).
-- The website only reads and writes through these objects from server code.

-- 1. Waitlist (double opt-in). Only server code with the service role key touches it.
create extension if not exists citext;

create table if not exists waitlist (
  email citext primary key,
  confirm_token_hash text not null,          -- sha256 of the one-time token in the email link
  confirmed_at timestamptz,
  source text,                               -- utm_source if present
  created_at timestamptz not null default now()
);
alter table waitlist enable row level security;  -- no policies on purpose

-- 2. Invite preview for the /invite/[code] fallback page. Callable without signing in.
-- Returns only what the page shows, and names only for a valid invite. Expired, used, revoked and unknown codes
-- return just a status, and the page renders all four the same way, so codes can't be probed.
create or replace function public_invite_preview(p_code text)
returns table (
  status text,             -- valid | expired | used | revoked | unknown
  household_name text,
  inviter_first_name text,
  pet_names text[],
  role household_role
)
language sql
security definer
set search_path = public
stable
as $$
  with i as (
    select inv.*
    from invites inv
    where inv.code = upper(p_code)
    limit 1
  )
  select
    case
      when i.revoked_at is not null then 'revoked'
      when i.accepted_at is not null then 'used'
      when i.expires_at < now() then 'expired'
      else 'valid'
    end,
    case when i.revoked_at is null and i.accepted_at is null and i.expires_at >= now() then h.name end,
    case when i.revoked_at is null and i.accepted_at is null and i.expires_at >= now()
         then split_part(p.display_name, ' ', 1) end,
    case when i.revoked_at is null and i.accepted_at is null and i.expires_at >= now()
         then (select coalesce(array_agg(split_part(pt.name, ' ', 1) order by pt.name), '{}')
               from pets pt where pt.household_id = i.household_id and pt.archived_at is null) end,
    case when i.revoked_at is null and i.accepted_at is null and i.expires_at >= now() then i.role end
  from i
  join households h on h.id = i.household_id
  join profiles p on p.id = i.created_by
  union all
  select 'unknown', null, null, null, null
  where not exists (select 1 from i);
$$;

revoke all on function public_invite_preview(text) from public;
grant execute on function public_invite_preview(text) to anon, authenticated;
