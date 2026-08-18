-- ============================================================
-- Migración: "cuerpo" pasa de array de párrafos (text[]) a un solo
-- texto con HTML enriquecido (text), para que el nuevo editor del panel
-- admin (negrita, subtítulos, listas, links) tenga dónde guardar el
-- formato. Pegar completo en el SQL Editor de Supabase y ejecutar UNA
-- sola vez.
--
-- La función auxiliar envuelve cada párrafo existente en <p>...</p>,
-- así que los comunicados y la noticia que ya publicaste se ven
-- exactamente igual después de correr esto — no se pierde nada.
-- (Postgres no permite una subconsulta dentro de un USING de ALTER
-- COLUMN, por eso se usa una función en vez del "select ... unnest".)
-- ============================================================

create or replace function _parrafos_a_html(arr text[]) returns text as $$
declare
  resultado text := '';
  p text;
begin
  if arr is null then
    return null;
  end if;
  foreach p in array arr loop
    resultado := resultado || '<p>' || replace(replace(replace(p, '&', '&amp;'), '<', '&lt;'), '>', '&gt;') || '</p>';
  end loop;
  return resultado;
end;
$$ language plpgsql immutable;

alter table noticias
  alter column cuerpo type text
  using _parrafos_a_html(cuerpo);

alter table eventos
  alter column cuerpo type text
  using _parrafos_a_html(cuerpo);

alter table comunicados
  alter column cuerpo type text
  using _parrafos_a_html(cuerpo);

drop function _parrafos_a_html(text[]);
