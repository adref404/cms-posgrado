// Normaliza texto para comparar sin importar tildes/mayúsculas — usado por
// la búsqueda del sitio (ej. "matricula" debe encontrar "Matrícula").
export const normalizeText = (texto) =>
  (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
