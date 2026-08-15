import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { setNovedadesCacheItem } from "../data/novedadesCache";

// Trae un único registro por su slug (el "id" público en las URLs, ej.
// /noticias/:id). Devuelve undefined mientras carga, null si no existe, o el
// item (con "id" = slug) si lo encuentra — así la página que lo use puede
// distinguir "todavía cargando" de "no existe, redirige".
export const useSupabaseItem = (tabla, slug) => {
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    let activo = true;
    setItem(undefined);

    supabase
      .from(tabla)
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data: fila }) => {
        if (!activo) return;
        if (!fila) {
          setItem(null);
          return;
        }
        const item = { ...fila, id: fila.slug };
        setItem(item);
        setNovedadesCacheItem(tabla, item);
      });

    return () => {
      activo = false;
    };
  }, [tabla, slug]);

  return item;
};
