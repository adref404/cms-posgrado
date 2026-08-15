// Configuración de campos por tipo de novedad — usada por
// pages/admin/AdminNovedadesPage.jsx (un solo componente genérico para
// Noticias/Eventos/Comunicados, igual patrón que TramiteProcesoPage: una
// vista reutilizable, los datos cambian).
export const ADMIN_NOVEDADES_CONFIG = {
  noticias: {
    tabla: "noticias",
    titulo: "Noticias",
    etiqueta: "noticia",
    campos: [
      { nombre: "titulo", etiqueta: "Título", tipo: "texto", requerido: true },
      { nombre: "resumen", etiqueta: "Resumen (se ve en la tarjeta)", tipo: "textarea", filas: 2, requerido: true },
      { nombre: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
      { nombre: "imagen", etiqueta: "Imagen", tipo: "imagen" },
      { nombre: "cuerpo", etiqueta: "Cuerpo de la noticia (un párrafo por línea)", tipo: "parrafos" },
      { nombre: "url", etiqueta: "Link externo (opcional, si no hay cuerpo propio)", tipo: "texto" },
    ],
  },
  eventos: {
    tabla: "eventos",
    titulo: "Eventos",
    etiqueta: "evento",
    campos: [
      { nombre: "titulo", etiqueta: "Título", tipo: "texto", requerido: true },
      { nombre: "descripcion", etiqueta: "Descripción corta", tipo: "textarea", filas: 2, requerido: true },
      { nombre: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
      { nombre: "hora", etiqueta: "Hora (ej: 18:00 - 21:00)", tipo: "texto" },
      { nombre: "lugar", etiqueta: "Lugar", tipo: "texto" },
      { nombre: "imagen", etiqueta: "Imagen", tipo: "imagen" },
      { nombre: "cuerpo", etiqueta: "Cuerpo del evento (un párrafo por línea)", tipo: "parrafos" },
      { nombre: "url", etiqueta: "Link externo / inscripción (opcional)", tipo: "texto" },
    ],
  },
  comunicados: {
    tabla: "comunicados",
    titulo: "Comunicados",
    etiqueta: "comunicado",
    campos: [
      { nombre: "titulo", etiqueta: "Título", tipo: "texto", requerido: true },
      { nombre: "resumen", etiqueta: "Resumen (se ve en la tarjeta)", tipo: "textarea", filas: 2, requerido: true },
      { nombre: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
      { nombre: "cuerpo", etiqueta: "Cuerpo del comunicado (un párrafo por línea)", tipo: "parrafos" },
      { nombre: "documento", etiqueta: "Link a documento adjunto (Drive/PDF, opcional)", tipo: "texto" },
      { nombre: "urgente", etiqueta: "Marcar como urgente", tipo: "check" },
    ],
  },
};
