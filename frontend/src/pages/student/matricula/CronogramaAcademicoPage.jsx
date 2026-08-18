import { MdInfo, MdCalendarToday } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import { calcularEstadoPaso, getEstadoConfig } from "../../../data/matricula";
import { useCronograma } from "../../../hooks/useCronograma";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

const CronogramaAcademicoPage = () => {
  const { data: cronogramaAcademico } = useCronograma("academico");

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

        <div className="grid grid-cols-1 gap-4">
          {cronogramaAcademico.map((item) => {
            const estado = calcularEstadoPaso(item);
            const { color, label, icon: StatusIcon } = getEstadoConfig(estado);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow min-w-0"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <StatusIcon className="text-xl" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <h4 className="text-lg font-semibold text-gray-800">{item.evento}</h4>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white flex-shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {label}
                      </span>
                    </div>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MdCalendarToday className="text-sm flex-shrink-0" />
                      {item.fecha}
                    </p>
                  </div>
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
