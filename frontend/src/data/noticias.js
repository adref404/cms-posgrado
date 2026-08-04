// Noticias — Facultad de Educación UNMSM
//
// ⚠️ CONTENIDO DE EJEMPLO: no tengo noticias reales tuyas todavía.
// Reemplaza estos elementos por las noticias reales cuando las tengas;
// el diseño (NoticiaCard, NoticiasPage, NoticiaDetallePage) no necesita cambios.
//
// "cuerpo": arreglo de párrafos para la vista de detalle interna. Si una
// noticia SÍ tiene cuerpo, la tarjeta abre su propia página dentro del sitio.
// Si NO tiene cuerpo (todavía no la redactaste), la tarjeta enlaza directo
// a "url" (la fuente externa) — así nunca hay un botón que no lleve a nada.
//
// "imagen": debe ser un link DIRECTO a la imagen, no a una página visor.
// Un link de Google Drive tipo ".../file/d/ID/view" NO sirve para <img> porque
// devuelve la página del visor de Drive, no la imagen. Conviértelo así:
//   https://lh3.googleusercontent.com/d/ID_DEL_ARCHIVO
// (el ID es la parte entre "/file/d/" y "/view" del link que copiaste).

export const noticias = [
  {
    id: "nuevo-sitio-web-facultad-educacion",
    titulo: "Facultad de Educación estrena nuevo sitio web para sus usuarios",
    resumen:
      "La Facultad renovó su portal institucional para facilitar el acceso a información académica, trámites y noticias.",
    fecha: "2026-07-10",
    imagen: "https://lh3.googleusercontent.com/d/1O1NA3afiolp88gESUNzmrDgIQ2D3VLlB",
    cuerpo: [
      "La Facultad de Educación presentó su nueva página web oficial, pensada para que autoridades, docentes, estudiantes y personal administrativo accedan de forma sencilla y rápida al contenido digital de la institución.",
      "El nuevo portal reorganiza la información de matrícula, trámites, docentes y comunicados en un solo lugar, con un diseño adaptado a celulares y computadoras.",
      "Esta es la primera etapa de un proyecto que seguirá creciendo: en los próximos meses se irán incorporando más secciones y contenidos según las necesidades de la comunidad de posgrado.",
    ],
    url: "https://www.unmsm.edu.pe/noticias-y-eventos/noticias/noticia-detalle/facultad-de-educacion-estrena-nuevo-sitio-web-para-beneficio-de-sus-usuarios",
  },
  {
    id: "ejemplo-docentes-congreso-internacional",
    titulo: "Ejemplo: Docentes del posgrado participan en congreso internacional",
    resumen:
      "Texto de ejemplo — reemplaza este resumen por la noticia real cuando la tengas disponible.",
    fecha: "2026-07-20",
    imagen: null,
    // Sin "cuerpo" todavía -> la tarjeta enlaza directo a esta fuente externa
    cuerpo: null,
    url: "https://www.unmsm.edu.pe/noticias-y-eventos/noticias",
  },
];
