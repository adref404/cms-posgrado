import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdSchool,
  MdPeople,
  MdSchedule,
  MdLibraryBooks,
  MdEdit,
  MdPayment,
  MdPersonSearch,
  MdHelpOutline,
  MdInfo,
  MdBadge,
  MdDescription,
  MdArticle,
  MdEvent,
  MdCampaign,
  MdWorkspacePremium,
  MdCardMembership
} from "react-icons/md";
import universidadLogo from "../../assets/logo-upg.webp";

// Prefijos de ruta por grupo del menú, para resaltar la sección activa.
const RUTAS_ACTIVAS = {
  nosotros: ["/nosotros"],
  programas: ["/programas"],
  noticias: ["/noticias", "/eventos", "/comunicados"],
  matricula: ["/matricula"],
  informacion: ["/informacion-academica"],
  tramites: ["/tramites"],
};

function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    nosotros: false,
    programas: false,
    matricula: false,
    informacion: false,
    noticias: false,
    tramites: false
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        closeAllDropdowns();
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    const handleClickOutside = (event) => {
      const isDesktop = window.innerWidth >= 768;
      const clickedInsideNav = event.target.closest('nav');
      const clickedInsideMobileMenu = event.target.closest('[data-mobile-menu]');
      
      if (isDesktop && !clickedInsideNav && !clickedInsideMobileMenu) {
        closeAllDropdowns();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu]
    }));
  };

  // Solo desktop (mouse): abrir al pasar por encima, sin esperar un clic.
  const openDropdownOnHover = (menu) => {
    if (window.innerWidth < 768) return;
    setDropdownOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: true
    }));
  };

  const closeDropdownOnLeave = () => {
    if (window.innerWidth < 768) return;
    closeAllDropdowns();
  };

  const toggleMobileDropdown = (menu, event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleDropdown(menu);
  };

  const closeAllDropdowns = () => {
    setDropdownOpen({
      nosotros: false,
      programas: false,
      matricula: false,
      informacion: false,
      noticias: false,
      tramites: false
    });
  };

  // Un grupo del menú está activo si la ruta actual empieza con alguno de sus prefijos.
  const isActive = (grupo) =>
    RUTAS_ACTIVAS[grupo].some((prefijo) => pathname === prefijo || pathname.startsWith(`${prefijo}/`));

  const navLinkClass = (activo) =>
    `flex items-center gap-1 transition-colors ${activo ? "text-unmsm-mint-300" : "hover:text-gray-300"}`;

  const mobileNavLinkClass = (activo) =>
    `w-full flex justify-between items-center text-lg font-medium transition-colors ${
      activo ? "text-unmsm-mint-300" : "hover:text-gray-300"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 text-white transition-all duration-300 ease-in-out ${
          isScrolled || menuOpen
            ? "bg-unmsm-blue shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        {/* Logo centrado para móvil */}
        <div className="flex md:hidden justify-center items-center py-2 absolute left-0 right-0 mx-auto w-full pointer-events-none z-10">
          <Link
            to="/home"
            className="flex items-center gap-3 px-6 cursor-pointer hover:text-gray-300 transition-colors pointer-events-auto"
          >
            <img
              src={universidadLogo}
              alt="Logo Universidad"
              className="h-14 w-14 rounded-full object-cover bg-white p-1"
            />
            <div className="flex flex-col leading-tight ml-3">
              <span className="text-2xl font-bold">Posgrado</span>
              <span className="text-xs font-medium text-gray-200">Facultad de Educación</span>
            </div>
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* Navegación principal */}
          <nav className="hidden md:flex gap-6 items-center select-none font-bold relative w-full justify-center">
            {/* Sección izquierda */}
            <div className="flex gap-6 items-center">
              <Link
                to="/home"
                className={`transition-colors ${pathname === "/home" ? "text-unmsm-mint-300" : "hover:text-gray-300"}`}
              >
                Inicio
              </Link>

              {/* Nosotros Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdownOnHover('nosotros')}
                onMouseLeave={closeDropdownOnLeave}
              >
                <button
                  onClick={() => toggleDropdown('nosotros')}
                  className={navLinkClass(isActive("nosotros"))}
                  aria-expanded={dropdownOpen.nosotros}
                  aria-haspopup="true"
                >
                  Nosotros
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen.nosotros ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.nosotros && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
                      <div className="py-2">
                      <Link
                        to="/nosotros/quienes-somos"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdInfo className="text-unmsm-navy" /> Quiénes somos
                      </Link>
                      <Link
                        to="/nosotros/directorio-flch"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdBadge className="text-unmsm-navy" /> Directorio Facultad Educación
                      </Link>
                      <Link
                        to="/nosotros/directorio-posgrado"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdPeople className="text-unmsm-navy" /> Directorio Posgrado
                      </Link>
                      <Link
                        to="/nosotros/documentos-recursos"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdDescription className="text-unmsm-navy" /> Documentos y Recursos
                      </Link>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Programas Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdownOnHover('programas')}
                onMouseLeave={closeDropdownOnLeave}
              >
                <button
                  onClick={() => toggleDropdown('programas')}
                  className={navLinkClass(isActive("programas"))}
                  aria-expanded={dropdownOpen.programas}
                  aria-haspopup="true"
                >
                  Programas
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen.programas ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.programas && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
                      <div className="py-2">
                      <Link
                        to="/programas/maestria"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdSchool className="text-unmsm-navy" /> Maestría
                      </Link>
                      <Link
                        to="/programas/doctorado"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdWorkspacePremium className="text-unmsm-navy" /> Doctorado
                      </Link>
                      <Link
                        to="/programas/diplomado"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdCardMembership className="text-unmsm-navy" /> Diplomado
                      </Link>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Noticias Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdownOnHover('noticias')}
                onMouseLeave={closeDropdownOnLeave}
              >
                <button
                  onClick={() => toggleDropdown('noticias')}
                  className={navLinkClass(isActive("noticias"))}
                  aria-expanded={dropdownOpen.noticias}
                  aria-haspopup="true"
                >
                  Novedades
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen.noticias ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.noticias && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
                      <div className="py-2">
                      <Link
                        to="/noticias"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdArticle className="text-unmsm-navy" /> Noticias
                      </Link>
                      <Link
                        to="/eventos"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdEvent className="text-unmsm-navy" /> Eventos
                      </Link>
                      <Link
                        to="/comunicados"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdCampaign className="text-unmsm-navy" /> Comunicados
                      </Link>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Logo en el centro */}
            <div className="flex items-center gap-3 px-8">
              <Link
                to="/home"
                className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition-colors"
              >
                <img
                  src={universidadLogo}
                  alt="Logo Universidad"
                  className="h-16 w-16 rounded-full object-cover bg-white p-1"
                />
              </Link>
            </div>

            {/* Sección derecha */}
            <div className="flex gap-6 items-center">
              {/* Matrícula Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdownOnHover('matricula')}
                onMouseLeave={closeDropdownOnLeave}
              >
                <button
                  onClick={() => toggleDropdown('matricula')}
                  className={navLinkClass(isActive("matricula"))}
                  aria-expanded={dropdownOpen.matricula}
                  aria-haspopup="true"
                >
                  Matrícula
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen.matricula ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.matricula && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
                      <div className="py-2">
                      <Link
                        to="/matricula/cronograma-academico"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdSchedule className="text-unmsm-navy" /> Cronograma Académico
                      </Link>
                      <Link
                        to="/matricula/cronograma-pagos"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdPayment className="text-unmsm-navy" /> Cronograma de Pagos
                      </Link>
                      <Link
                        to="/matricula/proceso-matricula"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdEdit className="text-unmsm-navy" /> Proceso de Matrícula
                      </Link>
                      <Link
                        to="/matricula/horario-cursos"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdSchedule className="text-unmsm-navy" /> Horario de Cursos
                      </Link>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Información Académica Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdownOnHover('informacion')}
                onMouseLeave={closeDropdownOnLeave}
              >
                <button
                  onClick={() => toggleDropdown('informacion')}
                  className={navLinkClass(isActive("informacion"))}
                  aria-expanded={dropdownOpen.informacion}
                  aria-haspopup="true"
                >
                  Información Académica
                  <svg 
                    className={`w-4 h-4 transition-transform ${dropdownOpen.informacion ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.informacion && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
                      <div className="py-2">
                      <Link
                        to="/informacion-academica/docentes"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdPersonSearch className="text-unmsm-navy" /> Plana Docente
                      </Link>
                      <Link
                        to="/informacion-academica/plan-estudios"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdLibraryBooks className="text-unmsm-navy" /> Plan de Estudios
                      </Link>
                      <Link
                        to="/informacion-academica/preguntas-frecuentes"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdHelpOutline className="text-unmsm-navy" /> Preguntas Frecuentes
                      </Link>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Trámites Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdownOnHover('tramites')}
                onMouseLeave={closeDropdownOnLeave}
              >
                <button
                  onClick={() => toggleDropdown('tramites')}
                  className={navLinkClass(isActive("tramites"))}
                  aria-expanded={dropdownOpen.tramites}
                  aria-haspopup="true"
                >
                  Trámites
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen.tramites ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.tramites && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
                      <div className="py-2">
                      <Link
                        to="/tramites/maestria"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdSchool className="text-unmsm-navy" /> Grado de Magister
                      </Link>
                      <Link
                        to="/tramites/doctorado"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <MdWorkspacePremium className="text-unmsm-navy" /> Grado de Doctor
                      </Link>
                    </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </nav>

          <div className="flex items-center gap-4 text-sm">
            {/* Botón hamburguesa en mobile */}
            <button
              className={`flex flex-col justify-center items-center w-10 h-10 transition-all duration-300 md:hidden ${
                menuOpen ? "gap-0" : "gap-1.5"
              }`}
              onClick={() => {
                setMenuOpen(!menuOpen);
                closeAllDropdowns();
              }}
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-0.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-0.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={`md:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] text-white z-40 transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isScrolled
            ? "bg-unmsm-blue"
            : "bg-unmsm-blue bg-opacity-95 backdrop-blur-md"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 overflow-y-auto h-full" data-mobile-menu="true">
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-between text-lg font-medium transition-colors ${
              pathname === "/home" ? "text-unmsm-mint-300" : "hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <MdHome className="text-xl" /> Inicio
            </div>
          </Link>

          {/* Nosotros Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('nosotros', e)}
              className={mobileNavLinkClass(isActive("nosotros"))}
              aria-expanded={dropdownOpen.nosotros}
            >
              Nosotros
              <svg
                className={`w-5 h-5 transition-transform ${dropdownOpen.nosotros ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.nosotros && (
              <div className="mt-2 ml-4 space-y-2">
                <Link
                  to="/nosotros/quienes-somos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdInfo className="text-lg" /> Quiénes somos
                </Link>
                <Link
                  to="/nosotros/directorio-flch"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdBadge className="text-lg" /> Directorio Facultad Educación
                </Link>
                <Link
                  to="/nosotros/directorio-posgrado"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdPeople className="text-lg" /> Directorio Posgrado
                </Link>
                <Link
                  to="/nosotros/documentos-recursos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdDescription className="text-lg" /> Documentos y Recursos
                </Link>
              </div>
            )}
          </div>

          {/* Programas Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('programas', e)}
              className={mobileNavLinkClass(isActive("programas"))}
              aria-expanded={dropdownOpen.programas}
            >
              Programas
              <svg
                className={`w-5 h-5 transition-transform ${dropdownOpen.programas ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.programas && (
              <div className="mt-2 ml-4 space-y-2">
                <Link
                  to="/programas/maestria"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdSchool className="text-lg" /> Maestría
                </Link>
                <Link
                  to="/programas/doctorado"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdWorkspacePremium className="text-lg" /> Doctorado
                </Link>
                <Link
                  to="/programas/diplomado"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdCardMembership className="text-lg" /> Diplomado
                </Link>
              </div>
            )}
          </div>

          {/* Noticias Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('noticias', e)}
              className={mobileNavLinkClass(isActive("noticias"))}
              aria-expanded={dropdownOpen.noticias}
            >
              Novedades
              <svg
                className={`w-5 h-5 transition-transform ${dropdownOpen.noticias ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.noticias && (
              <div className="mt-2 ml-4 space-y-2">
                <Link
                  to="/noticias"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdArticle className="text-lg" /> Noticias
                </Link>
                <Link
                  to="/eventos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdEvent className="text-lg" /> Eventos
                </Link>
                <Link
                  to="/comunicados"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdCampaign className="text-lg" /> Comunicados
                </Link>
              </div>
            )}
          </div>

          {/* Matrícula Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('matricula', e)}
              className={mobileNavLinkClass(isActive("matricula"))}
              aria-expanded={dropdownOpen.matricula}
            >
              Matrícula
              <svg
                className={`w-5 h-5 transition-transform ${dropdownOpen.matricula ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.matricula && (
              <div className="mt-2 ml-4 space-y-2">
                <Link
                  to="/matricula/cronograma-academico"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdSchedule className="text-lg" /> Cronograma Académico
                </Link>
                <Link
                  to="/matricula/cronograma-pagos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdPayment className="text-lg" /> Cronograma de Pagos
                </Link>
                <Link
                  to="/matricula/proceso-matricula"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdEdit className="text-lg" /> Proceso de Matrícula
                </Link>
                <Link
                  to="/matricula/horario-cursos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdSchedule className="text-lg" /> Horarios de Cursos
                </Link>
              </div>
            )}
          </div>

          {/* Información Académica Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('informacion', e)}
              className={mobileNavLinkClass(isActive("informacion"))}
              aria-expanded={dropdownOpen.informacion}
            >
              Información Académica
              <svg 
                className={`w-5 h-5 transition-transform ${dropdownOpen.informacion ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.informacion && (
              <div className="mt-2 ml-4 space-y-2">
                <Link 
                  to="/informacion-academica/docentes" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdPersonSearch className="text-lg" /> Plana Docente
                </Link>
                <Link 
                  to="/informacion-academica/plan-estudios" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdLibraryBooks className="text-lg" /> Plan de Estudios
                </Link>
                <Link 
                  to="/informacion-academica/preguntas-frecuentes"
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdHelpOutline className="text-lg" /> Preguntas Frecuentes
                </Link>
              </div>
            )}
          </div>

          {/* Trámites Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('tramites', e)}
              className={mobileNavLinkClass(isActive("tramites"))}
              aria-expanded={dropdownOpen.tramites}
            >
              Trámites
              <svg
                className={`w-5 h-5 transition-transform ${dropdownOpen.tramites ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.tramites && (
              <div className="mt-2 ml-4 space-y-2">
                <Link
                  to="/tramites/maestria"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdSchool className="text-lg" /> Grado de Magister
                </Link>
                <Link
                  to="/tramites/doctorado"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdWorkspacePremium className="text-lg" /> Grado de Doctor
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Header;