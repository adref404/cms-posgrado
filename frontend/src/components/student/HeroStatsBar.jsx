import { MdMenuBook, MdWorkspacePremium, MdCardMembership, MdStar, MdGroups } from "react-icons/md";

// Cifras institucionales, justo debajo del Hero. A propósito es una
// sección aparte (no vive dentro del carrusel de arriba): el Hero ya tiene
// sus propios controles (flechas, puntos, play/pause) anclados abajo — si
// esta franja fuera parte del mismo bloque, en pantallas chicas terminaría
// peleando por el mismo espacio. Al ser una sección independiente, nunca
// puede superponerse ni romper esos controles, sin importar el tamaño de
// pantalla.
//
// En HomeStudent.jsx esta franja vive junto al Hero dentro de un
// contenedor "h-screen flex flex-col": el Hero toma flex-1 (se encoge a lo
// que sobre) y esta franja conserva su alto natural, así ambos caben
// siempre en una sola vista sin necesidad de hacer scroll.
const STATS = [
  { icono: MdMenuBook, valor: "5", etiqueta: "Maestrías" },
  { icono: MdWorkspacePremium, valor: "1", etiqueta: "Doctorado" },
  { icono: MdCardMembership, valor: "3", etiqueta: "Diplomados" },
  { icono: MdStar, valor: "50+", etiqueta: "Docentes Renacyt" },
  { icono: MdGroups, valor: "500+", etiqueta: "Estudiantes" },
];

const HeroStatsBar = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-unmsm-navy-950 via-unmsm-navy to-unmsm-blue-900">
    {/* Línea de borde superior con brillo, en vez de un borde plano */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-unmsm-blue-300/50 to-transparent" />

    {/* Manchas de color difuminadas: le dan profundidad y son lo que el
        backdrop-blur de las tarjetas termina "leyendo" detrás, generando
        el efecto de vidrio azulado. */}
    <div className="pointer-events-none absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-unmsm-blue-500/25 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-unmsm-mint-500/10 blur-3xl" />

    <div className="relative max-w-6xl mx-auto px-4 py-3 sm:py-7">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {STATS.map(({ icono: Icono, valor, etiqueta }, index) => (
          <div
            key={etiqueta}
            className={`group flex flex-col items-center text-center gap-1 sm:gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-2 py-2 sm:px-3 sm:py-4 shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${
              // El 5to ítem, solo en la fila mobile de a 2, se centra ocupando
              // ambas columnas en vez de quedar solo pegado a la izquierda.
              index === STATS.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <span className="flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-unmsm-blue-400/30 to-unmsm-mint-400/20 ring-1 ring-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Icono className="text-unmsm-mint-300 text-sm sm:text-lg" />
            </span>
            <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-none">{valor}</span>
            <span className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wide">{etiqueta}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HeroStatsBar;
