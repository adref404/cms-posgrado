import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MdSearch, MdArrowForward, MdSearchOff } from "react-icons/md";
import PageHero from "../../components/ui/PageHero";
import { useSiteSearch } from "../../hooks/useSiteSearch";
import { NOSOTROS_HERO_IMAGE } from "../../utils/constants";

// Resultados de búsqueda del sitio completo — ver hooks/useSiteSearch.js
// para qué se indexa (páginas fijas, programas, FAQ, docentes, y en vivo
// Noticias/Eventos/Comunicados).
const BusquedaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryUrl = searchParams.get("q") || "";
  const [texto, setTexto] = useState(queryUrl);

  useEffect(() => {
    setTexto(queryUrl);
  }, [queryUrl]);

  const resultados = useSiteSearch(queryUrl);

  const buscar = (e) => {
    e.preventDefault();
    setSearchParams(texto.trim() ? { q: texto.trim() } : {});
  };

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Búsqueda"
        title="Buscar en el sitio"
        subtitle="Noticias, programas, trámites, docentes y más"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={buscar} className="relative mb-8">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            autoFocus
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar noticias, programas, trámites, docentes..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
          />
        </form>

        {!queryUrl ? (
          <p className="text-unmsm-muted text-center py-12">Escribe algo para empezar a buscar.</p>
        ) : resultados.length === 0 ? (
          <div className="text-center py-12">
            <MdSearchOff className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-unmsm-muted">
              No se encontraron resultados para <span className="font-semibold">&ldquo;{queryUrl}&rdquo;</span>
            </p>
          </div>
        ) : (
          <>
            <p className="text-unmsm-muted text-sm mb-4">
              {resultados.length} resultado{resultados.length === 1 ? "" : "s"} para &ldquo;{queryUrl}&rdquo;
            </p>
            <div className="space-y-3">
              {resultados.map((item, i) => (
                <Link
                  key={`${item.ruta}-${i}`}
                  to={item.ruta}
                  className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-unmsm-green/40 transition-all p-4"
                >
                  <span className="text-unmsm-green text-xs font-semibold uppercase tracking-wide">
                    {item.seccion}
                  </span>
                  <h3 className="font-bold text-unmsm-navy mt-0.5 flex items-center gap-1.5">
                    {item.titulo}
                    <MdArrowForward className="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  {item.descripcion && (
                    <p className="text-unmsm-muted text-sm mt-1 line-clamp-2">{item.descripcion}</p>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusquedaPage;
