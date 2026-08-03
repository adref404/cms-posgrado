import { useMemo, useState } from "react";
import { MdSearch, MdEmail } from "react-icons/md";

const EmailList = ({ email, className }) => {
  if (!email || email.length === 0) {
    return <span className="text-gray-400">—</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      {email.map((mail) => (
        <a
          key={mail}
          href={`mailto:${mail}`}
          className={`flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue transition-colors break-all ${className || ""}`}
        >
          <MdEmail className="flex-shrink-0 text-xs" /> {mail}
        </a>
      ))}
    </div>
  );
};

const DirectoryTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;

    return data.filter((row) =>
      [row.unidad, row.cargo, row.nombre, row.anexo, ...(row.email || [])]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [data, searchTerm]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdSearch className="text-gray-500 text-lg" />
        </div>
        <input
          type="text"
          placeholder="Buscar por unidad, cargo, nombre o anexo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent"
        />
      </div>

      {/* Móvil: tarjetas apiladas, sin scroll horizontal */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((row, index) => (
            <div
              key={`${row.unidad}-${row.cargo}-${index}`}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p className="font-semibold text-unmsm-navy">{row.unidad}</p>
              {row.cargo && (
                <p className="text-sm text-gray-600 mt-0.5">{row.cargo}</p>
              )}
              {row.nombre && (
                <p className="text-sm text-gray-800 mt-1">{row.nombre}</p>
              )}
              {row.anexo && (
                <p className="text-xs text-gray-500 mt-1">
                  Anexo: {row.anexo}
                </p>
              )}
              <div className="mt-2 text-sm">
                <EmailList email={row.email} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            No se encontraron resultados para "{searchTerm}"
          </div>
        )}
      </div>

      {/* Escritorio: tabla con anchos fijos por columna */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-fixed divide-y divide-gray-200 text-sm">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[8%]" />
            <col className="w-[36%]" />
          </colgroup>
          <thead className="bg-unmsm-bg">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Unidad
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Anexo
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">
                Correo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((row, index) => (
                <tr
                  key={`${row.unidad}-${row.cargo}-${index}`}
                  className="hover:bg-unmsm-bg transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-unmsm-green align-top break-words">
                    {row.unidad}
                  </td>
                  <td className="px-4 py-3 text-gray-600 align-top break-words">
                    {row.cargo || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 align-top break-words">
                    {row.nombre || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 align-top break-words">
                    {row.anexo || "—"}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <EmailList email={row.email} className="text-xs" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No se encontraron resultados para "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectoryTable;
