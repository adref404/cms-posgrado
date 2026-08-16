import { Link } from "react-router-dom";
import { MdArticle, MdArrowForward } from "react-icons/md";
import { formatFechaCorta } from "../../utils/dateFormat";

const NoticiaCard = ({ id, titulo, resumen, fecha, imagen, cuerpo, url }) => {
  const tieneDetalle = Boolean(cuerpo && cuerpo.length > 0);
  const destino = tieneDetalle ? `/noticias/${id}` : url || null;

  let Wrapper = "div";
  let wrapperProps = {};
  if (tieneDetalle) {
    Wrapper = Link;
    wrapperProps = { to: destino };
  } else if (destino) {
    Wrapper = "a";
    wrapperProps = { href: destino, target: "_blank", rel: "noopener noreferrer" };
  }

  return (
    <Wrapper
      {...wrapperProps}
      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
    >
      <div className="aspect-video bg-unmsm-blue/5 flex items-center justify-center overflow-hidden">
        {imagen ? (
          <img src={imagen} alt="" className="w-full h-full object-cover" />
        ) : (
          <MdArticle className="text-unmsm-blue text-4xl" />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-unmsm-navy text-xs font-medium uppercase tracking-wide">
          {formatFechaCorta(fecha)}
        </span>
        <h4 className="font-bold text-unmsm-green mt-1 leading-snug">{titulo}</h4>
        <p className="text-unmsm-muted text-sm mt-2 flex-1">{resumen}</p>
        {destino && (
          <span className="flex items-center gap-1 text-unmsm-green text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
            Leer más <MdArrowForward className="text-base" />
          </span>
        )}
      </div>
    </Wrapper>
  );
};

export default NoticiaCard;
