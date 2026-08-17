import { useMemo } from "react";
import { useSupabaseCollection } from "./useSupabaseCollection";
import { searchIndexEstatico } from "../data/searchIndex";
import { normalizeText } from "../utils/normalizeText";

// Combina el índice estático (páginas, programas, FAQ, docentes) con el
// contenido en vivo de Supabase (Noticias/Eventos/Comunicados) y filtra por
// palabra clave — sin tildes/mayúsculas, y busca en título + descripción +
// sección, para que "matricula" encuentre "Matrícula" y también cosas cuya
// sección es "Matrícula" aunque la palabra no esté en el título.
export const useSiteSearch = (query) => {
  const { data: noticias } = useSupabaseCollection("noticias");
  const { data: eventos } = useSupabaseCollection("eventos");
  const { data: comunicados } = useSupabaseCollection("comunicados");

  const indiceCompleto = useMemo(() => {
    const dinamico = [
      ...noticias.map((n) => ({
        titulo: n.titulo,
        descripcion: n.resumen,
        ruta: `/noticias/${n.id}`,
        seccion: "Noticias",
      })),
      ...eventos.map((e) => ({
        titulo: e.titulo,
        descripcion: e.descripcion,
        ruta: `/eventos/${e.id}`,
        seccion: "Eventos",
      })),
      ...comunicados.map((c) => ({
        titulo: c.titulo,
        descripcion: c.resumen,
        ruta: `/comunicados/${c.id}`,
        seccion: "Comunicados",
      })),
    ];
    return [...searchIndexEstatico, ...dinamico];
  }, [noticias, eventos, comunicados]);

  const resultados = useMemo(() => {
    const term = normalizeText(query);
    if (!term) return [];

    return indiceCompleto.filter((item) => {
      return (
        normalizeText(item.titulo).includes(term) ||
        normalizeText(item.descripcion).includes(term) ||
        normalizeText(item.seccion).includes(term)
      );
    });
  }, [indiceCompleto, query]);

  return resultados;
};
