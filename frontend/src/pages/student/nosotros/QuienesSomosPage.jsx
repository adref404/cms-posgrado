import { MdFlag, MdVisibility } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import SectionHeading from "../../../components/nosotros/SectionHeading";
import ValueCard from "../../../components/nosotros/ValueCard";
import AuthorityCard from "../../../components/nosotros/AuthorityCard";
import {
  mision,
  vision,
  valoresIntro,
  valores,
  principios,
  autoridades,
  fuenteInstitucional,
} from "../../../data/nosotros";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const QuienesSomosPage = () => {
  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Nosotros"
        title="Quiénes Somos"
        subtitle="Misión, visión, valores y autoridades de la Facultad de Educación"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 pt-12 space-y-16">
        {/* Misión y Visión */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
                <MdFlag className="text-unmsm-blue text-xl" />
              </div>
              <h3 className="text-lg font-bold text-unmsm-navy">Misión</h3>
            </div>
            <p className="text-unmsm-text leading-relaxed">{mision}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-unmsm-green/10 flex items-center justify-center flex-shrink-0">
                <MdVisibility className="text-unmsm-green text-xl" />
              </div>
              <h3 className="text-lg font-bold text-unmsm-navy">Visión</h3>
            </div>
            <p className="text-unmsm-text leading-relaxed">{vision}</p>
          </div>
        </section>

        {/* Valores */}
        <section>
          <SectionHeading>Valores</SectionHeading>
          <p className="text-unmsm-muted mb-6 leading-relaxed">
            {valoresIntro}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {valores.map((valor) => (
              <ValueCard
                key={valor.title}
                icon={valor.icono}
                title={valor.title}
                description={valor.description}
              />
            ))}
          </div>
        </section>

        {/* Principios */}
        <section>
          <SectionHeading>Principios</SectionHeading>
          <div className="grid md:grid-cols-2 gap-4">
            {principios.map((principio) => (
              <ValueCard
                key={principio.title}
                icon={principio.icono}
                title={principio.title}
                description={principio.description}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Autoridades — a propósito FUERA del contenedor centrado de arriba,
          para que la fila de fotos ocupe todo el ancho del navegador. */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <SectionHeading>Autoridades</SectionHeading>
        </div>
        {/* auto-fit (no auto-fill) colapsa las columnas sobrantes: con 4
            autoridades y espacio de sobra, arma 4 columnas que llenan todo
            el ancho, en vez de dejar una 5ta columna vacía a la derecha. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 md:gap-4 bg-unmsm-bg px-4 sm:px-8 lg:px-12">
          {autoridades.map((autoridad) => (
            <AuthorityCard key={autoridad.name} {...autoridad} />
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* Fuente institucional */}
        <p className="text-xs text-gray-400 border-t border-unmsm-line pt-6">
          {fuenteInstitucional}
        </p>
      </div>
    </div>
  );
};

export default QuienesSomosPage;
