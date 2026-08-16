import { Link, Navigate, useParams } from "react-router-dom";
import { MdArrowForward, MdArticle } from "react-icons/md";
import { useSupabaseItem } from "../../../hooks/useSupabaseItem";
import { useSupabaseCollection } from "../../../hooks/useSupabaseCollection";
import { formatFechaLarga } from "../../../utils/dateFormat";
import BreadcrumbBar from "../../../components/common/BreadcrumbBar";

const NoticiaDetallePage = () => {
  const { id } = useParams();
  const noticia = useSupabaseItem("noticias", id);
  const { data: noticias } = useSupabaseCollection("noticias");

  if (noticia === undefined) return null; // cargando
  if (!noticia) return <Navigate to="/noticias" replace />;

  const relacionadas = noticias.filter((n) => n.id !== noticia.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <div className="h-24 bg-unmsm-blue" />
      <BreadcrumbBar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-unmsm-navy leading-tight">
              {noticia.titulo}
            </h1>
            <p className="text-unmsm-muted text-sm mt-3">
              {formatFechaLarga(noticia.fecha)}
            </p>

            {noticia.imagen ? (
              <img
                src={noticia.imagen}
                alt=""
                className="w-full aspect-video rounded-xl mt-6 object-cover"
              />
            ) : (
              <div className="w-full h-48 rounded-xl mt-6 bg-unmsm-blue/5 flex items-center justify-center">
                <MdArticle className="text-unmsm-blue text-5xl" />
              </div>
            )}

            <div className="mt-6 space-y-4 text-unmsm-text leading-relaxed">
              {(noticia.cuerpo || [noticia.resumen]).map((parrafo, index) => (
                <p key={index}>{parrafo}</p>
              ))}
            </div>

            {noticia.url && (
              <a
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-unmsm-blue hover:text-unmsm-navy font-semibold mt-6 transition-colors"
              >
                Ver fuente original <MdArrowForward className="text-base" />
              </a>
            )}
          </article>

          <aside>
            <h3 className="font-bold text-unmsm-navy mb-4">Noticias relacionadas</h3>
            <div className="space-y-4">
              {relacionadas.length > 0 ? (
                relacionadas.map((n) => {
                  const tieneDetalle = Boolean(n.cuerpo && n.cuerpo.length > 0);
                  const contenido = (
                    <>
                      <span className="text-unmsm-navy text-xs font-medium uppercase tracking-wide">
                        {formatFechaLarga(n.fecha)}
                      </span>
                      <p className="font-semibold text-unmsm-navy text-sm mt-1 leading-snug">
                        {n.titulo}
                      </p>
                    </>
                  );
                  const cardClass =
                    "block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4";

                  return tieneDetalle ? (
                    <Link key={n.id} to={`/noticias/${n.id}`} className={cardClass}>
                      {contenido}
                    </Link>
                  ) : (
                    <a
                      key={n.id}
                      href={n.url || "/noticias"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {contenido}
                    </a>
                  );
                })
              ) : (
                <p className="text-unmsm-muted text-sm">No hay más noticias por ahora.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NoticiaDetallePage;
