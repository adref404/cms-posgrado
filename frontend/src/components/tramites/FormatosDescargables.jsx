import { MdFolderOpen, MdPictureAsPdf, MdArticle, MdDownload } from "react-icons/md";

// Lista de formatos descargables de un paso del trámite. Si el formato no
// tiene "url" todavía (pendiente de subir a Drive), se muestra marcado como
// "Pendiente" en vez de simular un botón que no lleva a ningún lado.
const FormatosDescargables = ({ titulo, formatos }) => (
  <div className="bg-unmsm-navy text-white rounded-2xl p-5">
    <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide">
      <MdFolderOpen className="text-unmsm-green" /> Formatos descargables
    </h3>
    {titulo && <p className="text-xs text-white/60 mt-1 mb-4">{titulo}</p>}

    <div className="space-y-2 mt-4">
      {formatos.map((f) =>
        f.url ? (
          <a
            key={f.nombre}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-colors"
          >
            <span className="flex items-center gap-2 min-w-0">
              {f.tipo === "pdf" ? (
                <MdPictureAsPdf className="text-red-400 flex-shrink-0" />
              ) : (
                <MdArticle className="text-blue-300 flex-shrink-0" />
              )}
              <span className="truncate font-medium">{f.nombre}</span>
            </span>
            <MdDownload className="text-white/50 flex-shrink-0" />
          </a>
        ) : (
          <div
            key={f.nombre}
            className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white/5 border border-dashed border-white/15 text-xs opacity-60"
          >
            <span className="flex items-center gap-2 min-w-0">
              {f.tipo === "pdf" ? (
                <MdPictureAsPdf className="text-red-400 flex-shrink-0" />
              ) : (
                <MdArticle className="text-blue-300 flex-shrink-0" />
              )}
              <span className="truncate font-medium">{f.nombre}</span>
            </span>
            <span className="text-[10px] uppercase tracking-wide flex-shrink-0">Pendiente</span>
          </div>
        )
      )}
    </div>
  </div>
);

export default FormatosDescargables;
