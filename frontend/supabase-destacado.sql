-- Agrega la columna "destacado" (para marcar qué se muestra en la barra de
-- aviso urgente del Home) a las 3 tablas de novedades. Pegar en el SQL
-- Editor de Supabase.

alter table noticias add column destacado boolean default false;
alter table eventos add column destacado boolean default false;
alter table comunicados add column destacado boolean default false;
