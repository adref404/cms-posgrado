import { MdSearch } from "react-icons/md";

// "Mostrar" (cantidad por página) NO vive acá — se muestra junto al conteo
// de resultados (ver ItemsPerPageSelect), para no ocupar espacio extra
// dentro de esta caja de filtros.
const ListToolbar = ({
  searchTerm,
  onSearchChange,
  fechaDesde,
  onFechaDesdeChange,
  fechaHasta,
  onFechaHastaChange,
  placeholder = "Buscar por palabra clave...",
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 mb-6">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_auto] md:items-end">
        <div>
          <label className="block text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-1">
            Palabra clave
          </label>
          <div className="relative">
            <MdSearch className="absolute inset-y-0 left-3 my-auto text-gray-500 text-lg pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
            />
          </div>
        </div>

        {/* Desde/Hasta comparten fila tanto en mobile como en desktop. */}
        <div className="grid grid-cols-2 gap-3 md:contents">
          <div>
            <label className="block text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-1">
              Desde
            </label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => onFechaDesdeChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-unmsm-navy bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-1">
              Hasta
            </label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => onFechaHastaChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-unmsm-navy bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListToolbar;
