import PageHero from "../../../components/ui/PageHero";
import NoticiaCard from "../../../components/noticias/NoticiaCard";
import ListToolbar from "../../../components/common/ListToolbar";
import ItemsPerPageSelect from "../../../components/common/ItemsPerPageSelect";
import Pagination from "../../../components/common/Pagination";
import { useFilteredList } from "../../../hooks/useFilteredList";
import { useSupabaseCollection } from "../../../hooks/useSupabaseCollection";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const NoticiasPage = () => {
  const { data: noticias, loading } = useSupabaseCollection("noticias");
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
          placeholder="Buscar noticia..."
        />

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-unmsm-muted text-sm">
              {totalCount} {totalCount === 1 ? "noticia" : "noticias"}
            </p>
            <ItemsPerPageSelect value={itemsPerPage} onChange={setItemsPerPage} />
          </div>
          <div className="flex justify-end mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-unmsm-muted py-12">Cargando noticias...</p>
        ) : paginated.length > 0 ? (
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
