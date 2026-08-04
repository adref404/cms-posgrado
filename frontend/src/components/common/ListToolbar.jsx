import { MdSearch } from "react-icons/md";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const ListToolbar = ({
  searchTerm,
  onSearchChange,
  fechaDesde,
  onFechaDesdeChange,
  fechaHasta,
  onFechaHastaChange,
  itemsPerPage,
  onItemsPerPageChange,
  placeholder = "Buscar por palabra clave...",
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
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

        <div>
          <label className="block text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-1">
            Desde
          </label>
          <input
            type="date"
            value={fechaDesde}
            onChange={(e) => onFechaDesdeChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-unmsm-navy bg-white"
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
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-unmsm-navy bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-1">
            Mostrar
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-unmsm-navy bg-white"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ListToolbar;
