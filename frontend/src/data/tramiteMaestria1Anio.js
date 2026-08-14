import { MdDescription, MdHowToReg, MdGavel, MdCloudUpload } from "react-icons/md";

// Trámite: Grado Académico de Magíster — Maestría Profesional de 1 Año,
// Facultad de Educación UNMSM. Contenido real del procedimiento oficial de
// la Unidad de Posgrado. Los "formatos" tienen "url: null" a propósito: son
// documentos que viven en Drive — complétalos con el link real cuando los
// tengas (algunos podrían coincidir con los ya cargados en Doctorado, pero
// se dejan independientes para no asumirlo).

// portalMat y avisoFotoGrados son comunes a todos los trámites de grado
// (Maestría y Doctorado comparten el mismo Módulo de Atención de Trámite y
// el mismo aviso oficial de especificaciones de foto).
export { portalMat, avisoFotoGrados } from "./tramiteDoctor.js";

// Programas que se tramitan bajo esta modalidad de Maestría Profesional (1 año).
export const programasIncluidos = [
  "Didáctica de la Comunicación e Innovación",
  "Didáctica de la Matemática",
];

export const pasosMaestria1Anio = [
  {
    id: 1,
    icono: MdDescription,
    tituloCorto: "Inscripción de Proyecto y Asesor",
    etapa: "Etapa 01",
    titulo: "Inscripción del Proyecto de Tesis / Trabajo de Investigación y Nombramiento de Asesor",
    descripcion:
      "Marca los documentos que ya tienes listos para controlar tu expediente digital antes de remitirlos vía el Módulo de Atención Trámite (MAT).",
    asuntoFut: "Inscripción del proyecto de tesis / trabajo de investigación y nombramiento de asesor(a)",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle:
          "Completado con datos del Director de la Unidad de Posgrado (Dr. Miguel Gerardo Inga Arias) indicando el asunto correspondiente.",
      },
      {
        titulo: "Proyecto de Tesis / Trabajo de Investigación",
        detalle: "Desarrollado según la estructura académica del programa.",
      },
      {
        titulo: "Ficha de Inscripción y Declaración Jurada de Datos",
        detalle: "Debidamente llenados y firmados por el/los solicitante(s).",
      },
      {
        titulo: "DNI vigente",
        detalle: "Los datos deben coincidir exactamente con la partida de nacimiento y el SUM.",
      },
      {
        titulo: "Partida de Nacimiento",
        detalle: "Legible; verificación obligatoria de nombres y apellidos coincidentes con el DNI.",
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
        tono: "blue",
        titulo: "Resolución Rectoral N.° 011623-2023-R/UNMSM (Art. 107 y 108)",
        texto:
          "Modalidades de grado — Trabajo de Investigación: puede ser individual o en grupo de hasta tres (3) estudiantes. Tesis: sigue el procedimiento regular, pudiendo participar hasta dos estudiantes más (hasta 3 integrantes en total). El asesor acompaña todo el proceso hasta el informe final y el control de similitud Turnitin. Plazo de ejecución: el desarrollo debe realizarse en un período máximo de un (1) año, culminando con el informe final presentado al asesor.",
      },
      {
        tono: "guinda",
        titulo: "Verificación previa obligatoria",
        texto:
          "Para garantizar la fluidez de tu proceso, es indispensable revisar y corregir tus datos (nombres y apellidos) antes de solicitar el Paso 2 (Expedito y Jurados Informantes).",
      },
    ],
    formatos: [
      { nombre: "FUT - Solicitud", tipo: "pdf", url: 'https://drive.google.com/file/d/12cGr1Kj23GbTii6dgFGSjwavL7m9Ynur/view?usp=drive_link' },
      { nombre: "Carta de Aceptación de Asesoría", tipo: "word", url: 'https://docs.google.com/document/d/1fCreuoh9oljnwKw3DHmPVcIP_CRRXDtc/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada - Datos", tipo: "word", url: 'https://docs.google.com/document/d/1D4_BltJaqfvwmWe-3uXVZFAoJbni-jU9/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Ficha de Inscripción - Formato", tipo: "word", url: 'https://docs.google.com/document/d/1GdGjFa8OsuA5xUUxyLHfx1UsmPOQ5ZqH/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Informe de Asesoría Virtual - Formato", tipo: "word", url: 'https://docs.google.com/document/d/1Y_V801qf-oUOYiNP-Ek4n0BgotTBB9f1/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
    ],
  },
  {
    id: 2,
    icono: MdHowToReg,
    tituloCorto: "Declaración de Expedito y Jurados",
    etapa: "Etapa 02",
    titulo: "Declaración de Expedito y Jurados Informantes",
    descripcion:
      "Presenta todos los requisitos en formato PDF, a excepción de la tesis/trabajo aprobado y el formato de verificación de indexación, que deben remitirse obligatoriamente en Word y PDF.",
    asuntoFut: "Declaración de expedito y nombramiento de jurados informantes",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle: "Dirigido a la Unidad de Posgrado. Asunto: Declaración de Expedito y Jurados Informantes.",
      },
      {
        titulo: "Informe Favorable del Asesor",
        detalle: "Carta u oficio del asesor dando conformidad a la tesis o trabajo final.",
      },
      {
        titulo: "Tesis / Trabajo de Investigación Aprobado (Word y PDF)",
        detalle: "Presentar obligatoriamente en ambos formatos.",
      },
      {
        titulo: "Tesis procesada por Turnitin (similitud ≤ 20%)",
        detalle: "El porcentaje de similitud no debe superar el 20%.",
      },
      {
        titulo: "Certificado de Similitud firmado por el Asesor",
        detalle: "De preferencia firmado con firma física por el asesor.",
      },
      {
        titulo: "Declaraciones Juradas triples",
        detalle:
          "Veracidad documentaria, no adeudar dinero, no adeudar libros y/o material bibliográfico. Datos exactos del DNI.",
      },
      {
        titulo: "Constancia o Carta de Aceptación/Publicación de Artículo de Investigación",
        detalle:
          "Artículo relacionado con la tesis en revista indexada externa o revista del Fondo Editorial UNMSM con filiación UNMSM.",
      },
      {
        titulo: "Formato de Verificación de Indexación de Revista (Word y PDF)",
        detalle:
          "Verificación en Web of Science, Scopus, SciELO, Latindex 2.0 o revistas acreditadas UNMSM. Obligatorio para ingresantes 2009-1 en adelante.",
      },
      {
        titulo: "Certificado original del dominio de UN (1) idioma extranjero o nativo",
        detalle:
          "Nivel básico A2 mínimo. Emitido por la Unidad de Idiomas DGEP o el Examen de Suficiencia de la FLCH UNMSM. Lengua nativa exigible para ingresantes a partir de 2014-2 (Ley N.° 30220).",
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
        titulo: "Graduados extranjeros",
        texto:
          "Los graduados extranjeros deben adjuntar además la Resolución de Reconocimiento de Grado emitida por SUNEDU.",
      },
    ],
    formatos: [
      { nombre: "FUT - Solicitud", tipo: "pdf", url: 'https://drive.google.com/file/d/15CdpkoCahaSBVedv2Y-UXGem3FuuVJNM/view?usp=drive_link' },
      { nombre: "Declaración Jurada de no adeudar dinero", tipo: "word", url: 'https://docs.google.com/document/d/1P3cLhQvBT1VRf2O8wPHnRV10iR1yjIFX/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada de no adeudar libros", tipo: "word", url: 'https://docs.google.com/document/d/1kOR9Cg_QqpIUn2S7aUxroNXq_nl3rUQ9/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada de veracidad documentaria", tipo: "word", url: 'https://docs.google.com/document/d/1qanUI3gP4BozgIEYNp8rZ-JQNvgjCOXk/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Formato de similitud (Turnitin)", tipo: "word", url: 'https://docs.google.com/document/d/1t9Q5VXZIGNRbEKGIfR2-ye0VgukhzQaN/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Formato de verificación de indexación", tipo: "word", url: 'https://docs.google.com/document/d/1cRk5BvPxpkduNt7PyoDQvwRC-5dK_nI-/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
    ],
  },
  {
    id: 3,
    icono: MdGavel,
    tituloCorto: "Sustentación y Pagos",
    etapa: "Etapa 03",
    titulo: "Fecha de Sustentación y Jurado Examinador",
    descripcion:
      "Verifica haber acumulado los informes favorables de los jurados informantes y haber efectuado los pagos oficiales a través de la plataforma San Market UNMSM.",
    asuntoFut: "Fecha de sustentación y jurado examinador",
    requisitos: [
      {
        titulo: "Formulario Único de Trámite (FUT)",
        detalle: "Asunto: Fecha de sustentación y jurado examinador.",
      },
      {
        titulo: "Tesis / Trabajo final en formato Word y PDF",
        detalle: "Versión definitiva con correcciones de jurados incorporadas.",
      },
      {
        titulo: "Tesis procesada por Turnitin con porcentaje de similitud",
        detalle: "Reporte actualizado generado antes de la sustentación.",
      },
      {
        titulo: "Certificado de Similitud firmado por el Asesor",
        detalle: "De preferencia con firma física.",
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
    formatos: [{ nombre: "FUT - Solicitud sustentación", tipo: "pdf", url: 'https://drive.google.com/file/d/1qQmemMa5vNTs-aersGWi2tlicsawR5HD/view?usp=drive_link' }],
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
        titulo: "Tesis / Trabajo en formato Word y PDF",
        detalle: "Archivo definitivo e integrado con carátula oficial.",
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
        titulo: "Diploma de Grado Académico de Bachiller (PDF)",
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
          "Antes del envío oficial a Decanato, la tesis o trabajo de investigación debe quedar registrado en el repositorio Cybertesis. Se solicitará la información anterior documentada por correo electrónico.",
      },
      {
        tono: "green",
        titulo: "Generación de expediente",
        texto:
          "Cuando la tesis/trabajo sea publicado en Cybertesis, se procede a generar un número de expediente final para el trámite del diploma.",
      },
    ],
    formatos: [
      { nombre: "Autorización Cybertesis", tipo: "word", url: 'https://docs.google.com/document/d/1aHtV20UTx_YlkULHuy2FIHWTKzrtmqs1/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Declaración Jurada - Datos étnicos", tipo: "word", url: 'https://docs.google.com/document/d/1kCpMDzFeSI1aCA9xY3K9IZunwCgFhdJK/edit?usp=drive_link&ouid=108179070105779258111&rtpof=true&sd=true' },
      { nombre: "Indicaciones para fotos de grados", tipo: "pdf", url: 'https://drive.google.com/file/d/1InOP2ysNrsG0WYXzqOQIq0F6i7nuy1eu/view?usp=drive_link' },
      { nombre: "R.R. N.° 00017-14 - Líneas de investigación", tipo: "pdf", url: 'https://drive.google.com/file/d/1bfOf4LbenLQ1QmINHWo-Ly3kkJhdY1OX/view?usp=drive_link' },
    ],
  },
];

export const faqMaestria1Anio = [
  {
    pregunta: "¿En la Maestría Profesional se puede realizar la tesis o trabajo en grupo?",
    respuesta:
      "Sí. De acuerdo con el Art. 107 de la R.R. N.° 011623-2023-R/UNMSM, el Trabajo de Investigación puede ser individual o en grupo de hasta tres (3) estudiantes. Para la Tesis se puede trabajar con hasta dos integrantes adicionales (hasta 3 personas en total).",
  },
  {
    pregunta: "¿Cuántos idiomas exige el Grado de Magíster?",
    respuesta:
      "Se exige el certificado de suficiencia de un (1) idioma extranjero o nativo en nivel básico A2 como mínimo (el Grado de Doctor exige dos).",
  },
  {
    pregunta: "¿Cuál es la vigencia actual de los certificados de suficiencia de idioma?",
    respuesta:
      "Mediante la R.R. N.° 000532-2026-R/UNMSM, la Universidad amplió la vigencia de los Certificados de Dominio de Idioma Extranjero o Nativo emitidos por la Oficina de Suficiencia en Idiomas de la FLCH o por la Unidad de Idiomas de la DGEP hasta el 30 de diciembre del 2026.",
  },
  {
    pregunta: "¿Cuál es el porcentaje máximo de similitud en Turnitin permitido?",
    respuesta:
      "El informe Turnitin debe arrojar un porcentaje de similitud menor o igual al 20% (≤ 20%). El reporte completo debe adjuntarse firmado por el asesor con el Certificado de Similitud correspondiente.",
  },
];
