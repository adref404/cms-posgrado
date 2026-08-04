import useScrollReveal from "../../hooks/useScrollReveal";

const DIRECCIONES = {
  up: "translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6",
  none: "",
};

// Envoltorio reutilizable: revela su contenido con un fade + slide sutil
// cuando entra en pantalla al hacer scroll. "delay" en ms para escalonar
// varios <Reveal> seguidos (ver ProgramasHomeSection, etc.).
const Reveal = ({ children, as: Tag = "div", direction = "up", delay = 0, className = "" }) => {
  const [ref, visible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${DIRECCIONES[direction]}`
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
