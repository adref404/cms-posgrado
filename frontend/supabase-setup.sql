-- ============================================================
-- Setup de base de datos: Novedades (Noticias / Eventos / Comunicados)
-- Posgrado Educación UNMSM — pegar completo en el SQL Editor de Supabase
-- ============================================================

create table noticias (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  resumen text not null,
  fecha date not null,
  imagen text,
  cuerpo text[],
  url text,
  created_at timestamptz default now()
);

create table eventos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  descripcion text not null,
  fecha date not null,
  hora text,
  lugar text,
  imagen text,
  cuerpo text[],
  url text,
  created_at timestamptz default now()
);

create table comunicados (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  resumen text not null,
  fecha date not null,
  cuerpo text[],
  documento text,
  urgente boolean default false,
  created_at timestamptz default now()
);

-- Seguridad: cualquier visitante puede LEER, pero solo un usuario logueado
-- (el admin) puede crear/editar/borrar.
alter table noticias enable row level security;
alter table eventos enable row level security;
alter table comunicados enable row level security;

create policy "lectura publica noticias" on noticias for select using (true);
create policy "lectura publica eventos" on eventos for select using (true);
create policy "lectura publica comunicados" on comunicados for select using (true);

create policy "admin escribe noticias" on noticias for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin escribe eventos" on eventos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin escribe comunicados" on comunicados for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Bucket público para las fotos que suba el admin desde el formulario
insert into storage.buckets (id, name, public) values ('novedades-imagenes', 'novedades-imagenes', true);

create policy "lectura publica de imagenes" on storage.objects for select
  using (bucket_id = 'novedades-imagenes');
create policy "admin sube imagenes" on storage.objects for insert
  with check (bucket_id = 'novedades-imagenes' and auth.role() = 'authenticated');
