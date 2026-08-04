import { Link } from "react-router-dom";
import { MdAccessTime, MdLocationOn, MdArrowForward } from "react-icons/md";
import { getDiaMes } from "../../utils/dateFormat";

const EventoCard = ({ id, titulo, descripcion, fecha, hora, lugar, cuerpo, url }) => {
  const { dia, mes } = getDiaMes(fecha);
  const tieneDetalle = Boolean(cuerpo && cuerpo.length > 0);
  const destino = tieneDetalle ? `/eventos/${id}` : url || null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex gap-4">
      <div className="flex-shrink-0 w-16 text-center bg-unmsm-green/10 rounded-lg py-2">
        <div className="text-unmsm-green font-bold text-2xl leading-none">{dia}</div>
        <div className="text-unmsm-green text-xs font-semibold mt-1">{mes}</div>
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-bold text-unmsm-navy leading-snug">{titulo}</h4>
        <p className="text-unmsm-muted text-sm mt-1">{descripcion}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-unmsm-muted">
          {hora && (
            <span className="flex items-center gap-1">
              <MdAccessTime className="flex-shrink-0" /> {hora}
            </span>
          )}
          {lugar && (
            <span className="flex items-center gap-1">
              <MdLocationOn className="flex-shrink-0" /> {lugar}
            </span>
          )}
        </div>
        {destino &&
          (tieneDetalle ? (
            <Link
              to={destino}
              className="flex items-center gap-1 text-unmsm-green text-sm font-semibold mt-3 hover:gap-2 transition-all"
            >
              Más información <MdArrowForward className="text-base" />
            </Link>
          ) : (
            <a
              href={destino}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-unmsm-green text-sm font-semibold mt-3 hover:gap-2 transition-all"
            >
              Más información <MdArrowForward className="text-base" />
            </a>
          ))}
      </div>
    </div>
  );
};

export default EventoCard;
