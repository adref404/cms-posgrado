import { MdPerson, MdOpenInNew } from "react-icons/md";

// Insignia de rol — el color distingue jerarquía real dentro del grupo
// (quién coordina, quién es titular, quién es adherente), no es decorativo.
const insigniaPorTipo = (tipo) => {
  const t = (tipo || "").toLowerCase();
  if (t.includes("coordinador")) return "bg-unmsm-navy text-white";
  if (t.includes("titular")) return "bg-unmsm-green/15 text-unmsm-green-800";
  return "bg-gray-100 text-unmsm-muted";
};

// Tarjeta de un integrante, para la cuadrícula de equipo del detalle de un
// grupo. Si tiene ficha propia en Plana Docente (prop "docente"), es
// clickeable y abre esa ficha; si no, solo presenta la información que ya
// trae guardada — sin nada para abrir.
const IntegranteItem = ({ nombres, apellidos, vinculoUnmsm, facultad, tipoIntegrante, docente, onVerFicha }) => {
  const nombreCompleto = `${nombres} ${apellidos}`;
  const esClickeable = Boolean(docente);

  const contenido = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
          <MdPerson className="text-unmsm-blue text-lg" />
        </div>
        {tipoIntegrante && (
          <span
            className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${insigniaPorTipo(
              tipoIntegrante
            )}`}
          >
            {tipoIntegrante.includes("Coordinador") ? "Coordinador" : tipoIntegrante}
          </span>
        )}
      </div>
      <p
        className={`font-bold text-unmsm-navy leading-snug mt-3 ${
          esClickeable ? "group-hover:text-unmsm-blue transition-colors" : ""
        }`}
      >
        {nombreCompleto}
        {esClickeable && (
          <MdOpenInNew className="inline-block ml-1.5 mb-0.5 text-unmsm-blue text-sm" />
        )}
      </p>
      <p className="text-unmsm-muted text-xs mt-1 leading-relaxed">
        {[vinculoUnmsm, facultad].filter(Boolean).join(" · ")}
      </p>
    </>
  );

  const clases =
    "group text-left bg-white rounded-xl border border-gray-200 p-4 h-full transition-all " +
    (esClickeable ? "hover:border-unmsm-blue/40 hover:shadow-md cursor-pointer" : "");

  if (!esClickeable) {
    return <div className={clases}>{contenido}</div>;
  }

  return (
    <button type="button" onClick={() => onVerFicha(docente)} className={`w-full ${clases}`}>
      {contenido}
    </button>
  );
};

export default IntegranteItem;
