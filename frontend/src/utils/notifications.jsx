import toast from 'react-hot-toast';

// 🎨 Componentes personalizados para cada tipo de notificación
const CustomToast = ({ type, title, message, icon }) => (
  <div className="flex items-start gap-3">
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
      type === 'success' ? 'bg-white/20' :
      type === 'error' ? 'bg-white/20' :
      'bg-white/20'
    }`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-sm leading-tight">{title}</p>
      {message && (
        <p className="text-xs mt-1 opacity-90 leading-relaxed">{message}</p>
      )}
    </div>
  </div>
);

// 🔔 Funciones específicas para cada caso
export const notifications = {
  // ✅ Login exitoso
  loginSuccess: () => {
    toast.custom(
      (t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} transform transition-all duration-500 ease-out`}>
          {/* <CustomToast
            type="success"
            icon="🎉"
            title="¡Bienvenido al Portal!"
            message={`Has iniciado sesión exitosamente como ${userType}.`}
          /> */}
        </div>
      ),
      {
        duration: 3500,
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
        }
      }
    );
  },

  // ❌ Credenciales incorrectas
  invalidCredentials: () => {
    toast.custom(
      (t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} transform transition-all duration-500 ease-out`}>
          <CustomToast
            type="error"
            icon="🔐"
            title="Código de acceso incorrecto"
            message="Por favor verifica tu código e intenta nuevamente."
          />
        </div>
      ),
      {
        duration: 2000,
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
        }
      }
    );
  },

  // 🔧 Servidor en mantenimiento
  serverMaintenance: () => {
    toast.custom(
      (t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} transform transition-all duration-500 ease-out`}>
          <CustomToast
            type="warning"
            icon="🛠️"
            title="Sistema en Mantenimiento"
            message="El portal está temporalmente fuera de servicio. Por favor intenta más tarde."
          />
        </div>
      ),
      {
        duration: 6000,
        style: {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
        }
      }
    );
  },

  // 🌐 Error de conexión
  networkError: () => {
    toast.custom(
      (t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} transform transition-all duration-500 ease-out`}>
          <CustomToast
            type="error"
            icon="📡"
            title="Error de Conexión"
            message="No se pudo conectar al servidor. Verifica tu conexión a internet."
          />
        </div>
      ),
      {
        duration: 5000,
        style: {
          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          color: 'white',
        }
      }
    );
  },

  // ⏳ Loading
  loading: (message = 'Verificando...') => {
    return toast.loading(message, {
      style: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
      }
    });
  },

  
};