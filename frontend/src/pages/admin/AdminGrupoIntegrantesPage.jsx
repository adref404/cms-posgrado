import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdClose,
  MdCheck,
  MdSearch,
  MdLink,
  MdLinkOff,
  MdArrowBack,
} from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabaseClient";

const TABLA = "grupo_investigacion_integrantes";
const TABLA_GRUPOS = "grupos_investigacion";
const TABLA_DOCENTES = "plana_docente";

const TIPOS_INTEGRANTE = ["Titular", "Titular (Coordinador)", "Adherente"];
const VINCULOS_SUGERIDOS = ["Docente permanente", "Docente contratado", "Estudiante posgrado", "Estudiante pregrado", "Externo"];

const valorVacio = (siguienteOrden) => ({
  nombres: "",
  apellidos: "",
  vinculoUnmsm: "",
  facultad: "",
  tipoIntegrante: "Adherente",
  orden: siguienteOrden,
  docenteId: null,
});

const filaAValores = (fila) => ({
  nombres: fila.nombres || "",
  apellidos: fila.apellidos || "",
  vinculoUnmsm: fila.vinculo_unmsm || "",
  facultad: fila.facultad || "",
  tipoIntegrante: fila.tipo_integrante || "Adherente",
  orden: fila.orden,
  docenteId: fila.docente_id || null,
});

const docenteVacio = () => ({ apellidos: "", nombres: "", grado: "", categoria: "" });

// Gestión de los integrantes (docentes y/o estudiantes) de UN grupo de
// investigación. "docenteId" es el enlace opcional a Plana Docente — solo
// tiene sentido para quienes además son docentes de Educación ya (o recién)
// fichados ahí; para cualquier otro integrante queda en null y su nombre
// vive únicamente en esta tabla.
const AdminGrupoIntegrantesPage = () => {
  const { grupoId } = useParams();
  const [grupo, setGrupo] = useState(null);
  const [filas, setFilas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null | "nuevo" | fila
  const [valores, setValores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const [busquedaDocente, setBusquedaDocente] = useState("");
  const [mostrarCrearDocente, setMostrarCrearDocente] = useState(false);
  const [valoresNuevoDocente, setValoresNuevoDocente] = useState(docenteVacio());
  const [guardandoDocente, setGuardandoDocente] = useState(false);

  const cargar = async () => {
    setCargando(true);
    const [grupoRes, filasRes, docentesRes] = await Promise.all([
      supabase.from(TABLA_GRUPOS).select("id, nombre").eq("id", grupoId).maybeSingle(),
      supabase
        .from(TABLA)
        .select("*, plana_docente(id, nombres, apellidos)")
        .eq("grupo_id", grupoId)
        .order("orden", { ascending: true }),
      supabase.from(TABLA_DOCENTES).select("id, nombres, apellidos, grado, categoria, orden").order("apellidos", { ascending: true }),
    ]);
    setGrupo(grupoRes.data);
    setFilas(filasRes.data || []);
    setDocentes(docentesRes.data || []);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupoId]);

  const gradosExistentes = useMemo(() => [...new Set(docentes.map((d) => d.grado).filter(Boolean))], [docentes]);
  const categoriasExistentes = useMemo(() => [...new Set(docentes.map((d) => d.categoria).filter(Boolean))], [docentes]);
  const vinculosExistentes = useMemo(
    () => [...new Set([...VINCULOS_SUGERIDOS, ...filas.map((f) => f.vinculo_unmsm).filter(Boolean)])],
    [filas]
  );
  const facultadesExistentes = useMemo(() => [...new Set(filas.map((f) => f.facultad).filter(Boolean))], [filas]);

  const resultadosBusqueda = useMemo(() => {
    const term = busquedaDocente.trim().toLowerCase();
    if (!term) return [];
    return docentes
      .filter((d) => `${d.nombres} ${d.apellidos}`.toLowerCase().includes(term))
      .slice(0, 8);
  }, [busquedaDocente, docentes]);

  const cerrarFormulario = () => {
    setEditando(null);
    setBusquedaDocente("");
    setMostrarCrearDocente(false);
    setValoresNuevoDocente(docenteVacio());
  };

  const abrirNuevo = () => {
    const siguienteOrden = filas.length > 0 ? Math.max(...filas.map((f) => f.orden)) + 1 : 1;
    setValores(valorVacio(siguienteOrden));
    setErrorForm("");
    setEditando("nuevo");
  };

  const abrirEditar = (fila) => {
    setValores(filaAValores(fila));
    setErrorForm("");
    setEditando(fila);
  };

  const vincularDocente = (docente) => {
    setValores((v) => ({ ...v, docenteId: docente.id, nombres: docente.nombres, apellidos: docente.apellidos }));
    setBusquedaDocente("");
  };

  const desvincularDocente = () => {
    setValores((v) => ({ ...v, docenteId: null }));
  };

  const crearYVincularDocente = async (e) => {
    e.preventDefault();
    setGuardandoDocente(true);
    const { data, error } = await supabase
      .from(TABLA_DOCENTES)
      .insert({
        apellidos: valoresNuevoDocente.apellidos.trim(),
        nombres: valoresNuevoDocente.nombres.trim(),
        grado: valoresNuevoDocente.grado.trim() || null,
        categoria: valoresNuevoDocente.categoria.trim() || null,
        orden: docentes.length > 0 ? Math.max(...docentes.map((d) => d.orden || 0)) + 1 : 1,
      })
      .select()
      .single();
    setGuardandoDocente(false);
    if (error || !data) return;

    setDocentes((prev) => [...prev, data]);
    vincularDocente(data);
    setMostrarCrearDocente(false);
    setValoresNuevoDocente(docenteVacio());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm("");

    const payload = {
      grupo_id: grupoId,
      docente_id: valores.docenteId || null,
      nombres: valores.nombres.trim(),
      apellidos: valores.apellidos.trim(),
      vinculo_unmsm: valores.vinculoUnmsm.trim() || null,
      facultad: valores.facultad.trim() || null,
      tipo_integrante: valores.tipoIntegrante,
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
      setErrorForm(
        error.code === "23505"
          ? "Ese docente ya está registrado como integrante de este grupo."
          : "No se pudo guardar. Intenta de nuevo."
      );
      return;
    }
    cerrarFormulario();
    cargar();
  };

  const handleDelete = async (fila) => {
    if (!window.confirm(`¿Quitar a "${fila.nombres} ${fila.apellidos}" de este grupo?`)) return;
    await supabase.from(TABLA).delete().eq("id", fila.id);
    cargar();
  };

  return (
    <AdminLayout>
      <Link
        to="/admin/grupos-investigacion"
        className="inline-flex items-center gap-1 text-unmsm-muted hover:text-unmsm-navy text-sm font-semibold mb-3"
      >
        <MdArrowBack /> Volver a Grupos de Investigación
      </Link>

      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-unmsm-navy">
          Integrantes {grupo?.nombre ? `— ${grupo.nombre}` : ""}
        </h1>
        {!editando && (
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-1.5 bg-unmsm-green text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-unmsm-green-600 transition-colors"
          >
            <MdAdd /> Nuevo integrante
          </button>
        )}
      </div>
      <p className="text-unmsm-muted text-sm mb-6">
        Cada integrante guarda su propia información. Enlazarlo a Plana Docente es opcional — solo aplica si además
        es un docente de <strong>posgrado</strong> de Educación ya fichado ahí (Plana Docente no incluye docentes de
        pregrado).
      </p>

      {editando ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-unmsm-navy">
              {editando === "nuevo" ? "Nuevo integrante" : `Editando: ${editando.nombres} ${editando.apellidos}`}
            </h2>
            <button type="button" onClick={cerrarFormulario} className="text-unmsm-muted hover:text-unmsm-navy">
              <MdClose className="text-xl" />
            </button>
          </div>

          {/* Vínculo opcional a Plana Docente */}
          <div className="border border-gray-200 rounded-lg p-4 bg-unmsm-bg space-y-3">
            <p className="text-sm font-semibold text-unmsm-navy">Ficha en Plana Docente (opcional)</p>

            {valores.docenteId ? (
              <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-unmsm-navy font-medium">
                  <MdLink className="text-unmsm-green" /> Enlazado a {valores.nombres} {valores.apellidos}
                </span>
                <button
                  type="button"
                  onClick={desvincularDocente}
                  className="flex items-center gap-1 text-unmsm-guinda text-xs font-semibold hover:text-unmsm-guinda-700"
                >
                  <MdLinkOff /> Quitar enlace
                </button>
              </div>
            ) : mostrarCrearDocente ? (
              <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                <p className="text-xs text-unmsm-muted">
                  Úsalo solo si es docente de <strong>posgrado</strong> de Educación — Plana Docente es
                  específicamente ese directorio, no el de pregrado. Se creará como un nuevo docente ahí (podrás
                  completar grado, ORCID, líneas de investigación, etc. después desde /admin/plana-docente).
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nombres"
                    required
                    value={valoresNuevoDocente.nombres}
                    onChange={(e) => setValoresNuevoDocente((v) => ({ ...v, nombres: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                  <input
                    type="text"
                    placeholder="Apellidos"
                    required
                    value={valoresNuevoDocente.apellidos}
                    onChange={(e) => setValoresNuevoDocente((v) => ({ ...v, apellidos: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                  <input
                    type="text"
                    list="grados-nuevo-docente"
                    placeholder="Grado (ej: Doctor (a))"
                    value={valoresNuevoDocente.grado}
                    onChange={(e) => setValoresNuevoDocente((v) => ({ ...v, grado: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                  <input
                    type="text"
                    list="categorias-nuevo-docente"
                    placeholder="Categoría"
                    value={valoresNuevoDocente.categoria}
                    onChange={(e) => setValoresNuevoDocente((v) => ({ ...v, categoria: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                  <datalist id="grados-nuevo-docente">
                    {gradosExistentes.map((g) => (
                      <option key={g} value={g} />
                    ))}
                  </datalist>
                  <datalist id="categorias-nuevo-docente">
                    {categoriasExistentes.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={crearYVincularDocente}
                    disabled={guardandoDocente || !valoresNuevoDocente.nombres || !valoresNuevoDocente.apellidos}
                    className="flex items-center gap-1 bg-unmsm-navy text-white text-xs font-semibold px-3 py-2 rounded-lg disabled:opacity-50"
                  >
                    <MdCheck /> {guardandoDocente ? "Creando..." : "Crear y enlazar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarCrearDocente(false)}
                    className="text-unmsm-muted text-xs font-semibold px-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdSearch className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar docente ya registrado en Plana Docente..."
                    value={busquedaDocente}
                    onChange={(e) => setBusquedaDocente(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                </div>
                {resultadosBusqueda.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
                    {resultadosBusqueda.map((d) => (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => vincularDocente(d)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-unmsm-bg transition-colors"
                      >
                        {d.nombres} {d.apellidos}
                        {d.grado && <span className="text-unmsm-muted"> · {d.grado}</span>}
                      </button>
                    ))}
                  </div>
                )}
                {busquedaDocente && resultadosBusqueda.length === 0 && (
                  <p className="text-xs text-unmsm-muted">No se encontró ningún docente con ese nombre.</p>
                )}
                <button
                  type="button"
                  onClick={() => setMostrarCrearDocente(true)}
                  className="text-unmsm-blue text-xs font-semibold hover:underline"
                >
                  ¿Es docente de posgrado de Educación y no aparece? Agrégalo a Plana Docente
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Nombres</label>
              <input
                type="text"
                required
                disabled={Boolean(valores.docenteId)}
                value={valores.nombres || ""}
                onChange={(e) => setValores((v) => ({ ...v, nombres: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Apellidos</label>
              <input
                type="text"
                required
                disabled={Boolean(valores.docenteId)}
                value={valores.apellidos || ""}
                onChange={(e) => setValores((v) => ({ ...v, apellidos: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Vínculo UNMSM</label>
              <input
                type="text"
                list="vinculos-integrante"
                value={valores.vinculoUnmsm || ""}
                onChange={(e) => setValores((v) => ({ ...v, vinculoUnmsm: e.target.value }))}
                placeholder="Ej: Estudiante posgrado"
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
              <datalist id="vinculos-integrante">
                {vinculosExistentes.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Facultad (opcional)</label>
              <input
                type="text"
                list="facultades-integrante"
                value={valores.facultad || ""}
                onChange={(e) => setValores((v) => ({ ...v, facultad: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
              <datalist id="facultades-integrante">
                {facultadesExistentes.map((f) => (
                  <option key={f} value={f} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Tipo de integrante</label>
              <select
                value={valores.tipoIntegrante || "Adherente"}
                onChange={(e) => setValores((v) => ({ ...v, tipoIntegrante: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              >
                {TIPOS_INTEGRANTE.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Orden</label>
              <input
                type="number"
                required
                value={valores.orden ?? ""}
                onChange={(e) => setValores((v) => ({ ...v, orden: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
          </div>

          {errorForm && <p className="text-unmsm-guinda text-sm">{errorForm}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando}
              className="flex items-center gap-1.5 bg-unmsm-blue hover:bg-unmsm-navy text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              <MdCheck /> {guardando ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={cerrarFormulario}
              className="text-unmsm-muted hover:text-unmsm-navy text-sm font-semibold px-3"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : cargando ? (
        <p className="text-unmsm-muted text-sm">Cargando...</p>
      ) : filas.length === 0 ? (
        <p className="text-unmsm-muted text-sm">
          Todavía no hay integrantes en este grupo. Agrega el primero con el botón de arriba.
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {filas.map((fila) => (
            <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0 flex items-center gap-2">
                {fila.docente_id && <MdLink className="text-unmsm-green flex-shrink-0" title="Enlazado a Plana Docente" />}
                <div className="min-w-0">
                  <p className="font-semibold text-unmsm-navy truncate">
                    {fila.nombres} {fila.apellidos}
                  </p>
                  <p className="text-unmsm-muted text-xs truncate">
                    {fila.tipo_integrante} · {[fila.vinculo_unmsm, fila.facultad].filter(Boolean).join(" · ")}
                  </p>
                </div>
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
                  <MdDelete /> Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGrupoIntegrantesPage;
