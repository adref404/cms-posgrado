import { useNavigate } from "react-router-dom";
import { MdMenuBook, MdWorkspacePremium, MdCardMembership, MdStar, MdGroups } from "react-icons/md";

// Cifras institucionales, flotando ENCIMA del Hero (overlay con
// position:absolute + z-index), no como una sección aparte debajo de él.
// El Hero (HomeStudent.jsx lo envuelve en "relative h-screen") ocupa
// siempre la pantalla completa; esta tarjeta se dibuja por encima, pegada
// al borde inferior de la vista (bottom-0), con márgenes a los costados en
// todas las resoluciones (nunca ancho completo). Solo las esquinas
// superiores tienen curva — las inferiores quedan rectas porque la tarjeta
// está "saliendo" desde abajo del borde de la pantalla, no flotando
// separada de él.
//
// Los controles propios del Hero (flechas, play/pause, contador y puntos)
// se reubican más arriba (ver bottom-* en HeroComponent.jsx) para quedar
// siempre POR ENCIMA de esta tarjeta, nunca tapados por ella.
//
// Las 5 métricas van siempre en una sola fila (grid-cols-5 fijo, nunca 2 o
// 3): en pantallas chicas cada columna se angosta y el contenido se hace
// más compacto (ícono más chico, sin el detalle), pero nunca se acomodan
// en filas nuevas.
//
// Cada métrica (salvo Estudiantes, que no tiene una vista propia porque no
// hay base de datos de estudiantes) navega a su sección correspondiente.
const STATS = [
  { icono: MdMenuBook, valor: "5", etiqueta: "Maestrías", detalle: "Especializadas", url: "/programas/maestria" },
  { icono: MdWorkspacePremium, valor: "1", etiqueta: "Doctorado", detalle: "Máximo grado", url: "/programas/detalle/6" },
  { icono: MdCardMembership, valor: "3", etiqueta: "Diplomados", detalle: "Alta especialización", url: "/programas/diplomado" },
  { icono: MdStar, valor: "50+", etiqueta: "Docentes Renacyt", detalle: "Investigadores", url: "/informacion-academica/docentes" },
  { icono: MdGroups, valor: "500+", etiqueta: "Estudiantes", detalle: "Comunidad activa", url: null },
];

const HeroStatsBar = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-3 sm:px-8 md:px-14 lg:px-20 xl:px-28">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-br from-unmsm-navy-950 via-unmsm-navy to-unmsm-blue-900 shadow-[0_-14px_30px_-10px_rgba(0,0,0,0.55)] border border-b-0 border-white/10">
        {/* Manchas de color difuminadas, para que la tarjeta no se vea plana */}
        <div className="pointer-events-none absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-unmsm-blue-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-unmsm-mint-500/10 blur-3xl" />

        <div className="relative grid grid-cols-5 divide-x divide-white/10">
          {STATS.map(({ icono: Icono, valor, etiqueta, detalle, url }) => {
            // Mismo lineamiento de color para las 5 (ícono y hover en verde
            // de marca) — solo cambia si la métrica es o no navegable.
            const Tag = url ? "button" : "div";
            return (
              <Tag
                key={etiqueta}
                type={url ? "button" : undefined}
                onClick={url ? () => navigate(url) : undefined}
                className={`group flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start text-center sm:text-left gap-0.5 sm:gap-3 px-1 sm:px-3 lg:px-4 py-2.5 sm:py-4 lg:py-5 transition-colors duration-300 hover:bg-unmsm-green-500/10 ${
                  url ? "cursor-pointer" : ""
                }`}
              >
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-md sm:rounded-xl bg-unmsm-green-500/15 text-unmsm-green-400 transition-transform duration-300 group-hover:scale-110">
                  <Icono className="text-[11px] sm:text-base lg:text-lg" />
                </span>
                <div className="flex flex-col items-center sm:items-start leading-tight min-w-0">
                  <span className="text-xs sm:text-lg lg:text-2xl font-bold text-white">{valor}</span>
                  <span className="text-white/90 text-[6px] leading-[1.15] sm:text-[10px] lg:text-[11px] sm:leading-tight font-semibold uppercase tracking-tight sm:tracking-wide">
                    {etiqueta}
                  </span>
                  <span className="hidden lg:block text-white/50 text-[11px] truncate">{detalle}</span>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroStatsBar;
