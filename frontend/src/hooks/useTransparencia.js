import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Agrupa las filas (ya ordenadas por "orden") en secciones por categoría,
// respetando el orden en que aparece cada categoría por primera vez — así
// reproduce la misma forma que tenía data/documentosRecursos.js
// ({ titulo, documentos: [...] }) sin necesitar una tabla aparte para las
// categorías: el admin simplemente repite el mismo texto de categoría en
// cada documento que quiera agrupar junto.
const agruparPorCategoria = (filas) => {
  const documentosPorCategoria = new Map();
  const ordenCategorias = [];

  filas.forEach((fila) => {
    if (!documentosPorCategoria.has(fila.categoria)) {
      documentosPorCategoria.set(fila.categoria, []);
      ordenCategorias.push(fila.categoria);
    }
    documentosPorCategoria.get(fila.categoria).push(fila);
  });

  return ordenCategorias.map((titulo) => ({
    titulo,
    documentos: documentosPorCategoria.get(titulo),
  }));
};

// Trae los documentos de Transparencia publicados en Supabase y los entrega
// ya agrupados por categoría, listos para DocumentSection/DocumentCard.
export const useTransparencia = () => {
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    supabase
      .from("transparencia_documentos")
      .select("*")
      .order("orden", { ascending: true })
      .then(({ data, error: err }) => {
        if (!activo) return;
        if (err) {
          setError(err);
          setLoading(false);
          return;
        }
        setSecciones(agruparPorCategoria(data || []));
        setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return { secciones, loading, error };
};
