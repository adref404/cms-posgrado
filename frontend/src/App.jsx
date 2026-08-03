import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomeStudent from './pages/student/HomeStudent';
import ToasterProvider from './components/ui/ToasterProvider';

import QuienesSomosPage from './pages/student/nosotros/QuienesSomosPage';
import DirectorioFFEEPage from './pages/student/nosotros/DirectorioFFEEPage';
import DirectorioPosgradoPage from './pages/student/nosotros/DirectorioPosgradoPage';
import DocumentosRecursosPage from './pages/student/nosotros/DocumentosRecursosPage';

import CronogramaAcademicoPage from './pages/student/matricula/CronogramaAcademicoPage';
import CronogramaPagosPage from './pages/student/matricula/CronogramaPagosPage';
import ProcesoMatriculaPage from './pages/student/matricula/ProcesoMatriculaPage';
import HorarioCursosPage from './pages/student/matricula/HorarioCursosPage';

function App() {
  return (
    <BrowserRouter>
      <ToasterProvider />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<HomeStudent />} />

          {/* 👥 Nosotros */}
          <Route path="/nosotros/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/nosotros/directorio-flch" element={<DirectorioFFEEPage />} />
          <Route path="/nosotros/directorio-posgrado" element={<DirectorioPosgradoPage />} />
          <Route path="/nosotros/documentos-recursos" element={<DocumentosRecursosPage />} />

          {/* 📚 Matrícula: cada opción tiene su propia vista */}
          <Route path="/matricula" element={<Navigate to="/matricula/cronograma-academico" replace />} />
          <Route path="/matricula/cronograma-academico" element={<CronogramaAcademicoPage />} />
          <Route path="/matricula/cronograma-pagos" element={<CronogramaPagosPage />} />
          <Route path="/matricula/proceso-matricula" element={<ProcesoMatriculaPage />} />
          <Route path="/matricula/horario-cursos" element={<HorarioCursosPage />} />

          {/* Otras secciones futuras... */}
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
