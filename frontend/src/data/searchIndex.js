import programasPosgrado from "./programas";
import { faqInformacionAcademica } from "./faqInformacionAcademica";
import { planaDocente } from "./planaDocente";

// Índice de búsqueda del sitio — todo lo que NO cambia en vivo (páginas
// fijas, programas, preguntas frecuentes, docentes). El contenido que sí
// cambia en vivo (Noticias/Eventos/Comunicados) se agrega aparte en
// hooks/useSiteSearch.js, trayéndolo de Supabase.
//
// Cada entrada: { titulo, descripcion, ruta, seccion }. "seccion" es la
// etiqueta que se muestra en el resultado (a qué parte del menú pertenece).

const PAGINAS = [
  { titulo: "Quiénes Somos", descripcion: "Misión, visión, valores, principios y autoridades de la Facultad de Educación.", ruta: "/nosotros/quienes-somos", seccion: "Nosotros" },
  { titulo: "Directorio Facultad de Educación", descripcion: "Directorio de autoridades y contactos de la Facultad de Educación.", ruta: "/nosotros/directorio-flch", seccion: "Nosotros" },
  { titulo: "Directorio Posgrado", descripcion: "Directorio de la Unidad de Posgrado.", ruta: "/nosotros/directorio-posgrado", seccion: "Nosotros" },
  { titulo: "Transparencia", descripcion: "Documentos y recursos institucionales descargables.", ruta: "/nosotros/documentos-recursos", seccion: "Nosotros" },

  { titulo: "Programas de Maestría", descripcion: "Listado de programas de maestría de la Facultad de Educación.", ruta: "/programas/maestria", seccion: "Programas" },
  { titulo: "Programa de Doctorado", descripcion: "Programa de doctorado en Educación.", ruta: "/programas/doctorado", seccion: "Programas" },
  { titulo: "Programas de Diplomado", descripcion: "Listado de programas de diplomado.", ruta: "/programas/diplomado", seccion: "Programas" },

  { titulo: "Cronograma Académico", descripcion: "Fechas clave del ciclo académico.", ruta: "/matricula/cronograma-academico", seccion: "Matrícula" },
  { titulo: "Cronograma de Pagos", descripcion: "Fechas y montos de matrícula y pensiones.", ruta: "/matricula/cronograma-pagos", seccion: "Matrícula" },
  { titulo: "Proceso de Matrícula", descripcion: "Pasos para matricularte en el SUM.", ruta: "/matricula/proceso-matricula", seccion: "Matrícula" },
  { titulo: "Horario de Cursos", descripcion: "Horarios de cursos por ciclo y programa.", ruta: "/matricula/horario-cursos", seccion: "Matrícula" },

  { titulo: "Plana Docente", descripcion: "Docentes de los programas de posgrado.", ruta: "/informacion-academica/docentes", seccion: "Información Académica" },
  { titulo: "Preguntas Frecuentes", descripcion: "Preguntas frecuentes sobre matrícula, horarios y pagos.", ruta: "/informacion-academica/preguntas-frecuentes", seccion: "Información Académica" },

  { titulo: "Trámites", descripcion: "Todos los trámites de grado académico.", ruta: "/tramites", seccion: "Trámites" },
  { titulo: "Grado Académico de Doctor", descripcion: "Requisitos, pasos y formatos para el trámite de grado de Doctor.", ruta: "/tramites/doctorado", seccion: "Trámites" },
  { titulo: "Grado de Magíster · Maestría 1 Año", descripcion: "Requisitos, pasos y formatos para el trámite de grado de Magíster (maestría profesional de 1 año).", ruta: "/tramites/maestria-1-anio", seccion: "Trámites" },
  { titulo: "Grado de Magíster · Maestría 2 Años", descripcion: "Requisitos, pasos y formatos para el trámite de grado de Magíster (maestría de 2 años).", ruta: "/tramites/maestria-2-anios", seccion: "Trámites" },
];

const PROGRAMAS_INDEX = programasPosgrado.map((p) => ({
  titulo: p.name,
  descripcion: p.description,
  ruta: `/programas/detalle/${p.id}`,
  seccion: `Programas · ${p.tipo}`,
}));

const FAQ_INDEX = faqInformacionAcademica.map((f) => ({
  titulo: f.pregunta,
  descripcion: f.respuesta,
  ruta: "/informacion-academica/preguntas-frecuentes",
  seccion: `Preguntas Frecuentes · ${f.categoria}`,
}));

const DOCENTES_INDEX = planaDocente.map((d) => ({
  titulo: `${d.nombres} ${d.apellidos}`,
  descripcion: [d.grado, d.categoria].filter(Boolean).join(" · "),
  ruta: "/informacion-academica/docentes",
  seccion: "Plana Docente",
}));

export const searchIndexEstatico = [
  ...PAGINAS,
  ...PROGRAMAS_INDEX,
  ...FAQ_INDEX,
  ...DOCENTES_INDEX,
];
