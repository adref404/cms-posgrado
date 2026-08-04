import PageHero from "../../../components/ui/PageHero";
import ProgramasGrid from "../../../components/programas/ProgramasGrid";
import programasPosgrado from "../../../data/programas";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

// Una sola página para "/programas/maestria", "/programas/doctorado" y
// "/programas/diplomado"; el tipo se pasa como prop desde App.jsx.
const ProgramasPage = ({ tipo, subtitle }) => {
  const programas = programasPosgrado.filter((p) => p.tipo === tipo);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero eyebrow="Programas" title={tipo} subtitle={subtitle} image={NOSOTROS_HERO_IMAGE} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <ProgramasGrid programas={programas} tipo={tipo} />
      </div>
    </div>
  );
};

export default ProgramasPage;
