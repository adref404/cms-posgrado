import { MdClose, MdCampaign } from "react-icons/md";

// Modal con el aviso oficial completo (especificaciones de la foto para el
// diploma digital), disparado desde el requisito correspondiente.
const AvisoFotoModal = ({ aviso, onClose }) => (
  <div
    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-unmsm-navy text-white px-6 py-5 rounded-t-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Cerrar aviso"
        >
          <MdClose className="text-xl" />
        </button>
        <p className="text-xs uppercase tracking-widest text-unmsm-mint-300 mb-1">{aviso.unidad}</p>
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MdCampaign /> Aviso
        </h3>
      </div>

      <div className="p-6 space-y-5 text-sm text-unmsm-text">
        <p className="leading-relaxed">{aviso.intro}</p>

        {aviso.secciones.map((sec) => (
          <div key={sec.titulo}>
            <h4 className="font-bold text-unmsm-navy bg-unmsm-green/10 inline-block px-2 py-0.5 rounded mb-2">
              {sec.titulo}
            </h4>
            {sec.texto && <p className="text-unmsm-muted mb-2 leading-relaxed">{sec.texto}</p>}
            <ul className="list-disc pl-5 space-y-1.5">
              {sec.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <p className="text-right text-xs text-unmsm-muted pt-3 border-t border-gray-100">{aviso.fecha}</p>
      </div>
    </div>
  </div>
);

export default AvisoFotoModal;
