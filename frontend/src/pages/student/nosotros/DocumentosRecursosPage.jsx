import { useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import DocumentSection from "../../../components/nosotros/DocumentSection";
import { documentosRecursos } from "../../../data/documentosRecursos";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const DocumentosRecursosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return documentosRecursos;

    return documentosRecursos
      .map((seccion) => ({
        ...seccion,
        documentos: seccion.documentos.filter((doc) =>
          [doc.titulo, doc.descripcion, seccion.titulo]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(term))
        ),
      }))
      .filter((seccion) => seccion.documentos.length > 0);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Nosotros"
        title="Transparencia"
        subtitle="Reglamentos, directivas y enlaces útiles del Posgrado"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdSearch className="text-gray-500 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Buscar documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
          />
        </div>

        {filteredSections.length > 0 ? (
          filteredSections.map((seccion) => (
            <DocumentSection
              key={seccion.titulo}
              titulo={seccion.titulo}
              documentos={seccion.documentos}
            />
          ))
        ) : (
          <p className="text-center text-unmsm-muted py-12">
            No se encontraron documentos para "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentosRecursosPage;
