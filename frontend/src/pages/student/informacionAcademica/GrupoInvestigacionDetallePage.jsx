import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import ProgramaAccordion from "../../../components/programas/ProgramaAccordion";
import GrupoInfoCard from "../../../components/gruposInvestigacion/GrupoInfoCard";
import IntegranteItem from "../../../components/gruposInvestigacion/IntegranteItem";
import DocenteDetalleModal from "../../../components/gruposInvestigacion/DocenteDetalleModal";
import { useGrupoInvestigacionDetalle } from "../../../hooks/useGrupoInvestigacionDetalle";
import { NOSOTROS_HERO_IMAGE } from "../../../utils/constants";

const SeccionPendiente = () => (
  <p className="flex items-center gap-2 text-unmsm-muted italic">
    <MdInfoOutline className="text-unmsm-blue text-lg flex-shrink-0" />
    Esta información se está actualizando. Pronto estará disponible.
  </p>
);

const GrupoInvestigacionDetallePage = () => {
  const { id } = useParams();
  const { grupo, integrantes, loading } = useGrupoInvestigacionDetalle(id);
  const [docenteAbierto, setDocenteAbierto] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-unmsm-bg flex items-center justify-center">
        <p className="text-unmsm-muted">Cargando grupo de investigación...</p>
      </div>
    );
  }

  if (!grupo) {
    return (
      <div className="min-h-screen bg-unmsm-bg flex items-center justify-center px-4">
        <p className="text-unmsm-muted text-center">No se encontró este grupo de investigación.</p>
      </div>
    );
  }

  const tieneLineas = grupo.lineas_investigacion?.length > 0;

  const sections = [
    {
      titulo: "Presentación",
      contenido: grupo.presentacion ? <p>{grupo.presentacion}</p> : <SeccionPendiente />,
    },
    {
      titulo: "Objetivos",
      contenido: grupo.objetivos ? <p>{grupo.objetivos}</p> : <SeccionPendiente />,
    },
    {
      titulo: "Servicios",
      contenido: grupo.servicios ? <p>{grupo.servicios}</p> : <SeccionPendiente />,
    },
    {
      titulo: "Líneas de Investigación",
      contenido: tieneLineas ? (
        <ul className="divide-y divide-gray-100">
          {grupo.lineas_investigacion.map((linea, i) => (
            <li key={i} className="flex items-center gap-3 py-2 text-sm">
              {grupo.lineas_codigos?.[i] && (
                <span className="flex-shrink-0 bg-unmsm-bg text-unmsm-navy text-xs font-mono px-2 py-1 rounded">
                  {grupo.lineas_codigos[i]}
                </span>
              )}
              <span>{linea}</span>
            </li>
          ))}
        </ul>
      ) : (
        <SeccionPendiente />
      ),
    },
    {
      titulo: `Integrantes (${integrantes.length})`,
      contenido:
        integrantes.length > 0 ? (
          <div className="bg-unmsm-bg rounded-lg divide-y divide-gray-200 -mx-1">
            {integrantes.map((i) => (
              <IntegranteItem
                key={i.id}
                nombres={i.nombres}
                apellidos={i.apellidos}
                vinculoUnmsm={i.vinculo_unmsm}
                facultad={i.facultad}
                tipoIntegrante={i.tipo_integrante}
                docente={i.docente}
                onVerFicha={setDocenteAbierto}
              />
            ))}
          </div>
        ) : (
          <SeccionPendiente />
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow={grupo.nombre_corto || "Grupo de Investigación"}
        title={grupo.nombre}
        subtitle={grupo.estado}
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 min-w-0">
            <ProgramaAccordion sections={sections} />
          </div>
          <div className="min-w-0">
            <GrupoInfoCard
              correoCoordinador={grupo.correo_coordinador}
              telefono={grupo.telefono}
              oficina={grupo.oficina}
              direccion={grupo.direccion}
              direccionWeb={grupo.direccion_web}
            />
          </div>
        </div>
      </div>

      {docenteAbierto && (
        <DocenteDetalleModal docente={docenteAbierto} onClose={() => setDocenteAbierto(null)} />
      )}
    </div>
  );
};

export default GrupoInvestigacionDetallePage;
