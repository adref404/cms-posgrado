import React, { useState } from "react";
import {
  MdAccessTime,
  MdInfo,
  MdSearch,
  MdPerson,
  MdClass,
  MdHourglassEmpty,
} from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import { programasPorCiclo, CICLOS_DISPONIBLES } from "../../../data/matricula";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

const HorarioCursosPage = () => {
  const [selectedCiclo, setSelectedCiclo] = useState("2026-I"); // ciclo en curso por defecto
  const [tipoPrograma, setTipoPrograma] = useState("maestria"); // maestria | doctorado
  const [selectedPrograma, setSelectedPrograma] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const programas = programasPorCiclo[selectedCiclo];

  const handleSelectCiclo = (ciclo) => {
    setSelectedCiclo(ciclo);
    setSelectedPrograma("");
    setSearchTerm("");
  };

  const maestrias = programas
    ? [...programas.especializacion, ...programas.investigacion]
    : [];
  const programasPorTipo = programas
    ? tipoPrograma === "maestria"
      ? maestrias
      : programas.doctorado
    : [];

  const programaActual = programasPorTipo.find(
    (p) => p.clave === selectedPrograma
  );

  const filteredCursos = (programaActual?.cursos || []).filter(
    (curso) =>
      curso.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.aula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.horario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cursosOrdenados = [...filteredCursos].sort((a, b) => a.ciclo - b.ciclo);
  const ciclos = [...new Set(cursosOrdenados.map((c) => c.ciclo))];
  const getCicloNombre = (ciclo) => `CICLO ${ciclo}`;

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Matrícula"
        title="Horario de Cursos"
        subtitle="Selecciona el ciclo y tu programa para ver los horarios disponibles"
        image={MATRICULA_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sub-sección: selector de ciclo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">Ciclo</h3>
              <nav className="space-y-2">
                {CICLOS_DISPONIBLES.map((ciclo) => (
                  <button
                    key={ciclo.id}
                    onClick={() => handleSelectCiclo(ciclo.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      selectedCiclo === ciclo.id
                        ? "bg-unmsm-green text-white shadow-sm"
                        : "text-gray-600 hover:bg-unmsm-bg hover:text-unmsm-navy"
                    }`}
                  >
                    <span className="font-medium text-sm">{ciclo.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenido del ciclo seleccionado */}
          <div className="lg:col-span-3 space-y-6">
            {!programas ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MdHourglassEmpty className="text-unmsm-muted text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-unmsm-navy mb-2">
                  Horarios de {selectedCiclo} próximamente
                </h3>
                <p className="text-unmsm-muted max-w-md mx-auto">
                  Aún no se han publicado los horarios de este ciclo. En cuanto
                  estén disponibles, aparecerán aquí.
                </p>
              </div>
            ) : (
              <>
                <InfoBanner
                  icon={MdAccessTime}
                  title={`Horarios de Cursos ${selectedCiclo}`}
                  tone="blue"
                >
                  Selecciona tu tipo de programa y luego el programa específico.
                </InfoBanner>

                {/* Selección de tipo: Maestría / Doctorado */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Tipo de Programa
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setTipoPrograma("maestria")}
                      className={`px-6 py-4 rounded-xl font-medium transition-colors text-center ${
                        tipoPrograma === "maestria"
                          ? "bg-unmsm-green text-white shadow-sm"
                          : "bg-unmsm-gray text-unmsm-text hover:bg-unmsm-line"
                      }`}
                    >
                      Maestría
                    </button>
                    <button
                      onClick={() => setTipoPrograma("doctorado")}
                      className={`px-6 py-4 rounded-xl font-medium transition-colors text-center ${
                        tipoPrograma === "doctorado"
                          ? "bg-unmsm-green text-white shadow-sm"
                          : "bg-unmsm-gray text-unmsm-text hover:bg-unmsm-line"
                      }`}
                    >
                      Doctorado
                    </button>
                  </div>
                </div>

                {/* Lista de programas seleccionables */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Selecciona tu Programa
                  </h4>
                  <div className="space-y-3">
                    {programasPorTipo.map((prog) => (
                      <button
                        key={prog.clave}
                        onClick={() => setSelectedPrograma(prog.clave)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors text-sm ${
                          selectedPrograma === prog.clave
                            ? "border-unmsm-green bg-unmsm-green/10 text-unmsm-green"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {prog.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buscador */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdSearch className="text-gray-500 text-lg" />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar curso, docente, aula o horario..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
                    />
                  </div>

                  {/* Tabla de cursos */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Curso
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Horario
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Docente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aula
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Créd.
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sec.
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cursosOrdenados.length > 0 ? (
                          ciclos.map((ciclo) => {
                            const cursosDelCiclo = cursosOrdenados.filter(
                              (curso) => curso.ciclo === ciclo
                            );
                            return (
                              <React.Fragment key={ciclo}>
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="px-6 py-2 text-center text-sm font-semibold text-gray-700 bg-unmsm-bg border-t-2 border-gray-200"
                                  >
                                    {getCicloNombre(ciclo)}
                                  </td>
                                </tr>
                                {cursosDelCiclo.map((curso, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {curso.curso}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <MdAccessTime className="mr-1 text-unmsm-muted" />
                                        {curso.horario}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <MdPerson className="mr-1 text-unmsm-muted" />
                                        {curso.docente}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <MdClass className="mr-1 text-unmsm-muted" />
                                        {curso.aula || "—"}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                      {curso.credito}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                      {curso.seccion}
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-4 text-center text-gray-500"
                            >
                              {selectedPrograma
                                ? `No se encontraron cursos que coincidan con "${searchTerm}"`
                                : "Selecciona un programa para ver sus cursos"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <InfoBanner icon={MdInfo} title="Información Adicional" tone="blue">
                  <div className="space-y-2 text-sm">
                    <p>
                      • Los horarios pueden estar sujetos a cambios según
                      disponibilidad de aulas y docentes
                    </p>
                    <p>
                      • Para cursos con modalidad virtual, se informará el
                      enlace de acceso oportunamente
                    </p>
                    <p>
                      • Contacta a la coordinación académica para consultas
                      específicas sobre horarios
                    </p>
                  </div>
                </InfoBanner>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorarioCursosPage;
