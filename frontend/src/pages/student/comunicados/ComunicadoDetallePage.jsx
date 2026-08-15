import { Navigate, useParams } from "react-router-dom";
import { MdCampaign, MdDescription } from "react-icons/md";
import { useSupabaseItem } from "../../../hooks/useSupabaseItem";
import { formatFechaLarga } from "../../../utils/dateFormat";
import BreadcrumbBar from "../../../components/common/BreadcrumbBar";

const ComunicadoDetallePage = () => {
  const { id } = useParams();
  const comunicado = useSupabaseItem("comunicados", id);

  if (comunicado === undefined) return null; // cargando
  if (!comunicado) return <Navigate to="/comunicados" replace />;

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <div className="h-24 bg-unmsm-blue" />
      <BreadcrumbBar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              comunicado.urgente
                ? "bg-unmsm-guinda/10 text-unmsm-guinda"
                : "bg-unmsm-navy/10 text-unmsm-navy"
            }`}
          >
            <MdCampaign className="text-2xl" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-unmsm-navy leading-tight">
                {comunicado.titulo}
              </h1>
              {comunicado.urgente && (
                <span className="bg-unmsm-guinda/10 text-unmsm-guinda text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                  Urgente
                </span>
              )}
            </div>
            <p className="text-unmsm-muted text-sm mt-2">
              {formatFechaLarga(comunicado.fecha)}
            </p>
          </div>
        </div>

        <div
          className={`mt-6 rounded-xl p-6 space-y-4 leading-relaxed text-unmsm-text ${
            comunicado.urgente
              ? "bg-unmsm-guinda/5 border border-unmsm-guinda/20"
              : "bg-white border border-gray-200"
          }`}
        >
          {(comunicado.cuerpo || [comunicado.resumen]).map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </div>

        {comunicado.documento && (
          <a
            href={comunicado.documento}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-unmsm-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-unmsm-blue transition-colors mt-6"
          >
            <MdDescription className="text-base" /> Ver documento adjunto
          </a>
        )}
      </div>
    </div>
  );
};

export default ComunicadoDetallePage;
