import PageHero from "../../../components/ui/PageHero";
import NoticiaCard from "../../../components/noticias/NoticiaCard";
import ListToolbar from "../../../components/common/ListToolbar";
import Pagination from "../../../components/common/Pagination";
import { useFilteredList } from "../../../hooks/useFilteredList";
import { noticias } from "../../../data/noticias";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const NoticiasPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    totalPages,
    goToPage,
    paginated,
    totalCount,
  } = useFilteredList(noticias, { searchFields: ["titulo", "resumen"] });

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Noticias y Eventos"
        title="Noticias"
        subtitle="Novedades e institucionales de la Facultad de Educación"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <ListToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          fechaDesde={fechaDesde}
          onFechaDesdeChange={setFechaDesde}
          fechaHasta={fechaHasta}
          onFechaHastaChange={setFechaHasta}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          placeholder="Buscar noticia..."
        />

        <div className="flex items-center justify-between mb-4">
          <p className="text-unmsm-muted text-sm">
            {totalCount} {totalCount === 1 ? "noticia" : "noticias"}
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>

        {paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((noticia) => (
              <NoticiaCard key={noticia.id} {...noticia} />
            ))}
          </div>
        ) : (
          <p className="text-center text-unmsm-muted py-12">
            No se encontraron noticias para tu búsqueda.
          </p>
        )}

        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticiasPage;
