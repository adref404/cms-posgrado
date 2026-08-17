import PageHero from "../../../components/ui/PageHero";
import EventoCard from "../../../components/noticias/EventoCard";
import ListToolbar from "../../../components/common/ListToolbar";
import ItemsPerPageSelect from "../../../components/common/ItemsPerPageSelect";
import Pagination from "../../../components/common/Pagination";
import { useFilteredList } from "../../../hooks/useFilteredList";
import { useSupabaseCollection } from "../../../hooks/useSupabaseCollection";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const EventosPage = () => {
  const { data: eventos, loading } = useSupabaseCollection("eventos");
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
  } = useFilteredList(eventos, { searchFields: ["titulo", "descripcion", "lugar"] });

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Actualidad"
        title="Eventos"
        subtitle="Actividades y fechas por venir de la Facultad de Educación"
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
          placeholder="Buscar evento..."
        />

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-unmsm-muted text-sm">
              {totalCount} {totalCount === 1 ? "evento" : "eventos"}
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
          <p className="text-center text-unmsm-muted py-12">Cargando eventos...</p>
        ) : paginated.length > 0 ? (
          <div className="space-y-4">
            {paginated.map((evento) => (
              <EventoCard key={evento.id} {...evento} />
            ))}
          </div>
        ) : (
          <p className="text-center text-unmsm-muted py-12">
            No se encontraron eventos para tu búsqueda.
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

export default EventosPage;
