import { useState } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import ProgramaCard from "./ProgramaCard";

// Los 3 tipos de programa a los que se puede saltar rápido sin ir al header.
const TIPOS = [
  { tipo: "Maestría", ruta: "/programas/maestria" },
  { tipo: "Doctorado", ruta: "/programas/doctorado" },
  { tipo: "Diplomado", ruta: "/programas/diplomado" },
];

// Grilla reutilizable con buscador; recibe los programas ya filtrados por
// tipo (Maestría/Doctorado/Diplomado) y filtra además por nombre en vivo.
const ProgramasGrid = ({ programas, tipo }) => {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = programas.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8">
        <div className="relative max-w-md flex-1">
          <MdSearch className="absolute inset-y-0 left-3 my-auto text-gray-500 text-lg pointer-events-none" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar programa..."
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unmsm-navy focus:border-transparent bg-white"
          />
        </div>

        <nav className="flex items-center gap-1.5 text-sm flex-shrink-0">
          {TIPOS.map(({ tipo: t, ruta }, i) => (
            <span key={t} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-gray-300">·</span>}
              {t === tipo ? (
                <span className="font-semibold text-unmsm-green">{t}</span>
              ) : (
                <Link to={ruta} className="text-unmsm-muted hover:text-unmsm-navy hover:underline transition-colors">
                  {t}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {filtrados.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((programa) => (
            <ProgramaCard key={programa.id} programa={programa} />
          ))}
        </div>
      ) : (
        <p className="text-unmsm-muted text-sm bg-white border border-gray-200 rounded-xl p-6 text-center">
          {programas.length === 0
            ? `Aún no hay programas de ${tipo.toLowerCase()} registrados.`
            : "No se encontraron programas con ese nombre."}
        </p>
      )}
    </div>
  );
};

export default ProgramasGrid;
