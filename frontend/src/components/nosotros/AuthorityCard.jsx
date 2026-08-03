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

const AuthorityCard = ({ name, role, unit, email, photo }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-unmsm-green p-5 flex gap-4 items-start">
    <div className="w-16 h-16 rounded-full bg-unmsm-navy/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
      {photo ? (
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-unmsm-navy font-bold text-lg">
          {getInitials(name)}
        </span>
      )}
    </div>
    <div className="min-w-0">
      <h4 className="font-bold text-unmsm-green leading-snug">{name}</h4>
      <p className="text-unmsm-muted text-xs font-semibold uppercase tracking-wide mt-1">
        {role}
      </p>
      {unit && <p className="text-unmsm-green-700 text-xs mt-0.5">{unit}</p>}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1 text-unmsm-navy text-sm mt-2 hover:text-unmsm-blue transition-colors break-all"
        >
          <MdEmail className="flex-shrink-0" /> {email}
        </a>
      )}
    </div>
  </div>
);

export default AuthorityCard;
