import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// La tabla en Supabase usa snake_case (grupo_investigacion,
// lineas_investigacion); el resto del código (DocenteCard,
// docentesPorPrograma.js) sigue esperando los mismos nombres que ya usaba
// data/planaDocente.js (grupoInvestigacion, lineasInvestigacion), así que
// se traduce acá y en ningún otro lado.
const filaADocente = (fila) => ({
  ...fila,
  grupoInvestigacion: fila.grupo_investigacion,
  lineasInvestigacion: fila.lineas_investigacion || [],
});

// Trae la Plana Docente publicada en Supabase, en el mismo orden en que el
// admin la dejó ordenada (columna "orden").
export const usePlanaDocente = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    supabase
      .from("plana_docente")
      .select("*")
      .order("orden", { ascending: true })
      .then(({ data, error: err }) => {
        if (!activo) return;
        if (err) {
          setError(err);
          setLoading(false);
          return;
        }
        setDocentes((data || []).map(filaADocente));
        setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return { docentes, loading, error };
};
