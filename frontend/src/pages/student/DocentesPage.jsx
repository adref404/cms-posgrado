import React, { useState } from 'react';
import { 
  MdSearch,
  MdFilterList,
  MdViewModule,
  MdTableChart,
  MdPerson,
  MdEmail,
  MdPhone,
  MdSchool,
  MdWork,
  MdLocationOn,
  MdAccessTime,
  MdStar,
  MdStarBorder,
  MdClose,
  MdAccountBalance,
  MdVerifiedUser,
  MdBusinessCenter,
  MdBook,
  MdScience,
  MdLanguage,
  MdArticle,
  MdGrade,
  MdWorkOutline,
  MdPersonSearch
} from 'react-icons/md';
import { 
  FaGraduationCap,
  FaUniversity,
  FaResearchgate,
  FaGoogle,
  FaLinkedin,
  FaWhatsapp,
  FaClock,
  FaAward
} from 'react-icons/fa';

const DocentesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [selectedFilters, setSelectedFilters] = useState({
    especialidad: '',
    grado: '',
    investigacion: ''
  });
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  // Datos de autoridades principales
  const autoridades = [
    {
      id: 'decano',
      nombre: 'Dr. Damián Raúl Islas Mondragón',
      cargo: 'Decano',
      foto: '/images/autoridades/decano.jpg',
      email: 'decano.educacion@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3021',
      horario: 'Lunes a Viernes: 9:00 AM - 1:00 PM',
      descripcion: 'Doctor en Educación con más de 20 años de experiencia en gestión educativa y investigación pedagógica.',
      especialidades: ['Gestión Educativa', 'Pedagogía', 'Investigación Educativa'],
      grado: 'Doctor',
      experiencia: '20+ años'
    },
    {
      id: 'director',
      nombre: 'Dr. Miguel Inga Arias',
      cargo: 'Director de la Unidad de Posgrado',
      foto: '/images/autoridades/director.jpg',
      email: 'postgrado.educacion@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3025',
      horario: 'Lunes a Viernes: 8:00 AM - 12:00 PM',
      descripcion: 'Doctor en Educación especializado en currículum y evaluación educativa, con amplia trayectoria en programas de posgrado.',
      especialidades: ['Currículum Educativo', 'Evaluación', 'Administración Educativa'],
      grado: 'Doctor',
      experiencia: '18+ años'
    }
  ];

  // Datos de coordinadores y docentes
  const docentes = [
    {
      id: 1,
      nombre: 'Dra. María Elena Gonzales Ruiz',
      cargo: 'Coordinadora de Maestría en Docencia Universitaria',
      especialidades: ['Docencia Universitaria', 'Pedagogía Superior', 'Evaluación Educativa'],
      grado: 'Doctora en Educación',
      email: 'mgonzales@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3030',
      experiencia: '15 años',
      lineas_investigacion: ['Pedagogía Universitaria', 'Innovación Educativa', 'Formación Docente'],
      publicaciones: 35,
      orcid: '0000-0002-1234-5678',
      horario_atencion: 'Martes y Jueves: 3:00 PM - 6:00 PM',
      researchgate: 'https://researchgate.net/profile/maria-gonzales',
      descripcion: 'Especialista en pedagogía universitaria con amplia experiencia en formación de docentes de educación superior.',
      foto: '/images/docentes/maria-gonzales.jpg',
      es_coordinador: true,
      programa: 'Maestría en Docencia Universitaria'
    },
    {
      id: 2,
      nombre: 'Dr. Carlos Alberto Mendoza Castro',
      cargo: 'Coordinador de Maestría en Educación Matemática',
      especialidades: ['Educación Matemática', 'Didáctica', 'Tecnología Educativa'],
      grado: 'Doctor en Educación',
      email: 'cmendoza@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3031',
      experiencia: '12 años',
      lineas_investigacion: ['Didáctica de la Matemática', 'TIC en Educación', 'Pensamiento Matemático'],
      publicaciones: 28,
      orcid: '0000-0003-2345-6789',
      horario_atencion: 'Lunes y Miércoles: 2:00 PM - 5:00 PM',
      researchgate: 'https://researchgate.net/profile/carlos-mendoza',
      descripcion: 'Investigador en educación matemática con enfoque en metodologías innovadoras de enseñanza.',
      foto: '/images/docentes/carlos-mendoza.jpg',
      es_coordinador: true,
      programa: 'Maestría en Educación Matemática'
    },
    {
      id: 3,
      nombre: 'Dra. Ana Lucía Vargas Torres',
      cargo: 'Docente Principal',
      especialidades: ['Psicología Educativa', 'Desarrollo Cognitivo', 'Neuroeducación'],
      grado: 'Doctora en Psicología Educativa',
      email: 'avargas@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3032',
      experiencia: '20 años',
      lineas_investigacion: ['Neurociencia Educativa', 'Desarrollo Cognitivo', 'Aprendizaje'],
      publicaciones: 42,
      orcid: '0000-0004-3456-7890',
      horario_atencion: 'Miércoles y Viernes: 4:00 PM - 7:00 PM',
      researchgate: 'https://researchgate.net/profile/ana-vargas',
      descripcion: 'Especialista en neuroeducación y procesos cognitivos del aprendizaje.',
      foto: '/images/docentes/ana-vargas.jpg',
      es_coordinador: false,
      programa: 'Múltiples programas'
    },
    {
      id: 4,
      nombre: 'Mg. Roberto Silva Huamán',
      cargo: 'Docente Asociado',
      especialidades: ['Historia de la Educación', 'Pedagogía Social', 'Educación Intercultural'],
      grado: 'Maestro en Educación',
      email: 'rsilva@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3033',
      experiencia: '8 años',
      lineas_investigacion: ['Educación Intercultural', 'Historia Educativa', 'Inclusión Educativa'],
      publicaciones: 18,
      orcid: '0000-0005-4567-8901',
      horario_atencion: 'Lunes y Jueves: 1:00 PM - 4:00 PM',
      researchgate: 'https://researchgate.net/profile/roberto-silva',
      descripcion: 'Investigador en educación intercultural y historia de la pedagogía en el Perú.',
      foto: '/images/docentes/roberto-silva.jpg',
      es_coordinador: false,
      programa: 'Maestría en Educación Intercultural'
    },
    {
      id: 5,
      nombre: 'Dr. Luis Fernando Rojas Sánchez',
      cargo: 'Coordinador del Doctorado en Educación',
      especialidades: ['Investigación Educativa', 'Metodología', 'Epistemología'],
      grado: 'Doctor en Educación',
      email: 'lrojas@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3034',
      experiencia: '22 años',
      lineas_investigacion: ['Epistemología Educativa', 'Metodología de Investigación', 'Filosofía de la Educación'],
      publicaciones: 58,
      orcid: '0000-0006-5678-9012',
      horario_atencion: 'Martes y Viernes: 9:00 AM - 12:00 PM',
      researchgate: 'https://researchgate.net/profile/luis-rojas',
      descripcion: 'Director de tesis doctorales y especialista en metodología de investigación educativa.',
      foto: '/images/docentes/luis-rojas.jpg',
      es_coordinador: true,
      programa: 'Doctorado en Educación'
    },
    {
      id: 6,
      nombre: 'Dra. Patricia Morales Delgado',
      cargo: 'Docente Principal',
      especialidades: ['Educación Especial', 'Inclusión Educativa', 'Discapacidad y Educación'],
      grado: 'Doctora en Educación Especial',
      email: 'pmorales@unmsm.edu.pe',
      telefono: '619-7000 Anexo 3035',
      experiencia: '16 años',
      lineas_investigacion: ['Educación Inclusiva', 'Discapacidad', 'Necesidades Especiales'],
      publicaciones: 31,
      orcid: '0000-0007-6789-0123',
      horario_atencion: 'Lunes y Miércoles: 10:00 AM - 1:00 PM',
      researchgate: 'https://researchgate.net/profile/patricia-morales',
      descripcion: 'Especialista en educación inclusiva y atención a la diversidad educativa.',
      foto: '/images/docentes/patricia-morales.jpg',
      es_coordinador: false,
      programa: 'Maestría en Educación Especial'
    },
    // {
    //   id: 7,
    //   nombre: 'Dra. María Elena Gonzales Ruiz',
    //   cargo: 'Coordinadora de Maestría en Docencia Universitaria',
    //   especialidades: ['Docencia Universitaria', 'Pedagogía Superior', 'Evaluación Educativa'],
    //   grado: 'Doctora en Educación',
    //   email: 'mgonzales@unmsm.edu.pe',
    //   telefono: '619-7000 Anexo 3030',
    //   experiencia: '15 años',
    //   lineas_investigacion: ['Pedagogía Universitaria', 'Innovación Educativa', 'Formación Docente'],
    //   publicaciones: 35,
    //   orcid: '0000-0002-1234-5678',
    //   horario_atencion: 'Martes y Jueves: 3:00 PM - 6:00 PM',
    //   researchgate: 'https://researchgate.net/profile/maria-gonzales',
    //   descripcion: 'Especialista en pedagogía universitaria con amplia experiencia en formación de docentes de educación superior.',
    //   foto: '/images/docentes/maria-gonzales.jpg',
    //   es_coordinador: true,
    //   programa: 'Maestría en Docencia Universitaria'
    // },
    // {
    //   id: 8,
    //   nombre: 'Dr. Carlos Alberto Mendoza Castro',
    //   cargo: 'Coordinador de Maestría en Educación Matemática',
    //   especialidades: ['Educación Matemática', 'Didáctica', 'Tecnología Educativa'],
    //   grado: 'Doctor en Educación',
    //   email: 'cmendoza@unmsm.edu.pe',
    //   telefono: '619-7000 Anexo 3031',
    //   experiencia: '12 años',
    //   lineas_investigacion: ['Didáctica de la Matemática', 'TIC en Educación', 'Pensamiento Matemático'],
    //   publicaciones: 28,
    //   orcid: '0000-0003-2345-6789',
    //   horario_atencion: 'Lunes y Miércoles: 2:00 PM - 5:00 PM',
    //   researchgate: 'https://researchgate.net/profile/carlos-mendoza',
    //   descripcion: 'Investigador en educación matemática con enfoque en metodologías innovadoras de enseñanza.',
    //   foto: '/images/docentes/carlos-mendoza.jpg',
    //   es_coordinador: true,
    //   programa: 'Maestría en Educación Matemática'
    // },
    // {
    //   id: 9,
    //   nombre: 'Dra. Ana Lucía Vargas Torres',
    //   cargo: 'Docente Principal',
    //   especialidades: ['Psicología Educativa', 'Desarrollo Cognitivo', 'Neuroeducación'],
    //   grado: 'Doctora en Psicología Educativa',
    //   email: 'avargas@unmsm.edu.pe',
    //   telefono: '619-7000 Anexo 3032',
    //   experiencia: '20 años',
    //   lineas_investigacion: ['Neurociencia Educativa', 'Desarrollo Cognitivo', 'Aprendizaje'],
    //   publicaciones: 42,
    //   orcid: '0000-0004-3456-7890',
    //   horario_atencion: 'Miércoles y Viernes: 4:00 PM - 7:00 PM',
    //   researchgate: 'https://researchgate.net/profile/ana-vargas',
    //   descripcion: 'Especialista en neuroeducación y procesos cognitivos del aprendizaje.',
    //   foto: '/images/docentes/ana-vargas.jpg',
    //   es_coordinador: false,
    //   programa: 'Múltiples programas'
    // },
    // {
    //   id: 10,
    //   nombre: 'Mg. Roberto Silva Huamán',
    //   cargo: 'Docente Asociado',
    //   especialidades: ['Historia de la Educación', 'Pedagogía Social', 'Educación Intercultural'],
    //   grado: 'Maestro en Educación',
    //   email: 'rsilva@unmsm.edu.pe',
    //   telefono: '619-7000 Anexo 3033',
    //   experiencia: '8 años',
    //   lineas_investigacion: ['Educación Intercultural', 'Historia Educativa', 'Inclusión Educativa'],
    //   publicaciones: 18,
    //   orcid: '0000-0005-4567-8901',
    //   horario_atencion: 'Lunes y Jueves: 1:00 PM - 4:00 PM',
    //   researchgate: 'https://researchgate.net/profile/roberto-silva',
    //   descripcion: 'Investigador en educación intercultural y historia de la pedagogía en el Perú.',
    //   foto: '/images/docentes/roberto-silva.jpg',
    //   es_coordinador: false,
    //   programa: 'Maestría en Educación Intercultural'
    // },
    // {
    //   id: 11,
    //   nombre: 'Dr. Luis Fernando Rojas Sánchez',
    //   cargo: 'Coordinador del Doctorado en Educación',
    //   especialidades: ['Investigación Educativa', 'Metodología', 'Epistemología'],
    //   grado: 'Doctor en Educación',
    //   email: 'lrojas@unmsm.edu.pe',
    //   telefono: '619-7000 Anexo 3034',
    //   experiencia: '22 años',
    //   lineas_investigacion: ['Epistemología Educativa', 'Metodología de Investigación', 'Filosofía de la Educación'],
    //   publicaciones: 58,
    //   orcid: '0000-0006-5678-9012',
    //   horario_atencion: 'Martes y Viernes: 9:00 AM - 12:00 PM',
    //   researchgate: 'https://researchgate.net/profile/luis-rojas',
    //   descripcion: 'Director de tesis doctorales y especialista en metodología de investigación educativa.',
    //   foto: '/images/docentes/luis-rojas.jpg',
    //   es_coordinador: true,
    //   programa: 'Doctorado en Educación'
    // },
    // {
    //   id: 12,
    //   nombre: 'Dra. Patricia Morales Delgado',
    //   cargo: 'Docente Principal',
    //   especialidades: ['Educación Especial', 'Inclusión Educativa', 'Discapacidad y Educación'],
    //   grado: 'Doctora en Educación Especial',
    //   email: 'pmorales@unmsm.edu.pe',
    //   telefono: '619-7000 Anexo 3035',
    //   experiencia: '16 años',
    //   lineas_investigacion: ['Educación Inclusiva', 'Discapacidad', 'Necesidades Especiales'],
    //   publicaciones: 31,
    //   orcid: '0000-0007-6789-0123',
    //   horario_atencion: 'Lunes y Miércoles: 10:00 AM - 1:00 PM',
    //   researchgate: 'https://researchgate.net/profile/patricia-morales',
    //   descripcion: 'Especialista en educación inclusiva y atención a la diversidad educativa.',
    //   foto: '/images/docentes/patricia-morales.jpg',
    //   es_coordinador: false,
    //   programa: 'Maestría en Educación Especial'
    // }
  ];

  // Filtros únicos para los selectores
  const especialidadesUnicas = [...new Set(docentes.flatMap(d => d.especialidades))];
  const gradosUnicos = [...new Set(docentes.map(d => d.grado))];
  const lineasInvestigacion = [...new Set(docentes.flatMap(d => d.lineas_investigacion))];

  // Filtrar docentes según búsqueda y filtros
  const docentesFiltrados = docentes.filter(docente => {
    const matchesSearch = docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         docente.especialidades.some(esp => esp.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         docente.lineas_investigacion.some(linea => linea.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEspecialidad = !selectedFilters.especialidad || 
                               docente.especialidades.includes(selectedFilters.especialidad);
    
    const matchesGrado = !selectedFilters.grado || docente.grado === selectedFilters.grado;
    
    const matchesInvestigacion = !selectedFilters.investigacion || 
                                docente.lineas_investigacion.includes(selectedFilters.investigacion);

    return matchesSearch && matchesEspecialidad && matchesGrado && matchesInvestigacion;
  });

  // Manejar favoritos
  const toggleFavorito = (docenteId) => {
    setFavoritos(prev => 
      prev.includes(docenteId) 
        ? prev.filter(id => id !== docenteId)
        : [...prev, docenteId]
    );
  };

  // Componente de Modal para detalles del docente
  const DocenteModal = ({ docente, onClose }) => {
    if (!docente) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Información Detallada</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="text-xl text-gray-600" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#880E1F] to-[#6B0F1A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdPerson className="text-5xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{docente.nombre}</h3>
                  <p className="text-[#880E1F] font-medium mb-4">{docente.cargo}</p>
                  
                  <button
                    onClick={() => toggleFavorito(docente.id)}
                    className="flex items-center gap-2 mx-auto bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    {favoritos.includes(docente.id) ? (
                      <MdStar className="text-yellow-500" />
                    ) : (
                      <MdStarBorder className="text-gray-500" />
                    )}
                    <span className="text-sm">
                      {favoritos.includes(docente.id) ? 'En Favoritos' : 'Agregar a Favoritos'}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Información Personal</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <MdSchool className="text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Grado Académico</p>
                        <p className="font-medium">{docente.grado}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdWork className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Experiencia</p>
                        <p className="font-medium">{docente.experiencia}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdEmail className="text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-sm">{docente.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdPhone className="text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Teléfono</p>
                        <p className="font-medium">{docente.telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Descripción</h4>
                  <p className="text-gray-600 leading-relaxed">{docente.descripcion}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Especialidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {docente.especialidades.map((esp, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Líneas de Investigación</h4>
                  <div className="flex flex-wrap gap-2">
                    {docente.lineas_investigacion.map((linea, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {linea}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <MdArticle className="text-blue-600" />
                      Publicaciones
                    </h5>
                    <p className="text-2xl font-bold text-blue-600">{docente.publicaciones}</p>
                    <p className="text-sm text-gray-600">Artículos científicos</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <MdAccessTime className="text-orange-600" />
                      Horario de Atención
                    </h5>
                    <p className="text-sm text-gray-700">{docente.horario_atencion}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Enlaces Académicos</h4>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={docente.researchgate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#00D2AA] text-white px-4 py-2 rounded-lg hover:bg-[#00B89A] transition-colors"
                    >
                      <FaResearchgate />
                      <span className="text-sm">ResearchGate</span>
                    </a>
                    <button className="flex items-center gap-2 bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#3367D6] transition-colors">
                      <FaGoogle />
                      <span className="text-sm">Google Scholar</span>
                    </button>
                    <button className="flex items-center gap-2 bg-[#A6CE39] text-white px-4 py-2 rounded-lg hover:bg-[#8FB832] transition-colors">
                      <MdVerifiedUser />
                      <span className="text-sm">ORCID</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar autoridades
  const renderAutoridades = () => (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Autoridades</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Conozca a las principales autoridades de la Facultad de Educación
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {autoridades.map((autoridad) => (
          <div key={autoridad.id} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#880E1F] to-[#6B0F1A] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUniversity className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{autoridad.nombre}</h3>
              <p className="text-[#880E1F] font-semibold text-lg mb-4">{autoridad.cargo}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{autoridad.descripcion}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <MdEmail className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{autoridad.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdPhone className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{autoridad.telefono}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdAccessTime className="text-orange-600 flex-shrink-0" />
                <span className="text-gray-700">{autoridad.horario}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800 mb-2">Especialidades:</h5>
              <div className="flex flex-wrap gap-2">
                {autoridad.especialidades.map((esp, index) => (
                  <span key={index} className="bg-[#880E1F] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {esp}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2">
              <MdEmail />
              Contactar
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar card de docente
  const renderDocenteCard = (docente) => (
    <div key={docente.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 bg-gradient-to-br from-[#880E1F] to-[#6B0F1A] rounded-full flex items-center justify-center flex-shrink-0">
            <MdPerson className="text-2xl text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{docente.nombre}</h3>
            <p className="text-[#880E1F] font-medium text-sm mb-2">{docente.cargo}</p>
            <p className="text-gray-600 text-sm">{docente.grado}</p>
          </div>
        </div>
        
        <button
          onClick={() => toggleFavorito(docente.id)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {favoritos.includes(docente.id) ? (
            <MdStar className="text-yellow-500" />
          ) : (
            <MdStarBorder className="text-gray-400" />
          )}
        </button>
      </div>
      
      <div className="space-y-3 mb-4">
        <div>
          <h5 className="font-medium text-gray-800 text-sm mb-1">Especialidades:</h5>
          <div className="flex flex-wrap gap-1">
            {docente.especialidades.slice(0, 2).map((esp, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {esp}
              </span>
            ))}
            {docente.especialidades.length > 2 && (
              <span className="text-xs text-gray-500">+{docente.especialidades.length - 2} más</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <MdWork className="text-green-600" />
            <span>{docente.experiencia}</span>
          </div>
          <div className="flex items-center gap-1">
            <MdArticle className="text-blue-600" />
            <span>{docente.publicaciones} publicaciones</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedDocente(docente)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          Ver Más
        </button>
        <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
          <FaWhatsapp className="text-sm" />
        </button>
      </div>
    </div>
  );

  // Renderizar tabla de docentes
  const renderDocentesTable = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-800">Docente</th>
              <th className="text-left p-4 font-semibold text-gray-800">Cargo</th>
              <th className="text-left p-4 font-semibold text-gray-800">Especialidades</th>
              <th className="text-left p-4 font-semibold text-gray-800">Experiencia</th>
              <th className="text-left p-4 font-semibold text-gray-800">Publicaciones</th>
              <th className="text-center p-4 font-semibold text-gray-800">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {docentesFiltrados.map((docente) => (
              <tr key={docente.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#880E1F] to-[#6B0F1A] rounded-full flex items-center justify-center">
                      <MdPerson className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{docente.nombre}</p>
                      <p className="text-sm text-gray-600">{docente.grado}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-800">{docente.cargo}</p>
                  {docente.es_coordinador && (
                    <span className="inline-block bg-[#880E1F] text-white px-2 py-1 rounded text-xs mt-1">
                      Coordinador
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {docente.especialidades.slice(0, 2).map((esp, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {esp}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-700">{docente.experiencia}</td>
                <td className="p-4 text-sm text-gray-700">{docente.publicaciones}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedDocente(docente)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                      title="Ver detalles"
                    >
                      <MdPersonSearch className="text-sm" />
                    </button>
                    <button
                      onClick={() => toggleFavorito(docente.id)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      title="Agregar a favoritos"
                    >
                      {favoritos.includes(docente.id) ? (
                        <MdStar className="text-yellow-500" />
                      ) : (
                        <MdStarBorder className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-[#880E1F] to-[#6B0F1A] text-white py-30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plana Docente 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Facultad de Educación - Universidad Nacional Mayor de San Marcos
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">{docentes.length}</span> Docentes Registrados
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">{especialidadesUnicas.length}</span> Especialidades
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">{docentes.filter(d => d.es_coordinador).length}</span> Coordinadores
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Sección de Autoridades */}
        {renderAutoridades()}

        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Búsqueda */}
            <div className="relative flex-1 w-full lg:w-auto">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Buscar por nombre, especialidad o línea de investigación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedFilters.especialidad}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, especialidad: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Todas las especialidades</option>
                {especialidadesUnicas.map(esp => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>

              <select
                value={selectedFilters.grado}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, grado: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Todos los grados</option>
                {gradosUnicos.map(grado => (
                  <option key={grado} value={grado}>{grado}</option>
                ))}
              </select>

              <select
                value={selectedFilters.investigacion}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, investigacion: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Todas las líneas</option>
                {lineasInvestigacion.map(linea => (
                  <option key={linea} value={linea}>{linea}</option>
                ))}
              </select>
            </div>

            {/* Toggle de vista */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'cards' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MdViewModule />
                <span className="text-sm font-medium">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MdTableChart />
                <span className="text-sm font-medium">Tabla</span>
              </button>
            </div>
          </div>

          {/* Mostrar filtros activos */}
          {(selectedFilters.especialidad || selectedFilters.grado || selectedFilters.investigacion || searchTerm) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Búsqueda: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:bg-blue-200 rounded-full p-0.5">
                    <MdClose className="text-xs" />
                  </button>
                </span>
              )}
              {selectedFilters.especialidad && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {selectedFilters.especialidad}
                  <button onClick={() => setSelectedFilters(prev => ({ ...prev, especialidad: '' }))} className="ml-1 hover:bg-green-200 rounded-full p-0.5">
                    <MdClose className="text-xs" />
                  </button>
                </span>
              )}
              {selectedFilters.grado && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {selectedFilters.grado}
                  <button onClick={() => setSelectedFilters(prev => ({ ...prev, grado: '' }))} className="ml-1 hover:bg-purple-200 rounded-full p-0.5">
                    <MdClose className="text-xs" />
                  </button>
                </span>
              )}
              {selectedFilters.investigacion && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {selectedFilters.investigacion}
                  <button onClick={() => setSelectedFilters(prev => ({ ...prev, investigacion: '' }))} className="ml-1 hover:bg-orange-200 rounded-full p-0.5">
                    <MdClose className="text-xs" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilters({ especialidad: '', grado: '', investigacion: '' });
                }}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Limpiar todos
              </button>
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Coordinadores y Docentes
            </h2>
            <p className="text-gray-600">
              {docentesFiltrados.length} de {docentes.length} docentes
            </p>
          </div>
        </div>

        {/* Vista de docentes */}
        {viewMode === 'cards' ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {docentesFiltrados.map(renderDocenteCard)}
          </div>
        ) : (
          renderDocentesTable()
        )}

        {/* Sin resultados */}
        {docentesFiltrados.length === 0 && (
          <div className="text-center py-12">
            <MdPersonSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron docentes</h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda o eliminar algunos criterios.
            </p>
          </div>
        )}
      </div>

      {/* Sección de estadísticas */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Estadísticas de la Plana Docente</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                {docentes.filter(d => d.grado.includes('Doctor')).length}
              </h3>
              <p className="text-gray-600">Doctores</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSchool className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {docentes.filter(d => d.grado.includes('Maestr')).length}
              </h3>
              <p className="text-gray-600">Maestros</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#880E1F] to-[#6B0F1A] rounded-full flex items-center justify-center mx-auto mb-4">
                <MdWorkOutline className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#880E1F] mb-2">
                {docentes.filter(d => d.es_coordinador).length}
              </h3>
              <p className="text-gray-600">Coordinadores</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdArticle className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2">
                {docentes.reduce((sum, d) => sum + d.publicaciones, 0)}
              </h3>
              <p className="text-gray-600">Publicaciones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#880E1F] to-[#6B0F1A] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Buscas Asesoría Académica?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nuestros docentes están disponibles para orientarte en tu formación académica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#880E1F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contactar Coordinación
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#880E1F] transition-colors">
              Ver Horarios de Atención
            </button>
          </div>
        </div>
      </div>

      {/* Modal de docente */}
      <DocenteModal 
        docente={selectedDocente} 
        onClose={() => setSelectedDocente(null)} 
      />
    </div>
  );
};

export default DocentesPage;