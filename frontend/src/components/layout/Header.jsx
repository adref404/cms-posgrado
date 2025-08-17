import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  MdHome, 
  MdSchool, 
  MdPeople, 
  MdPhone,
  MdSchedule,
  MdLibraryBooks,
  MdEdit,
  MdQuiz,
  MdEmojiEvents,
  MdAccountBalance,
  MdPayment,
  MdCardGiftcard,
  MdCalendarToday,
  MdGavel,
  MdRateReview,
  MdPersonSearch,
  MdExitToApp,
  MdHelpOutline
} from "react-icons/md";
import { MdVerifiedUser as MdCertificate } from "react-icons/md";
import universidadLogo from "../../assets/logo-upg.webp";
import LogoutConfirmModal from "../modals/LogoutConfirmModal";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    matricula: false,
    informacion: false,
    graduacion: false
  });

  const { isAuthenticated, userType, user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu]
    }));
  };

  const toggleMobileDropdown = (menu, event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleDropdown(menu);
  };

  const closeAllDropdowns = () => {
    setDropdownOpen({
      matricula: false,
      informacion: false,
      graduacion: false
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 text-white transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#880E1F] shadow-lg backdrop-blur-md"
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
            <span className="text-3xl font-bold ml-3">Posgrado</span>
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* Navegación principal */}
          <nav className="hidden md:flex gap-6 items-center select-none font-bold relative w-full justify-center">
            {/* Sección izquierda */}
            <div className="flex gap-6 items-center">
              <Link to="/home" className="hover:text-gray-300 transition-colors">
                Inicio
              </Link>

              {/* Matrícula Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('matricula')}
                  className="flex items-center gap-1 hover:text-gray-300 transition-colors"
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
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 text-gray-800 font-normal">
                    <div className="py-2">
                      <Link 
                        to="/matricula/cronograma-academico" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Cronograma Académico
                      </Link>
                      <Link 
                        to="/matricula/cronograma-pagos" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Cronograma de Pagos
                      </Link>
                      <Link 
                        to="/matricula/proceso" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Proceso de Matrícula
                      </Link>
                      <Link 
                        to="/matricula/horarios" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Horario de Cursos
                      </Link>
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
              {/* Información Académica Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('informacion')}
                  className="flex items-center gap-1 hover:text-gray-300 transition-colors"
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
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 text-gray-800 font-normal">
                    <div className="py-2">
                      <Link 
                        to="/informacion-academica/direccion" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Dirección Académica
                      </Link>
                      <Link 
                        to="/informacion-academica/comite-directivo" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Comité Directivo
                      </Link>
                      <Link 
                        to="/informacion-academica/coordinadores" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Coordinadores Académicos
                      </Link>
                      <Link 
                        to="/informacion-academica/docentes" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Plana Docente
                      </Link>
                      <Link 
                        to="/informacion-academica/plan-estudios" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Plan de Estudios
                      </Link>
                      <Link
                        to="/informacion-academica/reglamento" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Reglamento de Estudios
                      </Link>
                      <Link 
                        to="/informacion-academica/preguntas-frecuentes"
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Preguntas Frecuentes
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Graduación Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('graduacion')}
                  className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                  aria-expanded={dropdownOpen.graduacion}
                  aria-haspopup="true"
                >
                  Graduación
                  <svg 
                    className={`w-4 h-4 transition-transform ${dropdownOpen.graduacion ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen.graduacion && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 text-gray-800 font-normal">
                    <div className="py-2">
                      <Link 
                        to="/graduacion/procesos-requisitos" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Procesos y Requisitos
                      </Link>
                      <Link 
                        to="/graduacion/guia" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Guía de Graduación
                      </Link>
                      <Link 
                        to="/graduacion/sustentacion" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Programación de Sustentación
                      </Link>
                      <Link 
                        to="/graduacion/preguntas-frecuentes" 
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Preguntas Frecuentes
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Usuario logueado y logout */}
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden xl:flex items-center gap-2">
              <MdPeople className="text-lg" />
              <span className="text-sm">
                {userType === "admin"
                  ? user?.username || "Admin"
                  : "Estudiante"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-1.5 rounded-full shadow-md transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Cerrar sesión"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
                Cerrar Sesión
              </button>
            </div>
            
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
            ? "bg-[#880E1F]"
            : "bg-[#880E1F] bg-opacity-95 backdrop-blur-md"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 overflow-y-auto h-full" data-mobile-menu="true">
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between text-lg font-medium hover:text-gray-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MdHome className="text-xl" /> Inicio
            </div>
          </Link>

          {/* Matrícula Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('matricula', e)}
              className="w-full flex justify-between items-center text-lg font-medium hover:text-gray-300 transition-colors"
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
                  to="/matricula/proceso" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdEdit className="text-lg" /> Proceso de Matrícula
                </Link>
                <Link 
                  to="/matricula/horarios" 
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
              className="w-full flex justify-between items-center text-lg font-medium hover:text-gray-300 transition-colors"
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
                  to="/informacion-academica/direccion" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdSchool className="text-lg" /> Dirección Académica
                </Link>
                <Link 
                  to="/informacion-academica/comite-directivo" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdPeople className="text-lg" /> Comité Directivo
                </Link>
                <Link 
                  to="/informacion-academica/coordinadores" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdPersonSearch className="text-lg" /> Coordinadores Académicos
                </Link>
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
                  to="/informacion-academica/reglamento" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdGavel className="text-lg" /> Reglamento de Estudios
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

          {/* Graduación Mobile Submenu */}
          <div>
            <button
              onClick={(e) => toggleMobileDropdown('graduacion', e)}
              className="w-full flex justify-between items-center text-lg font-medium hover:text-gray-300 transition-colors"
              aria-expanded={dropdownOpen.graduacion}
            >
              Graduación
              <svg 
                className={`w-5 h-5 transition-transform ${dropdownOpen.graduacion ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen.graduacion && (
              <div className="mt-2 ml-4 space-y-2">
                <Link 
                  to="/graduacion/procesos-requisitos" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdLibraryBooks className="text-lg" /> Procesos y Requisitos
                </Link>
                <Link 
                  to="/graduacion/guia" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdCertificate className="text-lg" /> Guía de Graduación
                </Link>
                <Link 
                  to="/graduacion/sustentacion" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdEmojiEvents className="text-lg" /> Programación de Sustentación
                </Link>
                <Link 
                  to="/graduacion/preguntas-frecuentes" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
                >
                  <MdHelpOutline className="text-lg" /> Preguntas Frecuentes
                </Link>
              </div>
            )}
          </div>

          {/* Separador */}
          <div className="border-t border-white/20 my-4"></div>

          {/* Logout en mobile */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between"
            aria-label="Cerrar sesión"
          >
            <div className="flex items-center gap-2">
              <MdPeople className="text-lg" />
              <span>
                {userType === "admin" ? user?.username || "Admin" : "Estudiante"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MdExitToApp className="text-sm" />
              <span className="text-sm">Cerrar Sesión</span>
            </div>
          </button>
        </div>
      </div>
      
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}

export default Header;