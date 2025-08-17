import React, { useState, useEffect } from "react";
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
  MdSearch // 👈 Añade esto
} from "react-icons/md";

const MatriculaView = () => {
  const [activeSection, setActiveSection] = useState("cronograma-academico");
  const [selectedProgramType, setSelectedProgramType] = useState("especializacion"); // especializacion | investigacion | doctorado
  const [selectedProgramKey, setSelectedProgramKey] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState("maestria"); // maestria | doctorado
  const [isAnterior, setIsAnterior] = useState(false); // si es anterior a 2022-2
  const [searchTerm, setSearchTerm] = useState(''); // Para el buscador de horarios

  // --- Datos ---
  const sections = [
    {
      id: "cronograma-academico",
      title: "Cronograma Académico",
      icon: MdSchedule,
      color: "#4E8440",
    },
    {
      id: "cronograma-pagos",
      title: "Cronograma de Pagos",
      icon: MdPayment,
      color: "#1B253C",
    },
    {
      id: "proceso-matricula",
      title: "Proceso de Matrícula",
      icon: MdEdit,
      color: "#1C1B3B",
    },
    {
      id: "horario-cursos",
      title: "Horario de Cursos",
      icon: MdAccessTime,
      color: "#B48E0C",
    },
  ];

  const cronogramaAcademico = [
    {
      evento: "Matrícula Virtual",
      fecha: "22 Ago - 02 Sep 2025",
      estado: "activo",
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
      color: "#4E8440",
    },
    {
      paso: 2,
      titulo: "Acceder al SUM",
      descripcion: "Ingresar con usuario y contraseña al sistema",
      icono: MdPerson,
      color: "#1B253C",
    },
    {
      paso: 3,
      titulo: "Seleccionar Cursos",
      descripcion: "Elegir asignaturas según programa académico",
      icono: MdBook,
      color: "#1C1B3B",
    },
    {
      paso: 4,
      titulo: "Confirmar Matrícula",
      descripcion: "Revisar y confirmar la selección de cursos",
      icono: MdEdit,
      color: "#B48E0C",
    },
  ];

  const programas = {
    especializacion: [
      {
        nombre: "Maestría Profesional en Didáctica en la Matemática",
        clave: "didactica-matematica",
        cursos: [
          {
            curso: "Fundamentos de Didáctica Matemática",
            horario: "Lunes 17:00 - 19:00",
            docente: "Dr. Luis Mendoza",
            aula: "A-101",
          },
          {
            curso: "Tecnologías en la Enseñanza de Matemáticas",
            horario: "Miércoles 17:00 - 19:00",
            docente: "Dra. Elena Rojas",
            aula: "Lab. Informática 2",
          },
        ],
      },
      {
        nombre:
          "Maestría Profesional en Didáctica de la Comunicación e Innovación",
        clave: "didactica-comunicacion",
        cursos: [
          {
            curso: "Teorías de la Comunicación en el Aula",
            horario: "Martes 18:00 - 20:00",
            docente: "Dra. Ana Flores",
            aula: "A-102",
          },
          {
            curso: "Innovación Pedagógica",
            horario: "Jueves 18:00 - 20:00",
            docente: "Dr. Roberto Díaz",
            aula: "A-103",
          },
        ],
      },
    ],
    investigacion: [
      {
        nombre: "Maestría en Educación con mención en Gestión de la Educación",
        clave: "gestion-educacion",
        cursos: [
          {
            curso: "Políticas Educativas",
            horario: "Lun 19:00-21:00",
            docente: "Dr. Carlos Ruiz",
            aula: "B-201",
          },
          {
            curso: "Liderazgo Directivo",
            horario: "Mié 19:00-21:00",
            docente: "Dra. Patricia Mendoza",
            aula: "B-202",
          },
        ],
      },
      {
        nombre: "Maestría en Educación con mención en Docencia Universitaria",
        clave: "docencia-universitaria",
        cursos: [
          {
            curso: "Metodología del Aprendizaje",
            horario: "Mar 19:00-21:00",
            docente: "Dra. María López",
            aula: "B-203",
          },
          {
            curso: "Evaluación del Aprendizaje",
            horario: "Jue 19:00-21:00",
            docente: "Dr. Jorge Alvarado",
            aula: "B-204",
          },
        ],
      },
      {
        nombre:
          "Maestría en Educación con mención en Evaluación y Acreditación de la Calidad",
        clave: "evaluacion-calidad",
        cursos: [
          {
            curso: "Sistemas de Acreditación",
            horario: "Vie 19:00-21:00",
            docente: "Dr. José Gómez",
            aula: "B-205",
          },
          {
            curso: "Indicadores de Calidad",
            horario: "Sáb 09:00-13:00",
            docente: "Dra. Lucía Ríos",
            aula: "B-206",
          },
          {
            curso: "Indicadores de Seguridad",
            horario: "Sáb 10:00-14:00",
            docente: "Dra. Lucía Ríos",
            aula: "B-206",
          },
        ],
      },
    ],
    doctorado: [
      {
        nombre: "Doctorado en Educación y Docencia Universitaria",
        clave: "doctorado-educacion",
        cursos: [
          {
            curso: "Investigación Avanzada en Educación",
            horario: "Mar 19:00-22:00",
            docente: "Dr. Herrera Mejía",
            aula: "D-401",
          },
          {
            curso: "Teorías Contemporáneas",
            horario: "Jue 19:00-22:00",
            docente: "Dr. Campos Ruiz",
            aula: "D-402",
          },
          {
            curso: "Seminario Doctoral I",
            horario: "Sáb 14:00-18:00",
            docente: "Dr. Morales Pérez",
            aula: "D-403",
          },
          {
            curso: "Metodología Cualitativa",
            horario: "Dom 08:00-12:00",
            docente: "Dr. Jiménez Castro",
            aula: "D-404",
          },
        ],
      },
    ],
  };

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
        return "#4E8440";
      case "proximo":
        return "#B48E0C";
      case "pendiente":
        return "#93BBA4";
      default:
        return "#F6F7F8";
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
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <MdInfo className="text-green-600 text-2xl mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Período Académico 2025-II
            </h3>
            <p className="text-green-700">
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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <MdPayment className="text-blue-600 text-2xl mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Cronograma de Pagos 2025-II
              </h3>
              <p className="text-blue-700">
                Montos y fechas de pago según tu programa de estudios.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedProgram("maestria")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgram === "maestria"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              Maestría
            </button>
            <button
              onClick={() => setSelectedProgram("doctorado")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgram === "doctorado"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
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
          <MdInfo className="text-yellow-500 text-xl mr-2" />
          <h4 className="font-semibold text-gray-800">¿Cuándo ingresaste?</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setIsAnterior(false)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              !isAnterior
                ? "border-blue-500 bg-blue-50 text-blue-800"
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
                ? "border-blue-500 bg-blue-50 text-blue-800"
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
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <MdSchool className="text-red-600 text-xl" />
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
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <MdCalendarToday className="text-green-600 text-xl" />
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
          <MdWarning className="mr-2" />
          Información Importante
        </h4>
        <div className="space-y-2 text-yellow-700">
          <p>
            • Plataforma de pago: <strong>San Market UNMSM</strong>
          </p>
          <p>
            • Enviar comprobante a:{" "}
            <strong>controldepagosupg.fe@unmsm.edu.pe</strong>
          </p>
          <p>
            • Con copia a: <strong>upg.educacion@unmsm.edu.pe</strong>
          </p>
        </div>
        <button className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center">
          <MdDownload className="mr-2" />
          Ir a San Market
        </button>
      </div>
    </div>
  );

  const renderProcesoMatricula = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <MdEdit className="text-purple-600 text-2xl mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Proceso de Matrícula Virtual
            </h3>
            <p className="text-purple-700">
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
              href="#"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <MdClass className="mr-2" />
              Acceder al SUM
            </a>
            <a
              href="#"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
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
  // Obtener programas según el tipo seleccionado
  const getProgramasPorTipo = () => {
    switch (selectedProgramType) {
      case 'especializacion':
        return programas.especializacion;
      case 'investigacion':
        return programas.investigacion;
      case 'doctorado':
        return programas.doctorado;
      default:
        return [];
    }
  };

  const programasDisponibles = getProgramasPorTipo();
    const programaActual = programasDisponibles.find(p => p.clave === selectedProgramKey);
    const cursosActuales = programaActual?.cursos || [];

  // Filtrar cursos según término de búsqueda
  const filteredCursos = cursosActuales.filter(curso =>
    curso.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curso.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curso.aula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curso.horario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Encabezado con selección de tipo */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start">
            <MdAccessTime className="text-amber-600 text-2xl mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Horarios de Cursos 2025-II</h3>
              <p className="text-amber-700">Selecciona tu tipo de programa y luego el programa específico.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedProgramType('especializacion')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgramType === 'especializacion'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              Especialización
            </button>
            <button
              onClick={() => setSelectedProgramType('investigacion')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgramType === 'investigacion'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              Investigación
            </button>
            <button
              onClick={() => setSelectedProgramType('doctorado')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgramType === 'doctorado'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              Doctorado
            </button>
          </div>
        </div>
      </div>

      {/* Selección de programa específico (combo) */}
      {programasDisponibles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Selecciona tu Programa</h4>
          <select
            value={selectedProgramKey || ''}
            onChange={(e) => setSelectedProgramKey(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {programasDisponibles.map((prog) => (
              <option key={prog.clave} value={prog.clave}>
                {prog.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

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
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabla de cursos */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Docente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aula</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCursos.length > 0 ? (
                filteredCursos.map((curso, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{curso.curso}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <MdAccessTime className="mr-1 text-amber-500" />
                        {curso.horario}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <MdPerson className="mr-1 text-blue-500" />
                        {curso.docente}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <MdClass className="mr-1 text-green-500" />
                        {curso.aula}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 
                      `No se encontraron cursos que coincidan con "${searchTerm}"` : 
                      'No hay cursos disponibles para este programa'
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
          <MdInfo className="mr-2" />
          Información Adicional
        </h4>
        <div className="space-y-2 text-blue-700 text-sm">
          <p>• Los horarios pueden estar sujetos a cambios según disponibilidad de aulas y docentes</p>
          <p>• Para cursos con modalidad virtual, se informará el enlace de acceso oportunamente</p>
          <p>• Contacta a la coordinación académica para consultas específicas sobre horarios</p>
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Matrícula</h1>
          <p className="text-gray-600 text-lg">
            Gestiona tu proceso de matrícula para el semestre 2025-II
          </p>
        </div>

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
                          ? "bg-gray-100 text-gray-800 border-l-4"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
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
