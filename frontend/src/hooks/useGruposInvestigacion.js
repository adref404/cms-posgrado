import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { setGruposInvestigacionCache } from "../data/gruposInvestigacionCache";

// Trae el listado de Grupos de Investigación (sin sus integrantes — eso lo
// trae aparte useGrupoInvestigacionDetalle.js, solo cuando se entra al
// detalle de uno).
export const useGruposInvestigacion = () => {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    supabase
      .from("grupos_investigacion")
      .select("*")
      .order("orden", { ascending: true })
      .then(({ data, error: err }) => {
        if (!activo) return;
        if (err) {
          setError(err);
          setLoading(false);
          return;
        }
        setGrupos(data || []);
        setGruposInvestigacionCache(data || []);
        setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return { grupos, loading, error };
};
