import { Link, useLocation } from "react-router-dom";
import { MdHome, MdChevronRight } from "react-icons/md";
import { getBreadcrumb } from "../../utils/breadcrumbMap";

// Fila de breadcrumb reutilizable, calculada solo según la ruta actual
// (utils/breadcrumbMap.js). Se usa dentro de PageHero (para las vistas con
// cabecera) y directamente en las páginas de detalle sin cabecera.
const BreadcrumbBar = () => {
  const { pathname } = useLocation();
  const info = getBreadcrumb(pathname);

  if (!info) return null;

  const { seccion, seccionTo, subseccion, subseccionTo, detalle } = info;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-1.5 text-sm text-unmsm-muted flex-wrap">
        <Link to="/home" className="flex items-center hover:text-unmsm-green transition-colors" aria-label="Inicio">
          <MdHome className="text-base" />
        </Link>

        {seccion && (
          <>
            <MdChevronRight className="flex-shrink-0 text-xs" />
            {seccionTo ? (
              <Link to={seccionTo} className="hover:text-unmsm-green transition-colors">
                {seccion}
              </Link>
            ) : (
              <span>{seccion}</span>
            )}
          </>
        )}

        <MdChevronRight className="flex-shrink-0 text-xs" />
        {subseccionTo ? (
          <Link to={subseccionTo} className="hover:text-unmsm-green transition-colors">
            {subseccion}
          </Link>
        ) : (
          <span className={detalle ? "" : "text-unmsm-green font-medium"}>{subseccion}</span>
        )}

        {detalle && (
          <>
            <MdChevronRight className="flex-shrink-0 text-xs" />
            <span className="text-unmsm-green font-medium truncate">{detalle}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbBar;
