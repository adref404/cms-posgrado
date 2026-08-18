import { Link } from "react-router-dom";
import { MdArticle, MdEvent, MdCampaign, MdSchedule, MdArrowForward } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";

const SECCIONES = [
  {
    to: "/admin/noticias",
    icon: MdArticle,
    titulo: "Noticias",
    descripcion: "Publica, edita o elimina noticias de posgrado educación.",
  },
  {
    to: "/admin/eventos",
    icon: MdEvent,
    titulo: "Eventos",
    descripcion: "Gestiona los eventos y actividades próximas.",
  },
  {
    to: "/admin/comunicados",
    icon: MdCampaign,
    titulo: "Comunicados",
    descripcion: "Publica avisos oficiales, urgentes o no.",
  },
  {
    to: "/admin/cronograma",
    icon: MdSchedule,
    titulo: "Cronograma",
    descripcion: "Edita las fechas de Admisión y del Cronograma Académico.",
  },
];

const AdminHomePage = () => (
  <AdminLayout>
    <h1 className="text-xl font-bold text-unmsm-navy mb-1">¿Qué quieres publicar?</h1>
    <p className="text-unmsm-muted text-sm mb-6">
      Los cambios que hagas aquí se ven de inmediato en la web pública, sin necesidad de tocar código.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {SECCIONES.map(({ to, icon: Icon, titulo, descripcion }) => (
        <Link
          key={to}
          to={to}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div className="w-11 h-11 rounded-full bg-unmsm-green/10 flex items-center justify-center mb-4">
            <Icon className="text-unmsm-green text-xl" />
          </div>
          <h2 className="font-bold text-unmsm-navy">{titulo}</h2>
          <p className="text-unmsm-muted text-sm mt-1">{descripcion}</p>
          <span className="inline-flex items-center gap-1 text-unmsm-blue font-semibold text-sm mt-4">
            Gestionar <MdArrowForward className="text-base" />
          </span>
        </Link>
      ))}
    </div>
  </AdminLayout>
);

export default AdminHomePage;
