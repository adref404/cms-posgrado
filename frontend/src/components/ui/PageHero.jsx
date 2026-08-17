import BreadcrumbBar from "../common/BreadcrumbBar";

const PageHero = ({ eyebrow, title, subtitle, image }) => {
  return (
    <>
      <div className="relative overflow-hidden bg-unmsm-blue text-white pb-16 md:pb-20 pt-[calc(9rem+var(--aviso-bar-height,0px))] md:pt-[calc(11rem+var(--aviso-bar-height,0px))]">
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
            <p className="text-unmsm-green font-semibold tracking-widest uppercase text-sm mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <BreadcrumbBar />
    </>
  );
};

export default PageHero;
