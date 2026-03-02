
-- Create app_role enum
create type public.app_role as enum ('admin', 'user');

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS: users can read their own roles
create policy "Users can read own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

-- Admin CRUD on images
create policy "Admins can insert images"
on public.images for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update images"
on public.images for update to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete images"
on public.images for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Admin CRUD on certificates
create policy "Admins can insert certificates"
on public.certificates for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update certificates"
on public.certificates for update to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete certificates"
on public.certificates for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Storage policies for images bucket
create policy "Admins can upload to images bucket"
on storage.objects for insert to authenticated
with check (bucket_id = 'images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete from images bucket"
on storage.objects for delete to authenticated
using (bucket_id = 'images' and public.has_role(auth.uid(), 'admin'));

create policy "Anyone can view images bucket"
on storage.objects for select
using (bucket_id = 'images');

-- Storage policies for certificates bucket
create policy "Admins can upload to certificates bucket"
on storage.objects for insert to authenticated
with check (bucket_id = 'certificates' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete from certificates bucket"
on storage.objects for delete to authenticated
using (bucket_id = 'certificates' and public.has_role(auth.uid(), 'admin'));

create policy "Anyone can view certificates bucket"
on storage.objects for select
using (bucket_id = 'certificates');
