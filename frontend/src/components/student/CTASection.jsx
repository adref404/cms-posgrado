import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn, MdArrowForward } from "react-icons/md";
import Reveal from "../common/Reveal";

const WHATSAPP_LINK =
  "https://wa.me/51965229338?text=" +
  encodeURIComponent("Hola, quisiera información sobre los programas de posgrado de la Facultad de Educación.");

const CTASection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-unmsm-blue to-unmsm-navy py-12 md:py-20">
    {/* Elementos decorativos de fondo */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-unmsm-green/10 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full" />
    </div>

    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          ¿Listo para Transformar tu Futuro?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Únete a nuestra comunidad académica y desarrolla las competencias necesarias para
          liderar el cambio en el sector educativo peruano.
        </p>
      </Reveal>

      <Reveal delay={100} className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:mb-14">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white text-unmsm-navy px-8 py-3.5 md:px-10 md:py-4 rounded-full font-semibold hover:bg-unmsm-mint-100 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          <FaWhatsapp className="text-xl" /> Solicitar Información
        </a>
        <Link
          to="/programas/maestria"
          className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full font-semibold hover:bg-white hover:text-unmsm-navy transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Ver Programas Disponibles <MdArrowForward />
        </Link>
      </Reveal>

      {/* Información de contacto rápido */}
      <Reveal delay={200} className="border-t border-white/20 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
          <div className="flex items-center justify-center gap-3">
            <MdPhone className="text-2xl flex-shrink-0" />
            <div>
              <div className="text-sm">Llámanos</div>
              <div className="font-semibold">(01) 619-7000</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MdEmail className="text-2xl flex-shrink-0" />
            <div>
              <div className="text-sm">Escríbenos</div>
              <div className="font-semibold break-all">upg.educacion@unmsm.edu.pe</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MdLocationOn className="text-2xl flex-shrink-0" />
            <div>
              <div className="text-sm">Visítanos</div>
              <div className="font-semibold">Ciudad Universitaria</div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTASection;
