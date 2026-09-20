// Tarjeta de una sola cifra ("stat tile"). El color solo cambia cuando
// representa un estado real (algo que requiere atención) — "tono" acepta
// 'neutral' | 'warning' | 'good'; el resto de las tarjetas son neutras a
// propósito: no hay una categoría real que distinguir entre ellas, así que
// no se les inventa un color de "decoración".
const TONOS = {
  neutral: { badge: "bg-unmsm-green/10 text-unmsm-green", ring: "" },
  warning: { badge: "bg-[#fab219]/15 text-[#a16207]", ring: "ring-1 ring-[#fab219]/40" },
  good: { badge: "bg-unmsm-green/10 text-unmsm-green", ring: "" },
};

const StatTile = ({ icon: Icon, label, value, tono = "neutral" }) => {
  const t = TONOS[tono] || TONOS.neutral;
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5 flex items-center gap-3 sm:gap-4 ${t.ring}`}>
      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${t.badge}`}>
        <Icon className="text-lg sm:text-xl" />
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-semibold text-unmsm-navy leading-none">{value}</p>
        <p className="text-unmsm-muted text-xs sm:text-sm mt-1 sm:mt-1.5 truncate">{label}</p>
      </div>
    </div>
  );
};

export default StatTile;
