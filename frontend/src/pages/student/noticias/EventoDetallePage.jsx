import { Navigate, useParams } from "react-router-dom";
import { MdAccessTime, MdLocationOn, MdArrowForward } from "react-icons/md";
import { useSupabaseItem } from "../../../hooks/useSupabaseItem";
import { formatFechaLarga, getDiaMes } from "../../../utils/dateFormat";
import BreadcrumbBar from "../../../components/common/BreadcrumbBar";

const EventoDetallePage = () => {
  const { id } = useParams();
  const evento = useSupabaseItem("eventos", id);

  if (evento === undefined) return null; // cargando
  if (!evento) return <Navigate to="/eventos" replace />;

  const { dia, mes } = getDiaMes(evento.fecha);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <div className="h-24 bg-unmsm-blue" />
      <BreadcrumbBar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 text-center bg-unmsm-green/10 rounded-lg py-2">
            <div className="text-unmsm-green font-bold text-2xl leading-none">{dia}</div>
            <div className="text-unmsm-green text-xs font-semibold mt-1">{mes}</div>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-unmsm-navy leading-tight">
              {evento.titulo}
            </h1>
            <p className="text-unmsm-muted text-sm mt-2">{formatFechaLarga(evento.fecha)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 bg-white border border-gray-200 rounded-xl p-4 text-sm text-unmsm-text">
          {evento.hora && (
            <span className="flex items-center gap-2">
              <MdAccessTime className="text-unmsm-green flex-shrink-0" /> {evento.hora}
            </span>
          )}
          {evento.lugar && (
            <span className="flex items-center gap-2">
              <MdLocationOn className="text-unmsm-green flex-shrink-0" /> {evento.lugar}
            </span>
          )}
        </div>

        <div className="mt-6 space-y-4 text-unmsm-text leading-relaxed">
          {(evento.cuerpo || [evento.descripcion]).map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </div>

        {evento.url && (
          <a
            href={evento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-unmsm-blue hover:text-unmsm-navy font-semibold mt-6 transition-colors"
          >
            Más información / inscripción <MdArrowForward className="text-base" />
          </a>
        )}
      </div>
    </div>
  );
};

export default EventoDetallePage;
