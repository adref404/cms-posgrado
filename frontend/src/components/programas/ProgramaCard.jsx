import { Link } from "react-router-dom";
import { MdAccessTime, MdApartment, MdArrowForward } from "react-icons/md";

// Tarjeta reutilizable para un programa de posgrado (Maestría/Doctorado/Diplomado).
// Siempre abre la vista interna de detalle (el sitio oficial de posgrado
// está caído, así que ya no enlazamos hacia posgradoeducacion.unmsm.edu.pe).
// Si el programa aún no tiene "detalle" cargado, esa vista muestra el
// componente reutilizable de "espacio en desarrollo".
const ProgramaCard = ({ programa }) => {
  const { id, tipo, name, description, duration, modalidad, imagen } = programa;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <div className="relative h-44 bg-unmsm-blue/5">
        {imagen && (
          <img
            src={imagen}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        {tipo && (
          <span className="absolute top-3 left-3 bg-unmsm-blue text-white text-xs font-bold px-3 py-1 rounded">
            {tipo}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {duration && (
            <span className="inline-flex items-center gap-1 bg-unmsm-bg text-unmsm-navy text-xs font-medium px-2.5 py-1 rounded-full">
              <MdAccessTime className="text-sm" /> {duration}
            </span>
          )}
          {modalidad && (
            <span className="inline-flex items-center gap-1 bg-unmsm-bg text-unmsm-navy text-xs font-medium px-2.5 py-1 rounded-full">
              <MdApartment className="text-sm" /> {modalidad}
            </span>
          )}
        </div>

        <h3 className="font-bold text-unmsm-navy leading-snug">{name}</h3>
        <p className="text-unmsm-muted text-sm mt-2 flex-1 line-clamp-3">{description}</p>

        <Link
          to={`/programas/detalle/${id}`}
          className="mt-4 inline-flex items-center justify-center gap-1 border border-unmsm-green text-unmsm-green font-semibold text-sm rounded-lg px-4 py-2 hover:bg-unmsm-green hover:text-white transition-colors"
        >
          Ver Detalles <MdArrowForward className="text-base" />
        </Link>
      </div>
    </div>
  );
};

export default ProgramaCard;
