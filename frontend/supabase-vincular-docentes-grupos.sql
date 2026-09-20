-- ============================================================
-- Enlazar automáticamente integrantes con Plana Docente (opcional)
-- Posgrado Educación UNMSM — pegar en el SQL Editor de Supabase.
--
-- Los ~330 integrantes que ya cargamos (ADGEGERN + lote 2) se guardaron
-- SIN enlazar a Plana Docente (docente_id = null para todos), a propósito,
-- porque enlazar por coincidencia de nombre "más o menos" es riesgoso.
--
-- Este script SÍ es seguro: solo enlaza cuando "apellidos" y "nombres"
-- coinciden EXACTO, letra por letra, con un docente ya registrado en
-- plana_docente. Si no hay coincidencia exacta, esa fila se queda como
-- está (sin enlazar) — no inventa nada.
--
-- Es reversible: correr esto no borra ni cambia nombres, solo rellena
-- "docente_id" donde antes estaba en null. Para deshacerlo, se puede
-- volver a poner en null con la misma condición.
-- ============================================================

update grupo_investigacion_integrantes gi
set docente_id = pd.id
from plana_docente pd
where gi.docente_id is null
  and gi.apellidos = pd.apellidos
  and gi.nombres = pd.nombres;

-- Para ver cuántos quedaron enlazados y cuáles NO (para revisar a mano si
-- alguno debería enlazarse con un nombre ligeramente distinto):
-- select nombres, apellidos, grupo_id from grupo_investigacion_integrantes where docente_id is null order by apellidos;
