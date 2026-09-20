import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete, MdClose, MdImage, MdCheck, MdSearch } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import RichTextEditor from "../../components/admin/RichTextEditor";
import ItemsPerPageSelect from "../../components/common/ItemsPerPageSelect";
import Pagination from "../../components/common/Pagination";
import { supabase, BUCKET_NOVEDADES } from "../../lib/supabaseClient";
import { ADMIN_NOVEDADES_CONFIG } from "../../data/adminNovedadesConfig";
import { slugify } from "../../utils/slugify";
import { formatFechaCorta } from "../../utils/dateFormat";

// Un párrafo suelto (string) -> "<p>...</p>", para convertir registros
// antiguos (cuerpo guardado como array de párrafos, antes del editor
// enriquecido) al mismo HTML que ahora produce RichTextEditor.
const escaparHtml = (texto) =>
  texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Valores por defecto de un registro nuevo, según el tipo de campo.
const valorVacio = (campo) => {
  if (campo.tipo === "check") return false;
  if (campo.tipo === "fecha") return new Date().toISOString().slice(0, 10);
  return "";
};

// De fila de la base de datos -> valores editables del formulario
// ("richtext" acepta tanto el HTML nuevo como, por compatibilidad, un
// array de párrafos de antes de tener el editor enriquecido).
const filaAValores = (fila, campos) => {
  const valores = {};
  campos.forEach((campo) => {
    const crudo = fila[campo.nombre];
    if (campo.tipo === "richtext") {
      if (Array.isArray(crudo)) {
        valores[campo.nombre] = crudo.map((p) => `<p>${escaparHtml(p)}</p>`).join("");
      } else {
        valores[campo.nombre] = crudo ?? "";
      }
    } else if (campo.tipo === "check") {
      valores[campo.nombre] = Boolean(crudo);
    } else {
      valores[campo.nombre] = crudo ?? "";
    }
  });
  return valores;
};

// De valores del formulario -> payload para Supabase (HTML vacío -> null
// para columnas opcionales).
const valoresAPayload = (valores, campos) => {
  const payload = {};
  campos.forEach((campo) => {
    const valor = valores[campo.nombre];
    if (campo.tipo === "richtext") {
      const esVacio = !valor || valor === "<p></p>";
      payload[campo.nombre] = esVacio ? null : valor;
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
  const [busqueda, setBusqueda] = useState("");
  const [porPagina, setPorPagina] = useState(10);
  const [pagina, setPagina] = useState(1);

  const cargar = async () => {
    setCargando(true);
    const { data } = await supabase.from(config.tabla).select("*").order("fecha", { ascending: false });
    setFilas(data || []);
    setCargando(false);
  };

  useEffect(() => {
    if (config) cargar();
    setEditando(null);
    setBusqueda("");
    setPagina(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  useEffect(() => {
    setPagina(1);
  }, [busqueda, porPagina]);

  const filasFiltradas = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return filas;
    return filas.filter((f) =>
      [f.titulo, f.resumen, f.descripcion].filter(Boolean).some((campo) => campo.toLowerCase().includes(term))
    );
  }, [filas, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(filasFiltradas.length / porPagina));
  const paginaActual = Math.min(pagina, totalPaginas);
  const filasPaginadas = filasFiltradas.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

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
                    <div className="relative w-fit mb-2">
                      <img src={valores.imagen} alt="" className="h-24 rounded-lg border border-gray-200 object-cover" />
                      <button
                        type="button"
                        onClick={() => setValores((v) => ({ ...v, imagen: "" }))}
                        title="Quitar imagen"
                        aria-label="Quitar imagen"
                        className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-unmsm-guinda text-white rounded-full shadow hover:bg-unmsm-guinda-700 transition-colors"
                      >
                        <MdClose className="text-sm" />
                      </button>
                    </div>
                  )}
                  <label className="flex items-center gap-2 w-fit text-sm bg-unmsm-bg border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    <MdImage /> {subiendoImagen ? "Subiendo..." : valores.imagen ? "Cambiar imagen" : "Elegir imagen"}
                    <input type="file" accept="image/*" onChange={handleImagenChange} disabled={subiendoImagen} className="hidden" />
                  </label>
                </div>
              ) : campo.tipo === "textarea" ? (
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
              ) : campo.tipo === "richtext" ? (
                <div>
                  <label className="block text-sm font-semibold text-unmsm-navy mb-1">{campo.etiqueta}</label>
                  <RichTextEditor
                    value={valores[campo.nombre] || ""}
                    onChange={(html) => setValores((v) => ({ ...v, [campo.nombre]: html }))}
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
        <>
          <div className="relative max-w-md mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={`Buscar ${config.etiqueta}...`}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="text-unmsm-muted text-xs">
              {filasFiltradas.length} {filasFiltradas.length === 1 ? "resultado" : "resultados"}
            </p>
            <ItemsPerPageSelect value={porPagina} onChange={setPorPagina} />
          </div>

          {filasFiltradas.length === 0 ? (
            <p className="text-unmsm-muted text-sm">No se encontraron resultados para "{busqueda}".</p>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
              {filasPaginadas.map((fila) => (
                <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-unmsm-navy truncate">{fila.titulo}</p>
                    <p className="text-unmsm-muted text-xs">{formatFechaCorta(fila.fecha)}</p>
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
          )}

          <div className="mt-6">
            <Pagination currentPage={paginaActual} totalPages={totalPaginas} onPageChange={setPagina} />
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminNovedadesPage;
