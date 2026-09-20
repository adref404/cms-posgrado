import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MdInfoOutline, MdGroups, MdCategory, MdScience } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
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

// Orden en que se agrupan los integrantes — el resto de tipos que puedan
// aparecer (texto libre) se agregan al final, en el orden en que salgan.
const ORDEN_TIPO = ["Titular (Coordinador)", "Titular", "Adherente"];

const etiquetaGrupo = (tipo, cantidad) => {
  if (tipo.includes("Coordinador")) return "Coordinación";
  if (tipo === "Titular") return cantidad > 1 ? "Titulares" : "Titular";
  if (tipo === "Adherente") return "Adherentes";
  return tipo;
};

const GrupoInvestigacionDetallePage = () => {
  const { id } = useParams();
  const { grupo, integrantes, loading } = useGrupoInvestigacionDetalle(id);
  const [docenteAbierto, setDocenteAbierto] = useState(null);

  const gruposPorTipo = useMemo(() => {
    const mapa = new Map();
    integrantes.forEach((i) => {
      const clave = i.tipo_integrante || "Adherente";
      if (!mapa.has(clave)) mapa.set(clave, []);
      mapa.get(clave).push(i);
    });
    const conocidos = ORDEN_TIPO.filter((t) => mapa.has(t));
    const otros = [...mapa.keys()].filter((t) => !ORDEN_TIPO.includes(t));
    return [...conocidos, ...otros].map((tipo) => ({ tipo, filas: mapa.get(tipo) }));
  }, [integrantes]);

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

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow={grupo.nombre_corto || "Grupo de Investigación"}
        title={grupo.nombre}
        subtitle={grupo.estado}
        image={NOSOTROS_HERO_IMAGE}
      />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Franja de datos rápidos — orienta antes de leer nada */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm border-y border-unmsm-line py-4">
          <span className="flex items-center gap-2 text-unmsm-navy font-semibold">
            <MdGroups className="text-unmsm-green text-lg" /> {integrantes.length}{" "}
            {integrantes.length === 1 ? "integrante" : "integrantes"}
          </span>
          <span className="flex items-center gap-2 text-unmsm-navy font-semibold">
            <MdScience className="text-unmsm-green text-lg" /> {grupo.lineas_investigacion?.length || 0}{" "}
            {grupo.lineas_investigacion?.length === 1 ? "línea de investigación" : "líneas de investigación"}
          </span>
          {grupo.estado && (
            <span className="flex items-center gap-2 text-unmsm-navy font-semibold">
              <MdCategory className="text-unmsm-green text-lg" /> {grupo.estado}
            </span>
          )}
        </div>

        {/* Bloque principal: Presentación (grande) + columna de datos y líneas */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-7 sm:p-9">
            <h2 className="text-unmsm-navy font-bold text-xl mb-4 pl-4 border-l-4 border-unmsm-green">
              Presentación
            </h2>
            {grupo.presentacion ? (
              <p className="text-unmsm-text leading-relaxed text-[15px]">{grupo.presentacion}</p>
            ) : (
              <SeccionPendiente />
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <GrupoInfoCard
              correoCoordinador={grupo.correo_coordinador}
              telefono={grupo.telefono}
              oficina={grupo.oficina}
              direccion={grupo.direccion}
              direccionWeb={grupo.direccion_web}
            />

            {tieneLineas && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-unmsm-navy mb-3">Líneas de Investigación</h3>
                <div className="flex flex-wrap gap-2">
                  {grupo.lineas_investigacion.map((linea, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-unmsm-bg text-unmsm-text text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200"
                    >
                      {grupo.lineas_codigos?.[i] && (
                        <span className="font-mono text-unmsm-green text-[11px]">{grupo.lineas_codigos[i]}</span>
                      )}
                      {linea}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Franja editorial de dos columnas: Objetivos | Servicios */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <p className="text-unmsm-green font-semibold text-xs uppercase tracking-widest mb-2">
              ¿Qué busca este grupo?
            </p>
            <h3 className="text-unmsm-navy font-bold text-lg mb-3">Objetivos</h3>
            {grupo.objetivos ? (
              <p className="text-unmsm-text leading-relaxed">{grupo.objetivos}</p>
            ) : (
              <SeccionPendiente />
            )}
          </div>
          <div>
            <p className="text-unmsm-green font-semibold text-xs uppercase tracking-widest mb-2">
              ¿Qué ofrece a la comunidad?
            </p>
            <h3 className="text-unmsm-navy font-bold text-lg mb-3">Servicios</h3>
            {grupo.servicios ? (
              <p className="text-unmsm-text leading-relaxed">{grupo.servicios}</p>
            ) : (
              <SeccionPendiente />
            )}
          </div>
        </div>

        {/* Integrantes — grilla de equipo, agrupados por su rol en el grupo */}
        <div>
          <h3 className="text-unmsm-navy font-bold text-xl mb-6 pl-4 border-l-4 border-unmsm-green">
            Integrantes ({integrantes.length})
          </h3>

          {gruposPorTipo.length > 0 ? (
            <div className="space-y-8">
              {gruposPorTipo.map(({ tipo, filas }) => (
                <div key={tipo}>
                  <p className="text-unmsm-muted text-xs font-bold uppercase tracking-widest mb-3">
                    {etiquetaGrupo(tipo, filas.length)}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filas.map((fila) => (
                      <IntegranteItem
                        key={fila.id}
                        nombres={fila.nombres}
                        apellidos={fila.apellidos}
                        vinculoUnmsm={fila.vinculo_unmsm}
                        facultad={fila.facultad}
                        tipoIntegrante={fila.tipo_integrante}
                        docente={fila.docente}
                        onVerFicha={setDocenteAbierto}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SeccionPendiente />
          )}
        </div>
      </div>

      {docenteAbierto && (
        <DocenteDetalleModal docente={docenteAbierto} onClose={() => setDocenteAbierto(null)} />
      )}
    </div>
  );
};

export default GrupoInvestigacionDetallePage;
