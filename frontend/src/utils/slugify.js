// Convierte un título en un slug URL-safe (sin tildes, minúsculas, guiones),
// usado como identificador público de noticias/eventos/comunicados en vez
// del uuid interno de la base de datos. Ej: "Feria Virtual 2026" ->
// "feria-virtual-2026".
export const slugify = (texto) =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
