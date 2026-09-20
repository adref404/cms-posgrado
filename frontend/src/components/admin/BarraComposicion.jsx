// Barra apilada (parte-todo): a diferencia de BarraMagnitud, acá cada
// categoría SÍ es una identidad real (quién compone los grupos de
// investigación) y por eso cada una tiene su propio color — fijo por
// nombre, nunca por posición/orden, para que si cambian las cantidades
// (y por tanto el orden) ningún color "salte" de una categoría a otra.
const COLOR_POR_VINCULO = {
  "Docente permanente": "#2a78d6",
  "Docente contratado": "#e87ba4",
  "Estudiante posgrado": "#eb6834",
  "Estudiante pregrado": "#1baf7a",
  Externo: "#eda100",
  "Egresado posgrado": "#008300",
  Estudiante: "#4a3aa7",
};
const COLOR_SIN_DATO = "#898781"; // gris — "sin dato", no es una categoría real

const colorDe = (label) => COLOR_POR_VINCULO[label] || COLOR_SIN_DATO;

const BarraComposicion = ({ titulo, datos }) => {
  const total = datos.reduce((acc, d) => acc + d.value, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h3 className="font-bold text-unmsm-navy mb-1">{titulo}</h3>
        <p className="text-unmsm-muted text-sm py-6 text-center">Todavía no hay integrantes registrados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-3 sm:mb-4 gap-2 flex-wrap">
        <h3 className="font-bold text-unmsm-navy">{titulo}</h3>
        <span className="text-unmsm-muted text-sm">{total} en total</span>
      </div>

      <div className="h-6 rounded flex overflow-hidden bg-gray-100">
        {datos.map((d, i) => (
          <div
            key={d.label}
            title={`${d.label}: ${d.value} (${Math.round((d.value / total) * 100)}%)`}
            className={i < datos.length - 1 ? "mr-0.5" : ""}
            style={{ width: `${(d.value / total) * 100}%`, backgroundColor: colorDe(d.label) }}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
        {datos.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: colorDe(d.label) }} />
            <span className="text-unmsm-text">{d.label}</span>
            <span className="text-unmsm-navy font-semibold tabular-nums">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarraComposicion;
