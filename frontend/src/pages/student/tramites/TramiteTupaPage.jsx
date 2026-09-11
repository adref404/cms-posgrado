import { useMemo, useState } from "react";
import {
  MdSearch,
  MdOpenInNew,
  MdPlayCircleOutline,
  MdReceiptLong,
  MdInfoOutline,
} from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";
import { SAN_MARKET_URL, TUPA_CATEGORIAS } from "../../../data/tupa";

const formatoPEN = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });

// Pasos para pagar cualquier trámite de esta lista en SAN MARKET.
const PASOS_TUPA = [
  "Ubica tu trámite abajo y copia su código SAN MARKET.",
  "Ingresa a SAN MARKET con tu correo (@unmsm.edu.pe) y contraseña de estudiante.",
  "Búscalo por código o nombre y agrégalo al carrito.",
  "Completa el pago y descarga tu comprobante.",
];

// Cuando haya un video grabado, pegar acá el ID de YouTube (lo que sigue a
// "v=" en la URL del video, ej: de "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
// es "dQw4w9WgXcQ"; si el link es "https://youtu.be/dQw4w9WgXcQ" es lo mismo,
// lo que va después de youtu.be/). El reproductor se activa solo. Mientras
// esté vacío, se muestra el aviso de "Próximamente".
const VIDEO_YOUTUBE_ID = "";

// Fila de un trámite/servicio: mismo contenido en mobile (tarjeta) y
// escritorio (fila de tabla) — solo cambia el layout, ver TupaCategoria.
const TupaAccion = ({ item }) => {
  if (item.enlace) {
    return (
      <a
        href={item.enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-unmsm-blue hover:bg-unmsm-navy text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
      >
        Pagar en SAN MARKET <MdOpenInNew className="text-sm flex-shrink-0" />
      </a>
    );
  }

  return (
    <span className="flex items-start gap-1.5 text-xs text-unmsm-muted italic max-w-[220px]">
      <MdInfoOutline className="text-sm flex-shrink-0 mt-0.5 text-unmsm-blue" />
      {item.nota}
    </span>
  );
};

// Sección por categoría (Trámites de Posgrado / Programas de Posgrado /
// Otros Servicios): tarjetas apiladas en mobile, tabla en escritorio — igual
// convención que DirectoryTable.jsx, para no introducir un patrón nuevo.
const TupaCategoria = ({ categoria, descripcion, items }) => (
  <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="px-5 md:px-6 py-4 border-b border-gray-100 bg-unmsm-bg/60">
      <h2 className="font-bold text-unmsm-navy">{categoria}</h2>
      <p className="text-xs text-unmsm-muted mt-0.5">{descripcion}</p>
    </div>

    {/* Mobile: tarjetas */}
    <div className="md:hidden divide-y divide-gray-100">
      {items.map((item) => (
        <div key={`${item.nombre}-${item.codigo || item.precio}`} className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-unmsm-navy leading-snug">{item.nombre}</p>
              {item.detalle && <p className="text-xs text-unmsm-muted mt-0.5">{item.detalle}</p>}
              {item.codigo && (
                <span className="inline-block mt-1.5 text-[11px] font-mono font-semibold text-unmsm-blue bg-unmsm-blue/10 rounded px-1.5 py-0.5">
                  {item.codigo}
                </span>
              )}
            </div>
            <span className="font-bold text-unmsm-green flex-shrink-0">{formatoPEN.format(item.precio)}</span>
          </div>
          <TupaAccion item={item} />
        </div>
      ))}
    </div>

    {/* Escritorio: tabla */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm">
        <colgroup>
          <col className="w-[46%]" />
          <col className="w-[13%]" />
          <col className="w-[13%]" />
          <col className="w-[28%]" />
        </colgroup>
        <thead className="bg-unmsm-bg">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">Trámite / Servicio</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">Código SAN MARKET</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">Precio S/</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-unmsm-navy uppercase tracking-wider">Enlace</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={`${item.nombre}-${item.codigo || item.precio}`} className="hover:bg-unmsm-bg/60 transition-colors">
              <td className="px-5 py-3.5 align-top">
                <p className="font-medium text-unmsm-navy">{item.nombre}</p>
                {item.detalle && <p className="text-xs text-unmsm-muted mt-0.5">{item.detalle}</p>}
              </td>
              <td className="px-5 py-3.5 align-top">
                {item.codigo ? (
                  <span className="font-mono text-xs font-semibold text-unmsm-blue bg-unmsm-blue/10 rounded px-1.5 py-0.5">
                    {item.codigo}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-5 py-3.5 align-top font-bold text-unmsm-green whitespace-nowrap">
                {formatoPEN.format(item.precio)}
              </td>
              <td className="px-5 py-3.5 align-top">
                <TupaAccion item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const TramiteTupaPage = () => {
  const [busqueda, setBusqueda] = useState("");

  const totalItems = useMemo(
    () => TUPA_CATEGORIAS.reduce((acc, cat) => acc + cat.items.length, 0),
    []
  );

  const categoriasFiltradas = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return TUPA_CATEGORIAS;

    return TUPA_CATEGORIAS.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        [item.nombre, item.detalle, item.codigo].filter(Boolean).some((field) => field.toLowerCase().includes(term))
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [busqueda]);

  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Trámites"
        title="TUPA · Tarifario Único de Pagos"
        subtitle="Tarifas oficiales de trámites y programas de Posgrado, cobradas a través de SAN MARKET"
        image={MATRICULA_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Pasos para pagar + video de ayuda (ver VIDEO_YOUTUBE_ID abajo
            para activar el reproductor una vez esté grabado). */}
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-unmsm-navy text-sm mb-3">¿Cómo pago un trámite?</h2>
            <ol className="space-y-2.5">
              {PASOS_TUPA.map((paso, i) => (
                <li key={paso} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-unmsm-green/15 text-unmsm-green text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-xs text-unmsm-muted leading-snug">{paso}</span>
                </li>
              ))}
            </ol>
            <a
              href={SAN_MARKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-unmsm-blue font-semibold text-xs mt-4 hover:underline"
            >
              Ir a SAN MARKET <MdOpenInNew className="text-sm" />
            </a>
          </div>

          {/* Video: cómo pagar en SAN MARKET — ver VIDEO_YOUTUBE_ID arriba */}
          <div className="md:col-span-3 rounded-2xl border border-gray-200 bg-white overflow-hidden">
            {VIDEO_YOUTUBE_ID ? (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${VIDEO_YOUTUBE_ID}`}
                  title="Video: cómo pagar en SAN MARKET"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video bg-unmsm-navy/5 flex flex-col items-center justify-center gap-2 p-6 text-center">
                <MdPlayCircleOutline className="text-unmsm-blue text-5xl" />
                <p className="text-sm font-semibold text-unmsm-navy">Video: cómo pagar en SAN MARKET</p>
                <p className="text-unmsm-muted text-xs mt-0.5">Próximamente</p>
              </div>
            )}
          </div>
        </div>

        {/* Buscador */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-unmsm-muted">
            <MdReceiptLong className="text-unmsm-blue text-lg" />
            <span>
              <strong className="text-unmsm-navy">{totalItems}</strong> trámites y programas con tarifa vigente
            </span>
          </div>
          <div className="relative w-full sm:w-80">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar trámite o código (ej: matrícula, PGZK97)..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>
        </div>

        {/* Tarifario por categoría */}
        <div className="space-y-6">
          {categoriasFiltradas.length > 0 ? (
            categoriasFiltradas.map((cat) => <TupaCategoria key={cat.categoria} {...cat} />)
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-unmsm-muted">
              No se encontraron trámites para "{busqueda}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TramiteTupaPage;
