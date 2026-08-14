import EnDesarrolloPage from "../../../components/common/EnDesarrolloPage";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

// Placeholder "en desarrollo" para trámites que aún no tienen contenido
// propio (por ahora, "/tramites/maestria-2-anios"); el programa se pasa
// como prop desde App.jsx.
const TramitesPage = ({ programa }) => (
  <EnDesarrolloPage
    eyebrow="Trámites"
    title={`Trámites — ${programa}`}
    subtitle="Procedimientos y solicitudes administrativas"
    image={MATRICULA_HERO_IMAGE}
    tituloSeccion={`Trámites de ${programa}`}
  />
);

export default TramitesPage;
