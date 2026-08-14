import { MdDescription, MdHowToReg, MdGavel, MdCloudUpload } from "react-icons/md";

// Trámite: Grado Académico de Magíster — Maestría de 2 Años, Facultad de
// Educación UNMSM. Contenido real del procedimiento oficial de la Unidad de
// Posgrado. Los "formatos" tienen "url: null" a propósito: son documentos
// que viven en Drive — complétalos con el link real cuando los tengas.

// portalMat y avisoFotoGrados son comunes a todos los trámites de grado
// (Maestría y Doctorado comparten el mismo Módulo de Atención de Trámite y
// el mismo aviso oficial de especificaciones de foto).
export { portalMat, avisoFotoGrados } from "./tramiteDoctor.js";

export const pasosMaestria2Anios = [
  {
    id: 1,
    icono: MdDescription,
    tituloCorto: "Inscripción de Proyecto y Asesor",
    etapa: "Etapa 01",
    titulo: "Inscripción del Proyecto de Tesis y Nombramiento de Asesor",
    descripcion:
      "Marca los documentos que ya tienes listos para controlar tu expediente digital. Toda la documentación de este paso debe presentarse en formato PDF y remitirse vía el Módulo de Atención Trámite (MAT).",
    asuntoFut: "Inscripción del proyecto de tesis y nombramiento de asesor(a)",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle:
          "Completado con datos del Director de la Unidad de Posgrado (Dr. Miguel Gerardo Inga Arias) indicando el asunto correspondiente.",
      },
      {
        titulo: "Proyecto de tesis",
        detalle: "Documento completo estructurado según la guía académica de la Facultad de Educación.",
      },
      {
        titulo: "Ficha de Inscripción y Declaración Jurada de Datos",
        detalle: "Debidamente llenados y firmados por el/la solicitante.",
      },
      {
        titulo: "DNI vigente",
        detalle: "Los datos deben coincidir exactamente con la partida de nacimiento y el SUM.",
      },
      {
        titulo: "Partida de Nacimiento",
        detalle: "Los datos deben coincidir con el DNI.",
      },
      {
        titulo: "Grado Académico de Bachiller",
        detalle: "Escaneado de ambas caras en un solo archivo PDF.",
      },
      {
        titulo: "Ficha de Registro SUNEDU del Grado de Bachiller",
        detalle: "Constancia emitida por el Registro Nacional de Grados y Títulos de SUNEDU.",
      },
    ],
    avisos: [
      {
        tono: "guinda",
        titulo: "Verificación previa obligatoria",
        texto:
          "A fin de garantizar la fluidez de tu proceso, es importante revisar y corregir tus datos (nombres y apellidos) antes de proceder con el Paso 2: Expedito y Jurados Informantes.",
      },
    ],
    formatos: [
      { nombre: "FUT - Solicitud", tipo: "pdf", url: 'https://drive.google.com/file/d/1NJgwc2zdQMwhxJ0-TQpMrxLZNoiHkbIk/view?usp=drive_link' },
      { nombre: "Carta de Aceptación de Asesoría", tipo: "word", url: 'https://docs.google.com/document/d/1jmf4c2b-Y6JrYUgcH_2-J3I0qXBqTnZo/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true'  },
      { nombre: "Declaración Jurada - Datos", tipo: "word", url: 'https://docs.google.com/document/d/1ROKhA69CO6xeU1Jv76-UpDRQjz9G1LeB/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Ficha de Inscripción - Formato", tipo: "word", url: 'https://docs.google.com/document/d/1zntgcWOe-yacuj7GrcyJnLKJy2qgIpPc/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Guía del Paso 1 - Inscripción Magíster", tipo: "pdf", url: 'https://drive.google.com/file/d/1i6C0dbAjL1uxoj451IDkH_Nis_V1MYZx/view?usp=drive_link' },
    ],
  },
  {
    id: 2,
    icono: MdHowToReg,
    tituloCorto: "Declaración de Expedito y Jurados",
    etapa: "Etapa 02",
    titulo: "Declaración de Expedito y Jurados Informantes",
    descripcion:
      "Presenta todos los requisitos en formato PDF, a excepción de la tesis aprobada y el formato de verificación de indexación, que deben remitirse obligatoriamente en Word y PDF.",
    asuntoFut: "Declaración de expedito y nombramiento de jurados informantes",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle: "Dirigido a la Unidad de Posgrado. Asunto: Declaración de Expedito y Jurados Informantes.",
      },
      {
        titulo: "Informe Favorable del Asesor",
        detalle: "Carta u oficio del asesor dando conformidad a la tesis final.",
      },
      {
        titulo: "Tesis",
        detalle: "Aprobada previamente por el asesor.",
      },
      {
        titulo: "Tesis procesada por Turnitin (similitud ≤ 20%)",
        detalle: "El porcentaje de similitud debe ser menor o igual al 20%.",
      },
      {
        titulo: "Certificado de Similitud emitido y firmado por el Asesor",
        detalle: "De preferencia firmado de manera física.",
      },
      {
        titulo: "Declaración Jurada de veracidad, no adeudar dinero y no adeudar libros",
        detalle:
          "Es indispensable que los nombres, apellidos completos, dirección y número de documento coincidan exactamente con el DNI.",
      },
      {
        titulo: "Constancia o carta de aceptación/publicación de artículo de investigación",
        detalle:
          "Relacionado con el tema de tesis, en revista externa de la especialidad indexada o revista institucional del Fondo Editorial UNMSM, con filiación UNMSM.",
      },
      {
        titulo: "Formato de Verificación de Indexación de la Revista",
        detalle:
          "Web of Science, Scopus, SciELO, Latindex 2.0 o revistas institucionales acreditadas por el Fondo Editorial UNMSM. Obligatorio para ingresantes 2009-1 en adelante.",
      },
      {
        titulo: "Certificado original de dominio de un idioma extranjero o nativo",
        detalle:
          "De preferencia inglés, nivel básico A2. Emitido por la Oficina de Exámenes de Suficiencia en Idiomas de la FLCH o por la Unidad de Idiomas de la DGEP UNMSM.",
      },
    ],
    avisos: [
      {
        tono: "guinda",
        titulo: "Vigencia del certificado de idiomas",
        texto:
          "El certificado de examen de suficiencia de idiomas no debe tener una antigüedad mayor de tres (3) años al momento de solicitar el expedito.",
      },
      {
        tono: "blue",
        titulo: "Resolución Rectoral N.° 000532-2026-R/UNMSM",
        texto:
          "Se amplía hasta el 30 de diciembre del 2026 la validez de los Certificados de Dominio de Idioma Extranjero o Nativo emitidos por la Oficina de Exámenes de Suficiencia en Idiomas de la FLCH o por la Unidad de Idiomas de la DGEP, para los egresados de posgrado en proceso de obtención de sus grados académicos de Doctor o Magíster.",
      },
      {
        tono: "blue",
        titulo: "Notas importantes",
        texto:
          "Los ingresantes hasta el periodo 2008-2 quedan exceptuados de presentar la publicación del artículo científico. Para el caso de graduados extranjeros, deberán adjuntar además la Resolución de Reconocimiento de Grado. La exigencia de lengua nativa aplica según la Ley Universitaria N.° 30220 para ingresantes a partir de 2014-2.",
      },
    ],
    formatos: [
      { nombre: "Declaración Jurada de no adeudar dinero", tipo: "word", url: 'https://docs.google.com/document/d/1XLlgtDx_aVBKzfLff3d2siOjTLIj9Y0x/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada de no adeudar libros", tipo: "word", url: 'https://docs.google.com/document/d/1kFucFZewI4WSgPiIx2thEbuSnzxA3-pN/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada de veracidad documentaria", tipo: "word", url: 'https://docs.google.com/document/d/14fxkaia6U-3ROOExxcPdIEIEj8xFtW08/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Formato de similitud (Turnitin)", tipo: "word", url: 'https://docs.google.com/document/d/1NoB9T-2rjqQCH4S5IVg3I5BH4WGOzIA0/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Formato de verificación de indexación", tipo: "word", url: 'https://docs.google.com/document/d/1Olo_Qf0EMuDeZEoyjR_qErSLCpm-WTaO/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "FUT - Solicitud (Paso 2)", tipo: "pdf", url: 'https://drive.google.com/file/d/1WM3dbES5nb8ASqepZFPgSNFspzo1CvPq/view?usp=drive_link' },
      { nombre: "Guía del Paso 2 - Expedito y Jurados Informantes", tipo: "pdf", url: 'https://drive.google.com/file/d/10D7oRM2bjPyHc-Qfjc4a67tZEXD8jkvo/view?usp=drive_link' },
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
        titulo: "Tesis final en Word y PDF",
        detalle: "Versión definitiva con correcciones levantadas.",
      },
      {
        titulo: "Tesis procesada por Turnitin con porcentaje de similitud",
        detalle: "Reporte generado antes de la sustentación.",
      },
      {
        titulo: "Certificado de Similitud",
        detalle: "De preferencia firmado de manera física.",
      },
      {
        titulo: "DNI vigente",
        detalle: "Copia legible de ambas caras.",
      },
      {
        titulo: "Informes favorables de los jurados informantes",
        detalle: "Dictámenes aprobatorios de los jurados designados.",
      },
      {
        titulo: "Recibos de pago por derecho de grado y diploma",
        detalle: "Comprobantes oficiales emitidos por la plataforma San Market UNMSM.",
      },
    ],
    avisos: [],
    inversion: {
      items: [
        { concepto: "Grado de Magíster (Facultad)", detalle: "Derecho de tramitación", monto: "S/ 1,555.00" },
        { concepto: "Expedición de Diploma de Magíster", detalle: "Emisión de diploma académico", monto: "S/ 700.00" },
      ],
      total: "S/ 2,255.00",
      pagos: [
        {
          label: "Pagar Grado de Magíster (S/ 1,555)",
          url: "https://sanmarket.unmsm.edu.pe/#/tramites/48150104-dd77-41e6-84bd-41e3b4e824f4",
        },
        {
          label: "Pagar Expedición de Diploma (S/ 700)",
          url: "https://sanmarket.unmsm.edu.pe/#/tramites/5fbbd535-bde3-450d-8719-1ef7c6e05d10",
        },
      ],
    },
    formatos: [
      { nombre: "FUT - Solicitud (Paso 3)", tipo: "pdf", url: 'https://drive.google.com/file/d/1CrUj0ELnj25Ks9Zb79PXIAQlKafUK3tG/view?usp=drive_link' },
      { nombre: "Guía del Paso 3 - Sustentación y Jurado Examinador", tipo: "pdf", url: 'https://drive.google.com/file/d/1xpbM5OgKUiEQFfUVn732uBvDUSA-rlW7/view?usp=drive_link' },
    ],
  },
  {
    id: 4,
    icono: MdCloudUpload,
    tituloCorto: "Cybertesis y Decanato",
    etapa: "Etapa 04 · Final",
    titulo: "Envío de Expediente a Decanato y Cybertesis",
    descripcion:
      "Previo al envío del expediente, la tesis debe estar publicada en Cybertesis. Para ello se te solicitará por correo electrónico la siguiente información.",
    asuntoFut: "Aprobación de expediente para Decanato y Cybertesis",
    requisitos: [
      {
        titulo: "Autorización firmada para publicación de tesis",
        detalle: "Formato firmado autorizando el depósito en el Repositorio Institucional Cybertesis UNMSM.",
      },
      {
        titulo: "Ficha técnica académica (línea, duración, ORCID)",
        detalle:
          "Informar la línea de investigación según R.R. N.° 00017-R-14, el tiempo de duración de la tesis y el ORCID.",
      },
      {
        titulo: "Tesis en formato Word y PDF",
        detalle: "Archivo definitivo e integrado.",
      },
      {
        titulo: "Declaración Jurada de Datos Étnicos",
        detalle: "Formato oficial de autoidentificación étnica.",
      },
      {
        titulo: "Fotografía digital de estudio",
        detalle:
          "Tomada en un estudio fotográfico (240 x 288 px, JPG, RGB, 300 DPI, traje formal oscuro, fondo blanco, 5KB-49KB). No escaneadas ni tomadas con celular.",
        tieneEspecificacionFoto: true,
      },
      {
        titulo: "Diploma de Grado de Bachiller (o Magíster, según corresponda)",
        detalle: "Copia digital escaneada en formato PDF.",
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
          "Cuando la tesis esté publicada en Cybertesis, se procede a generar el número de expediente, notificándote por correo electrónico con las indicaciones correspondientes para el seguimiento.",
      },
    ],
    formatos: [
      { nombre: "Autorización Cybertesis", tipo: "word", url: 'https://docs.google.com/document/d/1u_OldYxHzTjjqrXEsqtY0TeT2NRTCr0v/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada - Datos étnicos", tipo: "word", url: 'https://docs.google.com/document/d/17c-1Jx3v2chAF612eRgsljxU7JB2HLC9/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Indicaciones para fotos de grados", tipo: "pdf", url: 'https://drive.google.com/file/d/1LPH0ISz_vHj6VjBgAmsQgCKbG0toHxYs/view?usp=drive_link' },
      {
        nombre: "R.R. N.° 00017 - Líneas de investigación",
        tipo: "pdf",
        url: "https://drive.google.com/file/d/1ey8OGYEwWuLDxCKUcVLpowgnijYlEtUW/view?usp=drive_link",
      },
      { nombre: "Guía del Paso 4", tipo: "word", url: 'https://docs.google.com/document/d/1IKJTdDZGDBaIwIkm3eodQXQZHsTDG73C/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
    ],
  },
];

export const faqMaestria2Anios = [
  {
    pregunta: "¿Cuántos idiomas exige el Grado de Magíster?",
    respuesta:
      "Se exige el certificado de suficiencia de un (1) idioma extranjero (de preferencia inglés) o nativo en nivel básico A2 como mínimo. El certificado no debe tener una antigüedad mayor a tres (3) años al momento de solicitar el expedito.",
  },
  {
    pregunta: "¿Cuál es la vigencia actual de los certificados de suficiencia de idioma?",
    respuesta:
      "Mediante la R.R. N.° 000532-2026-R/UNMSM, la Universidad amplió la vigencia de los Certificados de Dominio de Idioma Extranjero o Nativo emitidos por la Oficina de Exámenes de Suficiencia en Idiomas de la FLCH o por la Unidad de Idiomas de la DGEP hasta el 30 de diciembre del 2026.",
  },
  {
    pregunta: "¿Qué porcentaje máximo de similitud en Turnitin está permitido?",
    respuesta:
      "La tesis debe contar con un porcentaje de similitud menor o igual al 20%. El reporte debe adjuntarse con el Certificado de Similitud correspondiente, de preferencia firmado de manera física por el asesor.",
  },
  {
    pregunta: "¿Quiénes están exceptuados de presentar la publicación del artículo científico?",
    respuesta:
      "Los ingresantes hasta el periodo 2008-2 quedan exceptuados de presentar la publicación o aceptación de un artículo de investigación en revista indexada.",
  },
];
