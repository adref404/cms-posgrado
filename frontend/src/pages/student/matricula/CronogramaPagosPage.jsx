import { useState } from "react";
import {
  MdInfo,
  MdSchool,
  MdCalendarToday,
  MdWarning,
  MdDownload,
} from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import { cronogramaPagos } from "../../../data/matricula";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

const CronogramaPagosPage = () => {
  const [selectedProgram, setSelectedProgram] = useState("maestria");
  const [esPrimerCiclo, setEsPrimerCiclo] = useState(false);

  const datosPrograma = cronogramaPagos[selectedProgram];
  const matricula = esPrimerCiclo
    ? datosPrograma?.matriculaPrimerCiclo
    : datosPrograma?.matriculaCiclosSiguientes;
  const pensiones = datosPrograma?.pensiones;

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Matrícula"
        title="Cronograma de Pagos"
        subtitle="Montos y fechas de pago del semestre 2026-II"
        image={MATRICULA_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-unmsm-blue/5 border-l-4 border-unmsm-blue p-6 rounded-r-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start">
              <MdInfo className="text-unmsm-blue text-2xl mt-1 mr-3 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-unmsm-navy mb-2">
                  Montos y Fechas de Pago
                </h3>
                <p className="text-unmsm-muted">
                  Selecciona tu programa de estudios para ver el detalle.
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedProgram("maestria")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedProgram === "maestria"
                    ? "bg-unmsm-green text-white shadow-sm"
                    : "bg-white text-unmsm-navy border border-unmsm-line hover:bg-unmsm-bg"
                }`}
              >
                Maestría
              </button>
              <button
                onClick={() => setSelectedProgram("doctorado")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedProgram === "doctorado"
                    ? "bg-unmsm-green text-white shadow-sm"
                    : "bg-white text-unmsm-navy border border-unmsm-line hover:bg-unmsm-bg"
                }`}
              >
                Doctorado
              </button>
            </div>
          </div>
        </div>

        {/* Selección de ciclo — solo cambia el monto de matrícula; las
            pensiones son las mismas sin importar el ciclo. */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <MdInfo className="text-unmsm-green text-xl mr-2" />
            <h4 className="font-semibold text-gray-800">¿Cuál es tu situación?</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setEsPrimerCiclo(false)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                !esPrimerCiclo
                  ? "border-unmsm-green bg-unmsm-green/10 text-unmsm-green"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="font-medium">Matrícula Regular</div>
              <div className="text-sm text-gray-600">Ya estás matriculado en el programa</div>
            </button>
            <button
              onClick={() => setEsPrimerCiclo(true)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                esPrimerCiclo
                  ? "border-unmsm-green bg-unmsm-green/10 text-unmsm-green"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="font-medium">Matrícula de Ingresantes</div>
              <div className="text-sm text-gray-600">Es tu primer ciclo en el programa</div>
            </button>
          </div>
        </div>

        {/* Matrícula y Pensiones */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Matrícula: pago único con fecha límite -> guinda (importancia/urgencia) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-unmsm-guinda/10 rounded-full mr-4">
                <MdSchool className="text-unmsm-guinda text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-lg font-semibold text-gray-800">Matrícula</h4>
                <p className="text-gray-600 text-sm">Pago único por semestre</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">{matricula?.monto}</span>
                <span className="text-sm text-unmsm-guinda font-medium">
                  Hasta {matricula?.fecha}
                </span>
              </div>
            </div>
          </div>

          {/* Pensiones: pagos recurrentes -> verde */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-unmsm-green/15 rounded-full mr-4">
                <MdCalendarToday className="text-unmsm-green text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-lg font-semibold text-gray-800">Pensiones</h4>
                <p className="text-gray-600 text-sm">Pagos mensuales</p>
              </div>
            </div>
            <div className="space-y-3">
              {(pensiones || []).map((pension, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                >
                  <span className="font-medium text-gray-700">
                    {pension.cuota} Cuota
                  </span>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{pension.monto}</div>
                    <div className="text-sm text-gray-600">{pension.fecha}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información importante -> guinda: es literalmente lo más crítico de la página */}
        <div className="bg-unmsm-guinda/5 border border-unmsm-guinda/30 rounded-xl p-6">
          <h4 className="font-semibold text-unmsm-guinda mb-3 flex items-center">
            <MdWarning className="mr-2" />
            Información Importante
          </h4>
          <div className="space-y-2 text-unmsm-text">
            <p>
              • Plataforma de pago: <strong>San Market UNMSM</strong>
            </p>
            <p>
              • Enviar comprobante a:{" "}
              <strong className="break-all">
                controldepagosupg.fe@unmsm.edu.pe
              </strong>
            </p>
            <p>
              • Con copia a:{" "}
              <strong className="break-all">upg.educacion@unmsm.edu.pe</strong>
            </p>
          </div>
          <a
            href="https://sanmarket.unmsm.edu.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-unmsm-guinda text-white font-semibold px-6 py-2 rounded-lg hover:bg-unmsm-guinda-900 transition-colors inline-flex items-center"
          >
            <MdDownload className="mr-2" /> Ir a San Market
          </a>
        </div>
      </div>
    </div>
  );
};

export default CronogramaPagosPage;
