import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdArticle,
  MdEvent,
  MdCampaign,
  MdDashboard,
  MdSchedule,
  MdGavel,
  MdGroups,
  MdScience,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import posgradoLogo from "../../assets/posgrado-educacion-logo.png";

const NAV = [
  { to: "/admin", label: "Inicio", icon: MdDashboard, exact: true },
  { to: "/admin/noticias", label: "Noticias", icon: MdArticle },
  { to: "/admin/eventos", label: "Eventos", icon: MdEvent },
  { to: "/admin/comunicados", label: "Comunicados", icon: MdCampaign },
  { to: "/admin/cronograma", label: "Cronograma", icon: MdSchedule },
  { to: "/admin/transparencia", label: "Transparencia", icon: MdGavel },
  { to: "/admin/plana-docente", label: "Plana Docente", icon: MdGroups },
  { to: "/admin/grupos-investigacion", label: "Grupos de Investigación", icon: MdScience },
];

// El contenido de la barra lateral, compartido entre la versión fija de
// escritorio y el cajón deslizable de mobile — para no mantener dos copias
// del menú.
const SidebarContent = ({ pathname, onNavigate, onLogout, userEmail }) => (
  <div className="flex flex-col h-full">
    <div className="px-5 pt-6 pb-5 border-b border-white/10">
      <img src={posgradoLogo} alt="Posgrado Educación UNMSM" className="h-16 w-auto" />
      <p className="text-white/50 text-xs font-medium tracking-wide uppercase mt-3">
        Panel de administración
      </p>
    </div>

    <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
      {NAV.map(({ to, label, icon: Icon, exact }) => {
        const activo = exact ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activo
                ? "bg-unmsm-green text-white shadow-sm"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <Icon className={`text-lg flex-shrink-0 ${activo ? "text-white" : "text-white/50"}`} />
            {label}
          </Link>
        );
      })}
    </nav>

    <div className="px-3 pb-4 pt-3 border-t border-white/10">
      <div className="px-3 py-2 mb-1">
        <p className="text-white/40 text-xs">Sesión iniciada como</p>
        <p className="text-white/80 text-sm font-medium truncate">{userEmail}</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <MdLogout className="text-lg flex-shrink-0 text-white/50" /> Salir
      </button>
    </div>
  </div>
);

// Shell propio del panel de administración — a propósito NO usa el
// Header/Footer públicos (components/layout/Layout.jsx): es una herramienta
// interna, no una vista para el visitante. Barra lateral fija en escritorio;
// en mobile se colapsa a un cajón deslizable (el contenido no cambia, solo
// cómo se presenta).
const AdminLayout = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-unmsm-bg md:flex">
      {/* Barra lateral — fija en escritorio */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 bg-unmsm-navy md:sticky md:top-0 md:h-screen">
        <SidebarContent
          pathname={location.pathname}
          onLogout={handleLogout}
          userEmail={user?.email}
        />
      </aside>

      {/* Barra superior + cajón deslizable — solo mobile */}
      <div className="md:hidden sticky top-0 z-40 bg-unmsm-navy flex items-center justify-between px-4 py-3">
        <img src={posgradoLogo} alt="Posgrado Educación UNMSM" className="h-11 w-auto" />
        <button
          onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú"
          className="text-white/80 hover:text-white p-1"
        >
          <MdMenu className="text-2xl" />
        </button>
      </div>

      {menuAbierto && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuAbierto(false)} />
          <div className="relative w-72 max-w-[85vw] bg-unmsm-navy h-full shadow-xl">
            <button
              onClick={() => setMenuAbierto(false)}
              aria-label="Cerrar menú"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <MdClose className="text-2xl" />
            </button>
            <SidebarContent
              pathname={location.pathname}
              onNavigate={() => setMenuAbierto(false)}
              onLogout={handleLogout}
              userEmail={user?.email}
            />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
