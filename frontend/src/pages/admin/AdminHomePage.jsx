import {
  MdArticle,
  MdEvent,
  MdCampaign,
  MdSchedule,
  MdGavel,
  MdGroups,
  MdScience,
} from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import StatTile from "../../components/admin/StatTile";
import BarraMagnitud from "../../components/admin/BarraMagnitud";
import BarraComposicion from "../../components/admin/BarraComposicion";
import { useAdminDashboardStats } from "../../hooks/useAdminDashboardStats";

// Azul y naranja son los dos tonos "secuenciales" por defecto de la paleta
// del sitio — uno para cada gráfico de magnitud, para que se distingan
// entre sí sin que el color intente decir nada más que "cantidad".
const AZUL_SECUENCIAL = "#2a78d6";
const NARANJA_SECUENCIAL = "#eb6834";

const AdminHomePage = () => {
  const { stats, loading } = useAdminDashboardStats();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-unmsm-navy">Panel de control</h1>
          <p className="text-unmsm-muted text-sm mt-0.5">
            Estado actual del contenido publicado en el sitio, en vivo desde la base de datos.
          </p>
        </div>
      </div>

      {loading || !stats ? (
        <p className="text-unmsm-muted text-sm">Cargando estadísticas...</p>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatTile icon={MdArticle} label="Noticias publicadas" value={stats.noticias} />
            <StatTile icon={MdEvent} label="Eventos próximos" value={stats.eventosProximos} />
            <StatTile
              icon={MdCampaign}
              label="Comunicados urgentes activos"
              value={stats.comunicadosUrgentes}
              tono={stats.comunicadosUrgentes > 0 ? "warning" : "good"}
            />
            <StatTile icon={MdSchedule} label="Hitos de Cronograma" value={stats.cronogramaHitos} />
            <StatTile icon={MdGavel} label="Documentos de Transparencia" value={stats.transparenciaDocs} />
            <StatTile icon={MdGroups} label="Docentes registrados" value={stats.docentes} />
            <StatTile icon={MdScience} label="Grupos de Investigación" value={stats.grupos} />
            <StatTile icon={MdGroups} label="Integrantes de grupos" value={stats.integrantes} />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
            <BarraMagnitud
              titulo="Docentes por categoría"
              datos={stats.docentesPorCategoria}
              hue={AZUL_SECUENCIAL}
              vacio="Todavía no hay docentes con categoría registrada."
            />
            <BarraMagnitud
              titulo="Documentos de Transparencia por categoría"
              datos={stats.transparenciaPorCategoria}
              hue={NARANJA_SECUENCIAL}
              vacio="Todavía no hay documentos publicados."
            />
          </div>

          <BarraComposicion
            titulo="Composición de los Grupos de Investigación"
            datos={stats.integrantesPorVinculo}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminHomePage;
