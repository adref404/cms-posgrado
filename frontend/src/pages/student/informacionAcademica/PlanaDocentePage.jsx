import { useMemo, useState } from "react";
import { MdSearch, MdSchool, MdExpandMore } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import DocenteCard from "../../../components/informacionAcademica/DocenteCard";
import { planaDocente } from "../../../data/planaDocente";
import { programasFiltro, clavesPorDocente, getClaveDocente } from "../../../data/docentesPorPrograma";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const PlanaDocentePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return planaDocente.filter((docente) => {
      if (selectedPrograma) {
        const claves = clavesPorDocente[getClaveDocente(docente)] || [];
        if (!claves.includes(selectedPrograma)) return false;
      }

      if (!term) return true;

      return [
        docente.nombres,
        docente.apellidos,
        docente.grado,
        docente.categoria,
        docente.grupoInvestigacion,
        ...(docente.lineasInvestigacion || []),
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term));
    });
  }, [searchTerm, selectedPrograma]);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Información Académica"
        title="Plana Docente"
        subtitle="Docentes investigadores de la Facultad de Educación"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filtro por programa */}
          <div className="lg:w-60 lg:flex-shrink-0">
            {/* Mobile/tablet: selector desplegable para ahorrar espacio */}
            <div className="lg:hidden relative">
              <label className="flex items-center gap-2 text-sm font-semibold text-unmsm-navy mb-2">
                <MdSchool className="text-unmsm-green" /> Programa
              </label>
              <select
                value={selectedPrograma}
                onChange={(e) => setSelectedPrograma(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
              >
                <option value="">Todos los programas</option>
                {programasFiltro.map((programa) => (
                  <option key={programa.clave} value={programa.clave}>
                    {programa.nombre}
                  </option>
                ))}
              </select>
              <MdExpandMore className="absolute right-3 top-[2.6rem] text-gray-500 text-xl pointer-events-none" />
            </div>

            {/* Desktop: caja con lista de programas */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:sticky lg:top-24">
              <h3 className="flex items-center gap-2 font-semibold text-unmsm-navy mb-4">
                <MdSchool className="text-unmsm-green" /> Programas
              </h3>
              <nav className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedPrograma("")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                    selectedPrograma === ""
                      ? "bg-unmsm-green text-white shadow-sm"
                      : "text-unmsm-text hover:bg-unmsm-bg"
                  }`}
                >
                  Todos los programas
                </button>
                {programasFiltro.map((programa) => (
                  <button
                    key={programa.clave}
                    onClick={() =>
                      setSelectedPrograma((prev) => (prev === programa.clave ? "" : programa.clave))
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                      selectedPrograma === programa.clave
                        ? "bg-unmsm-green text-white shadow-sm"
                        : "text-unmsm-text hover:bg-unmsm-bg"
                    }`}
                  >
                    {programa.nombre}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Buscador + resultados */}
          <div className="flex-1 min-w-0">
            <div className="relative mb-8 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MdSearch className="text-gray-500 text-lg" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, grado o línea de investigación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
              />
            </div>

            <p className="text-unmsm-muted text-sm mb-6">
              {filtered.length} {filtered.length === 1 ? "docente" : "docentes"}
            </p>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {filtered.map((docente) => (
                  <DocenteCard key={getClaveDocente(docente)} {...docente} />
                ))}
              </div>
            ) : (
              <p className="text-center text-unmsm-muted py-12">
                No se encontraron docentes{searchTerm && ` para "${searchTerm}"`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanaDocentePage;
