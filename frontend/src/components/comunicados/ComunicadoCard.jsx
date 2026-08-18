import { Link } from "react-router-dom";
import { MdCampaign, MdDescription } from "react-icons/md";
import { formatFechaLarga } from "../../utils/dateFormat";

const ComunicadoCard = ({ id, titulo, resumen, fecha, imagen, cuerpo, documento, urgente }) => {
  const tieneDetalle = Boolean(cuerpo && cuerpo.length > 0);
  const destino = tieneDetalle ? `/comunicados/${id}` : documento || null;

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-5 flex gap-4 ${
        urgente ? "border-unmsm-guinda/30 border-l-4 border-l-unmsm-guinda" : "border-gray-200"
      }`}
    >
      {imagen ? (
        <img src={imagen} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
      ) : (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            urgente ? "bg-unmsm-guinda/10 text-unmsm-guinda" : "bg-unmsm-navy/10 text-unmsm-navy"
          }`}
        >
          <MdCampaign className="text-xl" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-bold text-unmsm-navy leading-snug">{titulo}</h4>
          {urgente && (
            <span className="bg-unmsm-guinda/10 text-unmsm-guinda text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
              Urgente
            </span>
          )}
        </div>
        <p className="text-unmsm-muted text-xs mt-0.5">{formatFechaLarga(fecha)}</p>
        <p className="text-unmsm-text text-sm mt-2">{resumen}</p>

        {destino &&
          (tieneDetalle ? (
            <Link
              to={destino}
              className="flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue text-sm font-semibold mt-3 transition-colors"
            >
              <MdDescription className="text-base flex-shrink-0" /> Ver comunicado
            </Link>
          ) : (
            <a
              href={destino}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue text-sm font-semibold mt-3 transition-colors"
            >
              <MdDescription className="text-base flex-shrink-0" /> Ver documento
            </a>
          ))}
      </div>
    </div>
  );
};

export default ComunicadoCard;
