import { useEffect, useMemo, useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck, MdUploadFile, MdSearch } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase, BUCKET_TRANSPARENCIA } from "../../lib/supabaseClient";

const TABLA = "transparencia_documentos";

const TIPOS = [
  { valor: "enlace", etiqueta: "Enlace (sitio externo)" },
  { valor: "pdf", etiqueta: "PDF" },
  { valor: "docx", etiqueta: "Documento (Word/Google Docs)" },
];

const valorVacio = (categoriaSugerida, siguienteOrden) => ({
  categoria: categoriaSugerida || "",
  titulo: "",
  descripcion: "",
  tipo: "enlace",
  url: "",
  orden: siguienteOrden,
});

// Agrupa por categoría — mismo criterio que hooks/useTransparencia.js, acá
// aparte porque el admin necesita ver TODOS los documentos (con sus
// botones de Editar/Eliminar), no solo los que calzan con una búsqueda.
const agruparPorCategoria = (filas) => {
  const mapa = new Map();
  const orden = [];
  filas.forEach((fila) => {
    if (!mapa.has(fila.categoria)) {
      mapa.set(fila.categoria, []);
      orden.push(fila.categoria);
    }
    mapa.get(fila.categoria).push(fila);
  });
  return orden.map((categoria) => ({ categoria, documentos: mapa.get(categoria) }));
};

// Gestión de la sección Transparencia (Plataformas y Trámites, Estatuto,
// Reglamentos, Directivas, etc.). Una sola tabla en Supabase: "categoria"
// es texto libre en vez de una tabla aparte — si el admin repite el mismo
// texto exacto de una categoría existente, el documento cae en esa misma
// sección; si escribe uno nuevo, nace una sección nueva. No hace falta
// tocar código para agregar categorías.
const AdminTransparenciaPage = () => {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null | "nuevo" | fila
  const [valores, setValores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const cargar = async () => {
    setCargando(true);
    const { data } = await supabase.from(TABLA).select("*").order("orden", { ascending: true });
    setFilas(data || []);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  // El buscador filtra los documentos ANTES de agrupar — así una categoría
  // sin resultados simplemente no aparece, en vez de romper el agrupamiento
  // con una paginación que no tendría sentido acá (esta vista es por
  // secciones, no una lista plana).
  const filasFiltradas = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return filas;
    return filas.filter((f) =>
      [f.titulo, f.descripcion, f.categoria].filter(Boolean).some((campo) => campo.toLowerCase().includes(term))
    );
  }, [filas, busqueda]);

  const secciones = useMemo(() => agruparPorCategoria(filasFiltradas), [filasFiltradas]);
  const categoriasExistentes = useMemo(() => [...new Set(filas.map((f) => f.categoria))], [filas]);

  const abrirNuevo = (categoriaSugerida = "") => {
    const siguienteOrden = filas.length > 0 ? Math.max(...filas.map((f) => f.orden)) + 1 : 1;
    setValores(valorVacio(categoriaSugerida, siguienteOrden));
    setErrorForm("");
    setEditando("nuevo");
  };

  const abrirEditar = (fila) => {
    setValores({ ...fila, descripcion: fila.descripcion || "" });
    setErrorForm("");
    setEditando(fila);
  };

  const handleArchivoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendoArchivo(true);
    const ruta = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from(BUCKET_TRANSPARENCIA).upload(ruta, file);
    if (!error) {
      const { data } = supabase.storage.from(BUCKET_TRANSPARENCIA).getPublicUrl(ruta);
      setValores((v) => ({ ...v, url: data.publicUrl }));
    }
    setSubiendoArchivo(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm("");

    const payload = {
      categoria: (valores.categoria || "").trim(),
      titulo: (valores.titulo || "").trim(),
      descripcion: valores.descripcion?.trim() ? valores.descripcion.trim() : null,
      tipo: valores.tipo,
      url: (valores.url || "").trim(),
      orden: Number(valores.orden) || 0,
    };

    let error;
    if (editando === "nuevo") {
      ({ error } = await supabase.from(TABLA).insert(payload));
    } else {
      ({ error } = await supabase.from(TABLA).update(payload).eq("id", editando.id));
    }

    setGuardando(false);
    if (error) {
      setErrorForm("No se pudo guardar. Intenta de nuevo.");
      return;
    }
    setEditando(null);
    cargar();
  };

  const handleDelete = async (fila) => {
    if (!window.confirm(`¿Eliminar "${fila.titulo}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from(TABLA).delete().eq("id", fila.id);
    cargar();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-unmsm-navy">Transparencia</h1>
        {!editando && (
          <button
            onClick={() => abrirNuevo()}
            className="flex items-center gap-1.5 bg-unmsm-green text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-unmsm-green-600 transition-colors"
          >
            <MdAdd /> Nuevo documento
          </button>
        )}
      </div>
      <p className="text-unmsm-muted text-sm mb-6">
        Documentos y enlaces de la sección Transparencia (Plataformas y Trámites, Estatuto, Reglamentos, etc.).
      </p>

      {editando ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-unmsm-navy">
              {editando === "nuevo" ? "Nuevo documento" : `Editando: ${editando.titulo}`}
            </h2>
            <button type="button" onClick={() => setEditando(null)} className="text-unmsm-muted hover:text-unmsm-navy">
              <MdClose className="text-xl" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Categoría</label>
            <input
              type="text"
              required
              list="categorias-transparencia"
              value={valores.categoria || ""}
              onChange={(e) => setValores((v) => ({ ...v, categoria: e.target.value }))}
              placeholder="Ej: Reglamentos"
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
            <datalist id="categorias-transparencia">
              {categoriasExistentes.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <p className="text-unmsm-muted text-xs mt-1">
              Si escribes el nombre exacto de una categoría que ya existe, el documento se agrega ahí. Si escribes
              una nueva, se crea una sección nueva — no hace falta tocar código.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Título</label>
            <input
              type="text"
              required
              value={valores.titulo || ""}
              onChange={(e) => setValores((v) => ({ ...v, titulo: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              Descripción (opcional, se ve debajo del título)
            </label>
            <textarea
              rows={2}
              value={valores.descripcion || ""}
              onChange={(e) => setValores((v) => ({ ...v, descripcion: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Tipo</label>
            <select
              value={valores.tipo || "enlace"}
              onChange={(e) => setValores((v) => ({ ...v, tipo: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            >
              {TIPOS.map((t) => (
                <option key={t.valor} value={t.valor}>
                  {t.etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              {valores.tipo === "enlace" ? "URL del sitio" : "URL del documento"}
            </label>
            <input
              type="text"
              required
              value={valores.url || ""}
              onChange={(e) => setValores((v) => ({ ...v, url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
            {valores.tipo !== "enlace" && (
              <label className="flex items-center gap-2 w-fit text-sm bg-unmsm-bg border border-gray-200 rounded-lg px-3 py-2 mt-2 cursor-pointer hover:bg-gray-100 transition-colors">
                <MdUploadFile /> {subiendoArchivo ? "Subiendo..." : "O sube un archivo desde tu computadora"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleArchivoChange}
                  disabled={subiendoArchivo}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Orden</label>
            <input
              type="number"
              required
              value={valores.orden ?? ""}
              onChange={(e) => setValores((v) => ({ ...v, orden: e.target.value }))}
              className="w-32 px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
            <p className="text-unmsm-muted text-xs mt-1">
              Define el orden de aparición: tanto de esta categoría entre las demás, como de este documento dentro
              de su categoría (los números más bajos van primero).
            </p>
          </div>

          {errorForm && <p className="text-unmsm-guinda text-sm">{errorForm}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando || subiendoArchivo}
              className="flex items-center gap-1.5 bg-unmsm-blue hover:bg-unmsm-navy text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              <MdCheck /> {guardando ? "Guardando..." : "Guardar y publicar"}
            </button>
            <button
              type="button"
              onClick={() => setEditando(null)}
              className="text-unmsm-muted hover:text-unmsm-navy text-sm font-semibold px-3"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : cargando ? (
        <p className="text-unmsm-muted text-sm">Cargando...</p>
      ) : (
        <>
          <div className="relative max-w-md mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar documento o enlace..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          {secciones.length === 0 ? (
            <p className="text-unmsm-muted text-sm">
              {busqueda
                ? `No se encontraron documentos para "${busqueda}".`
                : "Todavía no hay documentos publicados. Crea el primero con el botón de arriba."}
            </p>
          ) : (
        <div className="space-y-8">
          {secciones.map((seccion) => (
            <div key={seccion.categoria}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-unmsm-navy uppercase tracking-wide text-sm">{seccion.categoria}</h3>
                <button
                  onClick={() => abrirNuevo(seccion.categoria)}
                  className="flex items-center gap-1 text-unmsm-blue hover:text-unmsm-navy text-xs font-semibold"
                >
                  <MdAdd /> Agregar aquí
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                {seccion.documentos.map((fila) => (
                  <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-unmsm-navy truncate">{fila.titulo}</p>
                      <p className="text-unmsm-muted text-xs truncate">
                        {fila.descripcion ? `${fila.descripcion} · ` : ""}
                        {fila.tipo}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={() => abrirEditar(fila)}
                        title="Editar"
                        aria-label="Editar"
                        className="flex items-center gap-1 text-unmsm-blue hover:text-unmsm-navy text-sm font-semibold p-2 sm:p-0"
                      >
                        <MdEdit className="text-lg sm:text-base" /> <span className="hidden sm:inline">Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(fila)}
                        title="Eliminar"
                        aria-label="Eliminar"
                        className="flex items-center gap-1 text-unmsm-guinda hover:text-unmsm-guinda-700 text-sm font-semibold p-2 sm:p-0"
                      >
                        <MdDelete className="text-lg sm:text-base" /> <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminTransparenciaPage;
