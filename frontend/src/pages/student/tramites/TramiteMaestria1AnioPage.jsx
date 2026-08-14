import TramiteProcesoPage from "../../../components/tramites/TramiteProcesoPage";
import {
  pasosMaestria1Anio,
  faqMaestria1Anio,
  programasIncluidos,
  portalMat,
  avisoFotoGrados,
} from "../../../data/tramiteMaestria1Anio";

const TramiteMaestria1AnioPage = () => (
  <TramiteProcesoPage
    storageKey="tramite_maestria_1anio_checklist"
    titulo="Grado Académico de Magíster · Maestría Profesional (1 Año)"
    subtitle="Guía completa para las maestrías de Didáctica de la Comunicación e Innovación y Didáctica de la Matemática: proyecto, expedito, sustentación y diploma."
    programasIncluidos={programasIncluidos}
    pasos={pasosMaestria1Anio}
    faqs={faqMaestria1Anio}
    faqHeading="Preguntas frecuentes sobre el Grado de Magíster (Maestría 1 Año)"
    portalMat={portalMat}
    avisoFoto={avisoFotoGrados}
  />
);

export default TramiteMaestria1AnioPage;
