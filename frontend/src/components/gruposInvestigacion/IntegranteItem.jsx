import { MdPerson, MdOpenInNew } from "react-icons/md";

// Una fila de la lista de integrantes de un grupo. Si el integrante tiene
// ficha propia en Plana Docente (prop "docente" presente), es clickeable y
// abre su ficha completa (ver GrupoInvestigacionDetallePage); si no, solo
// muestra la información que ya trae guardada — sin nada para abrir.
const IntegranteItem = ({ nombres, apellidos, vinculoUnmsm, facultad, tipoIntegrante, docente, onVerFicha }) => {
  const nombreCompleto = `${nombres} ${apellidos}`;
  const esClickeable = Boolean(docente);

  const contenido = (
    <>
      <div className="w-9 h-9 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
        <MdPerson className="text-unmsm-blue text-lg" />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`font-semibold text-unmsm-navy leading-snug ${
            esClickeable ? "group-hover:text-unmsm-blue transition-colors" : ""
          }`}
        >
          {nombreCompleto}
        </p>
        <p className="text-unmsm-muted text-xs mt-0.5">
          {[vinculoUnmsm, facultad].filter(Boolean).join(" · ")}
        </p>
      </div>
      {tipoIntegrante && (
        <span className="flex-shrink-0 bg-unmsm-bg text-unmsm-navy text-xs font-semibold px-2.5 py-1 rounded-full">
          {tipoIntegrante}
        </span>
      )}
      {esClickeable && <MdOpenInNew className="flex-shrink-0 text-unmsm-blue text-base" />}
    </>
  );

  if (!esClickeable) {
    return <div className="flex items-center gap-3 px-4 py-3">{contenido}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => onVerFicha(docente)}
      className="group w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-unmsm-bg transition-colors cursor-pointer"
    >
      {contenido}
    </button>
  );
};

export default IntegranteItem;
