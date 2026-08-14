import TramiteProcesoPage from "../../../components/tramites/TramiteProcesoPage";
import { pasosDoctor, faqDoctor, portalMat, avisoFotoGrados } from "../../../data/tramiteDoctor";

const TramiteDoctorPage = () => (
  <TramiteProcesoPage
    storageKey="tramite_doctor_checklist"
    titulo="Grado Académico de Doctor"
    subtitle="Guía paso a paso para completar la inscripción de proyecto, expedito, sustentación y expedición del diploma de Doctorado."
    pasos={pasosDoctor}
    faqs={faqDoctor}
    faqHeading="Preguntas frecuentes sobre el Grado de Doctor"
    portalMat={portalMat}
    avisoFoto={avisoFotoGrados}
  />
);

export default TramiteDoctorPage;
