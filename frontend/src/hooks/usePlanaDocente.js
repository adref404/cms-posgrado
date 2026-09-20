import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// La tabla en Supabase usa snake_case (lineas_investigacion); el resto del
// código (DocenteCard, docentesPorPrograma.js) sigue esperando los mismos
// nombres que ya usaba data/planaDocente.js (lineasInvestigacion), así que
// se traduce acá y en ningún otro lado.
//
// "grupos" ya NO sale del viejo campo de texto suelto "grupo_investigacion"
// (quedó obsoleto) — se arma cruzando con grupo_investigacion_integrantes,
// que es la fuente real: un docente puede pertenecer a varios grupos.
const filaADocente = (fila, gruposPorDocente) => ({
  ...fila,
  lineasInvestigacion: fila.lineas_investigacion || [],
  grupos: gruposPorDocente[fila.id] || [],
});

// Trae la Plana Docente publicada en Supabase, en el mismo orden en que el
// admin la dejó ordenada (columna "orden"), junto con los grupos de
// investigación reales a los que pertenece cada docente.
export const usePlanaDocente = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    Promise.all([
      supabase.from("plana_docente").select("*").order("orden", { ascending: true }),
      supabase
        .from("grupo_investigacion_integrantes")
        .select("docente_id, grupos_investigacion(id, nombre, nombre_corto)")
        .not("docente_id", "is", null),
    ]).then(([docentesRes, integrantesRes]) => {
      if (!activo) return;
      if (docentesRes.error) {
        setError(docentesRes.error);
        setLoading(false);
        return;
      }

      const gruposPorDocente = {};
      (integrantesRes.data || []).forEach((fila) => {
        if (!fila.grupos_investigacion) return;
        if (!gruposPorDocente[fila.docente_id]) gruposPorDocente[fila.docente_id] = [];
        gruposPorDocente[fila.docente_id].push(fila.grupos_investigacion);
      });

      setDocentes((docentesRes.data || []).map((fila) => filaADocente(fila, gruposPorDocente)));
      setLoading(false);
    });

    return () => {
      activo = false;
    };
  }, []);

  return { docentes, loading, error };
};
