import EnDesarrolloPage from "../../../components/common/EnDesarrolloPage";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

// Una sola página para "/tramites/maestria" y "/tramites/doctorado";
// el programa se pasa como prop desde App.jsx.
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
