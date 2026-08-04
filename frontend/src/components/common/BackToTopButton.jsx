import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

// Botón flotante "volver arriba": aparece tras bajar un poco en cualquier
// vista y sube al inicio de la página actual (no navega a Home, solo
// hace scroll) con una animación suave.
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subirArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={subirArriba}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-unmsm-navy text-white shadow-lg flex items-center justify-center hover:bg-unmsm-blue hover:-translate-y-1 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <MdKeyboardArrowUp className="text-3xl" />
    </button>
  );
};

export default BackToTopButton;
