import { Link } from "react-router-dom";
import { MdSchool, MdWorkspacePremium, MdArrowForward } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

// Vista propia de "Trámites" (a diferencia de otras secciones del menú, esta
// sí tiene su propia página): lista los trámites disponibles como tarjetas.
// Absorbe conceptualmente lo que antes era la sección "Graduación".
const TRAMITES = [
  {
    to: "/tramites/maestria",
    icon: MdSchool,
    titulo: "Grado de Magister",
    descripcion: "Procesos, requisitos y solicitudes para optar el grado de Magister.",
  },
  {
    to: "/tramites/doctorado",
    icon: MdWorkspacePremium,
    titulo: "Grado de Doctor",
    descripcion: "Procesos, requisitos y solicitudes para optar el grado de Doctor.",
  },
];

const TramitesLandingPage = () => (
  <div className="min-h-screen bg-unmsm-bg">
    <PageHero
      eyebrow="Trámites"
      title="Trámites"
      subtitle="Procedimientos y solicitudes administrativas de grados y títulos"
      image={MATRICULA_HERO_IMAGE}
    />

    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid sm:grid-cols-2 gap-6">
        {TRAMITES.map(({ to, icon: Icon, titulo, descripcion }) => (
          <Link
            key={to}
            to={to}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="w-12 h-12 rounded-full bg-unmsm-green/10 flex items-center justify-center mb-4">
              <Icon className="text-unmsm-green text-2xl" />
            </div>
            <h2 className="text-lg font-bold text-unmsm-navy">{titulo}</h2>
            <p className="text-unmsm-muted text-sm mt-2 leading-relaxed">{descripcion}</p>
            <span className="inline-flex items-center gap-1 text-unmsm-blue font-semibold text-sm mt-4">
              Ver más <MdArrowForward className="text-base" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default TramitesLandingPage;
