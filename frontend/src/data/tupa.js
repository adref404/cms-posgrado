// TUPA (Tarifario Único de Pagos) de Posgrado — tarifas oficiales de
// trámites y programas, cobradas a través de SAN MARKET (plataforma de
// pagos UNMSM). Fuente: listado entregado por la Unidad de Posgrado.
//
// Cada ítem representa un trámite/servicio pagable en SAN MARKET:
//   - nombre: descripción oficial del trámite/servicio.
//   - codigo: código SAN MARKET del trámite (null si no aplica, como los
//     "Otros servicios" que se programan directo con el usuario del
//     estudiante en vez de tener un link de pago único).
//   - precio: monto en soles (número, sin formatear — ver utils/format).
//   - detalle: aclaración corta bajo el nombre (cuotas, modalidad, etc.).
//   - enlace: URL directa al trámite/catálogo en SAN MARKET (null si no
//     tiene, junto con "nota" explicando cómo se gestiona en su lugar).
//   - nota: texto alternativo cuando no hay "enlace" directo.

export const SAN_MARKET_URL = "https://sanmarket.unmsm.edu.pe/";

export const TUPA_CATEGORIAS = [
  {
    categoria: "Trámites de Posgrado",
    descripcion: "Constancias, grados, matrícula, traslados y demás trámites administrativos de la Unidad de Posgrado.",
    items: [
      { nombre: "Constancia de Egresado", codigo: "PGZK97", precio: 26.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/69a7662b-ccff-40e5-b11d-0132e1937a31" },
      { nombre: "Grado de Doctor - Facultades", codigo: "JX7XNF", precio: 2995.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/f7b51fd4-3ebe-473f-92a9-7b697aa9e326" },
      { nombre: "Grado de Magíster - Facultades", codigo: "AOY7AL", precio: 1555.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/48150104-dd77-41e6-84bd-41e3b4e824f4" },
      { nombre: "Acta Adicional", codigo: "2M5E3T", precio: 26.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/4d5a821b-8ee3-42cd-ab5a-e32ca655fc43" },
      { nombre: "Certificado de Estudios", codigo: "2E5IMM", precio: 36.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/d20e4faa-db14-40d8-8fe2-0cb0a787255e" },
      { nombre: "Constancia de Ingreso", codigo: "WQQ5KY", precio: 36.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/354e12db-80bb-4df3-8552-db5e5e414b75" },
      { nombre: "Constancia de Orden de Mérito", codigo: "6G4JZG", precio: 21.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/7268311e-2414-43ad-bafa-fa2961633b6c" },
      { nombre: "Convalidación", codigo: "KYJGJL", precio: 26.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/7d33d123-b2f2-4e21-9758-54fa59170e15" },
      { nombre: "Duplicado de Actas", codigo: "GUPXX3", precio: 26.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/a3d199e1-e34d-40ba-867d-e08860a48a16" },
      { nombre: "Otras Constancias", codigo: "ZAGIZC", precio: 21.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/0ecabfc3-bdf5-4dc7-8471-d4d501744464" },
      { nombre: "Récord Académico", codigo: "HUPZO7", precio: 15.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/e99eaad6-1853-4ccd-85a1-83506c18a6de" },
      { nombre: "Traslado Externo Internacional", codigo: "XPLB3X", precio: 1042.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/badd9afe-3ca0-4f92-8402-5b31b6455101" },
      { nombre: "Traslado Interno", codigo: "ERAV7J", precio: 206.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/509c02d7-509c-42db-a315-788df9cabd0f" },
      { nombre: "Carta de Presentación del Director de la EPG", codigo: "X03P2L", precio: 25.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/96c5d1be-b9b9-45de-8868-dc2478a7d373" },
      { nombre: "Anulación de Ingreso", codigo: "1HYLII", precio: 67.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/494fc9d1-e2e9-4292-83d3-3e9f67725e6f" },
      { nombre: "Anulación de Matrícula por Curso", codigo: "R39DIZ", precio: 26.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/dfc823e4-19ed-4a51-b858-38273cbe7e22" },
      { nombre: "Matrícula Extemporánea", codigo: "4R860Q", precio: 62.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/d14b18d7-481e-4775-9052-8e3a82019af8" },
      { nombre: "Reactualización de Matrícula", codigo: "SP17BB", precio: 191.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/24c6a6d1-41a8-4664-9ae3-701de70c0037" },
      { nombre: "Reactualización de Matrícula", codigo: "J57NNI", precio: 21.0, detalle: "Por cada año dejado de estudiar", enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/a2666741-46f4-40be-b0f3-228563eeaca9" },
      { nombre: "Rectificación de Matrícula", codigo: "AOYSKZ", precio: 30.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/94aaa27a-d4c5-40f2-bb43-7802bf889a2d" },
      { nombre: "Matrícula Regular Maestría", codigo: "5Q5VPE", precio: 348.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/3e6d75e4-88e2-461a-8deb-65b4012b7a6b" },
      { nombre: "Traslado Externo Nacional", codigo: "9Q9GEP", precio: 424.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/b4d810c4-ed62-4298-8f0e-8fcbcf38cd2c" },
      { nombre: "Revalidas de Grados o Títulos", codigo: "92Q7PO", precio: 1558.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/f15149f8-b620-41b0-a625-bf9d627847ce" },
      { nombre: "Reserva de Matrícula", codigo: "GH70F6", precio: 67.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/2e7fff4d-48d3-4dba-93bd-33c7a3ffa213" },
      { nombre: "Matrícula Ingresantes", codigo: "11B6BB", precio: 258.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/4b249215-dbf8-4c88-a6ee-557955202e49" },
      { nombre: "Matrícula Regular Doctorado", codigo: "CMR5TF", precio: 448.0, enlace: "https://sanmarket.unmsm.edu.pe/#/tramites/a2e1999f-8ee2-4b2d-9a8a-102996e2f285" },
    ],
  },
  {
    categoria: "Programas de Posgrado",
    descripcion: "Diplomaturas y programas de actualización con matrícula abierta, pagados en cuotas mensuales.",
    items: [
      {
        nombre: "Diplomatura de Acompañamiento y Evaluación de la Tesis Universitaria",
        detalle: "Modalidad virtual · cuota mensual, 6 cuotas",
        codigo: "843FMT",
        precio: 250.0,
        enlace: "https://sanmarket.unmsm.edu.pe/#/catalogo/8d4ef0ac-36b1-455f-8a54-325d321d4826",
      },
      {
        nombre: 'Taller de Elaboración de Informe Final de Tesis para Egresados de las Maestrías',
        detalle: "4 cuotas de S/ 900.00",
        codigo: "SQTZFK",
        precio: 3600.0,
        enlace: "https://sanmarket.unmsm.edu.pe/#/catalogo/9bdae908-1f16-4b85-9940-babf100a3b29",
      },
      {
        nombre: "Diplomatura en Diseños Cualitativos y Experimentales en Ciencias Sociales",
        detalle: "Modalidad virtual · 6 cuotas de S/ 250.00",
        codigo: "PB60HE",
        precio: 1500.0,
        enlace: "https://sanmarket.unmsm.edu.pe/#/catalogo/3a798244-f31d-4bc8-bd80-7e04745ecd13",
      },
      {
        nombre: "Diplomatura en Preparación Física",
        detalle: "Modalidad no presencial · 6 cuotas de S/ 250.00",
        codigo: "2U1L23",
        precio: 1500.0,
        enlace: "https://sanmarket.unmsm.edu.pe/#/catalogo/e2a57c36-f179-4029-bd79-4f7e7ba5c581",
      },
    ],
  },
  {
    categoria: "Otros Servicios",
    descripcion: "Derechos de enseñanza: se programan en plan de cuotas directamente en SAN MARKET, con el usuario del propio estudiante.",
    items: [
      {
        nombre: "Derecho de Enseñanza · Programa de Doctorado",
        detalle: "Importe por cuota — 30 cuotas en total",
        codigo: null,
        precio: 750.0,
        enlace: null,
        nota: "Se programa en plan de cuotas en SAN MARKET con el usuario del estudiante.",
      },
      {
        nombre: "Derecho de Enseñanza · Programa de Maestría",
        detalle: "Importe por cuota — 20 cuotas en total",
        codigo: null,
        precio: 600.0,
        enlace: null,
        nota: "Se programa en plan de cuotas en SAN MARKET con el usuario del estudiante.",
      },
    ],
  },
];
