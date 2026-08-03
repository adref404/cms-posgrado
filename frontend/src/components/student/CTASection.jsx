import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#A41E22] to-[#8A1A1D] relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
          ¿Listo para Transformar tu Futuro?
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Únete a nuestra comunidad académica y desarrolla las competencias necesarias 
          para liderar el cambio en el sector educativo peruano.
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button className="inline-block bg-white text-[#A41E22] px-10 py-4 rounded-full font-semibold hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Solicitar Información
          </button>
          <button className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-[#A41E22] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Ver Programas Disponibles
          </button>
        </div>
        
        {/* Información de contacto rápido */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-sm">Llámanos</div>
                <div className="font-semibold">(01) 619-7000</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-sm">Escríbenos</div>
                <div className="font-semibold break-all">posgrado@unmsm.edu.pe</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-sm">Visítanos</div>
                <div className="font-semibold">Ciudad Universitaria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;