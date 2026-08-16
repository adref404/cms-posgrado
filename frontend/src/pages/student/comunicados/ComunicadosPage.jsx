import PageHero from "../../../components/ui/PageHero";
import ComunicadoCard from "../../../components/comunicados/ComunicadoCard";
import ListToolbar from "../../../components/common/ListToolbar";
import ItemsPerPageSelect from "../../../components/common/ItemsPerPageSelect";
import Pagination from "../../../components/common/Pagination";
import { useFilteredList } from "../../../hooks/useFilteredList";
import { useSupabaseCollection } from "../../../hooks/useSupabaseCollection";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const ComunicadosPage = () => {
  const { data: comunicados, loading } = useSupabaseCollection("comunicados");
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
  } = useFilteredList(comunicados, { searchFields: ["titulo", "resumen"] });

  // Dentro de cada página, los urgentes primero
  const ordenados = [...paginated].sort((a, b) => {
    if (a.urgente !== b.urgente) return a.urgente ? -1 : 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Comunicados"
        title="Comunicados"
        subtitle="Avisos oficiales de la Facultad de Educación"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <ListToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          fechaDesde={fechaDesde}
          onFechaDesdeChange={setFechaDesde}
          fechaHasta={fechaHasta}
          onFechaHastaChange={setFechaHasta}
          placeholder="Buscar comunicado..."
        />

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-unmsm-muted text-sm">
              {totalCount} {totalCount === 1 ? "comunicado" : "comunicados"}
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
          <p className="text-center text-unmsm-muted py-12">Cargando comunicados...</p>
        ) : ordenados.length > 0 ? (
          <div className="space-y-4">
            {ordenados.map((comunicado) => (
              <ComunicadoCard key={comunicado.id} {...comunicado} />
            ))}
          </div>
        ) : (
          <p className="text-center text-unmsm-muted py-12">
            No se encontraron comunicados para tu búsqueda.
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

export default ComunicadosPage;
