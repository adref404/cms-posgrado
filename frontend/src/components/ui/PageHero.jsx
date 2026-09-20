import BreadcrumbBar from "../common/BreadcrumbBar";

// Solo dos niveles a propósito: "eyebrow" (en qué vista general estamos) y
// "title" (qué sección puntual dentro de esa vista). Un tercer nivel de
// subtítulo se probó y se sacó — no aportaba, en ninguna página, más de lo
// que ya dicen esos dos. Si algún día hace falta un dato de contexto
// puntual, que viva dentro del contenido de la página, no acá.
const PageHero = ({ eyebrow, title, image }) => {
  return (
    <>
      {/* En mobile, el header fijo mide ~90px (ver Header.jsx) — el padding-top
          solo necesita despejar eso, no el alto del header de escritorio (más
          alto, por eso md: sí usa un valor grande). Antes usaba el mismo
          "9rem" de sobra en mobile que en desktop, dejando un bloque de aire
          vacío arriba en cada página antes de mostrar nada. */}
      <div className="relative overflow-hidden bg-unmsm-blue text-white pb-10 md:pb-20 pt-[calc(6.5rem+var(--aviso-bar-height,0px))] md:pt-[calc(11rem+var(--aviso-bar-height,0px))]">
        {image && (
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Degradado institucional sobre la imagen (o solo) para mantener el contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-unmsm-blue/95 via-unmsm-blue/85 to-unmsm-navy/75" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {eyebrow && (
            <p className="text-unmsm-green font-semibold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
        </div>
      </div>
      <BreadcrumbBar />
    </>
  );
};

export default PageHero;
