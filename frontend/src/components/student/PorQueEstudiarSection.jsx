import { MdAccountBalance, MdWorkspacePremium, MdApartment, MdRoute } from "react-icons/md";
import Reveal from "../common/Reveal";

const DIFERENCIALES = [
  {
    icon: MdAccountBalance,
    tone: "blue",
    titulo: "Respaldo de la Decana de América",
    descripcion:
      "Formas parte de la Universidad Nacional Mayor de San Marcos, la universidad más antigua de América.",
  },
  {
    icon: MdWorkspacePremium,
    tone: "green",
    titulo: "Plana docente con grado de Doctor y Magíster",
    descripcion:
      "Docentes investigadores, varios con nivel RENACYT, en distintas líneas de investigación educativa.",
  },
  {
    icon: MdApartment,
    tone: "blue",
    titulo: "Modalidad flexible",
    descripcion:
      "Programas semipresenciales y presenciales pensados para compatibilizar con tu vida profesional.",
  },
  {
    icon: MdRoute,
    tone: "green",
    titulo: "Acompañamiento en todo el proceso",
    descripcion:
      "Matrícula, trámites y cronogramas claros, reunidos en un solo lugar durante toda tu formación.",
  },
];

const TONOS = {
  blue: "bg-unmsm-blue/10 text-unmsm-blue",
  green: "bg-unmsm-green/10 text-unmsm-green",
};

const PorQueEstudiarSection = () => (
  <section className="bg-unmsm-bg py-12 md:py-20">
    <div className="max-w-6xl mx-auto px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <p className="text-unmsm-green font-semibold tracking-widest uppercase text-sm mb-2">
          Posgrado Educación
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-unmsm-navy mb-3">
          ¿Por qué estudiar con nosotros?
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {DIFERENCIALES.map(({ icon: Icon, tone, titulo, descripcion }, index) => (
          <Reveal key={titulo} delay={index * 100}>
            <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${TONOS[tone]}`}
                >
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-bold text-unmsm-navy leading-snug">{titulo}</h3>
              </div>
              <p className="text-unmsm-muted text-sm leading-relaxed">{descripcion}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default PorQueEstudiarSection;
