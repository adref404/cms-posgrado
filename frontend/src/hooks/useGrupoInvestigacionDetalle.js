import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// La tabla "plana_docente" usa snake_case (lineas_investigacion);
// DocenteCard/DocenteDetalleModal esperan los mismos nombres que usa
// hooks/usePlanaDocente.js (lineasInvestigacion) — se traduce igual acá.
// No se arma "grupos" acá (a diferencia de usePlanaDocente.js): en este
// modal ya se está viendo al docente DESDE uno de sus grupos, así que no
// hace falta otra consulta aparte solo para repetir ese mismo dato.
const docenteEmbebidoAFicha = (docente) =>
  docente && {
    ...docente,
    lineasInvestigacion: docente.lineas_investigacion || [],
  };

// Trae un grupo de investigación (por id) junto con sus integrantes. Cada
// integrante ya trae toda su info propia (nombres, apellidos, vínculo,
// facultad); cuando además tiene "docente_id", Supabase embebe la fila
// completa de plana_docente (por la foreign key) para poder abrir su ficha.
export const useGrupoInvestigacionDetalle = (id) => {
  const [grupo, setGrupo] = useState(null);
  const [integrantes, setIntegrantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let activo = true;
    setLoading(true);

    Promise.all([
      supabase.from("grupos_investigacion").select("*").eq("id", id).maybeSingle(),
      supabase
        .from("grupo_investigacion_integrantes")
        .select("*, plana_docente(*)")
        .eq("grupo_id", id)
        .order("orden", { ascending: true }),
    ]).then(([grupoRes, integrantesRes]) => {
      if (!activo) return;
      if (grupoRes.error || integrantesRes.error) {
        setError(grupoRes.error || integrantesRes.error);
        setLoading(false);
        return;
      }
      setGrupo(grupoRes.data);
      setIntegrantes(
        (integrantesRes.data || []).map((fila) => ({
          ...fila,
          docente: docenteEmbebidoAFicha(fila.plana_docente),
        }))
      );
      setLoading(false);
    });

    return () => {
      activo = false;
    };
  }, [id]);

  return { grupo, integrantes, loading, error };
};
