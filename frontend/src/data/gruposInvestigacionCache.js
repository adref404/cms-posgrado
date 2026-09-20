// Caché en memoria (no reactivo) de los grupos de investigación traídos de
// Supabase — mismo propósito que data/novedadesCache.js: permite que
// utils/breadcrumbMap.js resuelva el nombre del grupo en la página de
// detalle de forma síncrona. La llena hooks/useGruposInvestigacion.js apenas
// llega la respuesta.
export const gruposInvestigacionCache = {
  lista: [],
};

export const setGruposInvestigacionCache = (items) => {
  gruposInvestigacionCache.lista = items;
};
