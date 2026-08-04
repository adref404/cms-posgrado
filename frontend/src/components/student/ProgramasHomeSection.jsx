import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import Reveal from "../common/Reveal";
import ProgramaCard from "../programas/ProgramaCard";
import programasPosgrado from "../../data/programas";

// Vitrina en carrusel de TODOS los programas (para no ocupar tanto espacio
// vertical como una grilla completa); cada tarjeta abre su vista de detalle
// en /programas/detalle/:id (ver components/programas/ProgramaCard).
const ProgramasHomeSection = () => {
  const trackRef = useRef(null);

  const scroll = (direccion) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direccion * track.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      {/* Manchas decorativas suaves, sin protagonismo */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-unmsm-blue/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-unmsm-green/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="text-unmsm-green font-semibold tracking-widest uppercase text-sm mb-2">
            Posgrado en Educación
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-unmsm-navy mb-3">
            Nuestros Programas de Posgrado
          </h2>
        </Reveal>

        <Reveal delay={100} className="relative">
          {/* Flechas — solo desktop, en mobile se desliza con el dedo */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Ver programas anteriores"
            className="hidden md:flex absolute -left-5 top-[38%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-unmsm-navy hover:text-unmsm-green hover:shadow-lg transition-all"
          >
            <MdChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Ver más programas"
            className="hidden md:flex absolute -right-5 top-[38%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-unmsm-navy hover:text-unmsm-green hover:shadow-lg transition-all"
          >
            <MdChevronRight className="text-2xl" />
          </button>

          {/* Degradados en los bordes para insinuar que hay más contenido */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-white to-transparent z-[1]" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-white to-transparent z-[1]" />

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {programasPosgrado.map((programa) => (
              <div
                key={programa.id}
                className="snap-start flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[31%]"
              >
                <ProgramaCard programa={programa} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-8 md:mt-10 flex flex-col items-center gap-3">
          <Link
            to="/programas/maestria"
            className="inline-flex items-center gap-2 bg-unmsm-blue text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-unmsm-navy transition-colors shadow-sm"
          >
            Ver todos los programas <MdArrowForward className="text-lg" />
          </Link>
          <p className="text-sm text-unmsm-muted">
            o revisa{" "}
            <Link to="/programas/doctorado" className="text-unmsm-navy font-medium hover:underline">
              Doctorado
            </Link>{" "}
            ·{" "}
            <Link to="/programas/diplomado" className="text-unmsm-navy font-medium hover:underline">
              Diplomado
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ProgramasHomeSection;
