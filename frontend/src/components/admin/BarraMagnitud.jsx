// Gráfico de barras horizontal de un solo tono (secuencial): compara
// cantidades entre categorías que NO son una identidad reutilizable en
// ningún otro gráfico — por eso un solo color, ni una paleta por categoría
// (colorear cada barra distinto acá no significaría nada real).
// "datos" ya viene ordenado de mayor a menor (ver useAdminDashboardStats).
const BarraMagnitud = ({ titulo, datos, hue, vacio }) => {
  const max = Math.max(1, ...datos.map((d) => d.value));

  if (datos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 overflow-hidden">
        <h3 className="font-bold text-unmsm-navy mb-1">{titulo}</h3>
        <p className="text-unmsm-muted text-sm py-6 text-center">{vacio || "Todavía no hay datos."}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 overflow-hidden">
      <h3 className="font-bold text-unmsm-navy mb-3 sm:mb-4">{titulo}</h3>
      <div className="space-y-3">
        {datos.map((d) => (
          <div key={d.label} className="min-w-0">
            {/* "min-w-0 flex-1" en la etiqueta es lo que deja que "truncate"
                funcione de verdad dentro de un flex row — sin eso, el texto
                largo empuja el ancho de toda la tarjeta (y de la página) en
                vez de cortarse con "...". */}
            <div className="flex items-center justify-between gap-3 text-sm mb-1">
              <span className="text-unmsm-text truncate min-w-0 flex-1">{d.label}</span>
              <span className="text-unmsm-navy font-semibold tabular-nums flex-shrink-0">{d.value}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded overflow-hidden">
              <div
                className="h-full rounded-r"
                style={{ width: `${(d.value / max) * 100}%`, backgroundColor: hue }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarraMagnitud;
