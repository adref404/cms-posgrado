import { Link, useNavigate } from "react-router-dom";
import { MdLogout, MdArticle, MdEvent, MdCampaign, MdDashboard, MdSchedule } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/admin", label: "Inicio", icon: MdDashboard, exact: true },
  { to: "/admin/noticias", label: "Noticias", icon: MdArticle },
  { to: "/admin/eventos", label: "Eventos", icon: MdEvent },
  { to: "/admin/comunicados", label: "Comunicados", icon: MdCampaign },
  { to: "/admin/cronograma", label: "Cronograma", icon: MdSchedule },
];

// Shell propio del panel de administración — a propósito NO usa el
// Header/Footer públicos (components/layout/Layout.jsx): es una herramienta
// interna, no una vista para el visitante.
const AdminLayout = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-unmsm-bg flex flex-col">
      <header className="bg-unmsm-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold">Panel de Administración</p>
            <p className="text-xs text-white/60">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors flex-shrink-0"
          >
            <MdLogout /> Salir
          </button>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-t-lg transition-colors flex-shrink-0"
            >
              <Icon className="text-base" /> {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
