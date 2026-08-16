import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdCampaign, MdChevronLeft, MdChevronRight, MdClose, MdArrowForward } from "react-icons/md";
import { useSupabaseCollection } from "../../hooks/useSupabaseCollection";

const STORAGE_KEY = "aviso_destacado_cerrado";

const RUTA_POR_TIPO = {
  noticias: "/noticias",
  eventos: "/eventos",
  comunicados: "/comunicados",
};

// Barra de "aviso urgente" — lo primero de la página, por encima incluso
// del header. Solo aparece si el admin marcó algo como "Destacar en el
// Home" (checkbox en /admin) en Noticias, Eventos o Comunicados. Se puede
// cerrar (queda cerrada el resto de la sesión) y, si hay más de un aviso
// destacado a la vez, se navega entre ellos con flechas.
//
// El header (Header.jsx) es "fixed top-0" — para que de verdad quede DEBAJO
// de este aviso (y no tapado por él), esta barra mide su propia altura y la
// publica en la variable CSS --aviso-bar-height, que Header lee para
// desplazarse hacia abajo esa misma cantidad. Sin este truco, dos elementos
// "fixed" en top:0 simplemente se superpondrían.
const AvisoDestacadoBar = () => {
  const { data: noticias } = useSupabaseCollection("noticias");
  const { data: eventos } = useSupabaseCollection("eventos");
  const { data: comunicados } = useSupabaseCollection("comunicados");
  const [indice, setIndice] = useState(0);
  const [cerrado, setCerrado] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "true");
  const barRef = useRef(null);

  const avisos = [
    ...noticias.filter((n) => n.destacado).map((n) => ({ ...n, tipo: "noticias" })),
    ...eventos.filter((e) => e.destacado).map((e) => ({ ...e, tipo: "eventos" })),
    ...comunicados.filter((c) => c.destacado).map((c) => ({ ...c, tipo: "comunicados" })),
  ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const visible = !cerrado && avisos.length > 0;

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--aviso-bar-height",
      visible && barRef.current ? `${barRef.current.offsetHeight}px` : "0px"
    );
    return () => document.documentElement.style.setProperty("--aviso-bar-height", "0px");
  }, [visible, indice, avisos.length]);

  if (!visible) return null;

  const i = indice % avisos.length;
  const aviso = avisos[i];

  const cerrar = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setCerrado(true);
  };

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[60] w-full bg-gradient-to-r from-unmsm-green to-unmsm-green-700 text-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-start sm:items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 flex-shrink-0 mt-0.5 sm:mt-0">
          <MdCampaign className="text-lg animate-pulse" />
        </span>

        <Link
          to={`${RUTA_POR_TIPO[aviso.tipo]}/${aviso.id}`}
          className="group flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2.5"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/80 flex-shrink-0">
            Aviso
          </span>
          <span className="font-serif font-bold text-lg sm:text-xl leading-snug sm:truncate group-hover:underline">
            {aviso.titulo}
          </span>
          <MdArrowForward className="hidden sm:block text-base flex-shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>

        {avisos.length > 1 && (
          <div className="flex items-center gap-0.5 flex-shrink-0 text-white/80">
            <button
              onClick={() => setIndice((n) => (n - 1 + avisos.length) % avisos.length)}
              aria-label="Aviso anterior"
              className="hover:text-white transition-colors"
            >
              <MdChevronLeft className="text-lg" />
            </button>
            <span className="text-xs tabular-nums">
              {i + 1}/{avisos.length}
            </span>
            <button
              onClick={() => setIndice((n) => (n + 1) % avisos.length)}
              aria-label="Siguiente aviso"
              className="hover:text-white transition-colors"
            >
              <MdChevronRight className="text-lg" />
            </button>
          </div>
        )}

        <button
          onClick={cerrar}
          aria-label="Cerrar aviso"
          className="flex-shrink-0 text-white/70 hover:text-white transition-colors mt-0.5 sm:mt-0"
        >
          <MdClose className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default AvisoDestacadoBar;
