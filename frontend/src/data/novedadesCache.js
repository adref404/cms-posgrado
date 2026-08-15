// Caché en memoria (no reactivo) de los últimos items de noticias/eventos/
// comunicados traídos de Supabase. Existe solo para que utils/breadcrumbMap.js
// pueda seguir resolviendo el título de la página de detalle de forma
// síncrona (como antes, cuando estos datos eran arrays estáticos) — lo
// llenan los hooks de fetch (hooks/useSupabaseCollection.js y
// useSupabaseItem.js) apenas llega la respuesta.
export const novedadesCache = {
  noticias: [],
  eventos: [],
  comunicados: [],
};

export const setNovedadesCacheLista = (tipo, items) => {
  novedadesCache[tipo] = items;
};

export const setNovedadesCacheItem = (tipo, item) => {
  if (!item) return;
  const lista = novedadesCache[tipo];
  const yaEsta = lista.some((i) => i.id === item.id);
  novedadesCache[tipo] = yaEsta
    ? lista.map((i) => (i.id === item.id ? item : i))
    : [...lista, item];
};
