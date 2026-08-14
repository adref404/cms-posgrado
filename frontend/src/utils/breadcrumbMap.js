import { noticias } from "../data/noticias";
import { eventos } from "../data/eventos";
import { comunicados } from "../data/comunicados";
import programasPosgrado from "../data/programas";

// A qué lista ("/programas/maestria", etc.) vuelve el breadcrumb de un
// programa según su tipo — ver data/programas.js.
const PROGRAMA_LIST_PATH = {
  "Maestría": "/programas/maestria",
  "Doctorado": "/programas/doctorado",
  "Diplomado": "/programas/diplomado",
};

// Refleja la estructura real del menú (Header.jsx): la clave es la ruta de
// cada vista (subsección), "seccion" es el grupo del que cuelga en el menú
// (texto plano, sin link, porque el grupo en sí no tiene vista propia) y
// "subseccion" es el texto que se muestra para la vista misma.
// seccion: null cuando el ítem del menú es un enlace directo (sin grupo padre).
const BREADCRUMB_MAP = {
  "/nosotros/quienes-somos": { seccion: "Nosotros", subseccion: "Quiénes somos" },
  "/nosotros/directorio-flch": { seccion: "Nosotros", subseccion: "Directorio Facultad Educación" },
  "/nosotros/directorio-posgrado": { seccion: "Nosotros", subseccion: "Directorio Posgrado" },
  "/nosotros/documentos-recursos": { seccion: "Nosotros", subseccion: "Documentos y Recursos" },

  "/programas/maestria": { seccion: "Programas", subseccion: "Maestría" },
  "/programas/doctorado": { seccion: "Programas", subseccion: "Doctorado" },
  "/programas/diplomado": { seccion: "Programas", subseccion: "Diplomado" },

  "/matricula/cronograma-academico": { seccion: "Matrícula", subseccion: "Cronograma Académico" },
  "/matricula/cronograma-pagos": { seccion: "Matrícula", subseccion: "Cronograma de Pagos" },
  "/matricula/proceso-matricula": { seccion: "Matrícula", subseccion: "Proceso de Matrícula" },
  "/matricula/horario-cursos": { seccion: "Matrícula", subseccion: "Horario de Cursos" },

  "/noticias": { seccion: "Novedades", subseccion: "Noticias" },
  "/eventos": { seccion: "Novedades", subseccion: "Eventos" },
  "/comunicados": { seccion: "Novedades", subseccion: "Comunicados" },

  "/informacion-academica/docentes": { seccion: "Información Académica", subseccion: "Plana Docente" },
  "/informacion-academica/plan-estudios": { seccion: "Información Académica", subseccion: "Plan de Estudios" },
  "/informacion-academica/preguntas-frecuentes": { seccion: "Información Académica", subseccion: "Preguntas Frecuentes" },

  // Trámites sí tiene vista propia ("/tramites"), por eso "seccion" es
  // clickeable (seccionTo) en vez de texto plano.
  "/tramites": { seccion: null, subseccion: "Trámites" },
  "/tramites/maestria-1-anio": { seccion: "Trámites", seccionTo: "/tramites", subseccion: "Grado de Magíster · Maestría 1 Año" },
  "/tramites/maestria-2-anios": { seccion: "Trámites", seccionTo: "/tramites", subseccion: "Grado de Magíster · Maestría 2 Años" },
  "/tramites/doctorado": { seccion: "Trámites", seccionTo: "/tramites", subseccion: "Grado de Doctor" },
};

// Rutas de detalle (/noticias/:id, etc.): heredan el breadcrumb de su lista
// y agregan el título del ítem como último segmento (no clickeable).
const DETAIL_LOOKUPS = [
  { prefix: "/noticias/", listPath: "/noticias", items: noticias },
  { prefix: "/eventos/", listPath: "/eventos", items: eventos },
  { prefix: "/comunicados/", listPath: "/comunicados", items: comunicados },
];

// Devuelve { seccion, subseccion, subseccionTo, detalle } o null si la ruta
// no tiene breadcrumb (p. ej. /home).
export const getBreadcrumb = (pathname) => {
  if (BREADCRUMB_MAP[pathname]) {
    return { ...BREADCRUMB_MAP[pathname], subseccionTo: null, detalle: null };
  }

  if (pathname.startsWith("/programas/detalle/")) {
    const id = pathname.slice("/programas/detalle/".length);
    const item = programasPosgrado.find((p) => String(p.id) === id);
    if (!item) return null;
    return {
      seccion: "Programas",
      subseccion: item.tipo,
      subseccionTo: PROGRAMA_LIST_PATH[item.tipo] || "/programas/maestria",
      detalle: item.name,
    };
  }

  const match = DETAIL_LOOKUPS.find(({ prefix }) => pathname.startsWith(prefix));
  if (match) {
    const id = pathname.slice(match.prefix.length);
    const item = match.items.find((i) => i.id === id);
    const base = BREADCRUMB_MAP[match.listPath];
    return {
      ...base,
      subseccionTo: match.listPath,
      detalle: item ? item.titulo : null,
    };
  }

  return null;
};
