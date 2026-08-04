// Eventos — Facultad de Educación UNMSM
//
// ⚠️ CONTENIDO DE EJEMPLO: reemplaza por los eventos reales cuando los tengas.
// "fecha" en formato ISO (YYYY-MM-DD).
// "cuerpo": párrafos para la vista de detalle interna (igual criterio que noticias:
// con cuerpo -> página propia; sin cuerpo -> enlaza directo a "url").

export const eventos = [
  {
    id: "feria-virtual-posgrado-educacion",
    titulo: "Ejemplo: Feria Virtual de Posgrado en Educación",
    descripcion:
      "Conoce la oferta de maestrías y doctorados de la Facultad de Educación, con la participación de coordinadores académicos.",
    fecha: "2026-08-17",
    hora: "18:00 - 21:00",
    lugar: "Google Meet",
    imagen: null,
    cuerpo: [
      "La Unidad de Posgrado de la Facultad de Educación invita a la Feria Virtual de Posgrado, un espacio para conocer de cerca los programas de maestría y doctorado disponibles.",
      "Durante la sesión, los coordinadores académicos de cada programa presentarán el plan de estudios, la modalidad de dictado y absolverán preguntas en vivo.",
      "La actividad es gratuita y no requiere inscripción previa; el enlace de acceso se compartirá el mismo día del evento.",
    ],
    url: "https://posgradoeducacion.unmsm.edu.pe/",
  },
  {
    id: "ejemplo-sustentacion-publica-tesis",
    titulo: "Ejemplo: Sustentación pública de tesis doctoral",
    descripcion:
      "Texto de ejemplo — reemplaza esta descripción por el evento real cuando lo tengas disponible.",
    fecha: "2026-09-05",
    hora: "10:00",
    lugar: "Facultad de Educación - Auditorio",
    imagen: null,
    // Sin "cuerpo" todavía -> la tarjeta enlaza directo a esta fuente externa
    cuerpo: null,
    url: "https://posgradoeducacion.unmsm.edu.pe/",
  },
];
