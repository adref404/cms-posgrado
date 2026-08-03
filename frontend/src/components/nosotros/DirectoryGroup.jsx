import { MdPeople, MdEmail } from "react-icons/md";

const DirectoryGroup = ({ titulo, miembros, icon: Icon = MdPeople }) => {
  const hasTelefono = miembros.some((m) => m.telefono);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-unmsm-blue flex items-center justify-center flex-shrink-0">
          <Icon className="text-white text-lg" />
        </div>
        <h3 className="font-bold text-unmsm-navy text-lg">{titulo}</h3>
      </div>
      <p className="text-unmsm-muted text-sm mt-1 mb-4 ml-[52px]">
        {miembros.length} {miembros.length === 1 ? "persona" : "personas"}
      </p>

      {/* Móvil: tarjetas apiladas */}
      <div className="md:hidden space-y-3">
        {miembros.map((m, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{m.cargo}</p>
            <p className="font-semibold text-unmsm-navy mt-1">{m.nombre}</p>
            {m.email && (
              <a
                href={`mailto:${m.email}`}
                className="flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue text-sm mt-2 break-all"
              >
                <MdEmail className="flex-shrink-0 text-xs" /> {m.email}
              </a>
            )}
            {m.telefono && (
              <p className="text-gray-500 text-xs mt-1">{m.telefono}</p>
            )}
          </div>
        ))}
      </div>

      {/* Escritorio: tabla */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-fixed divide-y divide-gray-200 text-sm">
          <colgroup>
            <col className={hasTelefono ? "w-[30%]" : "w-[36%]"} />
            <col className={hasTelefono ? "w-[24%]" : "w-[28%]"} />
            <col className={hasTelefono ? "w-[28%]" : "w-[36%]"} />
            {hasTelefono && <col className="w-[18%]" />}
          </colgroup>
          <thead className="bg-unmsm-bg">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Correo
              </th>
              {hasTelefono && (
                <th className="px-4 py-2 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                  Teléfono/Anexo
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {miembros.map((m, index) => (
              <tr key={index} className="hover:bg-unmsm-bg transition-colors">
                <td className="px-4 py-3 text-gray-600 align-top break-words">
                  {m.cargo}
                </td>
                <td className="px-4 py-3 font-semibold text-unmsm-navy align-top break-words">
                  {m.nombre}
                </td>
                <td className="px-4 py-3 align-top">
                  {m.email ? (
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue transition-colors break-all text-xs"
                    >
                      <MdEmail className="flex-shrink-0" /> {m.email}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                {hasTelefono && (
                  <td className="px-4 py-3 text-gray-600 align-top break-words">
                    {m.telefono || "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectoryGroup;
