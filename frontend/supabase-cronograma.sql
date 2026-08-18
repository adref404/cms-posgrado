-- ============================================================
-- Setup de base de datos: Cronograma de Actividades (Admisión + Académico)
-- Posgrado Educación UNMSM — pegar completo en el SQL Editor de Supabase
-- y ejecutar UNA sola vez.
--
-- Una sola tabla para los dos cronogramas que se muestran en el sitio
-- ("tipo" separa cuál es cuál); "orden" define el orden de izquierda a
-- derecha / arriba a abajo en la línea de tiempo; "destacado_home" solo
-- aplica al cronograma académico: marca cuáles de sus hitos aparecen en
-- la vista resumida del Home (el cronograma de admisión siempre se
-- muestra completo ahí, no necesita curaduría aparte).
--
-- Se deja sembrada la misma información que ya estaba en el código
-- (data/matricula.js), así el sitio no queda vacío apenas se corre esto.
-- ============================================================

create table cronograma_actividades (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('admision', 'academico')),
  evento text not null,
  fecha text not null,
  fecha_inicio date not null,
  fecha_fin date not null,
  icono text not null default 'MdSchedule',
  orden integer not null default 0,
  destacado_home boolean not null default true,
  created_at timestamptz default now()
);

alter table cronograma_actividades enable row level security;

create policy "lectura publica cronograma" on cronograma_actividades for select using (true);

create policy "admin escribe cronograma" on cronograma_actividades for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Cronograma de Admisión 2026-II
insert into cronograma_actividades (tipo, evento, fecha, fecha_inicio, fecha_fin, icono, orden, destacado_home) values
  ('admision', 'Inscripción de postulantes', 'Hasta el 20 de agosto', '2026-05-04', '2026-08-20', 'MdCampaign', 1, true),
  ('admision', 'Examen de conocimientos', 'Hasta el 22 de agosto', '2026-08-21', '2026-08-22', 'MdQuiz', 2, true),
  ('admision', 'Entrevista personal', 'Doctorado hasta el 23 · Maestría hasta el 25 de agosto', '2026-08-23', '2026-08-25', 'MdRecordVoiceOver', 3, true),
  ('admision', 'Publicación de resultados', '27 de agosto', '2026-08-27', '2026-08-27', 'MdEmojiEvents', 4, true),
  ('admision', 'Matrícula de ingresantes', '31 de agosto al 01 de setiembre', '2026-08-31', '2026-09-01', 'MdHowToReg', 5, true);

-- Cronograma Académico 2026-II
insert into cronograma_actividades (tipo, evento, fecha, fecha_inicio, fecha_fin, icono, orden, destacado_home) values
  ('academico', 'Reactualización de matrícula', 'Hasta el 17 de agosto', '2026-08-01', '2026-08-17', 'MdAutorenew', 1, false),
  ('academico', 'Matrícula Regular', 'Del 18 al 28 de agosto', '2026-08-18', '2026-08-28', 'MdHowToReg', 2, true),
  ('academico', 'Matrícula de Ingresantes', 'Del 31 de agosto al 01 de setiembre', '2026-08-31', '2026-09-01', 'MdPersonAdd', 3, true),
  ('academico', 'Inducción académica', '31 de agosto al 01 de setiembre', '2026-08-31', '2026-09-01', 'MdGroups', 4, false),
  ('academico', 'Inicio de Clases', '02 de setiembre', '2026-09-02', '2026-09-02', 'MdMenuBook', 5, true),
  ('academico', 'Matrícula extemporánea y rectificación', 'Del 14 al 18 de setiembre', '2026-09-14', '2026-09-18', 'MdEdit', 6, false),
  ('academico', 'Reserva de matrícula', 'Hasta el 28 de setiembre', '2026-09-01', '2026-09-28', 'MdBookmarkAdded', 7, false),
  ('academico', 'Anulación de matrícula', 'Del 21 al 28 de setiembre', '2026-09-21', '2026-09-28', 'MdCancel', 8, false),
  ('academico', 'Fin de Clases', '22 de diciembre', '2026-12-22', '2026-12-22', 'MdFlag', 9, true),
  ('academico', 'Ingreso de Notas', 'Del 23 al 26 de diciembre', '2026-12-23', '2026-12-26', 'MdGrade', 10, true);
