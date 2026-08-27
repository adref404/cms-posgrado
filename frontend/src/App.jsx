import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomeStudent from './pages/student/HomeStudent';
import BusquedaPage from './pages/student/BusquedaPage';
import ToasterProvider from './components/ui/ToasterProvider';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTopButton from './components/common/BackToTopButton';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// El panel admin (y sobre todo el editor de texto enriquecido que usa
// AdminNovedadesPage) solo lo carga quien entra a /admin/*. Con lazy() ese
// código deja de viajar en el bundle público que descarga cualquier
// visitante del sitio.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));
const AdminNovedadesPage = lazy(() => import('./pages/admin/AdminNovedadesPage'));
const AdminCronogramaPage = lazy(() => import('./pages/admin/AdminCronogramaPage'));

import QuienesSomosPage from './pages/student/nosotros/QuienesSomosPage';
import DirectorioFEPage from './pages/student/nosotros/DirectorioFEPage';
import DirectorioPosgradoPage from './pages/student/nosotros/DirectorioPosgradoPage';
import DocumentosRecursosPage from './pages/student/nosotros/DocumentosRecursosPage';

import CronogramaAcademicoPage from './pages/student/matricula/CronogramaAcademicoPage';
import CronogramaPagosPage from './pages/student/matricula/CronogramaPagosPage';
import ProcesoMatriculaPage from './pages/student/matricula/ProcesoMatriculaPage';
import HorarioCursosPage from './pages/student/matricula/HorarioCursosPage';

import PlanaDocentePage from './pages/student/informacionAcademica/PlanaDocentePage';
import PlanEstudiosPage from './pages/student/informacionAcademica/PlanEstudiosPage';
import FAQInformacionAcademicaPage from './pages/student/informacionAcademica/PreguntasFrecuentesPage';

import NoticiasPage from './pages/student/noticias/NoticiasPage';
import NoticiaDetallePage from './pages/student/noticias/NoticiaDetallePage';
import EventosPage from './pages/student/noticias/EventosPage';
import EventoDetallePage from './pages/student/noticias/EventoDetallePage';
import ComunicadosPage from './pages/student/comunicados/ComunicadosPage';
import ComunicadoDetallePage from './pages/student/comunicados/ComunicadoDetallePage';

import TramitesLandingPage from './pages/student/tramites/TramitesLandingPage';
import TramiteMaestria2AniosPage from './pages/student/tramites/TramiteMaestria2AniosPage';
import TramiteDoctorPage from './pages/student/tramites/TramiteDoctorPage';
import TramiteMaestria1AnioPage from './pages/student/tramites/TramiteMaestria1AnioPage';

import ProgramasPage from './pages/student/programas/ProgramasPage';
import ProgramaDetallePage from './pages/student/programas/ProgramaDetallePage';

import EnDesarrolloPage from './components/common/EnDesarrolloPage';
import { NOSOTROS_HERO_IMAGE } from './utils/constants';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <ScrollToTop />
      <BackToTopButton />
      <ToasterProvider />

      <Routes>
        {/* 🔐 Panel de Administración (sin Header/Footer públicos) */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={null}>
              <AdminLoginPage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <AdminHomePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cronograma"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <AdminCronogramaPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:tipo"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <AdminNovedadesPage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route element={<Layout />}>
          <Route path="/home" element={<HomeStudent />} />
          <Route path="/buscar" element={<BusquedaPage />} />

          {/* 👥 Nosotros */}
          <Route path="/nosotros/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/nosotros/directorio-flch" element={<DirectorioFEPage />} />
          <Route path="/nosotros/directorio-posgrado" element={<DirectorioPosgradoPage />} />
          <Route path="/nosotros/documentos-recursos" element={<DocumentosRecursosPage />} />

          {/* 🎓 Programas */}
          <Route
            path="/programas/maestria"
            element={<ProgramasPage tipo="Maestría" subtitle="Programas de maestría de la Facultad de Educación" />}
          />
          <Route
            path="/programas/doctorado"
            element={<ProgramasPage tipo="Doctorado" subtitle="Programa de doctorado de la Facultad de Educación" />}
          />
          <Route
            path="/programas/diplomado"
            element={<ProgramasPage tipo="Diplomado" subtitle="Programas de diplomado de la Facultad de Educación" />}
          />
          <Route path="/programas/detalle/:id" element={<ProgramaDetallePage />} />

          {/* 📚 Matrícula: cada opción tiene su propia vista */}
          <Route path="/matricula" element={<Navigate to="/matricula/cronograma-academico" replace />} />
          <Route path="/matricula/cronograma-academico" element={<CronogramaAcademicoPage />} />
          <Route path="/matricula/cronograma-pagos" element={<CronogramaPagosPage />} />
          <Route path="/matricula/proceso-matricula" element={<ProcesoMatriculaPage />} />
          <Route path="/matricula/horario-cursos" element={<HorarioCursosPage />} />

          {/* 🎓 Información Académica */}
          <Route path="/informacion-academica/docentes" element={<PlanaDocentePage />} />
          <Route path="/informacion-academica/plan-estudios" element={<PlanEstudiosPage />} />
          <Route path="/informacion-academica/preguntas-frecuentes" element={<FAQInformacionAcademicaPage />} />

          {/* 📰 Noticias */}
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/noticias/:id" element={<NoticiaDetallePage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/eventos/:id" element={<EventoDetallePage />} />

          {/* 📢 Comunicados */}
          <Route path="/comunicados" element={<ComunicadosPage />} />
          <Route path="/comunicados/:id" element={<ComunicadoDetallePage />} />

          {/* 📋 Trámites (absorbe lo que antes era la sección Graduación) */}
          <Route path="/tramites" element={<TramitesLandingPage />} />
          <Route path="/tramites/maestria-1-anio" element={<TramiteMaestria1AnioPage />} />
          <Route path="/tramites/maestria-2-anios" element={<TramiteMaestria2AniosPage />} />
          <Route path="/tramites/doctorado" element={<TramiteDoctorPage />} />

          {/* Otras secciones futuras... */}
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
