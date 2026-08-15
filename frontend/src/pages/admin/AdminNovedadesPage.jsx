import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete, MdClose, MdImage, MdCheck } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase, BUCKET_NOVEDADES } from "../../lib/supabaseClient";
import { ADMIN_NOVEDADES_CONFIG } from "../../data/adminNovedadesConfig";
import { slugify } from "../../utils/slugify";
import { formatFechaCorta } from "../../utils/dateFormat";

// Valores por defecto de un registro nuevo, según el tipo de campo.
const valorVacio = (campo) => {
  if (campo.tipo === "check") return false;
  if (campo.tipo === "fecha") return new Date().toISOString().slice(0, 10);
  return "";
};

// De fila de la base de datos -> valores editables del formulario
// (cuerpo: array -> texto con saltos de línea).
const filaAValores = (fila, campos) => {
  const valores = {};
  campos.forEach((campo) => {
    const crudo = fila[campo.nombre];
    if (campo.tipo === "parrafos") {
      valores[campo.nombre] = Array.isArray(crudo) ? crudo.join("\n") : "";
    } else if (campo.tipo === "check") {
      valores[campo.nombre] = Boolean(crudo);
    } else {
      valores[campo.nombre] = crudo ?? "";
    }
  });
  return valores;
};

// De valores del formulario -> payload para Supabase (texto con saltos de
// línea -> array de párrafos, strings vacíos -> null para columnas opcionales).
const valoresAPayload = (valores, campos) => {
  const payload = {};
  campos.forEach((campo) => {
    const valor = valores[campo.nombre];
    if (campo.tipo === "parrafos") {
      const parrafos = (valor || "")
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);
      payload[campo.nombre] = parrafos.length > 0 ? parrafos : null;
    } else if (campo.tipo === "check") {
      payload[campo.nombre] = Boolean(valor);
    } else {
      payload[campo.nombre] = valor === "" ? null : valor;
    }
  });
  return payload;
};

const AdminNovedadesPage = () => {
  const { tipo } = useParams();
  const config = ADMIN_NOVEDADES_CONFIG[tipo];

  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null | "nuevo" | fila
  const [valores, setValores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const cargar = async () => {
    setCargando(true);
    const { data } = await supabase.from(config.tabla).select("*").order("fecha", { ascending: false });
    setFilas(data || []);
    setCargando(false);
  };

  useEffect(() => {
    if (config) cargar();
    setEditando(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  if (!config) {
    return (
      <AdminLayout>
        <p className="text-unmsm-guinda">Sección desconocida: "{tipo}".</p>
      </AdminLayout>
    );
  }

  const abrirNuevo = () => {
    const vacio = {};
    config.campos.forEach((campo) => (vacio[campo.nombre] = valorVacio(campo)));
    setValores(vacio);
    setErrorForm("");
    setEditando("nuevo");
  };

  const abrirEditar = (fila) => {
    setValores(filaAValores(fila, config.campos));
    setErrorForm("");
    setEditando(fila);
  };

  const handleImagenChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendoImagen(true);
    const ruta = `${config.tabla}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from(BUCKET_NOVEDADES).upload(ruta, file);
    if (!error) {
      const { data } = supabase.storage.from(BUCKET_NOVEDADES).getPublicUrl(ruta);
      setValores((v) => ({ ...v, imagen: data.publicUrl }));
    }
    setSubiendoImagen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm("");

    const payload = valoresAPayload(valores, config.campos);

    let error;
    if (editando === "nuevo") {
      const slug = slugify(valores.titulo || "");
      ({ error } = await supabase.from(config.tabla).insert({ ...payload, slug }));
    } else {
      ({ error } = await supabase.from(config.tabla).update(payload).eq("id", editando.id));
    }

    setGuardando(false);
    if (error) {
      setErrorForm(
        error.code === "23505"
          ? "Ya existe un registro con un título muy similar. Cambia el título e intenta de nuevo."
          : "No se pudo guardar. Intenta de nuevo."
      );
      return;
    }
    setEditando(null);
    cargar();
  };

  const handleDelete = async (fila) => {
    if (!window.confirm(`¿Eliminar "${fila.titulo}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from(config.tabla).delete().eq("id", fila.id);
    cargar();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-unmsm-navy">{config.titulo}</h1>
        {!editando && (
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-1.5 bg-unmsm-green text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-unmsm-green-600 transition-colors"
          >
            <MdAdd /> Nuevo {config.etiqueta}
          </button>
        )}
      </div>

      {editando ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-unmsm-navy">
              {editando === "nuevo" ? `Nuevo ${config.etiqueta}` : `Editando: ${editando.titulo}`}
            </h2>
            <button type="button" onClick={() => setEditando(null)} className="text-unmsm-muted hover:text-unmsm-navy">
              <MdClose className="text-xl" />
            </button>
          </div>

          {config.campos.map((campo) => (
            <div key={campo.nombre}>
              {campo.tipo === "check" ? (
                <label className="flex items-center gap-2 text-sm font-medium text-unmsm-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(valores[campo.nombre])}
                    onChange={(e) => setValores((v) => ({ ...v, [campo.nombre]: e.target.checked }))}
                    className="w-4 h-4 accent-unmsm-guinda"
                  />
                  {campo.etiqueta}
                </label>
              ) : campo.tipo === "imagen" ? (
                <div>
                  <label className="block text-sm font-semibold text-unmsm-navy mb-1">{campo.etiqueta}</label>
                  {valores.imagen && (
                    <img src={valores.imagen} alt="" className="h-24 rounded-lg border border-gray-200 mb-2 object-cover" />
                  )}
                  <label className="flex items-center gap-2 w-fit text-sm bg-unmsm-bg border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    <MdImage /> {subiendoImagen ? "Subiendo..." : "Elegir imagen"}
                    <input type="file" accept="image/*" onChange={handleImagenChange} disabled={subiendoImagen} className="hidden" />
                  </label>
                </div>
              ) : campo.tipo === "textarea" || campo.tipo === "parrafos" ? (
                <div>
                  <label className="block text-sm font-semibold text-unmsm-navy mb-1">{campo.etiqueta}</label>
                  <textarea
                    required={campo.requerido}
                    rows={campo.filas || 4}
                    value={valores[campo.nombre] || ""}
                    onChange={(e) => setValores((v) => ({ ...v, [campo.nombre]: e.target.value }))}
                    className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-unmsm-navy mb-1">{campo.etiqueta}</label>
                  <input
                    type={campo.tipo === "fecha" ? "date" : "text"}
                    required={campo.requerido}
                    value={valores[campo.nombre] || ""}
                    onChange={(e) => setValores((v) => ({ ...v, [campo.nombre]: e.target.value }))}
                    className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
                  />
                </div>
              )}
            </div>
          ))}

          {errorForm && <p className="text-unmsm-guinda text-sm">{errorForm}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando || subiendoImagen}
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
          Todavía no hay {config.etiqueta}s publicados. Crea el primero con el botón de arriba.
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {filas.map((fila) => (
            <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-unmsm-navy truncate">{fila.titulo}</p>
                <p className="text-unmsm-muted text-xs">{formatFechaCorta(fila.fecha)}</p>
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
    </AdminLayout>
  );
};

export default AdminNovedadesPage;
