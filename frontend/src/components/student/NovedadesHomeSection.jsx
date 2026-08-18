import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import Reveal from "../common/Reveal";
import NoticiaCard from "../noticias/NoticiaCard";
import EventoCard from "../noticias/EventoCard";
import ComunicadoCard from "../comunicados/ComunicadoCard";
import { useSupabaseCollection } from "../../hooks/useSupabaseCollection";

// Teaser de Novedades: últimas noticias + próximos eventos + comunicados
// recientes. Reutiliza las mismas tarjetas de /noticias, /eventos y
// /comunicados, así que ya respetan el criterio de enlace interno/externo y
// el aviso de contenido de ejemplo de esa sección.
const NovedadesHomeSection = () => {
  const { data: noticias } = useSupabaseCollection("noticias");
  const { data: eventos } = useSupabaseCollection("eventos");
  const { data: comunicados } = useSupabaseCollection("comunicados");

  const ultimasNoticias = [...noticias]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 2);
  const proximosEventos = [...eventos]
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 2);
  // Comunicados urgentes primero, igual criterio que /comunicados.
  const comunicadosRecientes = [...comunicados]
    .sort((a, b) => {
      if (a.urgente !== b.urgente) return a.urgente ? -1 : 1;
      return new Date(b.fecha) - new Date(a.fecha);
    })
    .slice(0, 2);

  return (
    <section className="bg-unmsm-bg py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="text-unmsm-green font-semibold tracking-widest uppercase text-sm mb-2">
            Actualidad
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-unmsm-navy mb-3">
            Noticias, Eventos y Comunicados
          </h2>
          <p className="text-unmsm-muted text-base md:text-lg leading-relaxed">
            Mantente al día con lo que pasa en la Facultad de Educación.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <Reveal direction="left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-unmsm-navy">Últimas noticias</h3>
              <Link
                to="/noticias"
                className="flex items-center gap-1 text-unmsm-green text-sm font-semibold hover:gap-2 transition-all"
              >
                Ver todas <MdArrowForward className="text-base" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ultimasNoticias.map((noticia) => (
                <NoticiaCard key={noticia.id} {...noticia} />
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-unmsm-navy">Próximos eventos</h3>
              <Link
                to="/eventos"
                className="flex items-center gap-1 text-unmsm-green text-sm font-semibold hover:gap-2 transition-all"
              >
                Ver todos <MdArrowForward className="text-base" />
              </Link>
            </div>
            <div className="space-y-4">
              {proximosEventos.map((evento) => (
                <EventoCard key={evento.id} {...evento} />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-8 lg:mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-unmsm-navy">Comunicados recientes</h3>
            <Link
              to="/comunicados"
              className="flex items-center gap-1 text-unmsm-green text-sm font-semibold hover:gap-2 transition-all"
            >
              Ver todos <MdArrowForward className="text-base" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comunicadosRecientes.map((comunicado) => (
              <ComunicadoCard key={comunicado.id} {...comunicado} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NovedadesHomeSection;
