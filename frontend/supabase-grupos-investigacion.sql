-- ============================================================
-- Setup de base de datos: Grupos de Investigación
-- Posgrado Educación UNMSM — pegar completo en el SQL Editor de Supabase
-- y ejecutar UNA sola vez. Requiere que ya exista la tabla "plana_docente"
-- (ver supabase-plana-docente.sql) — este script referencia esa tabla.
--
-- Dos tablas:
--
-- 1) grupos_investigacion: el grupo en sí (nombre, presentación,
--    objetivos, servicios, líneas de investigación, datos de contacto).
--
-- 2) grupo_investigacion_integrantes: CADA integrante (docente o
--    estudiante, de Educación o de cualquier otra facultad, externo o no)
--    guarda su propia información completa (nombres, apellidos, vínculo,
--    facultad, tipo de investigador) — no depende de ninguna otra tabla
--    para poder mostrarse. El campo "docente_id" es un enlace OPCIONAL:
--    se llena únicamente cuando ese integrante es, además, uno de los
--    docentes de Educación que ya está fichado en "plana_docente" — eso
--    es lo que permite que al hacer clic en su nombre se abra su ficha
--    completa (grado, ORCID, líneas de investigación, biodata). Para
--    cualquier otro integrante (otra facultad, estudiante, externo) el
--    enlace queda en null y se muestra tal cual la info guardada acá.
--
--    "on delete set null" en docente_id: si algún día borran a ese
--    docente de Plana Docente, esta fila NO desaparece (no es "on delete
--    cascade") — solo pierde el enlace y se queda como integrante normal,
--    porque su nombre ya está guardado en esta misma tabla.
-- ============================================================

create table grupos_investigacion (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  nombre_corto text,
  estado text,
  presentacion text,
  objetivos text,
  servicios text,
  lineas_codigos text[] not null default '{}',
  lineas_investigacion text[] not null default '{}',
  correo_coordinador text,
  telefono text,
  oficina text,
  direccion text,
  direccion_web text,
  orden integer not null default 0,
  created_at timestamptz default now()
);

create table grupo_investigacion_integrantes (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid not null references grupos_investigacion(id) on delete cascade,
  docente_id uuid references plana_docente(id) on delete set null,
  nombres text not null,
  apellidos text not null,
  vinculo_unmsm text,
  facultad text,
  tipo_integrante text not null default 'Adherente',
  orden integer not null default 0,
  created_at timestamptz default now()
);

-- Un mismo docente no puede quedar enlazado dos veces al mismo grupo
-- (sí puede aparecer sin enlazar más de una vez, por eso el índice único
-- solo aplica cuando docente_id no es null).
create unique index grupo_integrante_docente_unico
  on grupo_investigacion_integrantes (grupo_id, docente_id)
  where docente_id is not null;

alter table grupos_investigacion enable row level security;
alter table grupo_investigacion_integrantes enable row level security;

create policy "lectura publica grupos investigacion" on grupos_investigacion for select using (true);
create policy "admin escribe grupos investigacion" on grupos_investigacion for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "lectura publica integrantes de grupos" on grupo_investigacion_integrantes for select using (true);
create policy "admin escribe integrantes de grupos" on grupo_investigacion_integrantes for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- Datos de ejemplo: el grupo "ADGEGERN" (el PDF de RAIS que compartiste),
-- para que la sección no quede vacía apenas se corre esto.
--
-- Dos de sus integrantes titulares (Corrales Prada, Eugenio e Hidalgo
-- Rosas, Gregorio Americo) figuran como "Educación" en el PDF de RAIS,
-- pero eso no confirma que sean docentes de POSGRADO — "plana_docente" es
-- específicamente el directorio de posgrado, y un docente de pregrado de
-- Educación no debe entrar ahí. Como no hay forma de confirmarlo con este
-- documento, quedan como cualquier otro integrante: su nombre vive solo en
-- "grupo_investigacion_integrantes", sin enlace a Plana Docente. Si el
-- admin confirma que sí son de posgrado, puede crearlos y enlazarlos
-- después desde /admin/grupos-investigacion/.../integrantes.
--
-- No se guarda el DNI de nadie: es un dato personal que no cumple ninguna
-- función en la web pública.
-- ============================================================

insert into grupos_investigacion (
  nombre, nombre_corto, estado, presentacion, objetivos, servicios,
  lineas_codigos, lineas_investigacion, correo_coordinador, oficina, direccion, orden
) values (
  'Administración, gerencia, gestión ambiental, empresarial y social hacia la protección de nuestros recursos',
  'ADGEGERN',
  'Registrado',
  'El presente grupo de investigación está conformado por docentes de alta calidad investigadora, con publicaciones en revistas indexadas y abundante producción científica. El campo de estudio está en Minería y medio ambiente, conflictos sociales y la pobreza del Perú; en el campo de la educación, con estudios de didáctica y diagnóstico en las ciencias naturales; en el campo de la Ingeniería Industrial, con investigaciones sobre el Dumping, realizadas por el Dr. Antonio Luyo y la Dra. Edith Soria Valencia, de la Pontificia Universidad Católica del Perú. En el campo de la Economía, se han realizado investigaciones sobre el comportamiento de las inversiones, medio ambiente y valores de nuestros recursos naturales, hechas por el Dr. Gilberto Cárdenas Nuñez; y en el campo de las Ciencias Sociales, el Dr. Honorio Pinto Herrera, quien está identificado con las comunidades, el desplazamiento forzado y la pérdida de la identidad. En esta oportunidad estamos abocados a estudiar la contaminación de las comunidades producida por la industria minera, sus diferentes relaciones con los recursos naturales que son depredados o contaminados, y su incidencia directa en nuestra población más vulnerable, en la producción limpia y en la gestión ambiental.',
  'Investigar los movimientos forzados de las comunidades producidos por la industria minera, las pérdidas de espacios vitales para las comunidades, así como la pérdida del agua, tierras y su folclor, con el fin de llevarlo al campo económico para que las autoridades sepan el valor del daño causado y traten de remediar estas acciones que desmedran nuestro hábitat.',
  'Los servicios a prestar son principalmente los de asesoría para evitar la contaminación, y estudios de situaciones puntuales para solucionar los conflictos sociales que se generan, y de cómo tratarlos para que no escalen.',
  ARRAY['A.2.5.2.', 'A.2.5.1.', 'A.2.4.3.', 'C.16.0.35', 'C.16.0.16', 'C.16.0.24'],
  ARRAY['Recursos Hídricos', 'Energética', 'Ciencias del Suelo', 'Tecnologías limpias', 'Recursos naturales e inversión minera', 'Gestión ambiental minera'],
  'ghidalgor@unmsm.edu.pe',
  'Oficina de la Dirección de la Biblioteca Central de la Facultad de Educación',
  'Jr. Germán Amézaga N.° 375, Edificio Central de la Facultad de Educación, Primer Piso.',
  1
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Eder Guido', 'Robles Morales', 'Estudiante posgrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 1),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Gilberto Jose Rafael', 'Cardenas Nuñez', 'Docente permanente', 'Ciencias Económicas', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Danny Charles', 'Quezada Ruiz', 'Estudiante posgrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Fernando Andrés', 'Sánchez Flores', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Danny Steven', 'Limay Culqui', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Nalda Guadalupe', 'Damian Nuñez', 'Externo', null, 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Fredy Luis', 'Espinoza Barrios', 'Estudiante posgrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Oscar Arcadio', 'Montes Encarnación', 'Externo', 'Ciencias Matemáticas', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Alberto Carlos', 'Bustamante Retamozo', 'Externo', null, 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Luis Miguel', 'Moran Yañez', 'Docente permanente', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Titular', 10),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'John Felix', 'Esquivel Ramos', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Nilson', 'Quispe Auccatinco', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Olivert Angelo', 'Janampa Raurau', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Jorge Luis', 'Vargas Olarte', 'Estudiante posgrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Denis William', 'Ruiz Quispe', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Marco Antonio', 'Leonardo Gonzales', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Edizon Alecio', 'Campos Avila', 'Estudiante pregrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Edith', 'Soria Valencia', 'Externo', null, 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Jordy Pier', 'Pariona Palomino', 'Estudiante posgrado', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Eugenio', 'Corrales Prada', 'Docente permanente', 'Educación', 'Titular', 20),
  ((select id from grupos_investigacion where nombre_corto = 'ADGEGERN'), null, 'Gregorio Americo', 'Hidalgo Rosas', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 21);
