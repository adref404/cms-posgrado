import { Link } from "react-router-dom";
import {
  MdLocationOn,
  MdLink,
  MdEmail,
  MdPhone,
  MdOpenInNew,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import universidadLogo from "../../assets/UNMSM - Logo UPG 2024 04.png";

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
      {/* Mapa pegado al borde izquierdo + columnas de info a la derecha.
          El footer va de extremo a extremo (sin max-w centrado); cada lado
          maneja su propio padding. En mobile el mapa pasa arriba, apilado. */}
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="lg:w-2/5 lg:flex-shrink-0 lg:p-6">
          <div className="h-56 sm:h-64 lg:h-full lg:rounded-xl overflow-hidden">
            <iframe
              title="Ubicación de la Facultad de Educación - UNMSM"
              src={MAPS_EMBED_URL}
              className="w-full h-full block"
              style={{ border: 0, minHeight: "260px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 px-4 pt-10 pb-3 lg:pt-12 lg:pb-3 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl">
            {/* Identidad */}
            <div className="lg:col-span-1">
              <Link to="/home" className="flex items-center gap-3 mb-4 w-fit">
                <img
                  src={universidadLogo}
                  alt="Logo Universidad"
                  className="h-12 w-12 object-contain flex-shrink-0"
                />
                <div className="leading-none">
                  <p className="text-lg font-serif font-bold uppercase text-white">Posgrado</p>
                  <p className="text-base font-serif font-bold uppercase text-white">Educación</p>
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

            {/* Información Académica */}
            <div>
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

          <div className="border-t border-white/10 mt-4 pt-2">
            <p className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
              © {anio} UNMSM — Posgrado Educación.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
