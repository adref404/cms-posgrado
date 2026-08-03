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

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Misión y Visión */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <SectionHeading>Misión</SectionHeading>
            <p className="text-unmsm-text leading-relaxed">{mision}</p>
          </div>
          <div>
            <SectionHeading>Visión</SectionHeading>
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
                title={principio.title}
                description={principio.description}
              />
            ))}
          </div>
        </section>

        {/* Autoridades */}
        <section>
          <SectionHeading>Autoridades</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {autoridades.map((autoridad) => (
              <AuthorityCard key={`${autoridad.name}-${autoridad.role}`} {...autoridad} />
            ))}
          </div>
        </section>

        {/* Fuente institucional */}
        <p className="text-xs text-gray-400 border-t border-unmsm-line pt-6">
          {fuenteInstitucional}
        </p>
      </div>
    </div>
  );
};

export default QuienesSomosPage;
