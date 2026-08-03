import {
  MdCheckCircle,
  MdWarning,
  MdSchedule,
  MdInfo,
  MdPerson,
  MdBook,
  MdEdit,
} from "react-icons/md";

export const cronogramaAcademico = [
  {
    evento: "Matrícula Regular",
    fecha: "17 - 24 Ago 2026",
    estado: "proximo", // activo | proximo | programado | pendiente
  },
  {
    evento: "Matrícula de ingresantes",
    fecha: "25 - 28 Ago 2026",
    estado: "programado",
  },
  {
    evento: "Inicio de Clases (L-V)",
    fecha: "01 Sep 2026",
    estado: "programado",
  },
  {
    evento: "Inicio de Clases (S-D)",
    fecha: "05 - 06 Sep 2026",
    estado: "programado",
  },
  {
    evento: "Fin de Clases",
    fecha: "21 Dic 2026",
    estado: "programado",
  },
  {
    evento: "Ingreso de Notas",
    fecha: "22 - 26 Dic 2026",
    estado: "programado",
  },
];

// activo = en curso ahora (verde) · proximo = requiere atención pronto (guinda)
// programado = a futuro, sin urgencia (gris) · pendiente = a definir (gris claro)
export const ESTADO_CONFIG = {
  activo: { color: "#07A852", label: "En Curso", icon: MdCheckCircle },
  proximo: { color: "#861D21", label: "Próximo", icon: MdWarning },
  programado: { color: "#7E899E", label: "Programado", icon: MdSchedule },
  pendiente: { color: "#959595", label: "Pendiente", icon: MdSchedule },
};
const DEFAULT_ESTADO = { color: "#EFEFEF", label: "Programado", icon: MdInfo };

export const getEstadoConfig = (estado) => ESTADO_CONFIG[estado] || DEFAULT_ESTADO;

export const cronogramaPagos = {
  // Para quienes ingresaron DESDE 2022-2 hasta 2026-I
  maestria: {
    matricula: { monto: "S/ 400.00", fecha: "24/08/2026" },
    pensiones: [
      { cuota: "1°", monto: "S/ 600.00", fecha: "Hasta 30/08/2026" },
      { cuota: "2°", monto: "S/ 600.00", fecha: "30/09/2026" },
      { cuota: "3°", monto: "S/ 600.00", fecha: "30/10/2026" },
      { cuota: "4°", monto: "S/ 600.00", fecha: "30/11/2026" },
    ],
  },
  doctorado: {
    matricula: { monto: "S/ 500.00", fecha: "24/08/2026" },
    pensiones: [
      { cuota: "1°", monto: "S/ 750.00", fecha: "Hasta 30/08/2026" },
      { cuota: "2°", monto: "S/ 750.00", fecha: "30/09/2026" },
      { cuota: "3°", monto: "S/ 750.00", fecha: "30/10/2026" },
      { cuota: "4°", monto: "S/ 750.00", fecha: "30/11/2026" },
    ],
  },

  // Para quienes ingresaron ANTES del 2022-2
  maestria_ant: {
    matricula: { monto: "S/ 400.00", fecha: "24/08/2026" },
    pensiones: [
      { cuota: "1°", monto: "S/ 600.00", fecha: "Hasta 30/08/2026" },
      { cuota: "2°", monto: "S/ 600.00", fecha: "30/09/2026" },
      { cuota: "3°", monto: "S/ 600.00", fecha: "30/10/2026" },
      { cuota: "4°", monto: "S/ 600.00", fecha: "30/11/2026" },
      { cuota: "5°", monto: "S/ 600.00", fecha: "15/12/2026" },
    ],
  },
  doctorado_ant: {
    matricula: { monto: "S/ 500.00", fecha: "24/08/2026" },
    pensiones: [
      { cuota: "1°", monto: "S/ 750.00", fecha: "Hasta 30/08/2026" },
      { cuota: "2°", monto: "S/ 750.00", fecha: "30/09/2026" },
      { cuota: "3°", monto: "S/ 750.00", fecha: "30/10/2026" },
      { cuota: "4°", monto: "S/ 750.00", fecha: "30/11/2026" },
      { cuota: "5°", monto: "S/ 750.00", fecha: "15/12/2026" },
    ],
  },
};

// Arco de color intencional: guinda (requisito crítico) -> azules (pasos de rutina) -> verde (éxito)
export const procesoMatricula = [
  {
    paso: 1,
    titulo: "Verificar Requisitos",
    descripcion: "Confirmar pagos al día y documentos actualizados",
    icono: MdCheckCircle,
    color: "#70191C",
  },
  {
    paso: 2,
    titulo: "Acceder al SUM",
    descripcion: "Ingresar con usuario y contraseña al sistema",
    icono: MdPerson,
    color: "#1B2945",
  },
  {
    paso: 3,
    titulo: "Seleccionar Cursos",
    descripcion: "Elegir asignaturas según programa académico",
    icono: MdBook,
    color: "#2E4676",
  },
  {
    paso: 4,
    titulo: "Confirmar Matrícula",
    descripcion: "Revisar y confirmar la selección de cursos",
    icono: MdEdit,
    color: "#07A852",
  },
];

export const programas = {
  especializacion: [
    {
      nombre: "Maestría Profesional en Didáctica en la Matemática",
      clave: "didactica-matematica",
      cursos: [
        // CICLO 1
        // plan 2023 - semipresencial
        {
          curso: "Introducción a la Didáctica de las Matemáticas",
          horario: "Domingo 08:00 - 10:30",
          docente: "Carlos Díaz Serruche",
          aula: "13C",
          credito: 3,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Didáctica del Álgebra y Aritmética",
          horario: "Domingo 10:30 - 13:30",
          docente: "Ángel Salvatierra Melgar",
          aula: "13C",
          credito: 4,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Didáctica de la Geometría y Trigonometría",
          horario: "Sábado 16:00 - 19:00",
          docente: "Alex Molina Sotomayor",
          aula: "13C",
          credito: 4,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Tecnologías en la Enseñanza de las Matemáticas",
          horario: "Sábado 13:00 - 16:00",
          docente: "Iván Ángel Encalada Díaz",
          aula: "13C",
          credito: 4,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Tópicos de Cálculo I",
          horario: "Domingo 14:30 - 17:30",
          docente: "Luis Alberto Gómez Robles",
          aula: "13C",
          credito: 4,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Seminario de Investigación en Educación Matemática",
          horario: "Sábado 08:00 - 12:00",
          docente: "Fidel Antonio Chauca Vidal",
          aula: "13C",
          credito: 5,
          seccion: 1,
          ciclo: 1,
        },
        // CICLO 2
        //plan 2023 - semipresencial
        {
          curso: "Didáctica de la Estadística y ...",
          horario: "Domingo 11:00 - 14:00",
          docente: "Jose Olivera Espinoza",
          aula: "14C",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Didáctica de la Matemática",
          horario: "Domingo 15:00 - 17:30",
          docente: "Angel Salvatierra Melgar",
          aula: "14C",
          credito: 3,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Evaluación del Aprendizaje en ...",
          horario: "Sábado 8:00 - 11:00",
          docente: "Ivn Angel Encalada Diáz",
          aula: "14C",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Casuística en la Didáctica de la Matemática",
          horario: "Domingo 8:00 - 11:00",
          docente: "Luis Alberto Gomez Robles",
          aula: "14C",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Tópicos de Cálculo II",
          horario: "Sábado 11:00 - 14:00",
          docente: "Maxedgar Cantoral",
          aula: "14C",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Seminario de Investigación en Educación",
          horario: "Sábado 15:00 - 19:00",
          docente: "Jose Olivera Espinoza",
          aula: "14C",
          credito: 5,
          seccion: 1,
          ciclo: 2,
        },
      ],
    },
    {
      nombre:
        "Maestría Profesional en Didáctica de la Comunicación e Innovación",
      clave: "didactica-comunicacion",
      cursos: [
        // CICLO 1
        // plan 2023 - semipresencial
        {
          curso: "Sociolingüística",
          horario: "Domingo 08:00 - 12:00",
          docente: "Milagritos Josefina Saavedra Jaramillo de Sedamano",
          aula: "Lab. de Inglés",
          credito: 5,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Del Texto a Escena",
          horario: "Sábado 13:00 - 17:00",
          docente: "Eliana Vásquez Colichón",
          aula: "Lab. de Inglés",
          credito: 5,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Storytelling Educactivo",
          horario: "Domingo 13:00 - 16:00",
          docente: "Dante Rafael Aguinaga Villegas",
          aula: "Lab. de Inglés",
          credito: 4,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Literatura y Culturas Amazónicas",
          horario: "Sábado 17:00 - 20:00",
          docente: "Manuel Alberto Sedamano Ballesteros",
          aula: "Lab. de Inglés",
          credito: 4,
          seccion: 1,
          ciclo: 1,
        },
        {
          curso: "Metodología de Investigación",
          horario: "Sábado 08:00 - 12:30",
          docente: "Fidel Antonio Chauca Vidal",
          aula: "Lab. de Inglés",
          credito: 6,
          seccion: 1,
          ciclo: 1,
        },
        // CICLO 2
        // plan 2023 - semipresencial
        {
          curso: "Procesos Pedagógicos",
          horario: "Sábado 08:00 - 12:30",
          docente: "Dante Rafael Aguinaga Villegas",
          aula: "3B",
          credito: 6,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Procesos Didácticos de la Oralidad",
          horario: "Domingo 14:00 - 17:00",
          docente: "Eliana Vásquez Colichón",
          aula: "3B",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Inteligencia Artificial y Comunicación Educativa",
          horario: "Sábado 14:00 - 17:00",
          docente: "Manuel Alberto Sedamano Ballesteros",
          aula: "3B",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Procesos Didácticos de la Lectura",
          horario: "Sábado 17:00 - 20:00",
          docente: "Milagritos Josefina Saavedra Jaramillo de Sedamano",
          aula: "3B",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "Elaboración de Artículos",
          horario: "Sábado 08:00 - 12:30",
          docente: "Doris Elida Fuster Guillén",
          aula: "3B",
          credito: 5,
          seccion: 1,
          ciclo: 2,
        },
      ],
    },
  ],
  investigacion: [
    {
      nombre: "Maestría en Educación con mención en Gestión de la Educación",
      clave: "gestion-educacion",
      cursos: [],
    },
    {
      nombre: "Maestría en Educación con mención en Docencia Universitaria",
      clave: "docencia-universitaria",
      cursos: [],
    },
    {
      nombre:
        "Maestría en Educación con mención en Evaluación y Acreditación de la Calidad",
      clave: "evaluacion-calidad",
      cursos: [],
    },
  ],
  doctorado: [
    {
      nombre: "Doctorado en Educación y Docencia Universitaria",
      clave: "doctorado-educacion",
      cursos: [
        // CICLO 2
        // PLAN 2023 - PRESENCIAL
        {
          curso: "EDUCACIÓN SOCIO-AFECTIVA",
          horario: "Domingo 8:00 - 11:00",
          docente: "ESTHER MARIZA VELARDE CONSOLI",
          aula: "2 (EPEF)",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "CALIDAD DE LAS ORGANIZACIONES EDUCATIVAS",
          horario: "Sábado 8:00 - 11:00",
          docente: "HERNANDO DIAZ ANDIA",
          aula: "2 (EPEF)",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso: "GESTIÓN DE LA EDUCACIÓN VIRTUAL",
          horario: "Sábado 11:00 - 14:00",
          docente: "JIMMY DÍAZ MANRIQUE",
          aula: "2 (EPEF)",
          credito: 4,
          seccion: 1,
          ciclo: 2,
        },
        {
          curso:
            "FUNDAMENTOS DE LA INVESTIGACIÓN CIENTÍFICA: METODOLOGÍA DE LA INVESTIGACIÓN. PRODUCTO: DISEÑO DEL PROYECTO DE INVESTIGACIÓN",
          horario: "Sábado 15:00 - 19:30",
          docente: "DULIO OSEDA GAGO",
          aula: "2 (EPEF)",
          credito: 6,
          seccion: 1,
          ciclo: 2,
        },
        // CICLO 3
        // PLAN 2023 - PRESENCIAL
        {
          curso:
            "DESARROLLO DE LA INVESTIGACIÓN II: ASPECTOS METODOLÓGICOS. PRODUCTO: INFORME DE TRABAJO DE CAMPO",
          horario: "Sab 13:30 - 16:30 | Dom 11:00 - 14:00",
          docente: "JESSICA PAOLA PALACIOS GARAY",
          aula: "3 (EPEF)",
          credito: 8,
          seccion: 1,
          ciclo: 4,
        },
        {
          curso:
            "ASESORÍA DE TESIS II: RETROALIMENTACIÓN SOBRE EL DESARROLLO DE LA TESIS",
          horario: "Sab 8:00 - 12:30 | Dom 8:00 - 11:00",
          docente: "ELÍA MEJÍA MEJÍA",
          aula: "3 (EPEF)",
          credito: 10,
          seccion: 1,
          ciclo: 4,
        },
        // CICLO 5
        // PLAN 2023 - PRESENCIAL
        {
          curso:
            "DESARROLLO DE LA INVESTIGACIÓN III: REDACCIÓN DE TESIS. PRODUCTO: INFORME PRELIMINAR DE TESIS",
          horario: "Sab 13:30 - 16:30 | Dom 12:30 - 15:30",
          docente: "DORIS ELIDA FUSTER GUILLEN",
          aula: "4 (EPEF)",
          credito: 8,
          seccion: 1,
          ciclo: 5,
        },
        {
          curso:
            "ASESORÍA DE TESIS III: RETROALIMENTACIÓN SOBRE LA REDACCIÓN DE TESIS",
          horario: "Sab 8:00 - 12:30 | Dom 8:00 - 11:00",
          docente: "JESSICA PAOLA PALACIOS GARAY",
          aula: "4 (EPEF)",
          credito: 10,
          seccion: 1,
          ciclo: 5,
        },
        // CICLO 6
        // PLAN 2023 - PRESENCIAL
        {
          curso:
            "DESARROLLO DE LA INVESTIGACIÓN IV: INFORME Y SUSTENTACIÓN DE TESIS. PRODUCTO: INFORME DE TESIS DOCTORAL TERMINADA.",
          horario: "Sab 13:00 - 16:30 | Dom 8:00 - 11:00",
          docente: "YOLVI JAVIER OCAÑA FERNÁNDEZ",
          aula: "10B",
          credito: 8,
          seccion: 1,
          ciclo: 6,
        },
        {
          curso:
            "ASESORÍA DE TESIS IV: RETROALIMENTACIÓN PARA ELABORAR EL INFORME Y SUSTENTACIÓN DE TESIS.",
          horario: "Sab 8:00 - 12:00 | Dom 11:00 - 13:00",
          docente: "LUIS ALBERTO NÚÑEZ LIRA",
          aula: "10B",
          credito: 10,
          seccion: 1,
          ciclo: 6,
        },
      ],
    },
  ],
};
