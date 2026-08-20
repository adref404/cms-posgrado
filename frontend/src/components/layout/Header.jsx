import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  MdCardMembership,
  MdSearch,
} from "react-icons/md";
import universidadLogo from "../../assets/UNMSM - Logo UPG 2024 04.png";

// Prefijos de ruta por grupo del menú, para resaltar la sección activa.
const RUTAS_ACTIVAS = {
  nosotros: ["/nosotros"],
  programas: ["/programas"],
  noticias: ["/noticias", "/eventos", "/comunicados"],
  matricula: ["/matricula"],
  informacion: ["/informacion-academica"],
  tramites: ["/tramites"],
};

// Estructura única para todo el menú: la reutilizan la fila de escritorio,
// la fila intermedia (tablet, dos filas) y el panel móvil, así cualquier
// cambio de enlaces se hace en un solo lugar y los tres estados nunca
// quedan desincronizados entre sí.
const NAV_GROUPS_IZQUIERDA = [
  {
    key: "nosotros",
    label: "Nosotros",
    panelWidth: "w-64",
    items: [
      { to: "/nosotros/quienes-somos", icon: MdInfo, label: "Quiénes somos" },
      { to: "/nosotros/directorio-flch", icon: MdBadge, label: "Directorio Facultad Educación" },
      { to: "/nosotros/directorio-posgrado", icon: MdPeople, label: "Directorio Posgrado" },
      { to: "/nosotros/documentos-recursos", icon: MdDescription, label: "Transparencia" },
    ],
  },
  {
    key: "programas",
    label: "Programas",
    panelWidth: "w-64",
    items: [
      { to: "/programas/maestria", icon: MdSchool, label: "Maestría" },
      { to: "/programas/doctorado", icon: MdWorkspacePremium, label: "Doctorado" },
      { to: "/programas/diplomado", icon: MdCardMembership, label: "Diplomado" },
    ],
  },
  {
    key: "noticias",
    label: "Actualidad",
    panelWidth: "w-64",
    items: [
      { to: "/noticias", icon: MdArticle, label: "Noticias" },
      { to: "/eventos", icon: MdEvent, label: "Eventos" },
      { to: "/comunicados", icon: MdCampaign, label: "Comunicados" },
    ],
  },
];

const NAV_GROUPS_DERECHA = [
  {
    key: "matricula",
    label: "Matrícula",
    panelWidth: "w-64",
    items: [
      { to: "/matricula/cronograma-academico", icon: MdSchedule, label: "Cronograma Académico" },
      { to: "/matricula/cronograma-pagos", icon: MdPayment, label: "Cronograma de Pagos" },
      { to: "/matricula/proceso-matricula", icon: MdEdit, label: "Proceso de Matrícula" },
      { to: "/matricula/horario-cursos", icon: MdSchedule, label: "Horario de Cursos" },
    ],
  },
  {
    key: "informacion",
    label: "Información Académica",
    panelWidth: "w-64",
    items: [
      { to: "/informacion-academica/docentes", icon: MdPersonSearch, label: "Plana Docente" },
      { to: "/informacion-academica/plan-estudios", icon: MdLibraryBooks, label: "Plan de Estudios" },
      { to: "/informacion-academica/preguntas-frecuentes", icon: MdHelpOutline, label: "Preguntas Frecuentes" },
    ],
  },
  {
    key: "tramites",
    label: "Trámites",
    panelWidth: "w-72",
    items: [
      { to: "/tramites/maestria-1-anio", icon: MdSchool, label: "Grado de Magíster · 1 Año" },
      { to: "/tramites/maestria-2-anios", icon: MdSchool, label: "Grado de Magíster · 2 Años" },
      { to: "/tramites/doctorado", icon: MdWorkspacePremium, label: "Grado de Doctor" },
    ],
  },
];

const TODOS_LOS_GRUPOS = [...NAV_GROUPS_IZQUIERDA, ...NAV_GROUPS_DERECHA];

const inicioLinkClass = (activo) =>
  `pb-1 border-b-2 transition-colors ${
    activo ? "text-unmsm-mint-300 border-unmsm-mint-300" : "border-transparent hover:text-gray-300"
  }`;

const navLinkClass = (activo) =>
  `flex items-center gap-1 pb-1 border-b-2 whitespace-nowrap transition-colors ${
    activo ? "text-unmsm-mint-300 border-unmsm-mint-300" : "border-transparent hover:text-gray-300"
  }`;

const mobileNavLinkClass = (activo) =>
  `w-full flex justify-between items-center text-lg font-medium transition-colors ${
    activo ? "text-unmsm-mint-300" : "hover:text-gray-300"
  }`;

// Dropdown de navegación reutilizado por igual en escritorio y en la fila
// intermedia (tablet): mismo botón, mismo panel. El hover solo se activa en
// escritorio real (lo deciden onHoverOpen/onHoverClose, que se autolimitan
// por ancho de pantalla); en el resto siempre funciona por clic.
function NavDropdown({ group, isOpen, isActiveGroup, onToggle, onHoverOpen, onHoverClose, onItemClick }) {
  return (
    <div className="relative" onMouseEnter={onHoverOpen} onMouseLeave={onHoverClose}>
      <button
        onClick={onToggle}
        className={navLinkClass(isActiveGroup)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {group.label}
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className={`absolute top-full left-0 pt-2 ${group.panelWidth} z-50`}>
          <div className="bg-white rounded-lg shadow-xl text-gray-800 font-normal">
            <div className="py-2">
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-unmsm-bg transition-colors"
                  onClick={onItemClick}
                >
                  <item.icon className="text-unmsm-navy" /> {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Submenú de navegación para el panel móvil (acordeón vertical).
function MobileNavGroup({ group, isOpen, isActiveGroup, onToggle, onItemClick }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={mobileNavLinkClass(isActiveGroup)}
        aria-expanded={isOpen}
      >
        {group.label}
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 ml-4 space-y-2">
          {group.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onItemClick}
              className="flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors py-1"
            >
              <item.icon className="text-lg" /> {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Buscador compartido por los tres estados del header. "variant" solo
// cambia el fondo (sólido flotante vs. tenue sobre el panel móvil, que ya
// tiene su propio fondo oscuro); nunca usa posicionamiento absoluto con
// offsets negativos, así jamás puede quedar fuera de su contenedor.
function SearchForm({ value, onChange, onSubmit, className = "", inputClassName = "", variant = "solid" }) {
  const baseInput =
    variant === "drawer"
      ? "bg-white/10 border border-white/20"
      : "bg-unmsm-navy/90 backdrop-blur-sm border border-white/25 shadow-sm";

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <MdSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar..."
        className={`rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-unmsm-mint-300 transition-colors ${baseInput} ${inputClassName}`}
      />
    </form>
  );
}

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
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
      // 768px = deja de existir el menú hamburguesa (pasa a fila inline).
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        closeAllDropdowns();
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    const handleClickOutside = (event) => {
      // Aplica tanto al estado tablet (fila inline) como al de escritorio;
      // el menú móvil maneja su propio cierre por separado.
      const isNavInline = window.innerWidth >= 768;
      const clickedInsideNav = event.target.closest('nav');
      const clickedInsideMobileMenu = event.target.closest('[data-mobile-menu]');

      if (isNavInline && !clickedInsideNav && !clickedInsideMobileMenu) {
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

  const buscarEnSitio = (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;
    navigate(`/buscar?q=${encodeURIComponent(busqueda.trim())}`);
    setBusqueda("");
    setMenuOpen(false);
    closeAllDropdowns();
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu]
    }));
  };

  // Solo escritorio real (mouse, >=1280px): abrir al pasar por encima, sin
  // esperar un clic. En la fila tablet y en móvil, el hover no hace nada.
  const openDropdownOnHover = (menu) => {
    if (window.innerWidth < 1280) return;
    setDropdownOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: true
    }));
  };

  const closeDropdownOnLeave = () => {
    if (window.innerWidth < 1280) return;
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

  return (
    <>
      <header
        style={{ top: "var(--aviso-bar-height, 0px)" }}
        className={`fixed w-full z-50 text-white transition-all duration-300 ease-in-out ${
          isScrolled || menuOpen
            ? "bg-unmsm-blue shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        {/* ESTADO 1 — MÓVIL (<768px): logo centrado + botón hamburguesa. */}
        <div className="md:hidden relative flex items-center justify-end px-4 py-4">
          <div className="absolute left-0 right-0 mx-auto flex justify-center items-center pointer-events-none">
            <Link
              to="/home"
              className="flex items-center gap-3 px-6 cursor-pointer hover:text-gray-300 transition-colors pointer-events-auto"
            >
              <img
                src={universidadLogo}
                alt="Logo Universidad"
                className="h-14 w-14 object-contain"
              />
              <div className="flex flex-col leading-none ml-3">
                <span className="text-2xl font-serif font-bold uppercase text-white">Posgrado</span>
                <span className="text-[22px] font-serif font-bold uppercase text-white">Educación</span>
              </div>
            </Link>
          </div>
          <button
            className={`relative z-10 flex flex-col justify-center items-center w-10 h-10 transition-all duration-300 ${
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

        {/* ESTADO 2 — TABLET / ACHICADO (768–1279px): dos filas. Fila 1 =
            logo + buscador (con todo el ancho para respirar); fila 2 = el
            menú completo, ahora sin competir por espacio con nada más, así
            nunca se comprime ni se desborda. */}
        <div className="hidden md:block xl:hidden max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-white/10">
            <Link
              to="/home"
              className="flex items-center gap-2.5 min-w-0 hover:text-gray-300 transition-colors"
            >
              <img
                src={universidadLogo}
                alt="Logo Universidad"
                className="h-11 w-11 object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-none">
                <span className="text-base font-serif font-bold uppercase text-white">Posgrado</span>
                <span className="text-[11px] font-serif font-bold uppercase text-white/80">Educación</span>
              </div>
            </Link>
            <SearchForm
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onSubmit={buscarEnSitio}
              className="w-56 lg:w-64 flex-shrink-0"
              inputClassName="w-full pl-8 pr-3 py-1.5 text-xs"
            />
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 lg:gap-x-6 px-2 py-2.5 select-none font-bold text-sm">
            <Link to="/home" className={inicioLinkClass(pathname === "/home")}>
              Inicio
            </Link>
            {TODOS_LOS_GRUPOS.map((group) => (
              <NavDropdown
                key={group.key}
                group={group}
                isOpen={dropdownOpen[group.key]}
                isActiveGroup={isActive(group.key)}
                onToggle={() => toggleDropdown(group.key)}
                onHoverOpen={() => openDropdownOnHover(group.key)}
                onHoverClose={closeDropdownOnLeave}
                onItemClick={closeAllDropdowns}
              />
            ))}
          </nav>
        </div>

        {/* ESTADO 3 — ESCRITORIO (>=1280px): una fila. Grid de 3 columnas
            (1fr / auto / 1fr): la nav se centra sola según su propio
            contenido (columna "auto"), el buscador vive en su propia celda
            de la derecha — nunca se superponen ni pueden desbordar el
            contenedor, porque ambos están dentro del mismo grid.
            max-w-[96rem] (no max-w-7xl/1280px): la nav sola ya necesita
            ~975px, así que con el contenedor topado en 1280px casi no
            quedaba margen para el buscador sin importar qué ancho se le
            pusiera — por eso "se veía siempre igual" aunque se agrandara
            la clase. Con más techo, el buscador SÍ crece en pantallas
            reales (1366px+); en el límite exacto de 1280px se queda
            modesto porque ahí de verdad no hay más espacio que ceder. */}
        <div className="hidden xl:grid grid-cols-[1fr_auto_1fr] items-center max-w-[96rem] mx-auto px-4 py-4 gap-4">
          <div />

          <nav className="flex items-center gap-5 select-none font-bold">
            <div className="flex gap-5 items-center">
              <Link to="/home" className={inicioLinkClass(pathname === "/home")}>
                Inicio
              </Link>
              {NAV_GROUPS_IZQUIERDA.map((group) => (
                <NavDropdown
                  key={group.key}
                  group={group}
                  isOpen={dropdownOpen[group.key]}
                  isActiveGroup={isActive(group.key)}
                  onToggle={() => toggleDropdown(group.key)}
                  onHoverOpen={() => openDropdownOnHover(group.key)}
                  onHoverClose={closeDropdownOnLeave}
                  onItemClick={closeAllDropdowns}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 px-4 xl:px-6 flex-shrink-0">
              <Link
                to="/home"
                className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition-colors"
              >
                <img
                  src={universidadLogo}
                  alt="Logo Universidad"
                  className="h-20 w-20 object-contain flex-shrink-0"
                />
              </Link>
            </div>

            <div className="flex gap-5 items-center">
              {NAV_GROUPS_DERECHA.map((group) => (
                <NavDropdown
                  key={group.key}
                  group={group}
                  isOpen={dropdownOpen[group.key]}
                  isActiveGroup={isActive(group.key)}
                  onToggle={() => toggleDropdown(group.key)}
                  onHoverOpen={() => openDropdownOnHover(group.key)}
                  onHoverClose={closeDropdownOnLeave}
                  onItemClick={closeAllDropdowns}
                />
              ))}
            </div>
          </nav>

          <div className="flex justify-end min-w-0">
            <SearchForm
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onSubmit={buscarEnSitio}
              className="w-40 2xl:w-56"
              inputClassName="w-full pl-9 pr-2 py-1.5 text-xs"
            />
          </div>
        </div>
      </header>

      {/* Menú móvil (drawer) — solo existe en el ESTADO 1. */}
      <div
        style={{ top: "calc(70px + var(--aviso-bar-height, 0px))", height: "calc(100vh - 70px - var(--aviso-bar-height, 0px))" }}
        className={`md:hidden fixed left-0 w-full text-white z-40 transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isScrolled
            ? "bg-unmsm-blue"
            : "bg-unmsm-blue bg-opacity-95 backdrop-blur-md"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 overflow-y-auto h-full" data-mobile-menu="true">
          <SearchForm
            variant="drawer"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onSubmit={buscarEnSitio}
            className="w-full"
            inputClassName="w-full pl-8 pr-3 py-2.5 text-sm"
          />

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

          {TODOS_LOS_GRUPOS.map((group) => (
            <MobileNavGroup
              key={group.key}
              group={group}
              isOpen={dropdownOpen[group.key]}
              isActiveGroup={isActive(group.key)}
              onToggle={(e) => toggleMobileDropdown(group.key, e)}
              onItemClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
