import { MdEmail } from "react-icons/md";

const getInitials = (name) =>
  name
    .replace(/^(Dr\.|Dra\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

// Foto grande vertical arriba, info compacta debajo — pensado para una fila
// de ancho completo (ver QuienesSomosPage.jsx), no para una grilla chica.
// "cargos" es una lista (una autoridad puede tener más de un cargo, ej.
// Vicedecano Y Director a la vez) — se listan todos debajo de la misma
// foto, sin repetir la tarjeta.
const AuthorityCard = ({ name, photo, cargos }) => (
  <div className="group bg-white">
    <div className="aspect-[3/4] bg-unmsm-navy/10 overflow-hidden">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-unmsm-navy font-bold text-5xl">{getInitials(name)}</span>
        </div>
      )}
    </div>
    <div className="p-4">
      <h4 className="font-bold text-unmsm-green leading-snug">{name}</h4>

      <div className="mt-1 space-y-2.5">
        {cargos.map((cargo) => (
          <div key={`${cargo.role}-${cargo.unit}`}>
            <p className="text-unmsm-muted text-xs font-semibold uppercase tracking-wide">
              {cargo.role}
            </p>
            {cargo.unit && <p className="text-unmsm-green-700 text-xs mt-0.5">{cargo.unit}</p>}
            {cargo.email && (
              <a
                href={`mailto:${cargo.email}`}
                className="flex items-center gap-1 text-unmsm-navy text-sm mt-1 hover:text-unmsm-blue transition-colors break-all"
              >
                <MdEmail className="flex-shrink-0" /> {cargo.email}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuthorityCard;
