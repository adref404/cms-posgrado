import PageHero from "../../../components/ui/PageHero";
import GrupoInvestigacionCard from "../../../components/gruposInvestigacion/GrupoInvestigacionCard";
import { useGruposInvestigacion } from "../../../hooks/useGruposInvestigacion";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const GruposInvestigacionPage = () => {
  const { grupos, loading } = useGruposInvestigacion();

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Información Académica"
        title="Grupos de Investigación"
        subtitle="Grupos de investigación registrados que integran docentes y estudiantes de posgrado"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-unmsm-muted py-12">Cargando grupos de investigación...</p>
        ) : grupos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grupos.map((g) => (
              <GrupoInvestigacionCard
                key={g.id}
                id={g.id}
                nombre={g.nombre}
                nombreCorto={g.nombre_corto}
                estado={g.estado}
                presentacion={g.presentacion}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-unmsm-muted py-12">Todavía no hay grupos de investigación publicados.</p>
        )}
      </div>
    </div>
  );
};

export default GruposInvestigacionPage;
