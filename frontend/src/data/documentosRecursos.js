// Documentos y Recursos — agrupados por categoría.
//
// Para agregar contenido nuevo:
//   1. Si es una categoría nueva, agrega otro objeto al arreglo con su "titulo"
//      y un arreglo "documentos" vacío.
//   2. Para agregar un documento, agrégalo dentro de "documentos" de la
//      categoría correspondiente. El diseño (tarjetas, ícono, buscador) se
//      adapta solo, no hay que tocar ningún componente.
//
// Cada documento admite:
//   titulo:      texto que se muestra en negrita
//   descripcion: (opcional) texto corto debajo del título
//   tipo:        "pdf"    -> se muestra como "Descargar PDF"
//                "docx"   -> se muestra como "Ver documento" (Word/Google Docs)
//                "enlace" -> se muestra como "Visitar enlace"
//   url:         destino del enlace o archivo
//
// Ejemplo de documento tipo "pdf":
// {
//   titulo: "Reglamento General de Estudios de Posgrado",
//   descripcion: "Vigente desde 2024",
//   tipo: "pdf",
//   url: "https://.../reglamento-posgrado.pdf",
// }

export const documentosRecursos = [
  {
    titulo: "Plataformas y Trámites",
    documentos: [
      {
        titulo: "Sistema Único de Matrícula (SUM)",
        descripcion: "Matrícula, horarios y consulta de notas",
        tipo: "enlace",
        url: "https://sum.unmsm.edu.pe/alumnoWebSum/v2/inicio",
      },
      {
        titulo: "San Market UNMSM",
        descripcion: "Pago de matrícula, pensiones y derechos",
        tipo: "enlace",
        url: "https://sanmarket.unmsm.edu.pe/",
      },
      {
        titulo: "Red Telemática",
        descripcion: "Sitio de la Red Telemática de la UNMSM",
        tipo: "enlace",
        url: "https://telematica.unmsm.edu.pe/",
      },
      {
        titulo: "MAT",
        descripcion: "Módulo de Atención de Trámites y Documentaciones",
        tipo: "enlace",
        url: "https://tramiteonline.unmsm.edu.pe/sgdfd/mat/tramites/solicitud",
      },
    ],
  },
  {
    titulo: "Reglamentos",
    documentos: [
      {
        titulo: "Reglamento General de Estudios de Posgrado (vigente 2024)",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1JznymSUnSjCbeK7l0g7WU_DwWhAIaZ0p/view?usp=drive_link",
      },
      {
        titulo: "Reglamento General de Matrícula de Posgrado (2018-2_2023)",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1K0A_ETJtEQXisJPtl6psQbGQcOV7k0Pc/view?usp=drive_link",
      },
      {
        titulo: "Reglamento General de Matrícula de Posgrado (2009_2008-1)",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1SpqYkPY_IubE6KE-FsJu9hGvvvYiZlUx/view?usp=drive_link",
      },
      {
        titulo: "Reglamento General de Matrícula de Posgrado (2000–2008)",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1tPfY9A_boc9PhUkRA5dsBxM6uB-RWl38/view?usp=drive_link",
      },
      {
        titulo: "Resolución Rectiral sobre la Segunda Disposición Transitoria",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1kI1sqU1Bjxfgd5_jOuRTfvnIzGnCi2nl/view?usp=drive_link",
      },
      {
        titulo: "Modificación del Artículo 14º inc. c) y el Artículo 65º inc. b) del Reglamento General de Estudios de Posgrado – 2018",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1QtSqK1tT8wmpgXZiTIQOOHptEfj1Qnqx/view?usp=drive_link",
      },
      {
        titulo: "Reglamento-de-Idiomas",
        descripcion: "REGLAMENTOS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1wHXGFeGImLdnq5_1YeLJevpXxY5yTGj7/view?usp=drive_link",
      },
    ],
  },
  {
    titulo: "Directivas",
    documentos: [
      {
        titulo: "DIRECTIVA DE ORIGINALIDAD Y SIMILITUD DE TRABAJOS ACADÉMICOS, DE INVESTIGACIÓN Y PRODUCCIÓN INTELECTUAL DE LA UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS",
        descripcion: "DIRECTIVAS",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/19oYIaWMSt2Ia23OXhnqqCX3EOKbq0s_v/view?usp=drive_link",
      },
    ],
  },
  {
    titulo: "Horarios",
    documentos: [
      {
        titulo: "Programación de EACE 2026-1",
        descripcion: "HORARIOS",
        tipo: "docx",
        url: "https://docs.google.com/document/d/1MiRiUUrEim-Xy60repbpIZ9_QcCAPSFi/edit?usp=drive_link&ouid=106052797955184247109&rtpof=true&sd=true",
      },
      {
        titulo: "Progrmación Didáctica de la Matemática 2026-1",
        descripcion: "HORARIOS",
        tipo: "docx",
        url: "https://docs.google.com/document/d/1oSqE2g5htnl71rO1Mevcr-nYTOwqNxen/edit?usp=drive_link&ouid=106052797955184247109&rtpof=true&sd=true",
      },
      {
        titulo: "Programación de Didáctica de la Comunicación 2026-1",
        descripcion: "HORARIOS",
        tipo: "docx",
        url: "https://docs.google.com/document/d/1jTAR0AHpE6Zfu0YEmikHM5aNsxGpPq29/edit?usp=drive_link&ouid=106052797955184247109&rtpof=true&sd=true",
      },
      {
        titulo: "Programación Doctorado 2026-1",
        descripcion: "HORARIOS",
        tipo: "docx",
        url: "https://docs.google.com/document/d/1GzXabKW4Xa0goV10CTsCEBDwJl-4I1ho/edit?usp=drive_link&ouid=106052797955184247109&rtpof=true&sd=true",
      },
      {
        titulo: "Programación Gestión de la Educación 2026-1",
        descripcion: "HORARIOS",
        tipo: "docx",
        url: "https://docs.google.com/document/d/1qMVFhf4E5Scjz3de755m33PvhgAzC7nE/edit?usp=drive_link&ouid=106052797955184247109&rtpof=true&sd=true",
      },
      {
        titulo: "Programación 2026-1 - Docencia Universitaria",
        descripcion: "HORARIOS",
        tipo: "docx",
        url: "https://docs.google.com/document/d/1whPkYcFXzVbPBW7GSa3nuXU0Vt4CPSzx/edit?usp=drive_link&ouid=106052797955184247109&rtpof=true&sd=true",
      },
    ],
  },
  {
    titulo: "Cronograma de Actividades Académicas",
    documentos: [
      {
        titulo: "Resolución Rectoral de Cronograma de Actividades 2026",
        descripcion: "RR",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1tOTA_oj4ckMOkJ98Jjj7D_F8lODYS32w/view?usp=drive_link",
      },
      {
        titulo: "Cronograma de Actividades Académicas de Posgrado, 2026",
        descripcion: "RR",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1SsNICLSj5SayckUlTFgThyfxqSurNNCj/view?usp=drive_link",
      },
    ],
  },
];
