import TramiteProcesoPage from "../../../components/tramites/TramiteProcesoPage";
import {
  pasosMaestria2Anios,
  faqMaestria2Anios,
  portalMat,
  avisoFotoGrados,
} from "../../../data/tramiteMaestria2Anios";

const TramiteMaestria2AniosPage = () => (
  <TramiteProcesoPage
    storageKey="tramite_maestria_2anios_checklist"
    titulo="Grado Académico de Magíster · Maestría (2 Años)"
    subtitle="Guía paso a paso para completar la inscripción de proyecto, expedito, sustentación y expedición del diploma en las maestrías de 2 años."
    pasos={pasosMaestria2Anios}
    faqs={faqMaestria2Anios}
    faqHeading="Preguntas frecuentes sobre el Grado de Magíster (Maestría 2 Años)"
    portalMat={portalMat}
    avisoFoto={avisoFotoGrados}
  />
);

export default TramiteMaestria2AniosPage;
