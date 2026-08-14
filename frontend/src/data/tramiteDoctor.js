import { MdDescription, MdHowToReg, MdGavel, MdCloudUpload } from "react-icons/md";

// Trámite: Grado Académico de Doctor — Facultad de Educación, UNMSM.
// Contenido real del procedimiento oficial de la Unidad de Posgrado (no es
// contenido de ejemplo). Los "formatos" tienen "url: null" a propósito: son
// los documentos que viven en Drive — complétalos con el link real cuando
// los tengas; mientras tanto la vista los marca como "Pendiente" en vez de
// simular un botón que no lleva a ningún lado.

export const director = {
  nombre: "Dr. Miguel Gerardo Inga Arias",
  cargo: "Director de la Unidad de Posgrado",
};

export const portalMat = {
  nombre: "Módulo de Atención Trámite (MAT)",
  descripcion:
    "Toda la documentación debe presentarse consolidada en formato PDF a través de la plataforma virtual.",
  url: "https://tramiteonline.unmsm.edu.pe/sgdfd/mat/tramites/solicitud",
};

export const pasosDoctor = [
  {
    id: 1,
    icono: MdDescription,
    tituloCorto: "Inscripción de Proyecto y Asesor",
    etapa: "Etapa 01",
    titulo: "Inscripción del Proyecto de Tesis y Nombramiento de Asesor",
    descripcion:
      "Marca los documentos que ya tienes listos para controlar tu expediente digital antes de remitirlos vía el Módulo de Atención Trámite (MAT).",
    asuntoFut: "Inscripción del proyecto de tesis y nombramiento de asesor(a)",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle:
          "Completado con datos del Director de la Unidad de Posgrado (Dr. Miguel Gerardo Inga Arias) indicando el asunto correspondiente.",
      },
      {
        titulo: "Proyecto de Tesis",
        detalle: "Documento completo estructurado según la guía académica de la Facultad de Educación.",
      },
      {
        titulo: "Ficha de Inscripción y Declaración Jurada de Datos",
        detalle: "Formatos institucionales debidamente completados y firmados.",
      },
      {
        titulo: "DNI vigente",
        detalle: "Los datos personales deben coincidir exactamente con la partida de nacimiento y el SUM.",
      },
      {
        titulo: "Partida de Nacimiento",
        detalle: "Legible; verificación obligatoria de nombres y apellidos coincidentes con el DNI.",
      },
      {
        titulo: "Grado Académico de Magíster",
        detalle: "Escaneado de ambas caras en un solo archivo PDF.",
      },
      {
        titulo: "Ficha de Registro SUNEDU del Grado de Maestría",
        detalle: "Constancia oficial emitida por el Registro Nacional de Grados y Títulos de SUNEDU.",
      },
    ],
    avisos: [
      {
        tono: "guinda",
        titulo: "Verificación previa obligatoria",
        texto:
          "Para garantizar la fluidez de tu proceso, es indispensable revisar y corregir tus datos (nombres y apellidos) antes de solicitar el Paso 2 (Expedito y Jurados Informantes).",
      },
    ],
    formatos: [
      { nombre: "FUT - Solicitud", tipo: "pdf", url: 'https://drive.google.com/file/d/1s4mO6XA9FIwLJR-_D1o58860hbeGOvP1/view?usp=drive_link' },
      { nombre: "Carta de Aceptación de Asesoría", tipo: "word", url: 'https://docs.google.com/document/d/1T2ipLhS5J-y9e8AaLZsbvEPef_Djo8WH/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada - Datos", tipo: "word", url: 'https://docs.google.com/document/d/1wUA_6GFoSfuh6dYqn2uadFAJOXtgxBlG/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Ficha de Inscripción - Formato", tipo: "word", url: 'https://docs.google.com/document/d/1ofbR1iqXxSPlqROn0hHE_NnXmq32GlZs/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Guía completa del Paso 1", tipo: "pdf", url: 'https://drive.google.com/file/d/1KJVjJ_FC32-r_7xYd4Ql-5iubpHsCKIy/view?usp=drive_link' },
    ],
  },
  {
    id: 2,
    icono: MdHowToReg,
    tituloCorto: "Declaración de Expedito y Jurados",
    etapa: "Etapa 02",
    titulo: "Declaración de Expedito y Jurados Informantes",
    descripcion:
      "Revisa exhaustivamente cada uno de los 9 requisitos solicitados. La tesis y la verificación de indexación deben adjuntarse obligatoriamente en Word y PDF.",
    asuntoFut: "Declaración de expedito y nombramiento de jurados informantes",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle:
          "Dirigido al Director de la Unidad de Posgrado. Asunto: Declaración de Expedito y Jurados Informantes.",
      },
      {
        titulo: "Informe Favorable del Asesor",
        detalle: "Carta/informe emitido por el asesor dando conformidad a la tesis final para revisión de jurados.",
      },
      {
        titulo: "Tesis completa (Word y PDF)",
        detalle: "Aprobada previamente por el asesor. Presentar obligatoriamente en ambos formatos.",
      },
      {
        titulo: "Tesis procesada por Turnitin (similitud ≤ 20%)",
        detalle: "El informe antiplagio no debe superar el 20% de similitud total.",
      },
      {
        titulo: "Certificado de Similitud emitido por el asesor",
        detalle: "Firmado, de preferencia de manera física, por el asesor designado.",
      },
      {
        titulo: "Declaraciones Juradas triples",
        detalle:
          "Declaración jurada de: a) veracidad documentaria, b) no adeudar dinero, c) no adeudar libros ni material bibliográfico. Nombres y DNI deben coincidir exactamente.",
      },
      {
        titulo: "Acreditación de artículo de investigación",
        detalle:
          "Constancia/carta de aceptación o publicación en revista indexada externa o revista institucional del Fondo Editorial UNMSM (con filiación UNMSM). Exceptuados ingresantes hasta 2008-2.",
      },
      {
        titulo: "Formato de Verificación de Indexación (Word y PDF)",
        detalle:
          "Verificación en Web of Science, Scopus, SciELO, Latindex 2.0 o revistas acreditadas UNMSM. Obligatorio para ingresantes 2009-1 en adelante.",
      },
      {
        titulo: "Certificados de dominio de idiomas",
        detalle:
          "Certificación de 2 idiomas extranjeros, o 1 extranjero (inglés) + 1 nativo (mínimo nivel Básico A2). Emitidos por la Unidad de Idiomas DGEP o FLCH UNMSM.",
      },
    ],
    avisos: [
      {
        tono: "blue",
        titulo: "Resolución Rectoral N.° 000532-2026-R/UNMSM",
        texto:
          "Se amplía hasta el 30 de diciembre del 2026 la validez de los Certificados de Dominio de Idioma Extranjero o Nativo emitidos por la Oficina de Suficiencia de Idiomas de la FLCH o de la DGEP para egresados en proceso de grado.",
      },
      {
        tono: "blue",
        titulo: "Graduados extranjeros y lengua nativa",
        texto:
          "Los graduados extranjeros deben adjuntar Resolución de Reconocimiento de Grado. La exigencia de lengua nativa aplica según la Ley Universitaria N.° 30220 para ingresantes a partir del periodo 2014-2.",
      },
    ],
    formatos: [
      { nombre: "Declaración Jurada de no adeudar dinero", tipo: "word", url: 'https://docs.google.com/document/d/1bZYZthG_XbEHRb6hmNsko_yfXs6oZVPX/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada de no adeudar libros", tipo: "word", url: 'https://docs.google.com/document/d/1G-qYbdDrV6Ttf0lGlBhKiYf2fGZWqfXW/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada de veracidad documentaria", tipo: "word", url: 'https://docs.google.com/document/d/1lhD1Rslnnnw20ujbqG2604rm0oCwg9aF/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Formato de similitud (Turnitin)", tipo: "word", url: 'https://docs.google.com/document/d/1jvmu-ZhQJZcdLjYkPD2KntVRhF3egOpf/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Formato de verificación de indexación", tipo: "word", url: 'https://docs.google.com/document/d/1ylnSDtZBDg2nl0mmcBIm9d4se-0P7ppF/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Guía completa del Paso 2", tipo: "pdf", url: 'https://drive.google.com/file/d/1sXy0MUqjyvlrmSkVyDKgVnm4PFYneiA0/view?usp=drive_link' },
    ],
  },
  {
    id: 3,
    icono: MdGavel,
    tituloCorto: "Sustentación y Pagos",
    etapa: "Etapa 03",
    titulo: "Fecha de Sustentación y Jurado Examinador",
    descripcion: "",
    asuntoFut: "Fecha de sustentación y jurado examinador",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle: "Asunto: Fecha de sustentación y jurado examinador.",
      },
      {
        titulo: "Tesis final en formato Word y PDF",
        detalle: "Versión definitiva con correcciones levantadas.",
      },
      {
        titulo: "Tesis procesada por Turnitin con porcentaje de similitud",
        detalle: "Reporte completo generado antes de la sustentación.",
      },
      {
        titulo: "Certificado de Similitud",
        detalle: "De preferencia con firma física del asesor.",
      },
      {
        titulo: "DNI vigente",
        detalle: "Copia legible por ambas caras.",
      },
      {
        titulo: "Informes favorables de los jurados informantes",
        detalle: "Aprobaciones emitidas por la comisión dictaminadora.",
      },
      {
        titulo: "Recibos de pago por derecho de grado y diploma",
        detalle: "Comprobantes oficiales de pago San Market adjuntos.",
      },
    ],
    avisos: [],
    inversion: {
      items: [
        { concepto: "Grado de Doctor (Facultad)", detalle: "Derecho de tramitación", monto: "S/ 2,995.00" },
        { concepto: "Expedición de Diploma", detalle: "Emisión física / digital", monto: "S/ 1,200.00" },
      ],
      total: "S/ 4,195.00",
      pagos: [
        {
          label: "Pagar Grado de Doctor (S/ 2,995)",
          url: "https://sanmarket.unmsm.edu.pe/#/tramites/f7b51fd4-3ebe-473f-92a9-7b697aa9e326",
        },
        {
          label: "Pagar Expedición de Diploma (S/ 1,200)",
          url: "https://sanmarket.unmsm.edu.pe/#/tramites/1cfe37a2-d74f-49c8-bc8d-da3867562242",
        },
      ],
    },
    formatos: [{ nombre: "FUT - Solicitud sustentación", tipo: "pdf", url: 'https://drive.google.com/file/d/11gb_03DESppixrHtdfuSab4Am7zEG0Zc/view?usp=drive_link' }],
  },
  {
    id: 4,
    icono: MdCloudUpload,
    tituloCorto: "Cybertesis y Decanato",
    etapa: "Etapa 04 · Final",
    titulo: "Envío de Expediente a Decanato y Cybertesis",
    descripcion: "",
    asuntoFut: "Aprobación de expediente para Decanato y Cybertesis",
    requisitos: [
      {
        titulo: "Autorización firmada para publicación de tesis",
        detalle: "Formato firmado autorizando el depósito en el Repositorio Institucional Cybertesis UNMSM.",
      },
      {
        titulo: "Ficha técnica académica (línea, duración, ORCID)",
        detalle:
          "Informar la línea de investigación según R.R. N.° 00017-R-14, tiempo de duración del trabajo y código ORCID del graduando.",
      },
      {
        titulo: "Tesis en formato Word y PDF",
        detalle: "Archivo definitivo integrado con carátula y preliminares reglamentarios.",
      },
      {
        titulo: "Declaración Jurada de Datos Étnicos",
        detalle: "Formato oficial de autoidentificación étnica.",
      },
      {
        titulo: "Fotografía digital de estudio",
        detalle:
          "240 x 288 px, formato JPG, color RGB, 300 DPI, traje formal oscuro, fondo blanco, peso entre 5KB y 49KB. No escaneadas ni tomadas con celular.",
        tieneEspecificacionFoto: true,
      },
      {
        titulo: "Diploma de Grado de Magíster (PDF)",
        detalle: "Copia digital clara en formato PDF.",
      },
      {
        titulo: "DNI nítido por ambas caras (PDF)",
        detalle: "Documento vigente escaneado nítidamente.",
      },
    ],
    avisos: [
      {
        tono: "blue",
        titulo: "Proceso previo Cybertesis",
        texto:
          "Antes del envío oficial a Decanato, la tesis debe quedar registrada en el repositorio Cybertesis. Se solicita la información anterior documentada por correo electrónico.",
      },
      {
        tono: "green",
        titulo: "Generación de expediente",
        texto:
          "Cuando la tesis sea publicada en Cybertesis, se procede a generar un número de expediente final para el trámite del diploma.",
      },
    ],
    formatos: [
      { nombre: "Autorización Cybertesis", tipo: "word", url: 'https://docs.google.com/document/d/1Kl1a0XsROjOMQw-RoEQBWYj6VrMSrqT_/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true'  },
      { nombre: "Declaración Jurada - Datos étnicos", tipo: "word", url: 'https://docs.google.com/document/d/1jE-myQIF-l8KjnCRyFG6183QgqqOGsj4/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Indicaciones para fotos de grados", tipo: "pdf", url: 'https://drive.google.com/file/d/16e1H426oBc--KuUY4UoaL-ytyd6iDYfO/view?usp=drive_link' },
      { nombre: "R.R. N.° 00017 - Líneas de investigación", tipo: "pdf", url: 'https://drive.google.com/file/d/1uh7RoEAoHMzf8_6ezPjWoEzVawBce6GR/view?usp=drive_link' },
      { nombre: "Guía informativa del Paso 4", tipo: "word", url: 'https://docs.google.com/document/d/1cQhWDg8DgOqDxq9bOV_E4Y3NM2U8oN0f/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
    ],
  },
];

// Aviso oficial de la Unidad de Posgrado (Lima, 21 de enero del 2021) con las
// especificaciones completas de la foto para el diploma digital — se muestra
// en un modal desde el requisito "Fotografía digital de estudio" (Paso 4).
export const avisoFotoGrados = {
  unidad: "Unidad de Posgrado",
  fecha: "Lima, 21 de enero del 2021",
  intro:
    "Se comunica a los graduandos que vienen realizando su trámite de Grado de Maestría y Doctorado, tendrán en consideración las indicaciones dadas por la Unidad de Matrícula, Registros Académicos, Grados y Títulos de la Facultad de Educación, lo siguiente:",
  secciones: [
    {
      titulo: "Unidad de Grados y Títulos",
      texto:
        "Para el trámite de los diplomas digitales de los grados y títulos, las fotos que deberán adjuntar los interesados a sus expedientes de trámite deben cumplir estrictamente con las siguientes características:",
      items: [
        "Foto de estudio fotográfico (no escaneadas, ni borrosas); las fotos que no son de estudio fotográfico no se recepcionarán.",
        "Foto tamaño pasaporte, de hombros hacia arriba.",
        "Mujeres con saco oscuro y blusa con cuello (de preferencia blanca).",
        "Hombres terno o saco oscuro, camisa y corbata.",
        "Fondo blanco y sin lentes.",
      ],
    },
    {
      titulo: "Características técnicas",
      items: [
        "Espacio de color: Color RGB.",
        "Medidas de la foto: 240 x 288 px, en JPG.",
        "Resolución X: 300 / Resolución Y: 300 píxeles/pulgada.",
        "El peso de la foto debe estar entre 5kb y 49kb.",
        "En el nombre del archivo de la fotografía deberá indicar el código del alumno o nombre completo.",
      ],
    },
  ],
};

export const faqDoctor = [
  {
    pregunta: "¿Cuál es la vigencia de los certificados de idioma extranjero o nativo?",
    respuesta:
      "Según la R.R. N.° 000532-2026-R/UNMSM, se ha ampliado hasta el 30 de diciembre del 2026 la validez de los Certificados de Dominio de Idioma Extranjero o Nativo emitidos por la Oficina de Exámenes de Suficiencia de la FLCH o por la Unidad de Idiomas de la DGEP para egresados en proceso de grado.",
  },
  {
    pregunta: "¿Qué porcentaje de similitud en Turnitin está permitido?",
    respuesta:
      "La tesis debe contar con un porcentaje de similitud menor o igual al 20%. Este reporte debe estar acompañado del certificado correspondiente, firmado de preferencia de forma física por tu asesor.",
  },
  {
    pregunta: "¿Cuáles son las revistas válidas para la publicación del artículo científico?",
    respuesta:
      "Aplica para ingresantes desde el periodo 2009-1 en adelante. Las revistas deben estar indexadas en Web of Science, Scopus, SciELO, Latindex 2.0, o ser revistas de investigación institucionales acreditadas por el Fondo Editorial de la UNMSM. Los ingresantes hasta el periodo 2008-2 quedan exceptuados.",
  },
];
