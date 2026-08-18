import { useEffect, useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import { OPCIONES_ICONO, ICONOS_CRONOGRAMA, ICONO_POR_DEFECTO } from "../../data/iconosCronograma";

const TABLA = "cronograma_actividades";

const TABS = [
  { tipo: "admision", label: "Cronograma de Admisión" },
  { tipo: "academico", label: "Cronograma Académico" },
];

const valorVacio = (tipo, siguienteOrden) => ({
  tipo,
  evento: "",
  fecha: "",
  fecha_inicio: "",
  fecha_fin: "",
  icono: "MdSchedule",
  orden: siguienteOrden,
  destacado_home: true,
});

// Gestión del cronograma que se muestra en el Home y en
// /matricula/cronograma-academico (ver hooks/useCronograma.js). Una sola
// tabla en Supabase con dos "tipo" (admisión / académico) — acá se editan
// ambos, cada uno en su pestaña.
const AdminCronogramaPage = () => {
  const [tipoActivo, setTipoActivo] = useState("admision");
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null | "nuevo" | fila
  const [valores, setValores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const cargar = async () => {
    setCargando(true);
    const { data } = await supabase
      .from(TABLA)
      .select("*")
      .eq("tipo", tipoActivo)
      .order("orden", { ascending: true });
    setFilas(data || []);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
    setEditando(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoActivo]);

  const abrirNuevo = () => {
    const siguienteOrden = filas.length > 0 ? Math.max(...filas.map((f) => f.orden)) + 1 : 1;
    setValores(valorVacio(tipoActivo, siguienteOrden));
    setErrorForm("");
    setEditando("nuevo");
  };

  const abrirEditar = (fila) => {
    setValores({ ...fila });
    setErrorForm("");
    setEditando(fila);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm("");

    const payload = {
      tipo: valores.tipo,
      evento: valores.evento,
      fecha: valores.fecha,
      fecha_inicio: valores.fecha_inicio,
      fecha_fin: valores.fecha_fin,
      icono: valores.icono,
      orden: Number(valores.orden) || 0,
      destacado_home: Boolean(valores.destacado_home),
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
    if (!window.confirm(`¿Eliminar "${fila.evento}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from(TABLA).delete().eq("id", fila.id);
    cargar();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-unmsm-navy">Cronograma de Actividades</h1>
        {!editando && (
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-1.5 bg-unmsm-green text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-unmsm-green-600 transition-colors"
          >
            <MdAdd /> Nuevo hito
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.tipo}
            onClick={() => setTipoActivo(tab.tipo)}
            disabled={Boolean(editando)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              tipoActivo === tab.tipo
                ? "border-unmsm-green text-unmsm-navy"
                : "border-transparent text-unmsm-muted hover:text-unmsm-navy"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {editando ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-unmsm-navy">
              {editando === "nuevo" ? "Nuevo hito" : `Editando: ${editando.evento}`}
            </h2>
            <button type="button" onClick={() => setEditando(null)} className="text-unmsm-muted hover:text-unmsm-navy">
              <MdClose className="text-xl" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Evento</label>
            <input
              type="text"
              required
              value={valores.evento || ""}
              onChange={(e) => setValores((v) => ({ ...v, evento: e.target.value }))}
              placeholder="Ej: Matrícula de ingresantes"
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">
              Fecha (texto que se muestra)
            </label>
            <input
              type="text"
              required
              value={valores.fecha || ""}
              onChange={(e) => setValores((v) => ({ ...v, fecha: e.target.value }))}
              placeholder="Ej: Del 31 de agosto al 01 de setiembre"
              className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            />
            <p className="text-unmsm-muted text-xs mt-1">
              Esto es lo que lee el visitante. Las dos fechas de abajo solo se usan para calcular el estado
              (Completado / En Curso / Próximo / Programado) y el avance de la línea — no se muestran tal cual.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Fecha de inicio</label>
              <input
                type="date"
                required
                value={valores.fecha_inicio || ""}
                onChange={(e) => setValores((v) => ({ ...v, fecha_inicio: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Fecha límite / fin</label>
              <input
                type="date"
                required
                value={valores.fecha_fin || ""}
                onChange={(e) => setValores((v) => ({ ...v, fecha_fin: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-unmsm-navy mb-1">Ícono</label>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {OPCIONES_ICONO.map(({ nombre, Icono }) => (
                <button
                  key={nombre}
                  type="button"
                  title={nombre}
                  onClick={() => setValores((v) => ({ ...v, icono: nombre }))}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
                    valores.icono === nombre
                      ? "bg-unmsm-navy text-white border-unmsm-navy"
                      : "bg-unmsm-bg text-unmsm-navy border-gray-200 hover:border-unmsm-navy"
                  }`}
                >
                  <Icono className="text-lg" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-unmsm-navy mb-1">Orden</label>
              <input
                type="number"
                required
                value={valores.orden ?? ""}
                onChange={(e) => setValores((v) => ({ ...v, orden: e.target.value }))}
                className="w-full px-3 py-2 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
              />
              <p className="text-unmsm-muted text-xs mt-1">Define el orden de izquierda a derecha en la línea.</p>
            </div>
            {tipoActivo === "academico" && (
              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-2 text-sm font-medium text-unmsm-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(valores.destacado_home)}
                    onChange={(e) => setValores((v) => ({ ...v, destacado_home: e.target.checked }))}
                    className="w-4 h-4 accent-unmsm-guinda"
                  />
                  Mostrar en el resumen del Home
                </label>
                <p className="text-unmsm-muted text-xs mt-1">
                  El Home solo muestra un resumen del cronograma académico; esta casilla decide si este hito
                  entra en ese resumen. La página completa siempre lo muestra igual.
                </p>
              </div>
            )}
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
          Todavía no hay hitos en este cronograma. Crea el primero con el botón de arriba.
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {filas.map((fila) => {
            const Icono = ICONOS_CRONOGRAMA[fila.icono] || ICONO_POR_DEFECTO;
            return (
              <div key={fila.id} className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-unmsm-bg flex items-center justify-center text-unmsm-navy">
                    <Icono className="text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-unmsm-navy truncate">
                      {fila.orden}. {fila.evento}
                    </p>
                    <p className="text-unmsm-muted text-xs">
                      {fila.fecha}
                      {tipoActivo === "academico" && !fila.destacado_home && " · no sale en el resumen del Home"}
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
                    <MdDelete /> Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCronogramaPage;
