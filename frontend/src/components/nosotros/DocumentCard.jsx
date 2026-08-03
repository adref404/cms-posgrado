import { MdPictureAsPdf, MdOpenInNew, MdDownload, MdDescription } from "react-icons/md";

const TIPOS = {
  pdf: {
    icon: MdPictureAsPdf,
    actionIcon: MdDownload,
    label: "Descargar PDF",
    accent: "green",
  },
  docx: {
    icon: MdDescription,
    actionIcon: MdDescription,
    label: "Ver documento",
    accent: "navy",
  },
  enlace: {
    icon: MdOpenInNew,
    actionIcon: MdOpenInNew,
    label: "Visitar enlace",
    accent: "navy",
  },
};

const DocumentCard = ({ titulo, descripcion, tipo, url }) => {
  const { icon: Icon, actionIcon: ActionIcon, label, accent } = TIPOS[tipo] || TIPOS.enlace;
  const isGreen = accent === "green";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md hover:border-unmsm-navy/30 transition-all"
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isGreen ? "bg-unmsm-green/10 text-unmsm-green" : "bg-unmsm-navy/10 text-unmsm-navy"
        }`}
      >
        <Icon className="text-xl" />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-unmsm-navy leading-snug group-hover:text-unmsm-blue transition-colors">
          {titulo}
        </h4>
        {descripcion && (
          <p className="text-unmsm-muted text-sm mt-0.5">{descripcion}</p>
        )}
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 ${
            isGreen ? "text-unmsm-green" : "text-unmsm-navy"
          }`}
        >
          <ActionIcon className="text-sm" /> {label}
        </span>
      </div>
    </a>
  );
};

export default DocumentCard;
