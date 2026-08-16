const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

// Selector compacto "Mostrar: N" — vive junto al conteo de resultados (ej.
// "3 noticias"), no dentro de la caja de filtros, para no ocupar espacio
// extra ahí.
const ItemsPerPageSelect = ({ value, onChange }) => (
  <label className="flex items-center gap-1.5 text-xs text-unmsm-muted flex-shrink-0">
    <span className="font-semibold uppercase tracking-wide">Mostrar:</span>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-unmsm-navy focus:outline-none focus:ring-2 focus:ring-unmsm-navy bg-white"
    >
      {ITEMS_PER_PAGE_OPTIONS.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  </label>
);

export default ItemsPerPageSelect;
