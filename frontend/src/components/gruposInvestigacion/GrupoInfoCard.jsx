import { MdInfo, MdEmail, MdPhone, MdLocationOn, MdLanguage } from "react-icons/md";

// Tarjeta lateral (sticky en desktop) con los datos de contacto del grupo
// — mismo patrón que ProgramaInfoClaveCard. Cada dato es opcional: no
// todos los grupos tienen los mismos campos llenos.
const GrupoInfoCard = ({ correoCoordinador, telefono, oficina, direccion, direccionWeb }) => {
  const tieneAlgo = correoCoordinador || telefono || oficina || direccion || direccionWeb;
  if (!tieneAlgo) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:sticky lg:top-28">
      <h3 className="flex items-center gap-2 font-bold text-unmsm-navy mb-4">
        <MdInfo className="text-unmsm-green text-xl" /> Datos del grupo
      </h3>

      <div className="space-y-4 text-sm">
        {correoCoordinador && (
          <div className="flex items-start gap-3">
            <MdEmail className="text-unmsm-blue text-lg flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-unmsm-muted text-xs uppercase tracking-wide">Correo del coordinador</p>
              <a href={`mailto:${correoCoordinador}`} className="font-semibold text-unmsm-navy hover:text-unmsm-blue break-all">
                {correoCoordinador}
              </a>
            </div>
          </div>
        )}
        {telefono && (
          <div className="flex items-start gap-3">
            <MdPhone className="text-unmsm-blue text-lg flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-unmsm-muted text-xs uppercase tracking-wide">Teléfono</p>
              <p className="font-semibold text-unmsm-navy">{telefono}</p>
            </div>
          </div>
        )}
        {oficina && (
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-unmsm-blue text-lg flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-unmsm-muted text-xs uppercase tracking-wide">Oficina</p>
              <p className="font-semibold text-unmsm-navy">{oficina}</p>
            </div>
          </div>
        )}
        {direccion && (
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-unmsm-blue text-lg flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-unmsm-muted text-xs uppercase tracking-wide">Dirección</p>
              <p className="font-semibold text-unmsm-navy">{direccion}</p>
            </div>
          </div>
        )}
        {direccionWeb && (
          <div className="flex items-start gap-3">
            <MdLanguage className="text-unmsm-blue text-lg flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-unmsm-muted text-xs uppercase tracking-wide">Sitio web</p>
              <a
                href={direccionWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-unmsm-navy hover:text-unmsm-blue break-all"
              >
                {direccionWeb}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrupoInfoCard;
