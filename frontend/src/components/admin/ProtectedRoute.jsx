import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Envuelve las rutas /admin/*: si no hay sesión, manda al login. Mientras se
// verifica la sesión (carga inicial), no muestra nada para evitar el
// parpadeo de "redirige y luego vuelve".
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
