import { useEffect, useRef, useState } from "react";
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

// Cuenta ascendente para el número de cada métrica ("50+" arranca en "0+" y
// sube hasta 50 con desaceleración al final). "activo" lo dispara una sola
// vez, cuando la tarjeta entra en pantalla — antes de eso se muestra en 0
// para no spoilear el número final.
const useCountUp = (valor, activo, duracion = 1200) => {
  const match = valor.match(/^(\d+)(.*)$/);
  const numero = match ? parseInt(match[1], 10) : null;
  const sufijo = match ? match[2] : "";
  const [display, setDisplay] = useState(numero === null ? valor : `0${sufijo}`);

  useEffect(() => {
    if (!activo || numero === null) return undefined;

    let frame;
    const inicio = performance.now();

    const tick = (ahora) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      const easeado = 1 - Math.pow(1 - progreso, 3); // easeOutCubic
      setDisplay(`${Math.round(easeado * numero)}${sufijo}`);
      if (progreso < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activo, numero, sufijo, duracion]);

  return display;
};

const StatItem = ({ icono: Icono, valor, etiqueta, detalle, url, index, visible, onNavigate }) => {
  const display = useCountUp(valor, visible);
  const Tag = url ? "button" : "div";
  const delayMs = 150 + index * 90;

  return (
    <Tag
      type={url ? "button" : undefined}
      onClick={url ? onNavigate : undefined}
      className={`group flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start text-center sm:text-left gap-0.5 sm:gap-3 px-1 sm:px-3 lg:px-4 py-2.5 sm:py-4 lg:py-5 transition-[background-color,opacity,transform] duration-500 ease-out hover:bg-unmsm-green-500/10 ${
        url ? "cursor-pointer" : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      <span
        className={`stat-icon flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-md sm:rounded-xl bg-unmsm-green-500/15 text-unmsm-green-400 transition-transform duration-300 group-hover:scale-110 ${
          visible ? "stat-icon-pop" : "opacity-0"
        }`}
        style={{ animationDelay: `${delayMs + 100}ms` }}
      >
        <Icono className="text-[11px] sm:text-base lg:text-lg" />
      </span>
      <div className="flex flex-col items-center sm:items-start leading-tight min-w-0">
        <span className="text-xs sm:text-lg lg:text-2xl font-bold text-white tabular-nums">{display}</span>
        <span className="text-white/90 text-[6px] leading-[1.15] sm:text-[10px] lg:text-[11px] sm:leading-tight font-semibold uppercase tracking-tight sm:tracking-wide">
          {etiqueta}
        </span>
        <span className="hidden lg:block text-white/50 text-[11px] truncate">{detalle}</span>
      </div>
    </Tag>
  );
};

const HeroStatsBar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  // Dispara la entrada (tarjeta + cifras) una sola vez, cuando la barra
  // asoma en pantalla — así el efecto se nota incluso si el fondo del Hero
  // tarda en cargar, en vez de animar a ciegas apenas monta el componente.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-x-0 bottom-0 z-20 px-3 sm:px-8 md:px-14 lg:px-20 xl:px-28">
      <style>{`
        @keyframes statBlobBreathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.15); opacity: 0.55; }
        }

        .stat-blob {
          animation: statBlobBreathe 9s ease-in-out infinite;
        }

        @keyframes statIconPop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .stat-icon-pop {
          animation: statIconPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-blob,
          .stat-icon-pop {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className={`relative max-w-6xl mx-auto overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-br from-unmsm-navy-950 via-unmsm-navy to-unmsm-blue-900 shadow-[0_-14px_30px_-10px_rgba(0,0,0,0.55)] border border-b-0 border-white/10 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Manchas de color difuminadas, para que la tarjeta no se vea plana */}
        <div className="stat-blob pointer-events-none absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-unmsm-blue-500/25 blur-3xl" />
        <div
          className="stat-blob pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-unmsm-mint-500/10 blur-3xl"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative grid grid-cols-5 divide-x divide-white/10">
          {STATS.map(({ icono, valor, etiqueta, detalle, url }, index) => (
            <StatItem
              key={etiqueta}
              icono={icono}
              valor={valor}
              etiqueta={etiqueta}
              detalle={detalle}
              url={url}
              index={index}
              visible={visible}
              onNavigate={url ? () => navigate(url) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroStatsBar;
