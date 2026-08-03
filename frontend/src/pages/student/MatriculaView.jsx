import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  MdSchedule,
  MdPayment,
  MdEdit,
  MdAccessTime,
  MdCalendarToday,
  MdDownload,
  MdInfo,
  MdCheckCircle,
  MdWarning,
  MdError,
  MdSchool,
  MdBook,
  MdClass,
  MdPerson,
  MdEmail,
  MdPhone,
  MdSearch,
} from "react-icons/md";

const MatriculaView = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("cronograma-academico");
  const [selectedProgramType, setSelectedProgramType] = useState("especializacion"); // especializacion | investigacion | doctorado
  const [selectedProgramKey, setSelectedProgramKey] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState("maestria"); // maestria | doctorado
  const [isAnterior, setIsAnterior] = useState(false); // si es anterior a 2022-2

  const [tipoPrograma, setTipoPrograma] = useState("maestria"); // maestria | doctorado
  const [selectedPrograma, setSelectedPrograma] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  // --- Datos ---
  const sections = [
    {
      id: "cronograma-academico",
      title: "Cronograma Académico",
      icon: MdSchedule,
      color: "#081B42",
    },
    {
      id: "cronograma-pagos",
      title: "Cronograma de Pagos",
      icon: MdPayment,
      color: "#081B42",
    },
    {
      id: "proceso-matricula",
      title: "Proceso de Matrícula",
      icon: MdEdit,
      color: "#081B42",
    },
    {
      id: "horario-cursos",
      title: "Horario de Cursos",
      icon: MdAccessTime,
      color: "#081B42",
    },
  ];

  const cronogramaAcademico = [
    {
      evento: "Matrícula Virtual",
      fecha: "22 Ago - 02 Sep 2025",
      estado: "proximo", //programado | activo | proximo | 
    },
    {
      evento: "Inicio de Clases (L-V)",
      fecha: "08 Sep 2025",
      estado: "proximo",
    },
    {
      evento: "Inicio de Clases (S-D)",
      fecha: "13-14 Sep 2025",
      estado: "proximo",
    },
    { evento: "Fin de Clases", fecha: "28 Dic 2025", estado: "pendiente" },
    {
      evento: "Ingreso de Notas",
      fecha: "29-31 Dic 2025",
      estado: "pendiente",
    },
  ];

  const cronogramaPagos = {
    // Para quienes ingresaron DESDE 2022-2 hasta 2025-I
    maestria: {
      matricula: { monto: "S/ 400.00", fecha: "12/08/2025" },
      pensiones: [
        { cuota: "1°", monto: "S/ 600.00", fecha: "Hasta 30/08/2025" },
        { cuota: "2°", monto: "S/ 600.00", fecha: "30/09/2025" },
        { cuota: "3°", monto: "S/ 600.00", fecha: "30/10/2025" },
        { cuota: "4°", monto: "S/ 600.00", fecha: "30/11/2025" },
      ],
    },
    doctorado: {
      matricula: { monto: "S/ 500.00", fecha: "12/08/2025" },
      pensiones: [
        { cuota: "1°", monto: "S/ 750.00", fecha: "Hasta 30/08/2025" },
        { cuota: "2°", monto: "S/ 750.00", fecha: "30/09/2025" },
        { cuota: "3°", monto: "S/ 750.00", fecha: "30/10/2025" },
        { cuota: "4°", monto: "S/ 750.00", fecha: "30/11/2025" },
      ],
    },

    // Para quienes ingresaron ANTES del 2022-2
    maestria_ant: {
      matricula: { monto: "S/ 400.00", fecha: "12/08/2025" },
      pensiones: [
        { cuota: "1°", monto: "S/ 600.00", fecha: "Hasta 30/08/2025" },
        { cuota: "2°", monto: "S/ 600.00", fecha: "30/09/2025" },
        { cuota: "3°", monto: "S/ 600.00", fecha: "30/10/2025" },
        { cuota: "4°", monto: "S/ 600.00", fecha: "30/11/2025" },
        { cuota: "5°", monto: "S/ 600.00", fecha: "15/12/2025" },
      ],
    },
    doctorado_ant: {
      matricula: { monto: "S/ 500.00", fecha: "12/08/2025" },
      pensiones: [
        { cuota: "1°", monto: "S/ 750.00", fecha: "Hasta 30/08/2025" },
        { cuota: "2°", monto: "S/ 750.00", fecha: "30/09/2025" },
        { cuota: "3°", monto: "S/ 750.00", fecha: "30/10/2025" },
        { cuota: "4°", monto: "S/ 750.00", fecha: "30/11/2025" },
        { cuota: "5°", monto: "S/ 750.00", fecha: "15/12/2025" },
      ],
    },
  };

  const procesoMatricula = [
    {
      paso: 1,
      titulo: "Verificar Requisitos",
      descripcion: "Confirmar pagos al día y documentos actualizados",
      icono: MdCheckCircle,
      color: "#081B42",
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

  const programas = {
    especializacion: [
      {
        nombre: "Maestría Profesional en Didáctica en la Matemática",
        clave: "didactica-matematica",
        cursos: [
          // CICLO 1
          // plan 2023 - semipresencial
          {
          "curso": "Introducción a la Didáctica de las Matemáticas",
          "horario": "Domingo 08:00 - 10:30",
          "docente": "Carlos Díaz Serruche",
          "aula": "13C",
          "credito": 3,
          "seccion": 1,
          "ciclo": 1
        },
        {
          "curso": "Didáctica del Álgebra y Aritmética",
          "horario": "Domingo 10:30 - 13:30",
          "docente": "Ángel Salvatierra Melgar",
          "aula": "13C",
          "credito": 4,
          "seccion": 1,
          "ciclo": 1
        },
        {
          "curso": "Didáctica de la Geometría y Trigonometría",
          "horario": "Sábado 16:00 - 19:00",
          "docente": "Alex Molina Sotomayor",
          "aula": "13C",
          "credito": 4,
          "seccion": 1,
          "ciclo": 1
        },
        {
          "curso": "Tecnologías en la Enseñanza de las Matemáticas",
          "horario": "Sábado 13:00 - 16:00",
          "docente": "Iván Ángel Encalada Díaz",
          "aula": "13C",
          "credito": 4,
          "seccion": 1,
          "ciclo": 1
        },
        {
          "curso": "Tópicos de Cálculo I",
          "horario": "Domingo 14:30 - 17:30",
          "docente": "Luis Alberto Gómez Robles",
          "aula": "13C",
          "credito": 4,
          "seccion": 1,
          "ciclo": 1
        },
        {
          "curso": "Seminario de Investigación en Educación Matemática",
          "horario": "Sábado 08:00 - 12:00",
          "docente": "Fidel Antonio Chauca Vidal",
          "aula": "13C",
          "credito": 5,
          "seccion": 1,
          "ciclo": 1
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
            "curso": "Sociolingüística",
            "horario": "Domingo 08:00 - 12:00",
            "docente": "Milagritos Josefina Saavedra Jaramillo de Sedamano",
            "aula": "Lab. de Inglés",
            "credito": 5,
            "seccion": 1,
            "ciclo": 1
          },
          {
            "curso": "Del Texto a Escena",
            "horario": "Sábado 13:00 - 17:00",
            "docente": "Eliana Vásquez Colichón",
            "aula": "Lab. de Inglés",
            "credito": 5,
            "seccion": 1,
            "ciclo": 1
          },
          {
            "curso": "Storytelling Educactivo",
            "horario": "Domingo 13:00 - 16:00",
            "docente": "Dante Rafael Aguinaga Villegas",
            "aula": "Lab. de Inglés",
            "credito": 4,
            "seccion": 1,
            "ciclo": 1
          },
          {
            "curso": "Literatura y Culturas Amazónicas",
            "horario": "Sábado 17:00 - 20:00",
            "docente": "Manuel Alberto Sedamano Ballesteros",
            "aula": "Lab. de Inglés",
            "credito": 4,
            "seccion": 1,
            "ciclo": 1
          },
          {
            "curso": "Metodología de Investigación",
            "horario": "Sábado 08:00 - 12:30",
            "docente": "Fidel Antonio Chauca Vidal",
            "aula": "Lab. de Inglés",
            "credito": 6,
            "seccion": 1,
            "ciclo": 1
          },
          // CICLO 2
          // plan 2023 - semipresencial
          {
            "curso": "Procesos Pedagógicos",
            "horario": "Sábado 08:00 - 12:30",
            "docente": "Dante Rafael Aguinaga Villegas",
            "aula": "3B",
            "credito": 6,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "Procesos Didácticos de la Oralidad",
            "horario": "Domingo 14:00 - 17:00",
            "docente": "Eliana Vásquez Colichón",
            "aula": "3B",
            "credito": 4,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "Inteligencia Artificial y Comunicación Educativa",
            "horario": "Sábado 14:00 - 17:00",
            "docente": "Manuel Alberto Sedamano Ballesteros",
            "aula": "3B",
            "credito": 4,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "Procesos Didácticos de la Lectura",
            "horario": "Sábado 17:00 - 20:00",
            "docente": "Milagritos Josefina Saavedra Jaramillo de Sedamano",
            "aula": "3B",
            "credito": 4,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "Elaboración de Artículos",
            "horario": "Sábado 08:00 - 12:30",
            "docente": "Doris Elida Fuster Guillén",
            "aula": "3B",
            "credito": 5,
            "seccion": 1,
            "ciclo": 2
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
            "curso": "EDUCACIÓN SOCIO-AFECTIVA",
            "horario": "Domingo 8:00 - 11:00",
            "docente": "ESTHER MARIZA VELARDE CONSOLI",
            "aula": "2 (EPEF)",
            "credito": 4,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "CALIDAD DE LAS ORGANIZACIONES EDUCATIVAS",
            "horario": "Sábado 8:00 - 11:00",
            "docente": "HERNANDO DIAZ ANDIA",
            "aula": "2 (EPEF)",
            "credito": 4,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "GESTIÓN DE LA EDUCACIÓN VIRTUAL",
            "horario": "Sábado 11:00 - 14:00",
            "docente": "JIMMY DÍAZ MANRIQUE",
            "aula": "2 (EPEF)",
            "credito": 4,
            "seccion": 1,
            "ciclo": 2
          },
          {
            "curso": "FUNDAMENTOS DE LA INVESTIGACIÓN CIENTÍFICA: METODOLOGÍA DE LA INVESTIGACIÓN. PRODUCTO: DISEÑO DEL PROYECTO DE INVESTIGACIÓN",
            "horario": "Sábado 15:00 - 19:30",
            "docente": "DULIO OSEDA GAGO",
            "aula": "2 (EPEF)",
            "credito": 6,
            "seccion": 1,
            "ciclo": 2
          },
          // CICLO 3
          // PLAN 2023 - PRESENCIAL
          {
            "curso": "DESARROLLO DE LA INVESTIGACIÓN II: ASPECTOS METODOLÓGICOS. PRODUCTO: INFORME DE TRABAJO DE CAMPO",
            "horario": "Sab 13:30 - 16:30 | Dom 11:00 - 14:00",
            "docente": "JESSICA PAOLA PALACIOS GARAY",
            "aula": "3 (EPEF)",
            "credito": 8,
            "seccion": 1,
            "ciclo": 4
          },
          {
            "curso": "ASESORÍA DE TESIS II: RETROALIMENTACIÓN SOBRE EL DESARROLLO DE LA TESIS",
            "horario": "Sab 8:00 - 12:30 | Dom 8:00 - 11:00",
            "docente": "ELÍA MEJÍA MEJÍA",
            "aula": "3 (EPEF)",
            "credito": 10,
            "seccion": 1,
            "ciclo": 4
          },
          // CICLO 5
          // PLAN 2023 - PRESENCIAL
          {
            "curso": "DESARROLLO DE LA INVESTIGACIÓN III: REDACCIÓN DE TESIS. PRODUCTO: INFORME PRELIMINAR DE TESIS",
            "horario": "Sab 13:30 - 16:30 | Dom 12:30 - 15:30",
            "docente": "DORIS ELIDA FUSTER GUILLEN",
            "aula": "4 (EPEF)",
            "credito": 8,
            "seccion": 1,
            "ciclo": 5
          },
          {
            "curso": "ASESORÍA DE TESIS III: RETROALIMENTACIÓN SOBRE LA REDACCIÓN DE TESIS",
            "horario": "Sab 8:00 - 12:30 | Dom 8:00 - 11:00",
            "docente": "JESSICA PAOLA PALACIOS GARAY",
            "aula": "4 (EPEF)",
            "credito": 10,
            "seccion": 1,
            "ciclo": 5
          },
          // CICLO 6
          // PLAN 2023 - PRESENCIAL
          {
            "curso": "DESARROLLO DE LA INVESTIGACIÓN IV: INFORME Y SUSTENTACIÓN DE TESIS. PRODUCTO: INFORME DE TESIS DOCTORAL TERMINADA.",
            "horario": "Sab 13:00 - 16:30 | Dom 8:00 - 11:00",
            "docente": "YOLVI JAVIER OCAÑA FERNÁNDEZ",
            "aula": "10B",
            "credito": 8,
            "seccion": 1,
            "ciclo": 6
          },
          {
            "curso": "ASESORÍA DE TESIS IV: RETROALIMENTACIÓN PARA ELABORAR EL INFORME Y SUSTENTACIÓN DE TESIS.",
            "horario": "Sab 8:00 - 12:00 | Dom 11:00 - 13:00",
            "docente": "LUIS ALBERTO NÚÑEZ LIRA",
            "aula": "10B",
            "credito": 10,
            "seccion": 1,
            "ciclo": 6
          },
        ],
      },
    ],
  };

   useEffect(() => {
    const path = location.pathname;
    if (path.includes('/cronograma-academico')) {
      setActiveSection('cronograma-academico');
    } else if (path.includes('/cronograma-pagos')) {
      setActiveSection('cronograma-pagos');
    } else if (path.includes('/proceso-matricula')) {
      setActiveSection('proceso-matricula');
    } else if (path.includes('/horario-cursos')) {
      setActiveSection('horario-cursos');
    } else {
      // Por defecto, mostrar cronograma académico
      setActiveSection('cronograma-academico');
    }
  }, [location]);


  
  // --- Hooks ---
  // Sincroniza el programa seleccionado por defecto al cambiar el tipo
  useEffect(() => {
    const programasFiltrados = programas[selectedProgramType];
    if (programasFiltrados && !selectedProgramKey) {
      setSelectedProgramKey(programasFiltrados[0].clave);
    }
  }, [selectedProgramType, selectedProgramKey]);

  // --- Funciones de utilidad ---
  const getStatusColor = (estado) => {
    switch (estado) {
      case "activo":
        return "#07A852";
      case "proximo":
        return "#7E899E";
      case "pendiente":
        return "#959595";
      default:
        return "#EFEFEF";
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "activo":
        return MdCheckCircle;
      case "proximo":
        return MdWarning;
      case "pendiente":
        return MdSchedule;
      default:
        return MdInfo;
    }
  };

  // --- Render funciones ---
  const renderCronogramaAcademico = () => (
    <div className="space-y-6">
      <div className="bg-unmsm-blue/5 border-l-4 border-unmsm-blue p-6  rounded-r-lg">
        <div className="flex items-start">
          <MdInfo className="text-unmsm-blue text-2xl mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-unmsm-navy mb-2">
              Período Académico 2025-II
            </h3>
            <p className="text-unmsm-muted">
              Consulta las fechas importantes del semestre académico actual.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {cronogramaAcademico.map((item, index) => {
          const StatusIcon = getStatusIcon(item.estado);
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="p-3 rounded-full"
                    style={{
                      backgroundColor: `${getStatusColor(item.estado)}20`,
                    }}
                  >
                    <StatusIcon
                      className="text-xl"
                      style={{ color: getStatusColor(item.estado) }}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.evento}
                    </h4>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MdCalendarToday className="text-sm mr-1" />
                      {item.fecha}
                    </p>
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getStatusColor(item.estado) }}
                >
                  {item.estado === "activo"
                    ? "En Curso"
                    : item.estado === "proximo"
                    ? "Próximo"
                    : "Programado"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCronogramaPagos = () => (
    <div className="space-y-6">
      <div className="bg-unmsm-blue/5 border-l-4 border-unmsm-blue p-6 rounded-r-lg">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start">
            <MdPayment className="text-unmsm-blue text-2xl mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-unmsm-navy mb-2">
                Cronograma de Pagos 2025-II
              </h3>
              <p className="text-unmsm-muted">
                Montos y fechas de pago según tu programa de estudios.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedProgram("maestria")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgram === "maestria"
                  ? "bg-unmsm-blue text-white"
                  : "bg-white text-unmsm-navy border border-unmsm-line hover:bg-unmsm-bg"
              }`}
            >
              Maestría
            </button>
            <button
              onClick={() => setSelectedProgram("doctorado")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgram === "doctorado"
                  ? "bg-unmsm-blue text-white"
                  : "bg-white text-unmsm-navy border border-unmsm-line hover:bg-unmsm-bg"
              }`}
            >
              Doctorado
            </button>
          </div>
        </div>
      </div>

      {/* Selección de antigüedad */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <MdInfo className="text-unmsm-green text-xl mr-2" />
          <h4 className="font-semibold text-gray-800">¿Cuándo ingresaste?</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setIsAnterior(false)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              !isAnterior
                ? "border-unmsm-navy bg-unmsm-bg text-unmsm-navy"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">Ingresé despues 2022-2</div>
            <div className="text-sm text-gray-600">Pago en 4 cuotas</div>
          </button>
          <button
            onClick={() => setIsAnterior(true)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              isAnterior
                ? "border-unmsm-navy bg-unmsm-bg text-unmsm-navy"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">Ingresé antes de 2022-2</div>
            <div className="text-sm text-gray-600">Pago en 5 cuotas</div>
          </button>
        </div>
      </div>

      {/* Matrícula y Pensiones */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matrícula */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-unmsm-blue/10 rounded-full mr-4">
              <MdSchool className="text-unmsm-blue text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Matrícula</h4>
              <p className="text-gray-600 text-sm">Pago único por semestre</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-800">
                {
                  cronogramaPagos[
                    `${selectedProgram}${isAnterior ? "_ant" : ""}`
                  ]?.matricula?.monto
                }
              </span>
              <span className="text-sm text-gray-600">
                Hasta{" "}
                {
                  cronogramaPagos[
                    `${selectedProgram}${isAnterior ? "_ant" : ""}`
                  ]?.matricula?.fecha
                }
              </span>
            </div>
          </div>
        </div>

        {/* Pensiones */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-unmsm-green/15 rounded-full mr-4">
              <MdCalendarToday className="text-unmsm-green text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Pensiones</h4>
              <p className="text-gray-600 text-sm">Pagos mensuales</p>
            </div>
          </div>
          <div className="space-y-3">
            {(
              cronogramaPagos[`${selectedProgram}${isAnterior ? "_ant" : ""}`]
                ?.pensiones || []
            ).map((pension, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
              >
                <span className="font-medium text-gray-700">
                  {pension.cuota} Cuota
                </span>
                <div className="text-right">
                  <div className="font-bold text-gray-800">{pension.monto}</div>
                  <div className="text-sm text-gray-600">{pension.fecha}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Información importante */}
      <div className="bg-unmsm-green/10 border border-unmsm-green/30 rounded-xl p-6">
        <h4 className="font-semibold text-unmsm-blue mb-3 flex items-center">
          <MdWarning className="mr-2" />
          Información Importante
        </h4>
        <div className="space-y-2 text-unmsm-text">
          <p>
            • Plataforma de pago: <strong>San Market UNMSM</strong>
          </p>
          <p>
            • Enviar comprobante a:{" "}
            <strong className="break-all">controldepagosupg.fe@unmsm.edu.pe</strong>
          </p>
          <p>
            • Con copia a: <strong className="break-all">upg.educacion@unmsm.edu.pe</strong>
          </p>
        </div>
        <button className="mt-4 bg-unmsm-green text-white font-semibold px-6 py-2 rounded-lg hover:bg-unmsm-green-800 transition-colors flex items-center">
          <MdDownload className="mr-2" />
          <a href="https://sanmarket.unmsm.edu.pe/" target="_blank" rel="noopener noreferrer" >Ir a San Market</a>
          
        </button>
      </div>
    </div>
  );

  const renderProcesoMatricula = () => (
    <div className="space-y-6">
      <div className="bg-unmsm-blue/5 border-l-4 border-unmsm-blue p-6  rounded-r-lg">
        <div className="flex items-start">
          <MdEdit className="text-unmsm-blue text-2xl mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-unmsm-navy mb-2">
              Proceso de Matrícula Virtual
            </h3>
            <p className="text-unmsm-muted">
              Guía paso a paso para completar tu matrícula en el SUM.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {procesoMatricula.map((paso, index) => {
          const IconComponent = paso.icono;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: paso.color }}
                  >
                    {paso.paso}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <IconComponent
                      className="text-xl mr-2"
                      style={{ color: paso.color }}
                    />
                    <h4 className="text-lg font-semibold text-gray-800">
                      {paso.titulo}
                    </h4>
                  </div>
                  <p className="text-gray-600">{paso.descripcion}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Enlaces y Contactos
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <a
              href="https://sum.unmsm.edu.pe/alumnoWebSum/v2/inicio" target="_blank" rel="noopener noreferrer"
              className="flex items-center text-unmsm-navy hover:text-unmsm-blue transition-colors"
            >
              <MdClass className="mr-2" />
              Acceder al SUM
            </a>
            <a
              href="https://manual-de-usuario.pdf" target="_blank" rel="noopener noreferrer"
              className="flex items-center text-unmsm-navy hover:text-unmsm-blue transition-colors"
            >
              <MdDownload className="mr-2" />
              Descargar Manual de Usuario
            </a>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MdEmail className="mr-2" />
              upg.educacion@unmsm.edu.pe
            </div>
            <div className="flex items-center text-gray-600">
              <MdPhone className="mr-2" />
              Mesa de Partes - Trámites
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHorarioCursos = () => {
    // Obtener todos los programas de maestría (especialización + investigación)
    const maestrias = [
      ...programas.especializacion,
      ...programas.investigacion,
    ];
    const programasPorTipo =
      tipoPrograma === "maestria" ? maestrias : programas.doctorado;

    // Inicializar selección si no hay nada

    // Filtrar cursos según término de búsqueda
    const programaActual = programasPorTipo.find(
      (p) => p.clave === selectedPrograma
    );

    const filteredCursos = (programaActual?.cursos || []).filter(
      (curso) =>
        curso.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.aula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.horario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar por ciclo
    const cursosOrdenados = [...filteredCursos].sort(
      (a, b) => a.ciclo - b.ciclo
    );

    // Obtener ciclos únicos
    const ciclos = [...new Set(cursosOrdenados.map((c) => c.ciclo))];

    // Función para obtener nombre del ciclo
    const getCicloNombre = (ciclo) => {
      return `CICLO ${ciclo}`;
    };

    return (
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="bg-unmsm-blue/5 border-l-4 border-unmsm-blue p-6  rounded-r-lg">
          <div className="flex items-start">
            <MdAccessTime className="text-unmsm-blue text-2xl mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-unmsm-navy mb-2">
                Horarios de Cursos 2025-II
              </h3>
              <p className="text-unmsm-muted">
                Selecciona tu tipo de programa y luego el programa específico.
              </p>
            </div>
          </div>
        </div>

        {/* Selección de tipo: Maestría / Doctorado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Tipo de Programa</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setTipoPrograma("maestria")}
              className={`px-6 py-4 rounded-xl font-medium transition-colors text-center ${
                tipoPrograma === "maestria"
                  ? "bg-unmsm-blue text-white"
                  : "bg-unmsm-gray text-unmsm-text hover:bg-unmsm-line"
              }`}
            >
              Maestría
            </button>
            <button
              onClick={() => setTipoPrograma("doctorado")}
              className={`px-6 py-4 rounded-xl font-medium transition-colors text-center ${
                tipoPrograma === "doctorado"
                  ? "bg-unmsm-blue text-white"
                  : "bg-unmsm-gray text-unmsm-text hover:bg-unmsm-line"
              }`}
            >
              Doctorado
            </button>
          </div>
        </div>

        {/* Lista de programas seleccionables */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-800 mb-4">
            Selecciona tu Programa
          </h4>
          <div className="space-y-3">
            {programasPorTipo.map((prog) => (
              <button
                key={prog.clave}
                onClick={() => setSelectedPrograma(prog.clave)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors text-sm ${
                  selectedPrograma === prog.clave
                    ? "border-unmsm-navy bg-unmsm-bg text-unmsm-navy"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {prog.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Buscador */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-500 text-lg" />
            </div>
            <input
              type="text"
              placeholder="Buscar curso, docente, aula o horario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
            />
          </div>

          {/* Tabla de cursos */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Docente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aula
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Créd.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sec.
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cursosOrdenados.length > 0 ? (
                  // Usar un estado interno para rastrear ciclos ya mostrados
                  ciclos.map((ciclo) => {
                    const cursosDelCiclo = cursosOrdenados.filter(
                      (curso) => curso.ciclo === ciclo
                    );
                    return (
                      <React.Fragment key={ciclo}>
                        {/* Separador (una vez por ciclo) */}
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-2 text-center text-sm font-semibold text-gray-700 bg-unmsm-bg border-t-2 border-gray-200"
                          >
                            {getCicloNombre(ciclo)}
                          </td>
                        </tr>
                        {/* Cursos del ciclo */}
                        {cursosDelCiclo.map((curso, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {curso.curso}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div className="flex items-center">
                                <MdAccessTime className="mr-1 text-unmsm-muted" />
                                {curso.horario}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div className="flex items-center">
                                <MdPerson className="mr-1 text-unmsm-muted" />
                                {curso.docente}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div className="flex items-center">
                                <MdClass className="mr-1 text-unmsm-muted" />
                                {curso.aula}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {curso.credito}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {curso.seccion}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No se encontraron cursos que coincidan con "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="bg-unmsm-blue/5 border border-unmsm-blue/20 rounded-xl p-6">
          <h4 className="font-semibold text-unmsm-navy mb-3 flex items-center">
            <MdInfo className="mr-2" />
            Información Adicional
          </h4>
          <div className="space-y-2 text-unmsm-muted text-sm">
            <p>
              • Los horarios pueden estar sujetos a cambios según disponibilidad
              de aulas y docentes
            </p>
            <p>
              • Para cursos con modalidad virtual, se informará el enlace de
              acceso oportunamente
            </p>
            <p>
              • Contacta a la coordinación académica para consultas específicas
              sobre horarios
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "cronograma-academico":
        return renderCronogramaAcademico();
      case "cronograma-pagos":
        return renderCronogramaPagos();
      case "proceso-matricula":
        return renderProcesoMatricula();
      case "horario-cursos":
        return renderHorarioCursos();
      default:
        return renderCronogramaAcademico();
    }
  };

  return (
    
    <div className="min-h-screen bg-unmsm-bg ">
      <div className="bg-gradient-to-r from-unmsm-blue to-unmsm-navy text-white py-30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Matrícula 2025-II
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Sigue de cerca los detalles y el proceso de tu matrícula
          </p>
          {/* <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-[#4E8440] px-4 py-2 rounded-full">
              <span className="font-semibold">Inscripciones:</span> 15 Jul - 08
              Ago
            </div>
            <div className="bg-[#4E8440] px-4 py-2 rounded-full">
              <span className="font-semibold">Examen:</span> 20 - 25 Agosto
            </div>
            <div className="bg-[#4E8440] px-4 py-2 rounded-full">
              <span className="font-semibold">Resultados:</span> 05 Septiembre
            </div>
          </div> */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">Secciones</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-unmsm-bg text-unmsm-navy border-l-4"
                          : "text-gray-600 hover:bg-unmsm-bg hover:text-unmsm-navy"
                      }`}
                      style={
                        activeSection === section.id
                          ? { borderLeftColor: section.color }
                          : {}
                      }
                    >
                      <IconComponent
                        className="text-lg flex-shrink-0"
                        style={{
                          color:
                            activeSection === section.id
                              ? section.color
                              : "inherit",
                        }}
                      />
                      <span className="font-medium text-sm">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
              <div className="p-8">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatriculaView;
