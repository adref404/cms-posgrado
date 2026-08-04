import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router no resetea el scroll al cambiar de ruta — sin esto, si
// navegas desde el medio de una página larga, la siguiente vista carga
// scrolleada en el mismo punto en vez de empezar desde arriba.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
