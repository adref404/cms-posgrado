-- ============================================================
-- Setup de base de datos: Transparencia (Documentos y Recursos)
-- Posgrado Educación UNMSM — pegar completo en el SQL Editor de Supabase
-- y ejecutar UNA sola vez.
--
-- Una sola tabla para todas las categorías de la sección Transparencia
-- ("categoria" es texto libre, no hay tabla aparte para categorías: el
-- admin la escribe igual que ya escribía el "titulo" de cada grupo en
-- data/documentosRecursos.js; si repite el nombre exacto de una categoría
-- existente, el documento cae dentro de esa misma sección). "orden" define
-- el orden de aparición: tanto de las categorías entre sí (por el menor
-- orden de sus documentos) como de los documentos dentro de su categoría.
--
-- Se deja sembrada la misma información que ya estaba en el código
-- (data/documentosRecursos.js), así el sitio no queda vacío apenas se
-- corre esto.
-- ============================================================

create table transparencia_documentos (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  titulo text not null,
  descripcion text,
  tipo text not null default 'enlace' check (tipo in ('pdf', 'docx', 'enlace')),
  url text not null,
  orden integer not null default 0,
  created_at timestamptz default now()
);

alter table transparencia_documentos enable row level security;

create policy "lectura publica transparencia" on transparencia_documentos for select using (true);

create policy "admin escribe transparencia" on transparencia_documentos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Bucket público para los PDF que el admin suba directo desde el panel
-- (además de poder simplemente pegar un link externo, como los de Drive
-- que ya se usaban).
insert into storage.buckets (id, name, public) values ('transparencia-archivos', 'transparencia-archivos', true);

create policy "lectura publica de archivos de transparencia" on storage.objects for select
  using (bucket_id = 'transparencia-archivos');
create policy "admin sube archivos de transparencia" on storage.objects for insert
  with check (bucket_id = 'transparencia-archivos' and auth.role() = 'authenticated');

-- Contenido ya existente (data/documentosRecursos.js), migrado tal cual.
insert into transparencia_documentos (categoria, titulo, descripcion, tipo, url, orden) values
  ('Plataformas y Trámites', 'Sistema Único de Matrícula (SUM)', 'Matrícula, horarios y consulta de notas', 'enlace', 'https://sum.unmsm.edu.pe/alumnoWebSum/v2/inicio', 1),
  ('Plataformas y Trámites', 'San Market UNMSM', 'Pago de matrícula, pensiones y derechos', 'enlace', 'https://sanmarket.unmsm.edu.pe/', 2),
  ('Plataformas y Trámites', 'Red Telemática', 'Sitio de la Red Telemática de la UNMSM', 'enlace', 'https://telematica.unmsm.edu.pe/', 3),
  ('Plataformas y Trámites', 'MAT', 'Módulo de Atención de Trámites y Documentaciones', 'enlace', 'https://tramiteonline.unmsm.edu.pe/sgdfd/mat/tramites/solicitud', 4),

  ('Estatuto', 'Estatuto de la Universidad Nacional Mayor de San Marcos', 'De conformidad con la Ley N.° 30220 — Junio 2016', 'pdf', 'https://cdn.www.gob.pe/uploads/document/file/8553620/7084905-rr-n-03013-estatuto-de-la-unmsm.pdf?v=1756242339', 5),

  ('Reglamentos', 'Reglamento General de Estudios de Posgrado (vigente 2024)', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1JznymSUnSjCbeK7l0g7WU_DwWhAIaZ0p/view?usp=drive_link', 6),
  ('Reglamentos', 'Reglamento General de Matrícula de Posgrado (2018-2_2023)', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1K0A_ETJtEQXisJPtl6psQbGQcOV7k0Pc/view?usp=drive_link', 7),
  ('Reglamentos', 'Reglamento General de Matrícula de Posgrado (2009_2008-1)', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1SpqYkPY_IubE6KE-FsJu9hGvvvYiZlUx/view?usp=drive_link', 8),
  ('Reglamentos', 'Reglamento General de Matrícula de Posgrado (2000–2008)', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1tPfY9A_boc9PhUkRA5dsBxM6uB-RWl38/view?usp=drive_link', 9),
  ('Reglamentos', 'Resolución Rectiral sobre la Segunda Disposición Transitoria', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1kI1sqU1Bjxfgd5_jOuRTfvnIzGnCi2nl/view?usp=drive_link', 10),
  ('Reglamentos', 'Modificación del Artículo 14º inc. c) y el Artículo 65º inc. b) del Reglamento General de Estudios de Posgrado – 2018', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1QtSqK1tT8wmpgXZiTIQOOHptEfj1Qnqx/view?usp=drive_link', 11),
  ('Reglamentos', 'Reglamento-de-Idiomas', 'REGLAMENTOS', 'pdf', 'https://drive.google.com/file/d/1wHXGFeGImLdnq5_1YeLJevpXxY5yTGj7/view?usp=drive_link', 12),

  ('Directivas', 'DIRECTIVA DE ORIGINALIDAD Y SIMILITUD DE TRABAJOS ACADÉMICOS, DE INVESTIGACIÓN Y PRODUCCIÓN INTELECTUAL DE LA UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS', 'DIRECTIVAS', 'pdf', 'https://drive.google.com/file/d/19oYIaWMSt2Ia23OXhnqqCX3EOKbq0s_v/view?usp=drive_link', 13),

  ('Líneas de Investigación', 'Líneas de Investigación', 'LÍNEAS DE INVESTIGACIÓN', 'pdf', 'https://drive.google.com/file/d/1Z2GgYFV6JbZAhhYLjt_tL1kJp8SUHaKK/view?usp=drive_link', 14),

  ('Estadística: Número de postulantes, ingresantes, matriculados y egresados.', 'Informe Estadístico de Posgrado', 'INFORME ESTADÍSTICO', 'pdf', 'https://drive.google.com/file/d/14l8_5KJzvZfKeX5eeROmPhGnw78g8cpJ/view?usp=drive_link', 15),

  ('Cronograma de Actividades Académicas', 'Resolución Rectoral de Cronograma de Actividades 2026', 'RR', 'pdf', 'https://drive.google.com/file/d/1tOTA_oj4ckMOkJ98Jjj7D_F8lODYS32w/view?usp=drive_link', 16),
  ('Cronograma de Actividades Académicas', 'Cronograma de Actividades Académicas de Posgrado, 2026', 'RR', 'pdf', 'https://drive.google.com/file/d/1SsNICLSj5SayckUlTFgThyfxqSurNNCj/view?usp=drive_link', 17);
