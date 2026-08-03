import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomeStudent from './pages/student/HomeStudent';
import ToasterProvider from './components/ui/ToasterProvider';

// Vista principal que maneja todas las secciones internamente
import MatriculaView from './pages/student/MatriculaView';
import QuienesSomosPage from './pages/student/nosotros/QuienesSomosPage';
import DirectorioFFEEPage from './pages/student/nosotros/DirectorioFFEEPage';
import DirectorioPosgradoPage from './pages/student/nosotros/DirectorioPosgradoPage';
import DocumentosRecursosPage from './pages/student/nosotros/DocumentosRecursosPage';

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

          {/* 📚 TODAS las rutas de matrícula apuntan a MatriculaView */}
          <Route path="/matricula" element={<MatriculaView />} />
          <Route path="/matricula/cronograma-academico" element={<MatriculaView />} />
          <Route path="/matricula/cronograma-pagos" element={<MatriculaView />} />
          <Route path="/matricula/proceso-matricula" element={<MatriculaView />} />
          <Route path="/matricula/horario-cursos" element={<MatriculaView />} />

          {/* Otras secciones futuras... */}
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
