import { useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import FAQAccordion from "../../../components/faq/FAQAccordion";
import { faqInformacionAcademica } from "../../../data/faqInformacionAcademica";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const PreguntasFrecuentesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return faqInformacionAcademica;

    return faqInformacionAcademica.filter((item) =>
      [item.categoria, item.pregunta, item.respuesta]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Información Académica"
        title="Preguntas Frecuentes"
        subtitle="Resuelve tus dudas sobre matrícula, pagos, horarios y docentes"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdSearch className="text-gray-500 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Buscar una pregunta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
          />
        </div>

        {filtered.length > 0 ? (
          <FAQAccordion items={filtered} />
        ) : (
          <p className="text-center text-unmsm-muted py-12">
            No se encontraron preguntas para "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
};

export default PreguntasFrecuentesPage;
