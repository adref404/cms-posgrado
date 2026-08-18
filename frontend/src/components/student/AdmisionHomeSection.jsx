import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowForward, MdSync } from "react-icons/md";
import Reveal from "../common/Reveal";
import {
  procesoAdmision2026II,
  cronogramaAcademicoDestacado,
  getEstadoConfig,
  calcularEstadoPaso,
  calcularProgresoProceso,
} from "../../data/matricula";

// Vitrina del proceso de admisión 2026-II (el ciclo en curso) — con una
// "solapa" en la esquina inferior derecha que voltea la sección hacia el
// Cronograma Académico (matrícula, inicio/fin de clases). La admisión dura
// unas semanas; el cronograma académico le importa a cualquier estudiante
// durante todo el semestre, así que ambos conviven en el mismo espacio del
// Home en vez de competir por lugar. La fuente de verdad de fechas es
// data/matricula.js; el estado de cada paso y el avance de la línea se
// calculan comparando con la fecha del dispositivo (ver
// calcularEstadoPaso/calcularProgresoProceso), no están escritos a mano.
const AdmisionHomeSection = () => {
  const [vista, setVista] = useState("admision"); // "admision" | "academico"
  const [animando, setAnimando] = useState(false);

  const esAdmision = vista === "admision";
  const pasos = esAdmision ? procesoAdmision2026II : cronogramaAcademicoDestacado;
  const progreso = calcularProgresoProceso(pasos);

  // Fade breve antes de cambiar el contenido, para que el salto de un
  // cronograma a otro no se sienta como un parpadeo brusco.
  const voltear = () => {
    setAnimando(true);
    setTimeout(() => {
      setVista((v) => (v === "admision" ? "academico" : "admision"));
      setAnimando(false);
    }, 200);
  };

  return (
    <section className="relative overflow-hidden bg-unmsm-navy text-white py-12 md:py-20">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-unmsm-green/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-unmsm-blue/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pb-16 md:pb-20">
        <div className={`transition-opacity duration-200 ${animando ? "opacity-0" : "opacity-100"}`}>
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <p className="text-unmsm-mint-300 font-semibold tracking-widest uppercase text-sm mb-2">
              {esAdmision ? "Admisión 2026-II · En proceso" : "Semestre 2026-II"}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              {esAdmision ? "Cronograma de Admisión" : "Cronograma Académico"}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              {esAdmision
                ? "Los pasos y fechas clave del proceso de admisión que está en curso ahora mismo."
                : "Las fechas que le importan a todo estudiante una vez que termina la admisión: matrícula, inicio y fin de clases."}
            </p>
          </div>

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
              {pasos.map((paso, index) => {
                const estado = calcularEstadoPaso(paso);
                const { color, label, icon: EstadoIcon } = getEstadoConfig(estado);
                const Icono = paso.icono;
                return (
                  <Reveal key={`${vista}-${paso.evento}`} delay={index * 100}>
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

          <div className="text-center mt-10 md:mt-14">
            <Link
              to={esAdmision ? "/matricula/proceso-matricula" : "/matricula/cronograma-academico"}
              className="inline-flex items-center gap-2 bg-white text-unmsm-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-unmsm-mint-100 transition-colors shadow-sm"
            >
              {esAdmision ? "Ver proceso de matrícula completo" : "Ver cronograma académico completo"}{" "}
              <MdArrowForward className="text-lg" />
            </Link>
          </div>
        </div>
      </div>

      {/* "Solapa" en la esquina — como levantar la hoja para ver qué hay
          debajo: mientras dura la admisión, lo urgente es su cronograma；
          apenas termina, lo que importa es el académico. En vez de un
          flip 3D (frágil con contenido de alto variable), el contenido
          cambia con un fundido corto y este botón fijo hace de "asa" para
          voltear, siempre visible sin importar qué vista esté activa. */}
      <button
        type="button"
        onClick={voltear}
        className="group absolute bottom-5 right-4 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 pl-4 pr-4 sm:pr-5 py-2.5 sm:py-3 bg-white text-unmsm-navy font-semibold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-unmsm-mint-100 transition-colors"
      >
        <MdSync className="text-base flex-shrink-0 transition-transform duration-500 group-hover:rotate-180" />
        {esAdmision ? "Ver cronograma académico" : "Ver cronograma de admisión"}
      </button>
    </section>
  );
};

export default AdmisionHomeSection;
