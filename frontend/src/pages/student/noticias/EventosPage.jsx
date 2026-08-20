import PageHero from "../../../components/ui/PageHero";
import EventoCard from "../../../components/noticias/EventoCard";
import ListToolbar from "../../../components/common/ListToolbar";
import ItemsPerPageSelect from "../../../components/common/ItemsPerPageSelect";
import Pagination from "../../../components/common/Pagination";
import { useFilteredList } from "../../../hooks/useFilteredList";
import { useSupabaseCollection } from "../../../hooks/useSupabaseCollection";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const HOY = new Date().toISOString().slice(0, 10);

// A diferencia de Noticias/Comunicados (donde "más reciente publicado
// primero" tiene sentido), en Eventos lo útil es ver primero lo que
// todavía va a pasar. Los eventos futuros van del más próximo al más
// lejano; agotados esos, siguen los que ya pasaron, del más reciente al
// más antiguo — nunca mezclados sin orden ni con uno viejo apareciendo
// antes que uno de esta semana.
const ordenarEventos = (a, b) => {
  const aFuturo = a.fecha >= HOY;
  const bFuturo = b.fecha >= HOY;
  if (aFuturo !== bFuturo) return aFuturo ? -1 : 1;
  return aFuturo ? new Date(a.fecha) - new Date(b.fecha) : new Date(b.fecha) - new Date(a.fecha);
};

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
  } = useFilteredList(eventos, { searchFields: ["titulo", "descripcion", "lugar"], sortFn: ordenarEventos });

  // Dónde, dentro de la página actual, empiezan los eventos que ya pasaron
  // (-1 si esta página no tiene ninguno) — para insertar el separador ahí.
  const indicePrimerPasado = paginated.findIndex((e) => e.fecha < HOY);

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
            {paginated.map((evento, index) => (
              <div key={evento.id}>
                {index === indicePrimerPasado && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-unmsm-muted text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                      Eventos que ya pasaron
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
                <EventoCard {...evento} />
              </div>
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
