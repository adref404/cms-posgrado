import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="min-w-0">
                {item.categoria && (
                  <span className="inline-block bg-unmsm-green/10 text-unmsm-green text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5">
                    {item.categoria}
                  </span>
                )}
                <p className="font-semibold text-unmsm-navy">{item.pregunta}</p>
              </div>
              <MdExpandMore
                className={`text-unmsm-blue text-2xl flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 pt-3 border-t border-unmsm-line text-unmsm-muted leading-relaxed">
                {item.respuesta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
