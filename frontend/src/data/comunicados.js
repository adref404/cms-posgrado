// Comunicados oficiales — Facultad de Educación UNMSM
//
// ⚠️ CONTENIDO DE EJEMPLO: reemplaza por los comunicados reales cuando los tengas.
//
// Un comunicado puede tener:
//   - "cuerpo" (texto propio) -> abre su página de detalle dentro del sitio.
//   - "documento" (PDF/resolución externa) sin cuerpo -> el botón lleva directo
//     al documento, sin pasar por una página de detalle vacía.
//   - Ambos -> la página de detalle muestra el texto y además un botón para
//     ver/descargar el documento adjunto.
// "urgente" resalta el comunicado con el acento guinda (úsalo con criterio,
// solo para avisos que de verdad requieren atención inmediata).

export const comunicados = [
  {
    id: "ejemplo-ampliacion-plazo-matricula-2026-2",
    titulo: "Ejemplo: Ampliación del plazo de matrícula 2026-II",
    resumen:
      "Texto de ejemplo — reemplaza este resumen por el comunicado oficial real cuando lo tengas disponible.",
    fecha: "2026-08-20",
    cuerpo: [
      "Se comunica a los estudiantes de posgrado que el plazo de matrícula del semestre 2026-II se amplía hasta la fecha indicada en el cronograma actualizado.",
      "Los pagos realizados dentro del plazo original mantienen su validez; no es necesario realizar ningún trámite adicional.",
    ],
    documento: "",
    urgente: true,
  },
  {
    id: "ejemplo-cronograma-actividades-2026",
    titulo: "Ejemplo: Cronograma de actividades académicas 2026",
    resumen:
      "Texto de ejemplo — reemplaza este resumen por el comunicado oficial real cuando lo tengas disponible.",
    fecha: "2026-01-15",
    // Sin "cuerpo" -> el botón lleva directo al documento adjunto
    cuerpo: null,
    documento:
      "https://drive.google.com/file/d/1tOTA_oj4ckMOkJ98Jjj7D_F8lODYS32w/view?usp=drive_link",
    urgente: false,
  },
];
