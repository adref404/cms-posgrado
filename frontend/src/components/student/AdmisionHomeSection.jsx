import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import Reveal from "../common/Reveal";
import {
  procesoAdmision2026II,
  getEstadoConfig,
  calcularEstadoPaso,
  calcularProgresoProceso,
} from "../../data/matricula";

// Vitrina del proceso de admisión 2026-II (el ciclo en curso). La fuente de
// verdad de fechas es data/matricula.js; el estado de cada paso y el avance
// de la línea se calculan comparando con la fecha del dispositivo (ver
// calcularEstadoPaso/calcularProgresoProceso), no están escritos a mano.
const AdmisionHomeSection = () => {
  const progreso = calcularProgresoProceso(procesoAdmision2026II);

  return (
    <section className="relative overflow-hidden bg-unmsm-navy text-white py-12 md:py-20">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-unmsm-green/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-unmsm-blue/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <p className="text-unmsm-mint-300 font-semibold tracking-widest uppercase text-sm mb-2">
            Admisión 2026-II · En proceso
          </p>
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Cronograma de Admisión</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            Los pasos y fechas clave del proceso de admisión que está en curso ahora mismo.
          </p>
        </Reveal>

        <div className="relative">
          {/* Línea conectora — solo desktop; se va llenando según la fecha de hoy */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-white/15">
            <div
              className="absolute top-0 left-0 h-full bg-unmsm-green transition-all duration-1000 ease-out"
              style={{ width: `${progreso}%` }}
            />
            {/* Punto parpadeante — se queda sobre la línea */}
            <span
              className="absolute top-1/2 z-20 w-2.5 h-2.5 rounded-full bg-unmsm-green ring-4 ring-unmsm-green/25 animate-pulse transition-all duration-1000 ease-out"
              style={{ left: `${progreso}%`, transform: "translate(-50%, -50%)" }}
            />
          </div>

          {/* Etiqueta "Hoy" — flota arriba de los íconos, en el mismo eje horizontal, sin superponerlos */}
          <div
            className="hidden lg:block absolute z-20 text-[10px] font-semibold uppercase tracking-wide text-unmsm-mint-300 whitespace-nowrap transition-all duration-1000 ease-out"
            style={{ left: `${progreso}%`, top: "-2rem", transform: "translateX(-50%)" }}
          >
            Hoy
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {procesoAdmision2026II.map((paso, index) => {
              const estado = calcularEstadoPaso(paso);
              const { color, label, icon: EstadoIcon } = getEstadoConfig(estado);
              const Icono = paso.icono;
              return (
                <Reveal key={paso.evento} delay={index * 100}>
                  <div className="relative">
                    {/* < lg: ícono chico integrado a la izquierda de la card, para no desperdiciar alto */}
                    <div className="flex lg:hidden items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5">
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base shadow-lg"
                        style={{ backgroundColor: color }}
                      >
                        <Icono />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-snug text-sm">{paso.evento}</h3>
                        <p className="text-white/60 text-xs mt-0.5">{paso.fecha}</p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium mt-1.5 px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${color}30`, color }}
                        >
                          <EstadoIcon className="text-xs" /> {label}
                        </span>
                      </div>
                    </div>

                    {/* lg+: ícono arriba, centrado sobre la línea conectora */}
                    <div className="hidden lg:flex flex-col items-center text-center">
                      <div
                        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg mb-4"
                        style={{ backgroundColor: color }}
                      >
                        <Icono />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full">
                        <h3 className="font-semibold leading-snug">{paso.evento}</h3>
                        <p className="text-white/60 text-sm mt-1">{paso.fecha}</p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium mt-3 px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `${color}30`, color }}
                        >
                          <EstadoIcon className="text-sm" /> {label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={200} className="text-center mt-10 md:mt-14">
          <Link
            to="/matricula/proceso-matricula"
            className="inline-flex items-center gap-2 bg-white text-unmsm-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-unmsm-mint-100 transition-colors shadow-sm"
          >
            Ver proceso de matrícula completo <MdArrowForward className="text-lg" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default AdmisionHomeSection;
