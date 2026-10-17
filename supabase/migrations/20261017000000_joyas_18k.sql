-- =============================================================================
-- 333 Joyas — esquema de catálogo con fotos (Supabase / Postgres)
-- Ejecutar completo en: Supabase Dashboard -> SQL Editor -> New query -> Run
--
-- Diseño:
--   * Toda la joyería es oro 18k: no existe columna de material ni de quilates.
--   * Las fotos viven en Supabase Storage (bucket "joyas"); la tabla joya_fotos
--     guarda solo la ruta del archivo y sus dimensiones.
--   * Lectura pública de lo publicado; escritura SOLO para usuarios registrados
--     en la tabla administradores (verificado por RLS, no por el navegador).
--   * Tablas nuevas con nombres en español: no tocan las tablas anteriores
--     (products, categories, ...), que pueden borrarse cuando ya no se usen.
-- =============================================================================

-- ---------------------------------------------------------------- administradores
create table if not exists public.administradores (
  user_id   uuid primary key references auth.users (id) on delete cascade,
  creado_en timestamptz not null default now()
);

alter table public.administradores enable row level security;

-- security definer: consulta administradores sin exponer la tabla al público.
create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.administradores where user_id = auth.uid());
$$;

drop policy if exists "admin ve administradores" on public.administradores;
create policy "admin ve administradores" on public.administradores
  for select using (public.es_admin());

-- ---------------------------------------------------------------- categorias
create table if not exists public.categorias (
  id     smallint generated always as identity primary key,
  nombre text     not null unique,
  slug   text     not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  orden  smallint not null default 0
);

insert into public.categorias (nombre, slug, orden) values
  ('Cadenas', 'cadenas', 1),
  ('Pulseras', 'pulseras', 2),
  ('Dijes', 'dijes', 3),
  ('Anillos', 'anillos', 4),
  ('Zarcillos', 'zarcillos', 5)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------- joyas
-- tejido: los valores deben coincidir con src/lib/tejidos.ts (allí vive la
-- animación de cada uno). NULL = pieza sin tejido (anillo, dije, zarcillo).
create table if not exists public.joyas (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null check (char_length(btrim(nombre)) between 2 and 120),
  slug           text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  descripcion    text not null default '' check (char_length(descripcion) <= 2000),
  categoria_id   smallint not null references public.categorias (id),
  tejido         text check (tejido in (
                   'rolo', 'cubano', 'franco', 'gucci', 'figaro',
                   'cordon', 'espiga', 'singapur', 'bizantino', 'veneciana')),
  peso_gramos    numeric(7, 2) not null check (peso_gramos > 0),
  largo_cm       numeric(5, 1) check (largo_cm > 0),
  ancho_mm       numeric(4, 1) check (ancho_mm > 0),
  precio_usd     numeric(10, 2) check (precio_usd >= 0),   -- NULL = "precio a consultar"
  disponible     boolean not null default true,
  destacada      boolean not null default false,
  publicada      boolean not null default true,
  creada_en      timestamptz not null default now(),
  actualizada_en timestamptz not null default now()
);

create index if not exists joyas_categoria_idx on public.joyas (categoria_id);
create index if not exists joyas_publicada_idx on public.joyas (publicada, creada_en desc);

create or replace function public.tocar_actualizada_en()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.actualizada_en := now();
  return new;
end;
$$;

drop trigger if exists joyas_actualizada_en on public.joyas;
create trigger joyas_actualizada_en
  before update on public.joyas
  for each row execute function public.tocar_actualizada_en();

-- ---------------------------------------------------------------- joya_fotos
-- ruta = ruta del archivo dentro del bucket "joyas" (p. ej. "<joya_id>/<uuid>.webp").
create table if not exists public.joya_fotos (
  id        uuid primary key default gen_random_uuid(),
  joya_id   uuid not null references public.joyas (id) on delete cascade,
  ruta      text not null unique,
  ancho     integer check (ancho > 0),
  alto      integer check (alto > 0),
  orden     smallint not null default 0,
  creada_en timestamptz not null default now()
);

create index if not exists joya_fotos_joya_idx on public.joya_fotos (joya_id, orden);

-- ---------------------------------------------------------------- nosotros
-- Una sola fila editable desde el panel.
create table if not exists public.nosotros (
  id             smallint primary key default 1 check (id = 1),
  titulo         text not null,
  texto          text not null,
  actualizado_en timestamptz not null default now()
);

insert into public.nosotros (id, titulo, texto) values (
  1,
  'Joyería en oro 18k, hecha para durar',
  'Somos una joyería de San Antonio de los Altos, Miranda. Trabajamos únicamente con oro de 18 quilates y cada pieza incluye su garantía de pureza. Atención personal y delivery en Caracas.'
) on conflict (id) do nothing;

-- ---------------------------------------------------------------- RLS
alter table public.categorias enable row level security;
alter table public.joyas      enable row level security;
alter table public.joya_fotos enable row level security;
alter table public.nosotros   enable row level security;

drop policy if exists "lectura publica categorias" on public.categorias;
create policy "lectura publica categorias" on public.categorias
  for select using (true);
drop policy if exists "admin escribe categorias" on public.categorias;
create policy "admin escribe categorias" on public.categorias
  for all using (public.es_admin()) with check (public.es_admin());

drop policy if exists "lectura publica joyas publicadas" on public.joyas;
create policy "lectura publica joyas publicadas" on public.joyas
  for select using (publicada or public.es_admin());
drop policy if exists "admin escribe joyas" on public.joyas;
create policy "admin escribe joyas" on public.joyas
  for all using (public.es_admin()) with check (public.es_admin());

drop policy if exists "lectura publica fotos de joyas publicadas" on public.joya_fotos;
create policy "lectura publica fotos de joyas publicadas" on public.joya_fotos
  for select using (
    exists (select 1 from public.joyas j where j.id = joya_id and (j.publicada or public.es_admin()))
  );
drop policy if exists "admin escribe fotos" on public.joya_fotos;
create policy "admin escribe fotos" on public.joya_fotos
  for all using (public.es_admin()) with check (public.es_admin());

drop policy if exists "lectura publica nosotros" on public.nosotros;
create policy "lectura publica nosotros" on public.nosotros
  for select using (true);
drop policy if exists "admin escribe nosotros" on public.nosotros;
create policy "admin escribe nosotros" on public.nosotros
  for all using (public.es_admin()) with check (public.es_admin());

-- ---------------------------------------------------------------- storage
-- Bucket público de lectura (las fotos se sirven por URL pública y CDN);
-- solo los administradores suben, reemplazan o borran.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('joyas', 'joyas', true, 5242880,
        array['image/webp', 'image/jpeg', 'image/png', 'image/avif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin lee fotos del bucket" on storage.objects;
create policy "admin lee fotos del bucket" on storage.objects
  for select using (bucket_id = 'joyas' and public.es_admin());
drop policy if exists "admin sube fotos" on storage.objects;
create policy "admin sube fotos" on storage.objects
  for insert with check (bucket_id = 'joyas' and public.es_admin());
drop policy if exists "admin actualiza fotos" on storage.objects;
create policy "admin actualiza fotos" on storage.objects
  for update using (bucket_id = 'joyas' and public.es_admin());
drop policy if exists "admin borra fotos" on storage.objects;
create policy "admin borra fotos" on storage.objects
  for delete using (bucket_id = 'joyas' and public.es_admin());

-- =============================================================================
-- DESPUÉS DE EJECUTAR: dar acceso de administrador
--   1. Authentication -> Users -> Add user (correo + contraseña nueva).
--   2. Ejecutar, con ese correo:
--        insert into public.administradores (user_id)
--        select id from auth.users where email = 'tu-correo@ejemplo.com';
-- =============================================================================
