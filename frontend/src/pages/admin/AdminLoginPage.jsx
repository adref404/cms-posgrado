import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { MdLock, MdEmail } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const AdminLoginPage = () => {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!loading && user) {
    const destino = location.state?.from || "/admin";
    return <Navigate to={destino} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    const { error: signInError } = await signIn(email, password);
    setEnviando(false);
    if (signInError) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-unmsm-navy flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-unmsm-blue/10 flex items-center justify-center mx-auto mb-3">
            <MdLock className="text-unmsm-blue text-2xl" />
          </div>
          <h1 className="font-bold text-unmsm-navy text-lg">Panel de Administración</h1>
          <p className="text-unmsm-muted text-sm">Posgrado Facultad de Educación</p>
        </div>

        <label className="block text-sm font-semibold text-unmsm-navy mb-1">Correo</label>
        <div className="relative mb-4">
          <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            placeholder="admin@unmsm.edu.pe"
          />
        </div>

        <label className="block text-sm font-semibold text-unmsm-navy mb-1">Contraseña</label>
        <div className="relative mb-2">
          <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-unmsm-bg border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unmsm-navy"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-unmsm-guinda text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-unmsm-blue hover:bg-unmsm-navy text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-60 mt-2"
        >
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
