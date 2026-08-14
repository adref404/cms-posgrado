import { useEffect, useMemo, useState } from "react";
import {
  MdSearch,
  MdRestartAlt,
  MdOpenInNew,
  MdInfo,
  MdWarning,
  MdCheckCircle,
  MdCameraAlt,
} from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import FAQAccordion from "../../../components/faq/FAQAccordion";
import FormatosDescargables from "../../../components/tramites/FormatosDescargables";
import AvisoFotoModal from "../../../components/tramites/AvisoFotoModal";
import { pasosDoctor, faqDoctor, portalMat, avisoFotoGrados } from "../../../data/tramiteDoctor";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

const STORAGE_KEY = "tramite_doctor_checklist";

const ICONO_AVISO = { guinda: MdWarning, blue: MdInfo, green: MdCheckCircle };

const TramiteDoctorPage = () => {
  const [pasoActivo, setPasoActivo] = useState(1);
  const [checked, setChecked] = useState(() => new Set());
  const [busqueda, setBusqueda] = useState("");
  const [mostrarAvisoFoto, setMostrarAvisoFoto] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      setChecked(new Set(JSON.parse(saved)));
    } catch {
      // ignora estado corrupto
    }
  }, []);

  const toggleRequisito = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const reiniciar = () => {
    if (!window.confirm("¿Deseas reiniciar todas las comprobaciones marcadas?")) return;
    setChecked(new Set());
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalRequisitos = useMemo(() => pasosDoctor.reduce((acc, p) => acc + p.requisitos.length, 0), []);
  const progreso = totalRequisitos > 0 ? Math.round((checked.size / totalRequisitos) * 100) : 0;

  const paso = pasosDoctor.find((p) => p.id === pasoActivo);
  const requisitosFiltrados = paso.requisitos.filter((r) => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return true;
    return r.titulo.toLowerCase().includes(term) || r.detalle.toLowerCase().includes(term);
  });

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Trámites"
        title="Grado Académico de Doctor"
        subtitle="Guía paso a paso para completar la inscripción de proyecto, expedito, sustentación y expedición del diploma de Doctorado."
        image={MATRICULA_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Director de la Unidad de Posgrado */}
        {/* <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 mb-8 w-fit max-w-full">
          <div className="w-10 h-10 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
            <MdBadge className="text-unmsm-blue text-xl" />
          </div>
          <div className="text-sm min-w-0">
            <p className="text-unmsm-muted text-xs">{director.cargo}</p>
            <p className="font-bold text-unmsm-navy truncate">{director.nombre}</p>
          </div>
        </div> */}

        {/* Progreso general + stepper */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
            <span className="text-xs font-bold uppercase tracking-wide text-unmsm-muted">
              Progreso general del expediente
            </span>
            <span className="text-xs font-extrabold text-unmsm-navy">
              {progreso}% completado ({checked.size}/{totalRequisitos})
            </span>
          </div>
          <div className="w-full bg-unmsm-bg rounded-full h-2.5 overflow-hidden border border-gray-200">
            <div
              className="bg-unmsm-green h-full rounded-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {pasosDoctor.map((p) => {
              const Icono = p.icono;
              const activo = p.id === pasoActivo;
              return (
                <button
                  key={p.id}
                  onClick={() => setPasoActivo(p.id)}
                  className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                    activo ? "border-unmsm-blue bg-unmsm-blue/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        activo ? "bg-unmsm-blue text-white" : "bg-unmsm-bg text-unmsm-muted"
                      }`}
                    >
                      {p.id}
                    </span>
                    <Icono className={activo ? "text-unmsm-blue" : "text-unmsm-muted"} />
                  </div>
                  <span
                    className={`block text-[11px] font-bold uppercase tracking-wide ${
                      activo ? "text-unmsm-blue" : "text-unmsm-muted"
                    }`}
                  >
                    Paso {p.id}
                  </span>
                  <span className="block text-xs font-semibold text-unmsm-navy leading-snug line-clamp-2">
                    {p.tituloCorto}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Barra de utilidades */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="relative w-full sm:w-80">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar requisito (ej: Turnitin, idiomas)..."
              className="w-full pl-9 pr-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>
          <button
            onClick={reiniciar}
            className="flex items-center gap-1.5 text-xs font-semibold text-unmsm-muted hover:text-unmsm-guinda transition-colors flex-shrink-0"
          >
            <MdRestartAlt /> Reiniciar marcas
          </button>
        </div>

        {/* Contenido del paso */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="border-b border-gray-100 pb-4 mb-5">
              <span className="text-xs font-bold text-unmsm-blue uppercase tracking-wide">{paso.etapa}</span>
              <h2 className="text-xl font-bold text-unmsm-navy leading-tight">{paso.titulo}</h2>
            </div>

            {paso.descripcion && <p className="text-sm text-unmsm-muted mb-5">{paso.descripcion}</p>}

            <div className="space-y-3">
              {requisitosFiltrados.map((r) => {
                const id = `${paso.id}-${r.titulo}`;
                const isChecked = checked.has(id);
                return (
                  <label
                    key={id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      isChecked
                        ? "border-unmsm-green bg-unmsm-green/5"
                        : "border-gray-200 hover:border-unmsm-green/50 hover:bg-unmsm-bg"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRequisito(id)}
                      className="mt-1 w-4 h-4 accent-unmsm-green flex-shrink-0"
                    />
                    <div className="min-w-0 text-sm flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <span className="font-semibold text-unmsm-navy">
                          {r.titulo} <span className="text-unmsm-guinda">*</span>
                        </span>
                        {r.tieneEspecificacionFoto && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMostrarAvisoFoto(true);
                            }}
                            className="flex items-center gap-1 text-xs font-semibold text-unmsm-blue hover:underline flex-shrink-0"
                          >
                            <MdCameraAlt className="text-sm" /> Ver especificaciones completas
                          </button>
                        )}
                      </div>
                      <p className="text-unmsm-muted mt-0.5">{r.detalle}</p>
                    </div>
                  </label>
                );
              })}
              {requisitosFiltrados.length === 0 && (
                <p className="text-sm text-unmsm-muted text-center py-6">
                  No se encontraron requisitos para "{busqueda}"
                </p>
              )}
            </div>

            {paso.avisos.length > 0 && (
              <div className="mt-5 space-y-3">
                {paso.avisos.map((aviso) => (
                  <InfoBanner key={aviso.titulo} icon={ICONO_AVISO[aviso.tono]} title={aviso.titulo} tone={aviso.tono}>
                    {aviso.texto}
                  </InfoBanner>
                ))}
              </div>
            )}

            {paso.inversion && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-unmsm-navy mb-3">Desglose de tarifas</h3>
                <div className="space-y-2 mb-4">
                  {paso.inversion.items.map((it) => (
                    <div
                      key={it.concepto}
                      className="flex items-center justify-between gap-3 p-3 bg-unmsm-bg rounded-lg border border-gray-200"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-unmsm-navy truncate">{it.concepto}</p>
                        <p className="text-xs text-unmsm-muted">{it.detalle}</p>
                      </div>
                      <span className="font-bold text-unmsm-green flex-shrink-0">{it.monto}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 p-3 bg-unmsm-green/10 rounded-lg border border-unmsm-green/30">
                    <span className="text-sm font-bold text-unmsm-navy">Monto total de inversión</span>
                    <span className="font-black text-lg text-unmsm-green flex-shrink-0">{paso.inversion.total}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {paso.inversion.pagos.map((pago) => (
                    <a
                      key={pago.url}
                      href={pago.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 px-4 py-2.5 bg-unmsm-blue hover:bg-unmsm-navy text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      <span className="truncate">{pago.label}</span>
                      <MdOpenInNew className="text-base flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 min-w-0">
            <FormatosDescargables titulo={`Paso ${paso.id} · ${paso.tituloCorto}`} formatos={paso.formatos} />

            <div className="bg-gradient-to-br from-unmsm-blue to-unmsm-navy text-white rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-unmsm-mint-300 mb-1">
                Envío de expediente
              </p>
              <h3 className="font-bold mb-2">{portalMat.nombre}</h3>
              <p className="text-xs text-white/70 mb-4 leading-relaxed">{portalMat.descripcion}</p>
              <a
                href={portalMat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white text-unmsm-navy font-bold text-xs py-2.5 rounded-lg hover:bg-unmsm-mint-100 transition-colors"
              >
                Ingresar al MAT UNMSM <MdOpenInNew className="text-sm" />
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-unmsm-navy mb-4">Preguntas frecuentes sobre el Grado de Doctor</h3>
          <FAQAccordion items={faqDoctor} />
        </div>
      </div>

      {mostrarAvisoFoto && <AvisoFotoModal aviso={avisoFotoGrados} onClose={() => setMostrarAvisoFoto(false)} />}
    </div>
  );
};

export default TramiteDoctorPage;
