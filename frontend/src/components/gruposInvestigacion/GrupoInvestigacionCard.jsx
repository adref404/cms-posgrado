import { Link } from "react-router-dom";
import { MdScience, MdArrowForward } from "react-icons/md";

// Tarjeta reutilizable para un grupo de investigación, en el listado de
// /informacion-academica/grupos-investigacion. Mismo patrón visual que
// ProgramaCard.
const GrupoInvestigacionCard = ({ id, nombre, nombreCorto, estado, presentacion }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-full bg-unmsm-green/10 flex items-center justify-center flex-shrink-0">
        <MdScience className="text-unmsm-green text-xl" />
      </div>
      <div className="min-w-0 flex-1">
        {nombreCorto && (
          <p className="text-unmsm-navy text-xs font-bold uppercase tracking-wide">{nombreCorto}</p>
        )}
        <h3 className="font-bold text-unmsm-navy leading-snug">{nombre}</h3>
      </div>
    </div>

    {estado && (
      <span className="inline-flex items-center self-start mt-3 bg-unmsm-green/10 text-unmsm-green text-xs font-semibold px-2.5 py-1 rounded-full">
        {estado}
      </span>
    )}

    {presentacion && (
      <p className="text-unmsm-muted text-sm mt-3 flex-1 line-clamp-3">{presentacion}</p>
    )}

    <Link
      to={`/informacion-academica/grupos-investigacion/${id}`}
      className="mt-4 inline-flex items-center justify-center gap-1 border border-unmsm-green text-unmsm-green font-semibold text-sm rounded-lg px-4 py-2 hover:bg-unmsm-green hover:text-white transition-colors"
    >
      Ver Detalles <MdArrowForward className="text-base" />
    </Link>
  </div>
);

export default GrupoInvestigacionCard;
