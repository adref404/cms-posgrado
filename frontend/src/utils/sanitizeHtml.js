import DOMPurify from "dompurify";

// Lista blanca de etiquetas/atributos permitidos en el "cuerpo" enriquecido
// de noticias/eventos/comunicados (texto con negrita, cursiva, subtítulos,
// listas y links, escrito desde RichTextEditor). Sanitizar en el momento de
// mostrarlo protege al público de HTML/script inyectado si alguna vez una
// cuenta admin se ve comprometida o se pega contenido de origen dudoso.
const ETIQUETAS_PERMITIDAS = [
  "p", "br", "strong", "b", "em", "i", "u", "a",
  "ul", "ol", "li", "h2", "h3", "blockquote",
];

const ATRIBUTOS_PERMITIDOS = ["href", "target", "rel"];

export const sanitizeHtml = (html) =>
  DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: ETIQUETAS_PERMITIDAS,
    ALLOWED_ATTR: ATRIBUTOS_PERMITIDOS,
  });
