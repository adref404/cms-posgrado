import { useEffect, useRef, useState } from "react";

// Detecta cuándo un elemento entra en pantalla para animarlo una sola vez
// (fade + slide sutil). Se usa en <Reveal> — ver components/common/Reveal.jsx.
const useScrollReveal = ({ threshold = 0.15 } = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Si el navegador no soporta IntersectionObserver, mostrar directo.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

export default useScrollReveal;
