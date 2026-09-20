import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck, MdGroups } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabaseClient";

const TABLA = "grupos_investigacion";

const valorVacio = (siguienteOrden) => ({
  nombre: "",
  nombreCorto: "",
  estado: "Registrado",
  presentacion: "",
  objetivos: "",
  servicios: "",
  lineasTexto: "", // una línea por renglón: "CÓDIGO | Nombre de la línea"
  correoCoordinador: "",
  telefono: "",
  oficina: "",
  direccion: "",
  direccionWeb: "",
  orden: siguienteOrden,
});

// "CÓDIGO | Línea" por renglón -> dos arreglos paralelos (lineas_codigos,
// lineas_investigacion) que es como se guarda en la base. El código es
// opcional: si no hay "|", el renglón entero es la línea, sin código.
const textoALineas = (texto) => {
  const codigos = [];
  const lineas = [];
  texto
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean)
    .forEach((fila) => {
      const idx = fila.indexOf("|");
      if (idx === -1) {
        codigos.push("");
        lineas.push(fila);
      } else {
        codigos.push(fila.slice(0, idx).trim());
        lineas.push(fila.slice(idx + 1).trim());
      }
    });
  return { codigos, lineas };
};

const lineasATexto = (codigos, lineas) =>
  (lineas || []).map((linea, i) => (codigos?.[i] ? `${codigos[i]} | ${linea}` : linea)).join("\n");

const filaAValores = (fila) => ({
  nombre: fila.nombre || "",
  nombreCorto: fila.nombre_corto || "",
  estado: fila.estado || "",
  presentacion: fila.presentacion || "",
  objetivos: fila.objetivos || "",
  servicios: fila.servicios || "",
  lineasTexto: lineasATexto(fila.lineas_codigos, fila.lineas_investigacion),
  correoCoordinador: fila.correo_coordinador || "",
  telefono: fila.telefono || "",
  oficina: fila.oficina || "",
  direccion: fila.direccion || "",
  direccionWeb: fila.direccion_web || "",
  orden: fila.orden,
});

// Gestión de Grupos de Investigación. Los integrantes de cada grupo se
// administran aparte, en /admin/grupos-investigacion/:grupoId/integrantes
// (botón "Gestionar integrantes" en cada fila).
const AdminGruposInvestigacionPage = () => {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null | "nuevo" | fila
  const [valores, setValores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const cargar = async () => {
    setCargando(true);
    const { data } = await supabase.from(TABLA).select("*").order("orden", { ascending: true });
    setFilas(data || []);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm("");

    const { codigos, lineas } = textoALineas(valores.lineasTexto);
    const payload = {
      nombre: valores.nombre.trim(),
      nombre_corto: valores.nombreCorto.trim() || null,
      estado: valores.estado.trim() || null,
      presentacion: valores.presentacion.trim() || null,
      objetivos: valores.objetivos.trim() || null,
      servicios: valores.servicios.trim() || null,
      lineas_codigos: codigos,
      lineas_investigacion: lineas,
      correo_coordinador: valores.correoCoordinador.trim() || null,
      telefono: valores.telefono.trim() || null,
      oficina: valores.oficina.trim() || null,
      direccion: valores.direccion.trim() || null,
      direccion_web: valores.direccionWeb.trim() || null,
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
    if (
      !window.confirm(
        `¿Eliminar el grupo "${fila.nombre}"? Esto también borra a todos sus integrantes registrados. Esta acción no se puede deshacer.`
      )
    )
      return;
    await supabase.from(TABLA).delete().eq("id", fila.id);
    cargar();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-unmsm-navy">Grupos de Investigación</h1>
        {!editando && (
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-1.5 bg-unmsm-green text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-unmsm-green-600 transition-colors"
          >
            <MdAdd /> Nuevo grupo
          </button>
        )}
      </div>
      <p className="text-unmsm-muted text-sm mb-6">
        Datos generales del grupo. Para agregar o quitar docentes y estudiantes, entra a "Gestionar integrantes" en
        cada grupo.
      </p>

      {editando ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-unmsm-navy">
              {editando === "nuevo" ? "Nuevo grupo" : `Editando: ${editando.nombre}`}
            </h2>
            <button type="button" onClick={() => setEditando(null)} className="text-unmsm-muted hover:text-unmsm-navy">
              <MdClose className="text-xl" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Nombre del grupo</label>
            <input
              type="text"
              required
              value={valores.nombre || ""}
              onChange={(e) => setValores((v) => ({ ...v, nombre: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Nombre corto / siglas</label>
              <input
                type="text"
                value={valores.nombreCorto || ""}
                onChange={(e) => setValores((v) => ({ ...v, nombreCorto: e.target.value }))}
                placeholder="Ej: GRIITS"
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Estado</label>
              <input
                type="text"
                value={valores.estado || ""}
                onChange={(e) => setValores((v) => ({ ...v, estado: e.target.value }))}
                placeholder="Ej: Registrado"
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Presentación</label>
            <textarea
              rows={4}
              value={valores.presentacion || ""}
              onChange={(e) => setValores((v) => ({ ...v, presentacion: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Objetivos</label>
            <textarea
              rows={3}
              value={valores.objetivos || ""}
              onChange={(e) => setValores((v) => ({ ...v, objetivos: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Servicios (opcional)</label>
            <textarea
              rows={2}
              value={valores.servicios || ""}
              onChange={(e) => setValores((v) => ({ ...v, servicios: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              Líneas de investigación (una por renglón)
            </label>
            <textarea
              rows={4}
              value={valores.lineasTexto || ""}
              onChange={(e) => setValores((v) => ({ ...v, lineasTexto: e.target.value }))}
              placeholder={"A.2.5.2. | Recursos Hídricos\nC.16.0.35 | Tecnologías limpias"}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
            <p className="text-unmsm-muted text-xs mt-1">
              El código antes de la barra "|" es opcional — puedes escribir solo el nombre de la línea si no tiene
              código.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Correo del coordinador</label>
              <input
                type="text"
                value={valores.correoCoordinador || ""}
                onChange={(e) => setValores((v) => ({ ...v, correoCoordinador: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Teléfono</label>
              <input
                type="text"
                value={valores.telefono || ""}
                onChange={(e) => setValores((v) => ({ ...v, telefono: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Oficina</label>
            <input
              type="text"
              value={valores.oficina || ""}
              onChange={(e) => setValores((v) => ({ ...v, oficina: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Dirección</label>
            <input
              type="text"
              value={valores.direccion || ""}
              onChange={(e) => setValores((v) => ({ ...v, direccion: e.target.value }))}
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Sitio web (opcional)</label>
              <input
                type="text"
                value={valores.direccionWeb || ""}
                onChange={(e) => setValores((v) => ({ ...v, direccionWeb: e.target.value }))}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
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
      ) : filas.length === 0 ? (
        <p className="text-unmsm-muted text-sm">
          Todavía no hay grupos de investigación publicados. Crea el primero con el botón de arriba.
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {filas.map((fila) => (
            <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-unmsm-navy truncate">
                  {fila.nombre_corto ? `${fila.nombre_corto} — ` : ""}
                  {fila.nombre}
                </p>
                <p className="text-unmsm-muted text-xs">{fila.estado}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  to={`/admin/grupos-investigacion/${fila.id}/integrantes`}
                  className="flex items-center gap-1 text-unmsm-navy hover:text-unmsm-blue text-sm font-semibold"
                >
                  <MdGroups /> Gestionar integrantes
                </Link>
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
    </AdminLayout>
  );
};

export default AdminGruposInvestigacionPage;
