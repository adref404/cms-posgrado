import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck, MdUploadFile, MdSearch } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase, BUCKET_PLANA_DOCENTE } from "../../lib/supabaseClient";

const TABLA = "plana_docente";
const TABLA_INTEGRANTES = "grupo_investigacion_integrantes";

const valorVacio = (siguienteOrden) => ({
  codigo: "",
  apellidos: "",
  nombres: "",
  grado: "",
  categoria: "",
  orcid: "",
  renacyt: "",
  lineasInvestigacion: "", // en el formulario es texto (una línea por renglón); se separa al guardar
  biodata: "",
  orden: siguienteOrden,
});

// De fila de Supabase (snake_case) -> valores editables del formulario
// (camelCase, lineas_investigacion como texto con saltos de línea para
// poder editarlo en un <textarea>).
const filaAValores = (fila) => ({
  codigo: fila.codigo || "",
  apellidos: fila.apellidos || "",
  nombres: fila.nombres || "",
  grado: fila.grado || "",
  categoria: fila.categoria || "",
  orcid: fila.orcid || "",
  renacyt: fila.renacyt || "",
  lineasInvestigacion: (fila.lineas_investigacion || []).join("\n"),
  biodata: fila.biodata || "",
  orden: fila.orden,
});

// Gestión de la Plana Docente. Una sola tabla plana en Supabase — el cruce
// "¿en qué programa dicta este docente?" que se ve en la web pública se
// sigue calculando aparte (data/docentesPorPrograma.js), no hace falta
// tocarlo desde acá.
//
// Los grupos de investigación de un docente NO se guardan en esta tabla
// (el viejo campo de texto suelto "grupo_investigacion" quedó obsoleto):
// se leen y se escriben directo en grupo_investigacion_integrantes, la
// misma tabla que usa /admin/grupos-investigacion/.../integrantes — es
// una sola fuente de verdad, se puede enlazar desde cualquiera de los dos
// lados. Elegir un grupo acá es opcional, igual que crear un docente sin
// ninguno, o crear un grupo sin integrantes todavía.
const AdminPlanaDocentePage = () => {
  const [filas, setFilas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null); // null | "nuevo" | fila
  const [valores, setValores] = useState({});
  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const [gruposOriginales, setGruposOriginales] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const cargar = async () => {
    setCargando(true);
    const [filasRes, gruposRes] = await Promise.all([
      supabase.from(TABLA).select("*").order("orden", { ascending: true }),
      supabase.from("grupos_investigacion").select("id, nombre, nombre_corto").order("nombre", { ascending: true }),
    ]);
    setFilas(filasRes.data || []);
    setGrupos(gruposRes.data || []);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  const filasFiltradas = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return filas;
    return filas.filter((f) =>
      [f.nombres, f.apellidos, f.grado, f.categoria]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(term))
    );
  }, [filas, busqueda]);

  const gradosExistentes = useMemo(() => [...new Set(filas.map((f) => f.grado).filter(Boolean))], [filas]);
  const categoriasExistentes = useMemo(() => [...new Set(filas.map((f) => f.categoria).filter(Boolean))], [filas]);

  const abrirNuevo = () => {
    const siguienteOrden = filas.length > 0 ? Math.max(...filas.map((f) => f.orden)) + 1 : 1;
    setValores(valorVacio(siguienteOrden));
    setGruposSeleccionados([]);
    setGruposOriginales([]);
    setErrorForm("");
    setEditando("nuevo");
  };

  const abrirEditar = async (fila) => {
    setValores(filaAValores(fila));
    setErrorForm("");
    setEditando(fila);
    const { data } = await supabase.from(TABLA_INTEGRANTES).select("grupo_id").eq("docente_id", fila.id);
    const idsActuales = (data || []).map((f) => f.grupo_id);
    setGruposSeleccionados(idsActuales);
    setGruposOriginales(idsActuales);
  };

  const toggleGrupo = (grupoId) => {
    setGruposSeleccionados((prev) =>
      prev.includes(grupoId) ? prev.filter((id) => id !== grupoId) : [...prev, grupoId]
    );
  };

  const handleArchivoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendoArchivo(true);
    const ruta = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from(BUCKET_PLANA_DOCENTE).upload(ruta, file);
    if (!error) {
      const { data } = supabase.storage.from(BUCKET_PLANA_DOCENTE).getPublicUrl(ruta);
      setValores((v) => ({ ...v, biodata: data.publicUrl }));
    }
    setSubiendoArchivo(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm("");

    const payload = {
      codigo: valores.codigo.trim() || null,
      apellidos: valores.apellidos.trim(),
      nombres: valores.nombres.trim(),
      grado: valores.grado.trim() || null,
      categoria: valores.categoria.trim() || null,
      orcid: valores.orcid.trim() || null,
      renacyt: valores.renacyt.trim() || null,
      lineas_investigacion: valores.lineasInvestigacion
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      biodata: valores.biodata.trim() || null,
      orden: Number(valores.orden) || 0,
    };

    let docenteId = editando === "nuevo" ? null : editando.id;
    let error;

    if (editando === "nuevo") {
      const resultado = await supabase.from(TABLA).insert(payload).select().single();
      error = resultado.error;
      docenteId = resultado.data?.id;
    } else {
      ({ error } = await supabase.from(TABLA).update(payload).eq("id", docenteId));
    }

    if (error) {
      setGuardando(false);
      setErrorForm("No se pudo guardar. Intenta de nuevo.");
      return;
    }

    // Sincroniza a qué grupos pertenece: quita los que se desmarcaron,
    // agrega los nuevos (al final de la lista de integrantes de cada
    // grupo), y si ya estaba enlazado a otros, les actualiza el nombre por
    // si cambió — para que nunca queden desincronizados.
    const paraQuitar = gruposOriginales.filter((id) => !gruposSeleccionados.includes(id));
    const paraAgregar = gruposSeleccionados.filter((id) => !gruposOriginales.includes(id));

    if (paraQuitar.length > 0) {
      await supabase.from(TABLA_INTEGRANTES).delete().eq("docente_id", docenteId).in("grupo_id", paraQuitar);
    }

    for (const grupoId of paraAgregar) {
      const { count } = await supabase
        .from(TABLA_INTEGRANTES)
        .select("id", { count: "exact", head: true })
        .eq("grupo_id", grupoId);
      await supabase.from(TABLA_INTEGRANTES).insert({
        grupo_id: grupoId,
        docente_id: docenteId,
        nombres: payload.nombres,
        apellidos: payload.apellidos,
        vinculo_unmsm: "Docente permanente",
        facultad: "Educación",
        tipo_integrante: "Adherente",
        orden: (count || 0) + 1,
      });
    }

    if (editando !== "nuevo") {
      await supabase
        .from(TABLA_INTEGRANTES)
        .update({ nombres: payload.nombres, apellidos: payload.apellidos })
        .eq("docente_id", docenteId);
    }

    setGuardando(false);
    setEditando(null);
    cargar();
  };

  const handleDelete = async (fila) => {
    if (!window.confirm(`¿Eliminar a "${fila.nombres} ${fila.apellidos}"? Esta acción no se puede deshacer.`))
      return;
    await supabase.from(TABLA).delete().eq("id", fila.id);
    cargar();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-unmsm-navy">Plana Docente</h1>
        {!editando && (
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-1.5 bg-unmsm-green text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-unmsm-green-600 transition-colors"
          >
            <MdAdd /> Nuevo docente
          </button>
        )}
      </div>
      <p className="text-unmsm-muted text-sm mb-6">
        Docentes investigadores que se muestran en Información Académica → Plana Docente.
      </p>

      {editando ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-unmsm-navy">
              {editando === "nuevo" ? "Nuevo docente" : `Editando: ${editando.nombres} ${editando.apellidos}`}
            </h2>
            <button type="button" onClick={() => setEditando(null)} className="text-unmsm-muted hover:text-unmsm-navy">
              <MdClose className="text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Nombres</label>
              <input
                type="text"
                required
                value={valores.nombres || ""}
                onChange={(e) => setValores((v) => ({ ...v, nombres: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Apellidos</label>
              <input
                type="text"
                required
                value={valores.apellidos || ""}
                onChange={(e) => setValores((v) => ({ ...v, apellidos: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Grado</label>
              <input
                type="text"
                list="grados-docente"
                value={valores.grado || ""}
                onChange={(e) => setValores((v) => ({ ...v, grado: e.target.value }))}
                placeholder="Ej: Doctor (a)"
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
              <datalist id="grados-docente">
                {gradosExistentes.map((g) => (
                  <option key={g} value={g} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Categoría</label>
              <input
                type="text"
                list="categorias-docente"
                value={valores.categoria || ""}
                onChange={(e) => setValores((v) => ({ ...v, categoria: e.target.value }))}
                placeholder="Ej: Asociado - Tiempo completo"
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
              <datalist id="categorias-docente">
                {categoriasExistentes.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Código (opcional)</label>
              <input
                type="text"
                value={valores.codigo || ""}
                onChange={(e) => setValores((v) => ({ ...v, codigo: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">ORCID (opcional)</label>
              <input
                type="text"
                value={valores.orcid || ""}
                onChange={(e) => setValores((v) => ({ ...v, orcid: e.target.value }))}
                placeholder="0000-0000-0000-0000"
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">RENACYT (opcional)</label>
            <input
              type="text"
              value={valores.renacyt || ""}
              onChange={(e) => setValores((v) => ({ ...v, renacyt: e.target.value }))}
              placeholder="Ej: RENACYT NIVEL II"
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              Grupos de investigación (opcional)
            </label>
            {grupos.length === 0 ? (
              <p className="text-unmsm-muted text-xs">
                Todavía no hay grupos de investigación creados. Puedes crearlos en{" "}
                <Link to="/admin/grupos-investigacion" className="text-unmsm-blue font-semibold hover:underline">
                  Grupos de Investigación
                </Link>
                .
              </p>
            ) : (
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                {grupos.map((g) => (
                  <label
                    key={g.id}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-unmsm-bg"
                  >
                    <input
                      type="checkbox"
                      checked={gruposSeleccionados.includes(g.id)}
                      onChange={() => toggleGrupo(g.id)}
                      className="w-4 h-4 accent-unmsm-green flex-shrink-0"
                    />
                    {g.nombre_corto ? `${g.nombre_corto} — ${g.nombre}` : g.nombre}
                  </label>
                ))}
              </div>
            )}
            <p className="text-unmsm-muted text-xs mt-1">
              Puedes marcar varios grupos, o ninguno — no es obligatorio pertenecer a uno.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              Líneas de investigación (una por línea)
            </label>
            <textarea
              rows={4}
              value={valores.lineasInvestigacion || ""}
              onChange={(e) => setValores((v) => ({ ...v, lineasInvestigacion: e.target.value }))}
              placeholder={"Currículo, pedagogía y didáctica\nFormación en investigación"}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              Biodata / CV (link o archivo, opcional)
            </label>
            <input
              type="text"
              value={valores.biodata || ""}
              onChange={(e) => setValores((v) => ({ ...v, biodata: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
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
            <p className="text-unmsm-muted text-xs mt-1">Los números más bajos aparecen primero en la lista.</p>
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
      ) : (
        <>
          <div className="relative max-w-md mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, grado o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          {cargando ? (
            <p className="text-unmsm-muted text-sm">Cargando...</p>
          ) : filasFiltradas.length === 0 ? (
            <p className="text-unmsm-muted text-sm">
              {busqueda ? `No se encontraron docentes para "${busqueda}".` : "Todavía no hay docentes publicados."}
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
              {filasFiltradas.map((fila) => (
                <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-unmsm-navy truncate">
                      {fila.nombres} {fila.apellidos}
                    </p>
                    <p className="text-unmsm-muted text-xs truncate">
                      {[fila.grado, fila.categoria].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => abrirEditar(fila)}
                      className="flex items-center gap-1 text-unmsm-blue hover:text-unmsm-navy text-sm font-semibold"
                    >
                      <MdEdit /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(fila)}
                      className="flex items-center gap-1 text-unmsm-guinda hover:text-unmsm-guinda-700 text-sm font-semibold"
                    >
                      <MdDelete /> Eliminar
                    </button>
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

export default AdminPlanaDocentePage;
