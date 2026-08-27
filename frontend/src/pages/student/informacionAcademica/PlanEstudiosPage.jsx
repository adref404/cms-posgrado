import { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenuBook, MdInfo, MdSchool } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import programasPosgrado from "../../../data/programas";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

// Solo entran acá los programas que ya tienen su malla curricular cargada
// (detalle.planEstudios) — mismo criterio que la ficha de cada programa en
// /programas/detalle/:id, que es la fuente única de esta data.
const programasConPlan = programasPosgrado.filter((p) => p.detalle?.planEstudios?.length > 0);

const PlanEstudiosPage = () => {
  const [selectedId, setSelectedId] = useState(programasConPlan[0]?.id ?? null);
  const programa = programasConPlan.find((p) => p.id === selectedId);
  const planEstudios = programa?.detalle?.planEstudios || [];
  const totalCreditos = planEstudios.reduce(
    (acc, bloque) => acc + bloque.cursos.reduce((s, c) => s + c.creditos, 0),
    0
  );

  const maestrias = programasConPlan.filter((p) => p.tipo === "Maestría");
  const doctorados = programasConPlan.filter((p) => p.tipo === "Doctorado");

  const botonPrograma = (p) => (
    <button
      key={p.id}
      onClick={() => setSelectedId(p.id)}
      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
        selectedId === p.id
          ? "bg-unmsm-green text-white shadow-sm"
          : "text-gray-600 hover:bg-unmsm-bg hover:text-unmsm-navy"
      }`}
    >
      {p.name}
    </button>
  );

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Información Académica"
        title="Plan de Estudios"
        subtitle="Malla curricular de los programas de posgrado"
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sub-sección: selector de programa */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">Programa</h3>
              {maestrias.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-2">Maestría</p>
                  <nav className="space-y-2 mb-4">{maestrias.map(botonPrograma)}</nav>
                </>
              )}
              {doctorados.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-unmsm-muted uppercase tracking-wide mb-2">Doctorado</p>
                  <nav className="space-y-2">{doctorados.map(botonPrograma)}</nav>
                </>
              )}
            </div>
          </div>

          {/* Malla curricular del programa seleccionado */}
          <div className="lg:col-span-3 space-y-6">
            {programa ? (
              <>
                <InfoBanner icon={MdMenuBook} title={programa.name} tone="blue">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>
                      {programa.duration} · {totalCreditos} créditos académicos totales
                    </span>
                    <span className="text-unmsm-muted">·</span>
                    <Link
                      to={`/programas/detalle/${programa.id}`}
                      className="font-semibold text-unmsm-navy hover:underline"
                    >
                      Ver ficha completa del programa
                    </Link>
                  </div>
                </InfoBanner>

                <div className="space-y-4">
                  {planEstudios.map((bloque) => (
                    <div
                      key={bloque.ciclo}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <div className="bg-unmsm-navy text-white text-sm font-semibold px-6 py-3">{bloque.ciclo}</div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Curso
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Créditos
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Requisito
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {bloque.cursos.map((curso) => (
                              <tr key={curso.nombre} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 text-sm font-medium text-gray-900">{curso.nombre}</td>
                                <td className="px-6 py-3 text-sm text-gray-600 whitespace-nowrap">
                                  {curso.creditos}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600">{curso.requisito || "No requiere"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>

                <InfoBanner icon={MdInfo} title="Información Adicional" tone="blue">
                  <p className="text-sm">
                    El detalle completo del programa (presentación, objetivos, perfil de ingreso/graduado e
                    inversión económica) está disponible en su ficha propia dentro de{" "}
                    <Link to="/programas/maestria" className="font-semibold text-unmsm-navy hover:underline">
                      Programas
                    </Link>
                    .
                  </p>
                </InfoBanner>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MdSchool className="text-unmsm-muted text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-unmsm-navy mb-2">Sin programas disponibles</h3>
                <p className="text-unmsm-muted max-w-md mx-auto">
                  Todavía no hay mallas curriculares publicadas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEstudiosPage;
