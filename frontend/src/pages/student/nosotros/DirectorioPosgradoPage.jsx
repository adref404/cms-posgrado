import PageHero from "../../../components/ui/PageHero";
import DirectoryGroup from "../../../components/nosotros/DirectoryGroup";
import { directorioPosgrado } from "../../../data/directorioPosgrado";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const DirectorioPosgradoPage = () => {
  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Nosotros"
        title="Directorio Posgrado"
        subtitle="Autoridades y coordinadores de la Unidad de Posgrado — Facultad de Educación"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {directorioPosgrado.map((grupo) => (
          <DirectoryGroup
            key={grupo.titulo}
            titulo={grupo.titulo}
            miembros={grupo.miembros}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectorioPosgradoPage;
