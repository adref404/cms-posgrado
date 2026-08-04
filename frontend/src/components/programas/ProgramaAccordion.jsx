import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

// Acordeón reutilizable para las secciones de una vista de detalle de
// programa (Presentación, Plan de Estudios, Inversión Económica, etc.).
// "sections" es [{ titulo, contenido: JSX }]; cada sección se abre/cierra de
// forma independiente (no se cierran entre sí); la primera abre por defecto.
const ProgramaAccordion = ({ sections }) => {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]));

  const toggle = (index) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {sections.map((section, index) => {
        const isOpen = openIndexes.has(index);
        return (
          <div key={section.titulo}>
            <button
              onClick={() => toggle(index)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors ${
                isOpen ? "border-l-4 border-unmsm-green bg-unmsm-green/5" : "border-l-4 border-transparent"
              }`}
              aria-expanded={isOpen}
            >
              <span className={`font-bold ${isOpen ? "text-unmsm-green" : "text-unmsm-navy"}`}>
                {section.titulo}
              </span>
              <MdExpandMore
                className={`text-unmsm-navy text-2xl flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-6 pt-1 text-unmsm-text leading-relaxed">{section.contenido}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgramaAccordion;
