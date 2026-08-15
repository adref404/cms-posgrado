import { useState } from "react";
import { Link } from "react-router-dom";
import { MdFlag, MdVisibility, MdArrowForward, MdSync } from "react-icons/md";
import Reveal from "../common/Reveal";
import { mision, misionImagen, vision, visionImagen } from "../../data/nosotros";

// Tarjeta que gira en 3D: adelante foto de fondo + ícono + título; al
// tocarla, gira y muestra la descripción atrás. Usa perspective/backface-
// visibility (CSS), no una librería nueva.
const FlipCard = ({ icon: Icon, tono, titulo, texto, imagen }) => {
  const [volteada, setVolteada] = useState(false);

  const tonos = {
    blue: { bgIcon: "bg-white/20", icon: "text-white", bgAtras: "bg-unmsm-blue", overlay: "from-unmsm-blue/90 via-unmsm-blue/60 to-unmsm-navy/80" },
    green: { bgIcon: "bg-white/20", icon: "text-white", bgAtras: "bg-unmsm-green", overlay: "from-unmsm-green/90 via-unmsm-green/50 to-unmsm-navy/80" },
  }[tono];

  return (
    <button
      onClick={() => setVolteada((v) => !v)}
      aria-pressed={volteada}
      className="group w-full h-80 md:h-72 text-left [perspective:1200px]"
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] ${
          volteada ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Adelante: foto de fondo + ícono + título */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
          <img
            src={imagen}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${tonos.overlay}`} />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
            <div
              className={`w-16 h-16 rounded-full ${tonos.bgIcon} backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`${tonos.icon} text-3xl`} />
            </div>
            <h3 className="font-bold text-white text-2xl">{titulo}</h3>
            <span className="flex items-center gap-1.5 text-white/80 text-xs mt-4">
              <MdSync className="text-sm" /> Toca para leer más
            </span>
          </div>
        </div>

        {/* Atrás: descripción */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] ${tonos.bgAtras} text-white rounded-2xl shadow-sm flex flex-col justify-center p-7 md:p-6 overflow-y-auto`}
        >
          <h3 className="font-bold text-lg mb-3">{titulo}</h3>
          <p className="text-sm leading-relaxed text-white/90">{texto}</p>
        </div>
      </div>
    </button>
  );
};

// Teaser institucional "Quiénes somos" — contenido real tomado del Plan
// Estratégico de la Facultad (ver data/nosotros.js), no es de ejemplo.
const NosotrosHomeSection = () => (
  <section className="bg-white py-12 md:py-20">
    <div className="max-w-6xl mx-auto px-4">
      <Reveal className="text-center mb-6 md:mb-8">
        <p className="text-unmsm-green font-semibold tracking-widest uppercase text-sm mb-2">
          Nosotros
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-unmsm-navy">Quiénes Somos</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Reveal direction="left">
          <FlipCard icon={MdFlag} tono="blue" titulo="Misión" texto={mision} imagen={misionImagen} />
        </Reveal>
        <Reveal direction="right" delay={100}>
          <FlipCard icon={MdVisibility} tono="green" titulo="Visión" texto={vision} imagen={visionImagen} />
        </Reveal>
      </div>

      <Reveal delay={200} className="text-center mt-6 md:mt-8">
        <Link
          to="/nosotros/quienes-somos"
          className="inline-flex items-center gap-2 text-unmsm-navy font-semibold hover:text-unmsm-blue transition-colors"
        >
          Conoce más sobre la Facultad <MdArrowForward className="text-lg" />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default NosotrosHomeSection;
