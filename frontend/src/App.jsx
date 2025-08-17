import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute'; // ← NUEVO
import Layout from './components/layout/Layout';
import StudentLoginPage from './pages/auth/Login/StudentLoginPage';
import HomeStudent from './pages/student/HomeStudent';
import AdmisionPage from './pages/student/AdmisionPage';
import TramitesPage from './pages/student/TramitesPage';
import DocentesPage from './pages/student/DocentesPage';
import ToasterProvider from './components/ui/ToasterProvider';
import InformacionFinancieraPage from './pages/student/InformacionFinancieraPage'; 
import ContactoPage from './pages/student/ContactoPage';


import MatriculaView from './pages/student/MatriculaView';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
         <ToasterProvider />
        
        <Routes>
          /* 🔓 Rutas públicas (protegidas contra usuarios autenticados) */
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<StudentLoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<HomeStudent />} />
              <Route path="/admision" element={<AdmisionPage />} />
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
              <Route path="/contacto" element={<ContactoPage />} />

              <Route path="/matricula" element={<MatriculaView />}/> 

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