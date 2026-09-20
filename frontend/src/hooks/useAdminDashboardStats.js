import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Cuenta filas de "columna" en "tabla" (client-side, no hay muchas filas en
// ninguna de estas tablas) y arma [{ label, value }] ordenado de mayor a
// menor. "Sin dato" agrupa nulls/vacíos aparte, al final.
const agruparPorConteo = (filas, columna) => {
  const conteo = new Map();
  let sinDato = 0;
  filas.forEach((fila) => {
    const valor = fila[columna];
    if (!valor) {
      sinDato += 1;
      return;
    }
    conteo.set(valor, (conteo.get(valor) || 0) + 1);
  });
  const resultado = [...conteo.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
  if (sinDato > 0) resultado.push({ label: "Sin dato", value: sinDato });
  return resultado;
};

// Todas las estadísticas del dashboard del panel de administración, en un
// solo hook: conteos simples (para las tarjetas) + tres agrupaciones (para
// los gráficos). Cada conteo es su propia consulta liviana (count exact,
// head:true no trae filas) — nada de esto se muestra en el sitio público.
export const useAdminDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    const hoy = new Date().toISOString().slice(0, 10);

    Promise.all([
      supabase.from("noticias").select("*", { count: "exact", head: true }),
      supabase.from("eventos").select("*", { count: "exact", head: true }).gte("fecha", hoy),
      supabase.from("comunicados").select("*", { count: "exact", head: true }).eq("urgente", true),
      supabase.from("cronograma_actividades").select("*", { count: "exact", head: true }),
      supabase.from("transparencia_documentos").select("*", { count: "exact", head: true }),
      supabase.from("plana_docente").select("*", { count: "exact", head: true }),
      supabase.from("grupos_investigacion").select("*", { count: "exact", head: true }),
      supabase.from("grupo_investigacion_integrantes").select("*", { count: "exact", head: true }),
      supabase.from("plana_docente").select("categoria"),
      supabase.from("transparencia_documentos").select("categoria"),
      supabase.from("grupo_investigacion_integrantes").select("vinculo_unmsm"),
    ]).then(
      ([
        noticias,
        eventosProximos,
        comunicadosUrgentes,
        cronogramaHitos,
        transparenciaDocs,
        docentes,
        grupos,
        integrantes,
        docentesCategoria,
        transparenciaCategoria,
        integrantesVinculo,
      ]) => {
        if (!activo) return;
        setStats({
          noticias: noticias.count || 0,
          eventosProximos: eventosProximos.count || 0,
          comunicadosUrgentes: comunicadosUrgentes.count || 0,
          cronogramaHitos: cronogramaHitos.count || 0,
          transparenciaDocs: transparenciaDocs.count || 0,
          docentes: docentes.count || 0,
          grupos: grupos.count || 0,
          integrantes: integrantes.count || 0,
          docentesPorCategoria: agruparPorConteo(docentesCategoria.data || [], "categoria"),
          transparenciaPorCategoria: agruparPorConteo(transparenciaCategoria.data || [], "categoria"),
          integrantesPorVinculo: agruparPorConteo(integrantesVinculo.data || [], "vinculo_unmsm"),
        });
        setLoading(false);
      }
    );

    return () => {
      activo = false;
    };
  }, []);

  return { stats, loading };
};
