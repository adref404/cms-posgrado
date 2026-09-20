import { MdSearch } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import GrupoInvestigacionCard from "../../../components/gruposInvestigacion/GrupoInvestigacionCard";
import ItemsPerPageSelect from "../../../components/common/ItemsPerPageSelect";
import Pagination from "../../../components/common/Pagination";
import { useGruposInvestigacion } from "../../../hooks/useGruposInvestigacion";
import { useFilteredList } from "../../../hooks/useFilteredList";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

// Sin fecha que ordenar (a diferencia de Noticias/Eventos/Comunicados) — se
// conserva tal cual el orden que ya trae la consulta (columna "orden").
const sinOrdenarPorFecha = () => 0;

const GruposInvestigacionPage = () => {
  const { grupos, loading } = useGruposInvestigacion();
  const {
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    totalPages,
    goToPage,
    paginated,
    totalCount,
  } = useFilteredList(grupos, {
    searchFields: ["nombre", "nombre_corto", "presentacion"],
    sortFn: sinOrdenarPorFecha,
  });

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Información Académica"
        title="Grupos de Investigación"
        subtitle="Grupos de investigación registrados que integran docentes y estudiantes de posgrado"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdSearch className="text-gray-500 text-lg" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar grupo de investigación..."
            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-unmsm-muted text-sm">
              {totalCount} {totalCount === 1 ? "grupo" : "grupos"}
            </p>
            <ItemsPerPageSelect value={itemsPerPage} onChange={setItemsPerPage} />
          </div>
          <div className="flex justify-end mt-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-unmsm-muted py-12">Cargando grupos de investigación...</p>
        ) : paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((g) => (
              <GrupoInvestigacionCard
                key={g.id}
                id={g.id}
                nombre={g.nombre}
                nombreCorto={g.nombre_corto}
                estado={g.estado}
                presentacion={g.presentacion}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-unmsm-muted py-12">
            {searchTerm
              ? `No se encontraron grupos para "${searchTerm}"`
              : "Todavía no hay grupos de investigación publicados."}
          </p>
        )}

        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </div>
      </div>
    </div>
  );
};

export default GruposInvestigacionPage;
