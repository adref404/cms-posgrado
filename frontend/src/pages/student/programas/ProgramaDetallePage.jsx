import { Navigate, useParams, Link } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import EnDesarrolloPage from "../../../components/common/EnDesarrolloPage";
import ProgramaAccordion from "../../../components/programas/ProgramaAccordion";
import ProgramaInfoClaveCard from "../../../components/programas/ProgramaInfoClaveCard";
import programasPosgrado from "../../../data/programas";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

// Mientras se termina de redactar el contenido real de un programa
// (Presentación, Objetivos, Perfiles, Plan de Estudios), esa sección
// muestra este aviso en vez de quedar en blanco o romper el render.
const SeccionPendiente = () => (
  <p className="flex items-center gap-2 text-unmsm-muted italic">
    <MdInfoOutline className="text-unmsm-blue text-lg flex-shrink-0" />
    Esta información se está actualizando. Pronto estará disponible.
  </p>
);

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
    empleabilidad,
    planEstudios,
    inversion,
    requisitosAdmision,
    contacto,
  } = detalle;

  const tieneObjetivos = objetivosAcademicos?.length > 0;
  const tienePerfiles = perfilIngreso?.length > 0 || perfilGraduado?.length > 0;
  const tienePlanEstudios = planEstudios?.length > 0;

  const sections = [
    {
      titulo: "Presentación",
      contenido: presentacion ? (
        Array.isArray(presentacion) ? (
          <div className="space-y-4">
            {presentacion.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
        ) : (
          <p>{presentacion}</p>
        )
      ) : (
        <SeccionPendiente />
      ),
    },
    {
      titulo: "Objetivos Académicos",
      contenido: tieneObjetivos ? (
        <ul className="list-disc pl-5 space-y-1.5">
          {objetivosAcademicos.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <SeccionPendiente />
      ),
    },
    {
      titulo: "Perfil de Ingreso y Graduado",
      contenido: tienePerfiles ? (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-unmsm-navy mb-1.5">Perfil de Ingreso</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              {(perfilIngreso || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-unmsm-navy mb-1.5">Perfil de Graduado</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              {(perfilGraduado || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {empleabilidad && (
            <div>
              <h4 className="font-semibold text-unmsm-navy mb-1.5">Empleabilidad y Mercado Laboral</h4>
              <p>{empleabilidad}</p>
            </div>
          )}
        </div>
      ) : (
        <SeccionPendiente />
      ),
    },
    {
      titulo: "Plan de Estudios",
      contenido: tienePlanEstudios ? (
        <div className="space-y-4">
          {planEstudios.map((bloque) => (
            <div key={bloque.ciclo} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-unmsm-blue text-white text-sm font-semibold px-4 py-2">{bloque.ciclo}</div>
              <ul className="divide-y divide-gray-100">
                {bloque.cursos.map((curso) => {
                  const tieneRequisito =
                    curso.requisito && !/^no (requiere|registra)/i.test(curso.requisito);
                  return (
                    <li key={curso.nombre} className="px-4 py-2.5 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="min-w-0">{curso.nombre}</span>
                        <span className="flex-shrink-0 text-unmsm-muted">{curso.creditos} cr.</span>
                      </div>
                      {tieneRequisito && (
                        <p className="text-xs text-unmsm-muted mt-0.5">Requisito: {curso.requisito}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <SeccionPendiente />
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
            <h4 className="font-semibold text-unmsm-navy mb-2">Costos por ciclo</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {inversion.porCiclo.map((c) => (
                <div key={c.ciclo} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-unmsm-navy text-white text-sm font-semibold px-4 py-2">{c.ciclo}</div>
                  <dl className="text-sm divide-y divide-gray-100">
                    <div className="flex justify-between px-4 py-1.5">
                      <dt className="text-unmsm-muted">Matrícula</dt>
                      <dd className="font-medium">{c.matricula}</dd>
                    </div>
                    <div className="flex justify-between px-4 py-1.5">
                      <dt className="text-unmsm-muted">Costo total del ciclo</dt>
                      <dd className="font-medium">{c.costoCiclo}</dd>
                    </div>
                    <div className="flex justify-between px-4 py-1.5 bg-unmsm-bg">
                      <dt className="text-unmsm-muted">Cuota mensual (4 cuotas)</dt>
                      <dd className="font-semibold text-unmsm-navy">{c.cuotaMensual}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
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
