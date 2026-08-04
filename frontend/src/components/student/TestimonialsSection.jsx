import { useState } from "react";
import { MdFormatQuote, MdExpandMore } from "react-icons/md";
import Reveal from "../common/Reveal";
import { testimonials } from "../../data/mockData";

// Testimonios de ejemplo (nombres y citas ilustrativas) mientras se define
// la integración real vía Google Form + Google Sheet. Se avisa explícito
// en la sección porque, a diferencia de Noticias/Eventos, esta vive en el
// Home y no pasa por el popup de aviso por ruta (ver AvisoContenidoEjemplo).
//
// El orden visual es SIEMPRE el mismo (cita arriba, datos de la persona
// abajo, como el diseño de escritorio). En mobile la cita arranca oculta;
// al tocar el encabezado (que se queda fijo abajo) se abre arriba de él.
// En desktop (md+) la cita siempre está visible, sin necesidad de tocar.
const TestimonialsSection = () => {
  const [abiertos, setAbiertos] = useState(() => new Set());

  const toggle = (id) => {
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="bg-unmsm-bg py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-4 md:mb-6">
          <p className="text-unmsm-green font-semibold tracking-widest uppercase text-sm mb-2">
            Testimonios
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-unmsm-navy mb-3">
            Lo que Dicen Nuestros Egresados
          </h2>
          <p className="text-unmsm-muted text-base md:text-lg leading-relaxed">
            Historias de quienes ya pasaron por nuestros programas de posgrado.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => {
            const isOpen = abiertos.has(testimonial.id);
            return (
              <Reveal key={testimonial.id} delay={index * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col min-w-0">
                  {/* Cita: se despliega con una animación de alto fluida (grid-template-rows 0fr→1fr) en vez de aparecer de golpe; siempre expandida en desktop */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:grid-rows-[1fr] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-6 pt-6 pb-4 transition-opacity duration-300 md:opacity-100 ${
                          isOpen ? "opacity-100 delay-150" : "opacity-0"
                        }`}
                      >
                        <MdFormatQuote className="text-unmsm-blue/20 text-4xl mb-1" />
                        <p className="text-unmsm-text italic leading-relaxed -mt-2">{testimonial.quote}</p>
                      </div>
                    </div>
                  </div>

                  {/* Encabezado: se queda fijo abajo; en mobile se toca para desplegar la cita arriba */}
                  <button
                    onClick={() => toggle(testimonial.id)}
                    aria-expanded={isOpen}
                    className={`flex items-center gap-4 p-6 text-left w-full ${
                      isOpen ? "border-t border-gray-100" : ""
                    } md:border-t md:border-gray-100`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-unmsm-blue to-unmsm-navy flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-unmsm-navy truncate">{testimonial.author}</h4>
                      <p className="text-sm text-unmsm-muted truncate">{testimonial.position}</p>
                      <p className="text-xs text-unmsm-green font-medium mt-1">
                        {testimonial.program} · {testimonial.year}
                      </p>
                    </div>
                    <MdExpandMore
                      className={`md:hidden text-unmsm-muted text-xl flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
