import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdInfo, MdClose } from "react-icons/md";

const SECCIONES_EJEMPLO = ["/noticias", "/eventos", "/comunicados"];
const STORAGE_KEY = "aviso_contenido_ejemplo_visto";

// Aparece una vez por sesión al entrar a Noticias, Eventos o Comunicados,
// mientras esas secciones tengan datos de ejemplo en vez de contenido real
// (ver los comentarios en data/noticias.js, data/eventos.js, data/comunicados.js).
const AvisoContenidoEjemplo = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enSeccionEjemplo = SECCIONES_EJEMPLO.some(
      (base) => location.pathname === base || location.pathname.startsWith(`${base}/`)
    );
    if (!enSeccionEjemplo) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    setVisible(true);
  }, [location.pathname]);

  const cerrar = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={cerrar}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar aviso"
        >
          <MdClose className="text-xl" />
        </button>

        <div className="w-12 h-12 rounded-full bg-unmsm-guinda/10 flex items-center justify-center mb-4">
          <MdInfo className="text-unmsm-guinda text-2xl" />
        </div>

        <h3 className="text-lg font-bold text-unmsm-navy">Espacio de ejemplo</h3>
        <p className="text-unmsm-text text-sm mt-2 leading-relaxed">
          El contenido que ves en Noticias, Eventos y Comunicados es de
          ejemplo, solo para mostrar cómo funciona el diseño. Todavía no es
          información oficial de la Facultad de Educación.
        </p>

        <button
          onClick={cerrar}
          className="w-full bg-unmsm-navy text-white font-semibold py-2.5 rounded-lg hover:bg-unmsm-blue transition-colors mt-5"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default AvisoContenidoEjemplo;
