import { MdCheckCircle, MdWarning, MdSchedule, MdInfo, MdPerson, MdBook, MdEdit } from "react-icons/md";

// Estado de un paso comparando sus fechas contra "hoy" (la del dispositivo):
// completado (ya pasó) · activo (hoy cae dentro del rango) · proximo (empieza
// en 7 días o menos) · programado (todavía falta más de una semana).
export const calcularEstadoPaso = (paso, hoy = new Date()) => {
  const inicio = new Date(`${paso.fechaInicio}T00:00:00`);
  const fin = new Date(`${paso.fechaFin}T23:59:59`);

  if (hoy > fin) return "completado";
  if (hoy >= inicio) return "activo";

  const diasParaEmpezar = Math.ceil((inicio - hoy) / (1000 * 60 * 60 * 24));
  return diasParaEmpezar <= 7 ? "proximo" : "programado";
};

// % de avance para ubicar el marcador "Hoy" en la línea del timeline.
// Cada punto i (renderizado en `grid-cols-{n}`, centrado en su columna, en
// (i + 0.5) / n * 100%) representa SU FECHA LÍMITE (fechaFin) — no su
// inicio. El marcador debe quedar detrás de un punto mientras no se haya
// cumplido esa fecha límite, y recién "cruzarlo" cuando se cumpla. Por eso
// se interpola entre fechas límite consecutivas (fechaFin[i-1] -> fechaFin[i]),
// usando el inicio del primer paso solo como ancla izquierda del primer tramo.
export const calcularProgresoProceso = (pasos, hoy = new Date()) => {
  const n = pasos.length;
  const posicionPunto = (i) => ((i + 0.5) / n) * 100;

  const inicioProceso = new Date(`${pasos[0].fechaInicio}T00:00:00`);
  const limites = pasos.map((p) => new Date(`${p.fechaFin}T23:59:59`));
  const anclas = [inicioProceso, ...limites]; // n + 1 anclas

  if (hoy <= anclas[0]) return 0;
  if (hoy >= anclas[n]) return 100;

  for (let i = 0; i < n; i++) {
    if (hoy < anclas[i + 1]) {
      const posIzquierda = i === 0 ? 0 : posicionPunto(i - 1);
      const posDerecha = posicionPunto(i);
      const frac = (hoy - anclas[i]) / (anclas[i + 1] - anclas[i]);
      return posIzquierda + frac * (posDerecha - posIzquierda);
    }
  }

  return 100;
};

// El Cronograma de Admisión y el Cronograma Académico ya NO viven acá
// como arrays estáticos: se editan desde /admin/cronograma y se leen en
// vivo con hooks/useCronograma.js (tabla "cronograma_actividades" en
// Supabase — ver supabase-cronograma.sql). Lo que queda en este archivo
// son solo las funciones puras que ambos siguen usando para calcular
// estado/avance a partir de las fechas que traiga cada fila.

// completado = ya pasó (verde) · activo = en curso ahora (verde)
// proximo = requiere atención pronto (guinda) · programado = a futuro, sin
// urgencia (gris) · pendiente = a definir (gris claro)
export const ESTADO_CONFIG = {
  completado: { color: "#07A852", label: "Completado", icon: MdCheckCircle },
  activo: { color: "#07A852", label: "En Curso", icon: MdCheckCircle },
  proximo: { color: "#861D21", label: "Próximo", icon: MdWarning },
  programado: { color: "#7E899E", label: "Programado", icon: MdSchedule },
  pendiente: { color: "#959595", label: "Pendiente", icon: MdSchedule },
};
const DEFAULT_ESTADO = { color: "#EFEFEF", label: "Programado", icon: MdInfo };

export const getEstadoConfig = (estado) => ESTADO_CONFIG[estado] || DEFAULT_ESTADO;

// Ya no se diferencia por fecha de ingreso (antes/después de 2022-2) — esa
// distinción quedó obsoleta. Ahora la única variable es si es tu primer
// ciclo (matrícula de ingresante, S/ 310 para ambos programas) o uno de
// los siguientes (matrícula regular, distinta por programa). Las fechas
// límite de cada una coinciden con el Cronograma Académico (Matrícula
// Regular: hasta el 28 de agosto · Matrícula de Ingresantes: hasta el 01
// de setiembre). Las pensiones no cambian según el ciclo: siempre son 4
// cuotas mensuales, con las mismas fechas para ambos casos.
export const cronogramaPagos = {
  maestria: {
    matriculaPrimerCiclo: { monto: "S/ 310.00", fecha: "01/09/2026" },
    matriculaCiclosSiguientes: { monto: "S/ 400.00", fecha: "28/08/2026" },
    pensiones: [
      { cuota: "1°", monto: "S/ 600.00", fecha: "Hasta 31/08/2026" },
      { cuota: "2°", monto: "S/ 600.00", fecha: "30/09/2026" },
      { cuota: "3°", monto: "S/ 600.00", fecha: "30/10/2026" },
      { cuota: "4°", monto: "S/ 600.00", fecha: "30/11/2026" },
    ],
  },
  doctorado: {
    matriculaPrimerCiclo: { monto: "S/ 310.00", fecha: "01/09/2026" },
    matriculaCiclosSiguientes: { monto: "S/ 500.00", fecha: "28/08/2026" },
    pensiones: [
      { cuota: "1°", monto: "S/ 750.00", fecha: "Hasta 31/08/2026" },
      { cuota: "2°", monto: "S/ 750.00", fecha: "30/09/2026" },
      { cuota: "3°", monto: "S/ 750.00", fecha: "30/10/2026" },
      { cuota: "4°", monto: "S/ 750.00", fecha: "30/11/2026" },
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

// Ciclos disponibles en el selector de "Horario de Cursos".
// 2026-II queda con cursos: null hasta que se publiquen (se muestra "Próximamente").
export const CICLOS_DISPONIBLES = [
  { id: "2025-II", label: "2025-II" },
  { id: "2026-I", label: "2026-I" },
  { id: "2026-II", label: "2026-II" },
];

export const programasPorCiclo = {
  "2025-II": {
    especializacion: [
      {
        nombre: "Maestría Profesional en Didáctica en la Matemática",
        clave: "didactica-matematica",
        cursos: [
          // CICLO 1
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
          // CICLO 4
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
  },

  // Ciclo en curso — transcrito de los horarios oficiales 2026-1
  "2026-I": {
    especializacion: [
      {
        nombre: "Maestría Profesional en Didáctica en la Matemática",
        clave: "didactica-matematica",
        cursos: [
          // CICLO 1
          {
            curso: "Seminario de Investigación en Educación Matemática I",
            horario: "Sábado 8:00 - 11:00 (+1h asincrónica)",
            docente: "Fidel Chauca Vidal",
            aula: "",
            credito: 5,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Didáctica de la Geometría y Trigonometría",
            horario: "Sábado 11:00 - 13:00",
            docente: "Max Cantoral",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Tecnologías en la Enseñanza de las Matemáticas",
            horario: "Sábado 14:00 - 16:00",
            docente: "Iván Encalada Diaz",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Didáctica del Álgebra y Aritmética",
            horario: "Sábado 16:00 - 18:00",
            docente: "Neptalí Reyes Cabrera",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Introducción a la Didáctica de las Matemáticas",
            horario: "Domingo 8:00 - 10:30",
            docente: "Carlos Díaz Serruche",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Tópicos de Cálculo I",
            horario: "Domingo 10:30 - 12:30",
            docente: "Luis Gómez",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Seminario de Investigación en Educación Matemática II",
            horario: "Sábado 14:00 - 17:00",
            docente: "Fidel Chauca Vidal",
            aula: "",
            credito: 5,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Tópicos de Cálculo II",
            horario: "Sábado 8:00 - 10:00",
            docente: "Max Cantoral",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Evaluación del Aprendizaje en Matemáticas",
            horario: "Sábado 10:00 - 12:00",
            docente: "Iván Encalada Diaz",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Didáctica de la Matemática Recreativa",
            horario: "Domingo 10:30 - 13:00",
            docente: "Sthefany Garay",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Didáctica de la Estadística y Probabilidades",
            horario: "Domingo 8:00 - 10:00",
            docente: "Neptalí Reyes Cabrera",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Casuística en la Didáctica de la Matemática",
            horario: "Domingo 14:00 - 16:00",
            docente: "Luis Gómez",
            aula: "",
            credito: 4,
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
          {
            curso: "Metodología de Investigación Educativa",
            horario: "Sábado 8:00 - 11:00",
            docente: "Eloy Ayala Falconí",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Del Texto a Escena",
            horario: "Sábado 13:00 - 16:00",
            docente: "Eliana Vásquez Colichón",
            aula: "",
            credito: 5,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Storytelling Educativo",
            horario: "Sábado 16:00 - 18:00",
            docente: "Dante Aguinaga Villegas",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Sociolingüística",
            horario: "Domingo 8:00 - 11:00",
            docente: "Milagritos Saavedra Jaramillo",
            aula: "",
            credito: 5,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Literatura y Culturas Amazónicas",
            horario: "Domingo 13:00 - 15:00",
            docente: "Manuel Sedamano Ballesteros",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Procesos Pedagógicos",
            horario: "Sábado 8:00 - 11:00",
            docente: "Lucy del Pilar Aguado Ventura",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Procesos Didácticos de la Oralidad",
            horario: "Sábado 14:00 - 16:00",
            docente: "Renato Salas Peña",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Inteligencia Artificial y Comunicación Educativa",
            horario: "Sábado 16:00 - 18:00",
            docente: "Manuel Sedamano Ballesteros",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Procesos Didácticos de la Lectura",
            horario: "Domingo 11:00 - 13:00",
            docente: "Milagritos Saavedra Jaramillo",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Elaboración de Artículos",
            horario: "Domingo 8:00 - 11:00",
            docente: "Doris Fuster Guillén",
            aula: "",
            credito: 6,
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
        cursos: [
          // CICLO 1 - Sección 1
          {
            curso: "Gestión de la Educación Virtual",
            horario: "Sábado 10:30 - 13:00",
            docente: "Manuel Arista Huaco",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Gestión de Aprendizajes",
            horario: "Sábado 8:00 - 10:30",
            docente: "Pedro Rojas Silva",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Gestión de la Educación Pública",
            horario: "Sábado 14:00 - 16:30",
            docente: "Eric Galvez Suárez",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso:
              "Fundamentos de la Investigación Científica: Metodología de la Investigación",
            horario: "Domingo 8:00 - 12:30",
            docente: "Joseph Martin Vergara",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 1 - Sección 2
          {
            curso: "Gestión de la Educación Virtual",
            horario: "Sábado 8:00 - 10:30",
            docente: "Iván Encalada Díaz",
            aula: "",
            credito: 3,
            seccion: 2,
            ciclo: 1,
          },
          {
            curso: "Gestión de Aprendizajes",
            horario: "Sábado 10:30 - 13:00",
            docente: "Luis Chávez Alván",
            aula: "",
            credito: 3,
            seccion: 2,
            ciclo: 1,
          },
          {
            curso: "Gestión de la Educación Pública",
            horario: "Sábado 14:00 - 16:30",
            docente: "Carlos Giles Abarca",
            aula: "",
            credito: 3,
            seccion: 2,
            ciclo: 1,
          },
          {
            curso:
              "Fundamentos de la Investigación Científica: Metodología de la Investigación",
            horario: "Domingo 8:00 - 12:30",
            docente: "Manuel Sedamano Ballesteros",
            aula: "",
            credito: 6,
            seccion: 2,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Asesoría de Tesis I: Retroalimentación sobre el Desarrollo de la Tesis",
            horario: "Sábado 14:00 - 18:30",
            docente: "Ronal Garnelo Escobar",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso:
              "Desarrollo de la Investigación I: Investigación Interdisciplinaria. Producto: Marco Teórico de la Investigación",
            horario: "Domingo 8:00 - 12:00",
            docente: "Carlos Giles Abarca",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso:
              "Taller de Redacción y Edición Científica. Producto: Artículo Científico",
            horario: "Domingo 10:00 - 13:00",
            docente: "Pedro Jacinto Pazo",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          // CICLO 3 - Grupo Presencial
          {
            curso:
              "Asesoría de Tesis II: Retroalimentación sobre el Desarrollo de Tesis",
            horario: "Sábado 14:00 - 18:30",
            docente: "Xavier Fuentes Ávila",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso:
              "Desarrollo de la Investigación II: Aspectos Metodológicos. Producto: Informe de Trabajo de Campo",
            horario: "Sáb 8:00 - 12:00 | Dom 11:00 - 13:00",
            docente: "María Luisa Flores Urpe",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso:
              "Taller de Análisis de Datos para la Investigación. Producto: Informe de Análisis y Resultados",
            horario: "Domingo 8:00 - 11:00",
            docente: "José Olivera Espinoza",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          // CICLO 3 - Grupo Semipresencial
          {
            curso:
              "Asesoría de Tesis II: Retroalimentación sobre el Desarrollo de Tesis",
            horario: "Sábado 14:00 - 18:30",
            docente: "Cecilia Abensur Pinasco",
            aula: "",
            credito: 6,
            seccion: 2,
            ciclo: 3,
          },
          {
            curso:
              "Desarrollo de la Investigación II: Aspectos Metodológicos. Producto: Informe de Trabajo de Campo",
            horario: "Sáb 8:00 - 12:00 | Dom 8:00 - 10:00",
            docente: "Gonzalo Pacheco Lay",
            aula: "",
            credito: 8,
            seccion: 2,
            ciclo: 3,
          },
          {
            curso:
              "Taller de Análisis de Datos para la Investigación. Producto: Informe de Análisis y Resultados",
            horario: "Domingo 11:00 - 14:00",
            docente: "José Olivera Espinoza",
            aula: "",
            credito: 4,
            seccion: 2,
            ciclo: 3,
          },
          // CICLO 4
          {
            curso: "Asesoría de Tesis III: Retroalimentación sobre el Informe de Tesis",
            horario: "Sábado 8:00 - 12:00 y 14:00 - 17:30",
            docente: "Carlos Dextre Mendoza",
            aula: "",
            credito: 10,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso:
              "Desarrollo de la Investigación III: Informe y Redacción de Tesis. Producto: Informe de Tesis",
            horario: "Domingo 8:00 - 14:00",
            docente: "Ángel Mamani Ramos",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 4,
          },
        ],
      },
      {
        nombre: "Maestría en Educación con mención en Docencia Universitaria",
        clave: "docencia-universitaria",
        cursos: [
          // CICLO 1 - Grupo Semipresencial A
          {
            curso:
              "Fundamentos de la Investigación Científica: Metodología de la Investigación",
            horario: "Sábado 8:00 - 12:30",
            docente: "Milagritos Saavedra Jaramillo",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Docencia Universitaria",
            horario: "Sábado 13:30 - 16:00",
            docente: "Dante Aguinaga Villegas",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Gestión del Conocimiento en la Universidad",
            horario: "Sábado 16:00 - 18:30",
            docente: "Oscar Collque Ricce",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Neuroeducación",
            horario: "Domingo 8:00 - 10:30",
            docente: "Marco Antonio Villanueva",
            aula: "",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 1 - Grupo Semipresencial B
          {
            curso: "Gestión del Conocimiento en la Universidad",
            horario: "Sábado 8:00 - 10:30",
            docente: "Hugo Candela Linares",
            aula: "",
            credito: 3,
            seccion: 2,
            ciclo: 1,
          },
          {
            curso:
              "Fundamentos de la Investigación Científica: Metodología de la Investigación",
            horario: "Sábado 14:00 - 18:30",
            docente: "Jorge Jaime Cárdenas",
            aula: "",
            credito: 6,
            seccion: 2,
            ciclo: 1,
          },
          {
            curso: "Neuroeducación",
            horario: "Domingo 10:30 - 13:00",
            docente: "Marco Antonio Tejada",
            aula: "",
            credito: 3,
            seccion: 2,
            ciclo: 1,
          },
          {
            curso: "Docencia Universitaria",
            horario: "Domingo 8:00 - 10:30",
            docente: "Sthefani Elena Garay Ramírez",
            aula: "",
            credito: 3,
            seccion: 2,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Asesoría de Tesis I: Retroalimentación sobre el Desarrollo de Tesis",
            horario: "Sábado 14:00 - 18:30",
            docente: "Ángel Salvatierra Melgar",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso:
              "Desarrollo de la Investigación I: Investigación Interdisciplinaria. Producto: Marco Teórico de la Investigación",
            horario: "Sáb 8:00 - 12:00 | Dom 8:00 - 10:00",
            docente: "Hernando Díaz Andía",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso:
              "Taller de Redacción y Edición Científica. Producto: Artículo Científico",
            horario: "Domingo 10:00 - 13:00",
            docente: "Giovanni Corvetto Castro",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          // CICLO 3 - Grupo Presencial
          {
            curso:
              "Asesoría de Tesis II: Retroalimentación sobre el Desarrollo de la Tesis",
            horario: "Sábado 14:00 - 18:30",
            docente: "Ofelia Santos Jiménez",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso:
              "Desarrollo de la Investigación II: Aspectos Metodológicos. Producto: Informe de Trabajo de Campo",
            horario: "Sáb 8:00 - 12:00 | Dom 11:00 - 13:00",
            docente: "Cesar Daniel Escuza Mesías",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso:
              "Taller de Análisis de Datos para la Investigación. Producto: Informe de Análisis y Resultados",
            horario: "Domingo 8:00 - 11:00",
            docente: "Cesar Daniel Escuza Mesías",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          // CICLO 3 - Grupo A Semipresencial
          {
            curso:
              "Asesoría de Tesis II: Retroalimentación sobre el Desarrollo de la Tesis",
            horario: "Sábado 14:00 - 18:30",
            docente: "Jorge Jave Nakayo",
            aula: "",
            credito: 6,
            seccion: 2,
            ciclo: 3,
          },
          {
            curso:
              "Taller de Análisis de Datos para la Investigación. Producto: Informe de Análisis y Resultados",
            horario: "Sábado 11:00 - 14:00",
            docente: "Ángel Salvatierra Melgar",
            aula: "",
            credito: 4,
            seccion: 2,
            ciclo: 3,
          },
          {
            curso:
              "Desarrollo de la Investigación II: Aspectos Metodológicos. Producto: Informe de Trabajo de Campo",
            horario: "Domingo 8:00 - 12:00",
            docente: "Yudith Alata Cusi",
            aula: "",
            credito: 8,
            seccion: 2,
            ciclo: 3,
          },
          // CICLO 3 - Grupo B Semipresencial
          {
            curso:
              "Asesoría de Tesis II: Retroalimentación sobre el Desarrollo de la Tesis",
            horario: "Sábado 8:00 - 12:30",
            docente: "María Isabel Núñez Flores",
            aula: "",
            credito: 6,
            seccion: 3,
            ciclo: 3,
          },
          {
            curso:
              "Taller de Análisis de Datos para la Investigación. Producto: Informe de Análisis y Resultados",
            horario: "Sábado 14:00 - 17:00",
            docente: "José Olivera Espinoza",
            aula: "",
            credito: 4,
            seccion: 3,
            ciclo: 3,
          },
          {
            curso:
              "Desarrollo de la Investigación II: Aspectos Metodológicos. Producto: Informe de Trabajo de Campo",
            horario: "Domingo 8:00 - 13:00",
            docente: "Jimmy Díaz Manrique",
            aula: "",
            credito: 8,
            seccion: 3,
            ciclo: 3,
          },
          // CICLO 4 - Grupo Presencial
          {
            curso: "Asesoría de Tesis III: Retroalimentación sobre el Informe de Tesis",
            horario: "Sábado 8:00 - 12:00 y 14:00 - 17:30",
            docente: "Abelardo Campana Concha",
            aula: "",
            credito: 10,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso:
              "Desarrollo de la Investigación III: Informe y Redacción de Tesis. Producto: Informe de Tesis",
            horario: "Domingo 8:00 - 14:00",
            docente: "Carlos Dextre Mendoza",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 4,
          },
          // CICLO 4 - Grupo Semipresencial
          {
            curso:
              "Desarrollo de la Investigación III: Informe y Redacción de Tesis. Producto: Informe de Tesis",
            horario: "Sábado 8:00 - 12:00",
            docente: "Jorge Rivera Muñoz",
            aula: "",
            credito: 8,
            seccion: 2,
            ciclo: 4,
          },
          {
            curso: "Asesoría de Tesis III: Retroalimentación sobre el Informe de Tesis",
            horario: "Sáb 14:00 - 16:00 | Dom 8:00 - 12:00",
            docente: "Isabel Menacho Vargas",
            aula: "",
            credito: 10,
            seccion: 2,
            ciclo: 4,
          },
        ],
      },
      {
        nombre:
          "Maestría en Educación con mención en Evaluación y Acreditación de la Calidad",
        clave: "evaluacion-calidad",
        cursos: [
          // CICLO 3
          {
            curso:
              "Taller de Análisis de Datos para la Investigación: Producto Informe de Análisis y Resultados",
            horario: "Sábado 14:00 - 17:00",
            docente: "Domingo Chumpitaz",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso:
              "Asesoría de Tesis II: Retroalimentación sobre el Desarrollo de Tesis",
            horario: "Sábado 8:00 - 12:30",
            docente: "Lourdes Alcaide Aranda",
            aula: "",
            credito: 6,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso:
              "Desarrollo de la Investigación II: Aspectos Metodológicos: Informe de Trabajo de Campo",
            horario: "Domingo 8:00 - 14:00",
            docente: "Abelardo Campana Concha",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 3,
          },
        ],
      },
    ],
    doctorado: [
      {
        nombre: "Doctorado en Educación y Docencia Universitaria",
        clave: "doctorado-educacion",
        cursos: [
          // CICLO 1
          {
            curso: "Docencia Universitaria",
            horario: "Sábado 8:00 - 11:00",
            docente: "Miguel Inga Arias",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Currículo Universitario",
            horario: "Sábado 11:00 - 14:00",
            docente: "Ana María Vilchez Huerto",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso:
              "Fundamentos de la Investigación Científica: Epistemología y Problemología",
            horario: "Sábado 15:00 - 18:00",
            docente: "Jimy Díaz Manrique",
            aula: "",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 4
          {
            curso:
              "Desarrollo de la Investigación I: Aspectos Metodológicos. Producto: Informe de Trabajo de Campo",
            horario: "Sábado 14:00 - 20:00",
            docente: "Dulio Oseda Gago",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso:
              "Asesoría de Tesis I: Retroalimentación sobre el Desarrollo de la Tesis",
            horario: "Sáb 8:00 - 12:30 | Dom 8:00 - 11:00",
            docente: "Luis Núñez Lira",
            aula: "",
            credito: 10,
            seccion: 1,
            ciclo: 4,
          },
          // CICLO 5
          {
            curso:
              "Desarrollo de la Investigación III: Redacción de Tesis. Producto: Informe Preliminar de Tesis Doctoral",
            horario: "Sábado 13:30 - 16:30",
            docente: "Jessica Palacios Garay",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 5,
          },
          {
            curso:
              "Asesoría de Tesis III: Retroalimentación sobre la Redacción de Tesis",
            horario: "Sáb 8:00 - 12:30 | Dom 8:00 - 11:00",
            docente: "Elías Mejía Mejía",
            aula: "",
            credito: 10,
            seccion: 1,
            ciclo: 5,
          },
          // CICLO 6
          {
            curso:
              "Desarrollo de la Investigación IV: Informe y Sustentación de Tesis. Producto: Informe de Tesis Doctoral",
            horario: "Sáb 13:30 - 16:30 | Dom 12:30 - 15:30",
            docente: "Doris Fuster Guillén",
            aula: "",
            credito: 8,
            seccion: 1,
            ciclo: 6,
          },
          {
            curso:
              "Asesoría de Tesis IV: Retroalimentación para Elaborar el Informe y Sustentación de Tesis",
            horario: "Sáb 8:00 - 12:30 | Dom 8:00 - 11:00",
            docente: "Jessica Palacios Garay",
            aula: "",
            credito: 10,
            seccion: 1,
            ciclo: 6,
          },
        ],
      },
    ],
  },

  // Aún no se publican los horarios de este ciclo
  "2026-II": null,
};
