import { Navigate, useParams, Link } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import EnDesarrolloPage from "../../../components/common/EnDesarrolloPage";
import ProgramaAccordion from "../../../components/programas/ProgramaAccordion";
import ProgramaInfoClaveCard from "../../../components/programas/ProgramaInfoClaveCard";
import programasPosgrado from "../../../data/programas";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const ProgramaDetallePage = () => {
  const { id } = useParams();
  const programa = programasPosgrado.find((p) => String(p.id) === id);

  if (!programa) return <Navigate to="/programas/maestria" replace />;

  if (!programa.detalle) {
    return (
      <EnDesarrolloPage
        eyebrow={programa.tipo}
        title={programa.name}
        subtitle={programa.description}
        image={NOSOTROS_HERO_IMAGE}
        tituloSeccion={programa.name}
      />
    );
  }

  const { detalle } = programa;
  const {
    gradoOtorga,
    creditos,
    presentacion,
    objetivosAcademicos,
    perfilIngreso,
    perfilGraduado,
    planEstudios,
    inversion,
    requisitosAdmision,
    contacto,
  } = detalle;

  const sections = [
    {
      titulo: "Presentación",
      contenido: <p>{presentacion}</p>,
    },
    {
      titulo: "Objetivos Académicos",
      contenido: (
        <ul className="list-disc pl-5 space-y-1.5">
          {objetivosAcademicos.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      titulo: "Perfil de Ingreso y Graduado",
      contenido: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-unmsm-navy mb-1.5">Perfil de Ingreso</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              {perfilIngreso.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-unmsm-navy mb-1.5">Perfil de Graduado</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              {perfilGraduado.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      titulo: "Plan de Estudios",
      contenido: (
        <div className="space-y-4">
          {planEstudios.map((bloque) => (
            <div key={bloque.semestre} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-unmsm-blue text-white text-sm font-semibold px-4 py-2">
                Semestre {bloque.semestre}
              </div>
              <ul className="divide-y divide-gray-100">
                {bloque.cursos.map((curso) => (
                  <li key={curso.nombre} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                    <span className="min-w-0">{curso.nombre}</span>
                    <span className="flex-shrink-0 text-unmsm-muted">{curso.creditos} cr.</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      titulo: "Plana Docente",
      contenido: (
        <p>
          Los cursos de este programa son dictados por docentes de la Facultad de Educación.
          Consulta la plana docente completa en{" "}
          <Link to="/informacion-academica/docentes" className="text-unmsm-green font-semibold hover:underline">
            Información Académica → Plana Docente
          </Link>
          .
        </p>
      ),
    },
    {
      titulo: "Horarios",
      contenido: (
        <p>
          Los horarios de este programa se publican por ciclo académico en{" "}
          <Link to="/matricula/horario-cursos" className="text-unmsm-green font-semibold hover:underline">
            Matrícula → Horario de Cursos
          </Link>
          .
        </p>
      ),
    },
    {
      titulo: "Inversión Económica",
      contenido: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-unmsm-navy mb-2">Admisión</h4>
            <p className="text-sm mb-3">El pago por derecho de inscripción a los programas es el siguiente:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {inversion.admision.map((item) => (
                <div key={item.monto} className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-unmsm-green text-white text-center font-bold text-lg py-3">{item.monto}</div>
                  <p className="text-xs text-center p-3">{item.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-unmsm-navy mb-2">Créditos</h4>
            <p className="text-sm mb-3">
              Cada curso tiene un valor en créditos; de acuerdo al número de créditos matriculados se determina el
              pago del semestre.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-unmsm-green text-white text-center font-bold text-lg py-3">
                  {inversion.costoPorCredito}
                </div>
                <p className="text-xs text-center p-2">Costo por crédito (*)</p>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-unmsm-green text-white text-center font-bold text-lg py-3">
                  {inversion.costoTotal}
                </div>
                <p className="text-xs text-center p-2">Costo total (*)</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-unmsm-navy mb-2">Costos por semestre</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {inversion.porSemestre.map((s) => (
                <div key={s.semestre} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-unmsm-navy text-white text-sm font-semibold px-4 py-2">{s.semestre}</div>
                  <dl className="text-sm divide-y divide-gray-100">
                    <div className="flex justify-between px-4 py-1.5">
                      <dt className="text-unmsm-muted">Matrícula</dt>
                      <dd className="font-medium">{s.matricula}</dd>
                    </div>
                    <div className="flex justify-between px-4 py-1.5">
                      <dt className="text-unmsm-muted">N° de créditos</dt>
                      <dd className="font-medium">{s.creditos}</dd>
                    </div>
                    <div className="flex justify-between px-4 py-1.5">
                      <dt className="text-unmsm-muted">Costo por semestre</dt>
                      <dd className="font-medium">{s.costoSemestre}</dd>
                    </div>
                    <div className="flex justify-between px-4 py-1.5 bg-unmsm-bg">
                      <dt className="text-unmsm-muted">Cuota mensual (4 cuotas)</dt>
                      <dd className="font-semibold text-unmsm-navy">{s.cuotaMensual}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-unmsm-mint-50 border border-unmsm-mint-200 rounded-lg p-4">
            <p className="font-semibold text-unmsm-navy text-sm mb-2">Condiciones de pago</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {inversion.condiciones.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      titulo: "Requisitos de Admisión",
      contenido: (
        <ul className="list-disc pl-5 space-y-1.5">
          {requisitosAdmision.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow={programa.tipo}
        title={programa.name}
        subtitle={gradoOtorga ? `Grado que otorga: ${gradoOtorga}` : undefined}
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <InfoBanner icon={MdInfo} title="Contenido de ejemplo" tone="blue">
          Esta vista de detalle es un ejemplo para mostrar cómo funciona el diseño (acordeón, información clave,
          contacto). El texto, los cursos y los montos son ilustrativos y todavía no son información oficial del
          programa.
        </InfoBanner>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 min-w-0">
            <ProgramaAccordion sections={sections} />
          </div>
          <div className="min-w-0">
            <ProgramaInfoClaveCard programa={{ ...programa, creditos, inversion, contacto }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramaDetallePage;
