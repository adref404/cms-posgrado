-- ============================================================
-- Agrega la columna "imagen" a comunicados (noticias y eventos ya la
-- tenían desde supabase-setup.sql). Pegar en el SQL Editor de Supabase
-- y ejecutar UNA sola vez.
-- ============================================================

alter table comunicados add column if not exists imagen text;
