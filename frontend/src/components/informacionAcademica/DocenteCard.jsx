import { MdVerified, MdDescription, MdWorkspacePremium } from "react-icons/md";

const getInitials = (nombres, apellidos) =>
  `${nombres?.[0] || ""}${apellidos?.[0] || ""}`.toUpperCase();

const DocenteCard = ({
  apellidos,
  nombres,
  grado,
  categoria,
  orcid,
  renacyt,
  grupoInvestigacion,
  lineasInvestigacion,
  biodata,
}) => {
  const nombreCompleto = `${nombres} ${apellidos}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
          <span className="text-unmsm-blue font-bold">
            {getInitials(nombres, apellidos)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-unmsm-navy leading-snug">
            {nombreCompleto}
          </h4>
          <p className="text-unmsm-muted text-xs mt-0.5">
            {grado} · {categoria}
          </p>
        </div>
      </div>

      {renacyt && (
        <span className="inline-flex items-center gap-1 self-start mt-3 bg-unmsm-green/10 text-unmsm-green text-xs font-semibold px-2.5 py-1 rounded-full">
          <MdWorkspacePremium className="text-sm" /> {renacyt}
        </span>
      )}

      {grupoInvestigacion && (
        <p className="text-unmsm-navy text-xs italic mt-3">
          {grupoInvestigacion}
        </p>
      )}

      {lineasInvestigacion?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {lineasInvestigacion.map((linea) => (
            <span
              key={linea}
              className="bg-unmsm-blue/5 text-unmsm-navy text-xs px-2 py-1 rounded-full"
            >
              {linea}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs font-medium">
        {orcid && (
          <a
            href={`https://orcid.org/${orcid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue transition-colors"
          >
            <MdVerified className="text-sm flex-shrink-0" /> ORCID
          </a>
        )}
        {biodata && (
          <a
            href={biodata}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-unmsm-green hover:text-unmsm-green-800 transition-colors"
          >
            <MdDescription className="text-sm flex-shrink-0" /> Ver biodata
          </a>
        )}
      </div>
    </div>
  );
};

export default DocenteCard;
