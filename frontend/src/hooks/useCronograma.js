import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ICONOS_CRONOGRAMA, ICONO_POR_DEFECTO } from "../data/iconosCronograma";

// Trae los hitos de cronograma_actividades para un tipo ("admision" |
// "academico"), ordenados igual que en el panel admin (columna "orden").
// Devuelve cada fila con las mismas claves que antes tenía el array
// estático en data/matricula.js (icono como componente, fechaInicio/
// fechaFin en camelCase) para que AdmisionHomeSection y
// CronogramaAcademicoPage no necesiten cambiar su lógica de cálculo de
// estado/avance — calcularEstadoPaso y calcularProgresoProceso siguen
// funcionando igual, solo cambia de dónde vienen los datos.
export const useCronograma = (tipo) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    supabase
      .from("cronograma_actividades")
      .select("*")
      .eq("tipo", tipo)
      .order("orden", { ascending: true })
      .then(({ data: filas, error }) => {
        if (!activo) return;
        if (error) {
          setLoading(false);
          return;
        }
        const items = (filas || []).map((fila) => ({
          ...fila,
          fechaInicio: fila.fecha_inicio,
          fechaFin: fila.fecha_fin,
          icono: ICONOS_CRONOGRAMA[fila.icono] || ICONO_POR_DEFECTO,
        }));
        setData(items);
        setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [tipo]);

  return { data, loading };
};
