import { Link } from "react-router-dom";
import { MdConstruction } from "react-icons/md";

const EnDesarrollo = ({ titulo }) => (
  <div className="max-w-6xl mx-auto px-4 py-16">
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 md:p-16 text-center max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-unmsm-green/10 flex items-center justify-center mx-auto mb-6">
        <MdConstruction className="text-unmsm-green text-3xl" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-unmsm-navy">
        {titulo ? `${titulo} — Espacio en desarrollo` : "Espacio en desarrollo"}
      </h2>
      <p className="text-unmsm-muted mt-3 leading-relaxed">
        Estamos preparando esta sección. Muy pronto encontrarás aquí la
        información y los trámites correspondientes.
      </p>
      <Link
        to="/home"
        className="inline-flex items-center gap-2 bg-unmsm-navy text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-unmsm-blue transition-colors mt-6"
      >
        Volver al inicio
      </Link>
    </div>
  </div>
);

export default EnDesarrollo;
