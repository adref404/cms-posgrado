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
      color: "#4E8440",
    },
    {
      id: "cronograma-pagos",
      title: "Cronograma de Pagos",
      icon: MdPayment,
      color: "#4E8440",
    },
    {
      id: "proceso-matricula",
      title: "Proceso de Matrícula",
      icon: MdEdit,
      color: "#4E8440",
    },
    {
      id: "horario-cursos",
      title: "Horario de Cursos",
      icon: MdAccessTime,
      color: "#4E8440",
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
          // CICLO 1
          {
            curso: "Fundamentos de Didáctica Matemática",
            horario: "Lunes 17:00 - 19:00",
            docente: "Dr. Luis Mendoza",
            aula: "A-101",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Epistemología de la Matemática",
            horario: "Miércoles 17:00 - 19:00",
            docente: "Dr. Carlos Ramírez",
            aula: "A-102",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Metodología de la Investigación Educativa",
            horario: "Viernes 17:00 - 19:00",
            docente: "Dra. María González",
            aula: "A-103",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Psicología del Aprendizaje Matemático",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Roberto Silva",
            aula: "A-104",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Tecnologías en la Enseñanza de Matemáticas",
            horario: "Martes 17:00 - 19:00",
            docente: "Dra. Elena Rojas",
            aula: "Lab-01",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Evaluación del Aprendizaje Matemático",
            horario: "Jueves 17:00 - 19:00",
            docente: "Dr. Jorge Martínez",
            aula: "A-105",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Diseño Curricular en Matemáticas",
            horario: "Viernes 17:00 - 19:00",
            docente: "Dra. Patricia Vargas",
            aula: "A-106",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Trabajo de Investigación",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dr. Luis Mendoza",
            aula: "A-107",
            credito: 6,
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
            curso: "Teorías de la Comunicación en el Aula",
            horario: "Lunes 18:00 - 20:00",
            docente: "Dra. Ana Flores",
            aula: "B-101",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Lingüística Aplicada a la Educación",
            horario: "Miércoles 18:00 - 20:00",
            docente: "Dr. Fernando Torres",
            aula: "B-102",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Metodología de la Investigación en Comunicación",
            horario: "Viernes 18:00 - 20:00",
            docente: "Dra. Carmen López",
            aula: "B-103",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Psicología de la Comunicación Educativa",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Miguel Herrera",
            aula: "B-104",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Innovación Pedagógica",
            horario: "Martes 18:00 - 20:00",
            docente: "Dr. Roberto Díaz",
            aula: "B-105",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Medios Digitales en la Educación",
            horario: "Jueves 18:00 - 20:00",
            docente: "Dra. Sofía Morales",
            aula: "Lab-02",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Evaluación de la Comunicación Educativa",
            horario: "Viernes 18:00 - 20:00",
            docente: "Dr. Andrés Castillo",
            aula: "B-106",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Proyecto de Innovación Educativa",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dra. Ana Flores",
            aula: "B-107",
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
        cursos: [
          // CICLO 1
          {
            curso: "Políticas Educativas",
            horario: "Lunes 19:00 - 21:00",
            docente: "Dr. Carlos Ruiz",
            aula: "C-201",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Teorías de la Administración Educativa",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dra. Isabel García",
            aula: "C-202",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Metodología de la Investigación I",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. José Gómez",
            aula: "C-203",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Estadística Aplicada a la Educación",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Ricardo Mendoza",
            aula: "Lab-03",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Liderazgo Directivo",
            horario: "Martes 19:00 - 21:00",
            docente: "Dra. Patricia Mendoza",
            aula: "C-204",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Planeamiento Estratégico Educativo",
            horario: "Jueves 19:00 - 21:00",
            docente: "Dr. Manuel Torres",
            aula: "C-205",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Metodología de la Investigación II",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. José Gómez",
            aula: "C-206",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Gestión de Recursos Humanos en Educación",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dra. Carmen Vásquez",
            aula: "C-207",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          // CICLO 3
          {
            curso: "Evaluación Institucional",
            horario: "Lunes 19:00 - 21:00",
            docente: "Dr. Raúl Jiménez",
            aula: "C-208",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Gestión Financiera en Instituciones Educativas",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dra. Mónica Salazar",
            aula: "C-209",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Seminario de Tesis I",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. Carlos Ruiz",
            aula: "C-210",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Gestión de la Calidad Educativa",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Alberto Ramos",
            aula: "C-211",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          // CICLO 4
          {
            curso: "Seminario de Tesis II",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dr. Carlos Ruiz",
            aula: "C-212",
            credito: 6,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso: "Tesis de Maestría",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. José Gómez",
            aula: "C-213",
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
          // CICLO 1
          {
            curso: "Pedagogía Universitaria",
            horario: "Lunes 19:00 - 21:00",
            docente: "Dra. María López",
            aula: "D-301",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Epistemología de la Educación Superior",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dr. Francisco Herrera",
            aula: "D-302",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Metodología de la Investigación I",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. Alejandro Vega",
            aula: "D-303",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Psicología del Adulto y Aprendizaje",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dra. Gloria Paredes",
            aula: "D-304",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Metodología del Aprendizaje Universitario",
            horario: "Martes 19:00 - 21:00",
            docente: "Dr. Jorge Alvarado",
            aula: "D-305",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Diseño Curricular Universitario",
            horario: "Jueves 19:00 - 21:00",
            docente: "Dra. Susana Flores",
            aula: "D-306",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Metodología de la Investigación II",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. Alejandro Vega",
            aula: "D-307",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Tecnología Educativa en Educación Superior",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dr. Diego Moreno",
            aula: "Lab-04",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          // CICLO 3
          {
            curso: "Evaluación del Aprendizaje Universitario",
            horario: "Lunes 19:00 - 21:00",
            docente: "Dr. Hugo Castañeda",
            aula: "D-308",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Gestión Universitaria",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dra. Beatriz Román",
            aula: "D-309",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Seminario de Tesis I",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dra. María López",
            aula: "D-310",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Ética Profesional y Responsabilidad Social",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Ernesto Silva",
            aula: "D-311",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          // CICLO 4
          {
            curso: "Seminario de Tesis II",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dra. María López",
            aula: "D-312",
            credito: 6,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso: "Tesis de Maestría",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Jorge Alvarado",
            aula: "D-313",
            credito: 8,
            seccion: 1,
            ciclo: 4,
          },
        ],
      },
      {
        nombre:
          "Maestría en Educación con mención en Evaluación y Acreditación de la Calidad",
        clave: "evaluacion-calidad",
        cursos: [
          // CICLO 1
          {
            curso: "Fundamentos de la Calidad Educativa",
            horario: "Lunes 19:00 - 21:00",
            docente: "Dr. José Gómez",
            aula: "E-401",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Teorías de la Evaluación Educativa",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dra. Pilar Mendoza",
            aula: "E-402",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Metodología de la Investigación I",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. Fernando Castro",
            aula: "E-403",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Estadística para la Investigación Educativa",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Mario Delgado",
            aula: "Lab-05",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Sistemas de Acreditación",
            horario: "Martes 19:00 - 21:00",
            docente: "Dra. Lucía Ríos",
            aula: "E-404",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Modelos de Evaluación Institucional",
            horario: "Jueves 19:00 - 21:00",
            docente: "Dr. Víctor Heredia",
            aula: "E-405",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Metodología de la Investigación II",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. Fernando Castro",
            aula: "E-406",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Auditoría Académica",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dra. Rosa Campos",
            aula: "E-407",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          // CICLO 3
          {
            curso: "Indicadores de Calidad Educativa",
            horario: "Lunes 19:00 - 21:00",
            docente: "Dr. Enrique Vargas",
            aula: "E-408",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Mejora Continua en Educación",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dra. Claudia Torres",
            aula: "E-409",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Seminario de Tesis I",
            horario: "Viernes 19:00 - 21:00",
            docente: "Dr. José Gómez",
            aula: "E-410",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Certificación y Normalización Educativa",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Ramiro Espinoza",
            aula: "E-411",
            credito: 3,
            seccion: 1,
            ciclo: 3,
          },
          // CICLO 4
          {
            curso: "Seminario de Tesis II",
            horario: "Miércoles 19:00 - 21:00",
            docente: "Dr. José Gómez",
            aula: "E-412",
            credito: 6,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso: "Tesis de Maestría",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dra. Lucía Ríos",
            aula: "E-413",
            credito: 8,
            seccion: 1,
            ciclo: 4,
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
            curso: "Epistemología de la Educación",
            horario: "Lunes 19:00 - 22:00",
            docente: "Dr. Herrera Mejía",
            aula: "F-501",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Teorías Contemporáneas de la Educación",
            horario: "Miércoles 19:00 - 22:00",
            docente: "Dr. Campos Ruiz",
            aula: "F-502",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Metodología de Investigación Avanzada I",
            horario: "Viernes 19:00 - 22:00",
            docente: "Dr. Morales Pérez",
            aula: "F-503",
            credito: 4,
            seccion: 1,
            ciclo: 1,
          },
          {
            curso: "Seminario Doctoral I",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Luis Mendoza",
            aula: "F-504",
            credito: 3,
            seccion: 1,
            ciclo: 1,
          },
          // CICLO 2
          {
            curso: "Filosofía de la Educación",
            horario: "Martes 19:00 - 22:00",
            docente: "Dr. Jiménez Castro",
            aula: "F-505",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Investigación Avanzada en Educación",
            horario: "Jueves 19:00 - 22:00",
            docente: "Dr. Carlos Ruiz",
            aula: "F-506",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Metodología de Investigación Avanzada II",
            horario: "Viernes 19:00 - 22:00",
            docente: "Dr. Morales Pérez",
            aula: "F-507",
            credito: 4,
            seccion: 1,
            ciclo: 2,
          },
          {
            curso: "Seminario Doctoral II",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dr. Herrera Mejía",
            aula: "F-508",
            credito: 3,
            seccion: 1,
            ciclo: 2,
          },
          // CICLO 3
          {
            curso: "Metodología Cualitativa Avanzada",
            horario: "Lunes 19:00 - 22:00",
            docente: "Dr. Andrés Villareal",
            aula: "F-509",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Metodología Cuantitativa Avanzada",
            horario: "Miércoles 19:00 - 22:00",
            docente: "Dr. Roberto Sánchez",
            aula: "Lab-06",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Seminario Doctoral III",
            horario: "Viernes 19:00 - 22:00",
            docente: "Dr. Campos Ruiz",
            aula: "F-510",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          {
            curso: "Proyecto de Tesis Doctoral I",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Luis Mendoza",
            aula: "F-511",
            credito: 4,
            seccion: 1,
            ciclo: 3,
          },
          // CICLO 4
          {
            curso: "Análisis de Datos Avanzado",
            horario: "Martes 19:00 - 22:00",
            docente: "Dr. Miguel Herrera",
            aula: "Lab-07",
            credito: 3,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso: "Seminario Doctoral IV",
            horario: "Jueves 19:00 - 22:00",
            docente: "Dr. Jiménez Castro",
            aula: "F-512",
            credito: 4,
            seccion: 1,
            ciclo: 4,
          },
          {
            curso: "Proyecto de Tesis Doctoral II",
            horario: "Sábado 14:00 - 18:00",
            docente: "Dr. Carlos Ruiz",
            aula: "F-513",
            credito: 6,
            seccion: 1,
            ciclo: 4,
          },
          // CICLO 5
          {
            curso: "Seminario Doctoral V",
            horario: "Miércoles 19:00 - 22:00",
            docente: "Dr. Morales Pérez",
            aula: "F-514",
            credito: 4,
            seccion: 1,
            ciclo: 5,
          },
          {
            curso: "Desarrollo de Tesis Doctoral I",
            horario: "Viernes 19:00 - 22:00",
            docente: "Dr. Herrera Mejía",
            aula: "F-515",
            credito: 8,
            seccion: 1,
            ciclo: 5,
          },
          {
            curso: "Publicación Científica",
            horario: "Sábado 08:00 - 12:00",
            docente: "Dr. Fernando Castro",
            aula: "F-516",
            credito: 3,
            seccion: 1,
            ciclo: 5,
          },
          // CICLO 6
          {
            curso: "Desarrollo de Tesis Doctoral II",
            horario: "Miércoles 19:00 - 22:00",
            docente: "Dr. Luis Mendoza",
            aula: "F-517",
            credito: 10,
            seccion: 1,
            ciclo: 6,
          },
          {
            curso: "Sustentación de Tesis Doctoral",
            horario: "Sábado 08:00 - 12:00",
            docente: "Comité Doctoral",
            aula: "Auditorio",
            credito: 4,
            seccion: 1,
            ciclo: 6,
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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6  rounded-r-lg">
        <div className="flex items-start">
          <MdInfo className="text-blue-600 text-2xl mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Período Académico 2025-II
            </h3>
            <p className="text-blue-700">
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
                  ? "bg-[#4E8440] text-white"
                  : "bg-white text-[#4E8440] border border-[#93BBA4] hover:bg-blue-50"
              }`}
            >
              Maestría
            </button>
            <button
              onClick={() => setSelectedProgram("doctorado")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedProgram === "doctorado"
                  ? "bg-[#4E8440] text-white"
                  : "bg-white text-[#4E8440] border border-[#93BBA4] hover:bg-blue-50"
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
                ? "border-[#4E8440] bg-blue-50 text-[#4E8440]"
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
                ? "border-[#4E8440] bg-blue-50 text-[#4E8440]"
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
          <a href="https://sanmarket.unmsm.edu.pe/" target="_blank" rel="noopener noreferrer" >Ir a San Market</a>
          
        </button>
      </div>
    </div>
  );

  const renderProcesoMatricula = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6  rounded-r-lg">
        <div className="flex items-start">
          <MdEdit className="text-blue-600 text-2xl mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Proceso de Matrícula Virtual
            </h3>
            <p className="text-blue-700">
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
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <MdClass className="mr-2" />
              Acceder al SUM
            </a>
            <a
              href="https://manual-de-usuario.pdf" target="_blank" rel="noopener noreferrer"
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
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6  rounded-r-lg">
          <div className="flex items-start">
            <MdAccessTime className="text-blue-600 text-2xl mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Horarios de Cursos 2025-II
              </h3>
              <p className="text-blue-700">
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
                  ? "bg-[#4E8440] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Maestría
            </button>
            <button
              onClick={() => setTipoPrograma("doctorado")}
              className={`px-6 py-4 rounded-xl font-medium transition-colors text-center ${
                tipoPrograma === "doctorado"
                  ? "bg-[#4E8440] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
            {/* {programasPorTipo.map((prog) => (
              <button
                key={prog.clave}
                onClick={() => setSelectedPrograma(prog.clave)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors text-sm ${
                  selectedPrograma === prog.clave
                    ? "border-[#93BBA4] bg-[#F6F7F8] text-[#93BBA4]"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {prog.nombre}
              </button>
            ))} */}
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
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className="px-6 py-2 text-center text-sm font-semibold text-gray-700 bg-[#F6F7F8] border-t-2 border-gray-200"
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <MdInfo className="mr-2" />
            Información Adicional
          </h4>
          <div className="space-y-2 text-blue-700 text-sm">
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
    
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-gradient-to-r from-[#1C1B3B] to-[#1C1B3B] text-white py-30">
        <div className="max-w-6xl mx-auto px- text-center">
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
