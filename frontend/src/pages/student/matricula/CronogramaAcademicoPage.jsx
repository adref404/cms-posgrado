import { MdInfo, MdCalendarToday } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import { cronogramaAcademico, getEstadoConfig } from "../../../data/matricula";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

const CronogramaAcademicoPage = () => {
  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Matrícula"
        title="Cronograma Académico"
        subtitle="Fechas clave del semestre 2026-II"
        image={MATRICULA_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
        <InfoBanner icon={MdInfo} title="Período Académico 2026-II" tone="blue">
          Consulta las fechas importantes del semestre académico actual.
        </InfoBanner>

        <div className="grid gap-4">
          {cronogramaAcademico.map((item, index) => {
            const { color, label, icon: StatusIcon } = getEstadoConfig(item.estado);
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <StatusIcon className="text-xl" style={{ color }} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {item.evento}
                      </h4>
                      <p className="text-gray-600 flex items-center mt-1">
                        <MdCalendarToday className="text-sm mr-1" />
                        {item.fecha}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CronogramaAcademicoPage;
