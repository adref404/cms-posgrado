import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import Layout from './components/layout/Layout';
import StudentLoginPage from './pages/auth/Login/StudentLoginPage';
import HomeStudent from './pages/student/HomeStudent';
import ToasterProvider from './components/ui/ToasterProvider';

// Vista principal que maneja todas las secciones internamente
import MatriculaView from './pages/student/MatriculaView';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToasterProvider />
        
        <Routes>
          {/* 🔓 Rutas públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<StudentLoginPage />} />
          </Route>

          {/* 🔒 Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<HomeStudent />} />
              
              {/* 📚 TODAS las rutas de matrícula apuntan a MatriculaView */}
              <Route path="/matricula" element={<MatriculaView />} />
              {/* <Route path="/matricula/*" element={<MatriculaView />} /> */}
              
              {/* O rutas específicas si necesitas diferente comportamiento */}
              <Route path="/matricula/cronograma-academico" element={<MatriculaView />} />
              <Route path="/matricula/cronograma-pagos" element={<MatriculaView />} />
              <Route path="/matricula/proceso-matricula" element={<MatriculaView />} />
              <Route path="/matricula/horario-cursos" element={<MatriculaView />} />

              {/* Otras secciones futuras... */}
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
              {/* <Route path="/admision" element={<AdmisionPage />} />
              <Route path="/informacion-financiera" element={<InformacionFinancieraPage />} />
              <Route path="/tarifarios/oficiales" element={<InformacionFinancieraPage />} />
              <Route path="/tarifarios/pagos" element={<InformacionFinancieraPage />} />
              <Route path="/tarifarios/becas" element={<InformacionFinancieraPage />} />
              <Route path="/tarifarios/calendario" element={<InformacionFinancieraPage />} />
              <Route path="/tramites" element={<TramitesPage />} />
              <Route path="/tramites/matricula" element={<TramitesPage />} />
              <Route path="/tramites/certificados" element={<TramitesPage />} />
              <Route path="/tramites/modificacion" element={<TramitesPage />} />
              <Route path="/tramites/grado" element={<TramitesPage />} />
              <Route path="/docentes" element={<DocentesPage />} />
              <Route path="/contacto" element={<ContactoPage />} /> */}
