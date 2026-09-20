import { MdClose } from "react-icons/md";
import DocenteCard from "../informacionAcademica/DocenteCard";

// Modal que muestra la ficha completa de un integrante que además está
// registrado en Plana Docente (reutiliza la misma DocenteCard de esa
// sección, para no duplicar cómo se ve la información de un docente).
const DocenteDetalleModal = ({ docente, onClose }) => (
  <div
    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-unmsm-navy shadow hover:bg-gray-100 transition-colors"
          aria-label="Cerrar"
        >
          <MdClose className="text-xl" />
        </button>
      </div>
      <DocenteCard {...docente} />
    </div>
  </div>
);

export default DocenteDetalleModal;
