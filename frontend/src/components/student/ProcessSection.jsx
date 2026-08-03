import React from "react";
import { enrollmentProcess } from "../../data/mockData";
import { useNavigate } from "react-router-dom";   

const ProcessSection = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmision = () => {
    navigate('/admision');
    // Scroll al inicio de la página
    window.scrollTo(0, 0);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "active":
        return "bg-[#A41E22]";
      case "pending":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case "completed":
        return "border-green-500";
      case "active":
        return "border-[#A41E22]";
      case "pending":
        return "border-gray-400";
      default:
        return "border-gray-400";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br bg-gray-800 from-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            Cronograma de Admisión 2025
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Timeline del proceso de admisión con fechas importantes
          </p>
        </div>

        <div className="relative">
          {/* Timeline vertical para móviles */}
          <div className="lg:hidden">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

            {enrollmentProcess.map((step) => (
              <div key={step.id} className="relative mb-12 last:mb-0">
                <div className="flex items-start">
                  {/* Punto del timeline */}
                  <div
                    className={`relative z-10 w-16 h-16 ${getStatusColor(
                      step.status
                    )} rounded-full flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0`}
                  >
                    {step.icon}
                  </div>

                  {/* Contenido */}
                  <div className="ml-6 flex-1">
                    <div
                      className={`bg-white rounded-xl p-6 border-2 ${getStatusBorderColor(
                        step.status
                      )} shadow-sm h-32 flex flex-col justify-center`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#A41E22] font-medium text-sm mb-1">
                        {step.date}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Duración: {step.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline horizontal para desktop */}
          <div className="hidden lg:block">
            {/* Línea conectora */}
            <div className="absolute top-28 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

            <div className="grid grid-cols-4 gap-8 relative z-10">
              {enrollmentProcess.map((step) => (
                <div key={step.id} className="relative">
                  {/* Card con altura fija */}
                  <div
                    className={`bg-white rounded-xl p-6 border-2 ${getStatusBorderColor(
                      step.status
                    )} shadow-sm h-56 flex flex-col justify-start transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="text-center ">
                      <div
                        className={`w-16 h-16 ${getStatusColor(
                          step.status
                        )} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#A41E22] font-medium text-sm mb-1">
                        {step.date}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Duración: {step.duration}
                      </p>
                    </div>
                  </div>

                  {/* Punto en la línea del timeline */}
                  <div
                    className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 ${getStatusColor(
                      step.status
                    )} rounded-full border-4 border-white shadow-lg z-20`}
                  ></div>

                  {/* Número del paso */}
                  {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda de estados */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-16 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">Completado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#A41E22] rounded-full"></div>
            <span className="text-sm text-[#A41E22]">En proceso</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-400">Pendiente</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleNavigateToAdmision}
            className="bg-gradient-to-r from-[#A41E22] to-[#8A1A1D] hover:from-[#8A1A1D] hover:to-[#A41E22] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Iniciar Proceso de Admisión
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
