import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { setNovedadesCacheLista } from "../data/novedadesCache";

// Trae todos los registros de una tabla de novedades (noticias/eventos/
// comunicados) publicada en Supabase. Expone cada fila con "id" = su slug
// (en vez del uuid interno) para que NoticiaCard/EventoCard/ComunicadoCard y
// las páginas de detalle sigan funcionando exactamente igual que cuando
// leían de los data/*.js estáticos (que ya usaban un string como "id").
export const useSupabaseCollection = (tabla) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    supabase
      .from(tabla)
      .select("*")
      .order("fecha", { ascending: false })
      .then(({ data: filas, error: err }) => {
        if (!activo) return;
        if (err) {
          setError(err);
          setLoading(false);
          return;
        }
        const items = (filas || []).map((fila) => ({ ...fila, id: fila.slug }));
        setData(items);
        setNovedadesCacheLista(tabla, items);
        setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [tabla]);

  return { data, loading, error };
};
