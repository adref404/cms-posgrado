import { MdInfo, MdStar, MdAccessTime, MdApartment, MdEmail, MdPhone } from "react-icons/md";

// Tarjeta lateral (sticky en desktop) con los datos clave del programa y
// las acciones de contacto. Se queda arriba de la columna al hacer scroll
// en pantallas grandes; en mobile pasa a flujo normal, debajo del contenido.
// No hay botón de "Postular" porque el sitio oficial de posgrado (donde
// vivía el formulario) está caído; el contacto directo es la vía disponible.
const ProgramaInfoClaveCard = ({ programa }) => {
  const { creditos, duration, modalidad, inversion, contacto } = programa;

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="flex items-center gap-2 font-bold text-unmsm-navy mb-4">
          <MdInfo className="text-unmsm-green text-xl" /> Información Clave
        </h3>

        <div className="space-y-4">
          {creditos && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-unmsm-green/10 flex items-center justify-center flex-shrink-0">
                <MdStar className="text-unmsm-green text-lg" />
              </div>
              <div>
                <p className="text-unmsm-muted text-xs uppercase tracking-wide">Créditos</p>
                <p className="font-semibold text-unmsm-navy">{creditos} Académicos</p>
              </div>
            </div>
          )}
          {duration && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
                <MdAccessTime className="text-unmsm-blue text-lg" />
              </div>
              <div>
                <p className="text-unmsm-muted text-xs uppercase tracking-wide">Duración</p>
                <p className="font-semibold text-unmsm-navy">{duration}</p>
              </div>
            </div>
          )}
          {modalidad && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-unmsm-blue/10 flex items-center justify-center flex-shrink-0">
                <MdApartment className="text-unmsm-blue text-lg" />
              </div>
              <div>
                <p className="text-unmsm-muted text-xs uppercase tracking-wide">Modalidad</p>
                <p className="font-semibold text-unmsm-navy">{modalidad}</p>
              </div>
            </div>
          )}
          {inversion?.costoTotal && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-unmsm-green/10 flex items-center justify-center flex-shrink-0">
                <span className="text-unmsm-green font-bold text-sm">S/</span>
              </div>
              <div>
                <p className="text-unmsm-muted text-xs uppercase tracking-wide">Inversión total</p>
                <p className="font-semibold text-unmsm-navy">{inversion.costoTotal}</p>
              </div>
            </div>
          )}
        </div>

        {contacto?.email && (
          <a
            href={`mailto:${contacto.email}`}
            className="w-full flex items-center justify-center gap-2 bg-unmsm-green text-white font-semibold py-2.5 rounded-lg hover:bg-unmsm-green-700 transition-colors mt-5"
          >
            <MdEmail /> Escribir un correo
          </a>
        )}
      </div>

      {contacto && (
        <div className="bg-unmsm-navy text-white rounded-xl p-5">
          <h3 className="font-bold mb-3">¿Necesitas ayuda?</h3>
          <p className="text-gray-300 text-sm mb-3">Contáctanos directamente:</p>
          <div className="space-y-2 text-sm">
            {contacto.email && (
              <a href={`mailto:${contacto.email}`} className="flex items-center gap-2 hover:text-unmsm-mint-300 transition-colors break-all">
                <MdEmail className="flex-shrink-0" /> {contacto.email}
              </a>
            )}
            {contacto.telefono && (
              <p className="flex items-center gap-2">
                <MdPhone className="flex-shrink-0" /> {contacto.telefono}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramaInfoClaveCard;
