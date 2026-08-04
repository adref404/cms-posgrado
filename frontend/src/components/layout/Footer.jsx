import { Link } from "react-router-dom";
import {
  MdLocationOn,
  MdLink,
  MdEmail,
  MdPhone,
  MdOpenInNew,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import universidadLogo from "../../assets/logo-upg.webp";

const ENLACES = [
  { to: "/nosotros/quienes-somos", label: "Nosotros" },
  { to: "/programas/maestria", label: "Programas" },
  { to: "/matricula/cronograma-academico", label: "Matrícula" },
  { to: "/noticias", label: "Novedades" },
  { to: "/tramites", label: "Trámites" },
];

// Ubicación real: Facultad de Educación, Ciudad Universitaria UNMSM.
const MAPS_QUERY = "Facultad de Educación UNMSM, Av. Germán Amézaga, Lima, Perú";
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

const Footer = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-unmsm-navy text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Identidad */}
          <div className="lg:col-span-1">
            <Link to="/home" className="flex items-center gap-3 mb-4 w-fit">
              <img
                src={universidadLogo}
                alt="Logo Universidad"
                className="h-12 w-12 rounded-full object-cover bg-white p-1 flex-shrink-0"
              />
              <div className="leading-tight">
                <p className="font-bold">Posgrado</p>
                <p className="text-xs text-gray-300">Facultad de Educación</p>
              </div>
            </Link>
            <p className="flex items-start gap-2 text-gray-300 text-sm">
              <MdLocationOn className="text-lg flex-shrink-0 mt-0.5" />
              <span>
                Universidad Nacional Mayor de San Marcos
                <br />
                Facultad de Educación · Ciudad Universitaria, Lima
              </span>
            </p>
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-unmsm-mint-300 text-sm font-medium hover:underline mt-2"
            >
              Cómo llegar <MdOpenInNew className="text-xs" />
            </a>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MdLink className="text-lg" /> Enlaces
            </h3>
            <div className="space-y-2 text-sm">
              {ENLACES.map((enlace) => (
                <Link
                  key={enlace.to}
                  to={enlace.to}
                  className="text-gray-300 hover:text-unmsm-mint-300 transition-colors block"
                >
                  {enlace.label}
                </Link>
              ))}
              <a
                href="https://unmsm.edu.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-unmsm-mint-300 transition-colors"
              >
                Página Principal UNMSM <MdOpenInNew className="text-xs" />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MdEmail className="text-lg" /> Contacto
            </h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <MdPhone className="text-base flex-shrink-0" /> Central: (01) 619-7000
              </p>
              <a
                href="mailto:upg.educacion@unmsm.edu.pe"
                className="flex items-center gap-2 hover:text-unmsm-mint-300 transition-colors break-all"
              >
                <MdEmail className="text-base flex-shrink-0" /> upg.educacion@unmsm.edu.pe
              </a>
              <a
                href="https://wa.me/51965229338"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-unmsm-mint-300 transition-colors"
              >
                <FaWhatsapp className="text-base flex-shrink-0" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Secciones (columna extra en desktop, refuerza el mapa del sitio) */}
          <div className="hidden lg:block">
            <h3 className="font-bold mb-3">Información Académica</h3>
            <div className="space-y-2 text-sm">
              <Link
                to="/informacion-academica/docentes"
                className="text-gray-300 hover:text-unmsm-mint-300 transition-colors block"
              >
                Plana Docente
              </Link>
              <Link
                to="/informacion-academica/preguntas-frecuentes"
                className="text-gray-300 hover:text-unmsm-mint-300 transition-colors block"
              >
                Preguntas Frecuentes
              </Link>
              <Link
                to="/comunicados"
                className="text-gray-300 hover:text-unmsm-mint-300 transition-colors block"
              >
                Comunicados
              </Link>
            </div>
          </div>
        </div>

        {/* Mapa — ubicación real de la Facultad en Ciudad Universitaria */}
        <div className="mt-10 rounded-xl overflow-hidden border border-white/10">
          <iframe
            title="Ubicación de la Facultad de Educación - UNMSM"
            src={MAPS_EMBED_URL}
            width="100%"
            height="220"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {anio} UNMSM — Facultad de Educación. Portal de Posgrado.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
