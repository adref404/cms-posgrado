import PageHero from "../ui/PageHero";
import EnDesarrollo from "./EnDesarrollo";

// Página completa reutilizable para cualquier sección del menú que todavía
// no tiene contenido: solo pasa el eyebrow/título/subtítulo/imagen del PageHero
// y, si quieres un texto distinto en la tarjeta, "tituloSeccion".
const EnDesarrolloPage = ({ eyebrow, title, subtitle, image, tituloSeccion }) => (
  <div className="min-h-screen bg-unmsm-bg">
    <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} image={image} />
    <EnDesarrollo titulo={tituloSeccion || title} />
  </div>
);

export default EnDesarrolloPage;
