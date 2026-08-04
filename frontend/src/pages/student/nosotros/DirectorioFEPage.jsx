import PageHero from "../../../components/ui/PageHero";
import SectionHeading from "../../../components/nosotros/SectionHeading";
import DirectoryTable from "../../../components/nosotros/DirectoryTable";
import { directorioFFEE, programasNoVigentes } from "../../../data/directorioFFEE";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const DirectorioFEPage = () => {
  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Nosotros"
        title="Directorio Facultad Educación"
        subtitle="Autoridades, unidades y oficinas de la Facultad de Educación"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <section>
          <SectionHeading>Unidades y Autoridades</SectionHeading>
          <DirectoryTable data={directorioFFEE} />
        </section>

        {programasNoVigentes.length > 0 && (
          <section>
            <SectionHeading>Programas y unidades no vigentes</SectionHeading>
            <p className="text-unmsm-muted text-sm mb-4">
              Referencia histórica — estas unidades ya no se encuentran activas.
            </p>
            <DirectoryTable data={programasNoVigentes} />
          </section>
        )}
      </div>
    </div>
  );
};

export default DirectorioFEPage;
