import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Datos del carrusel con diferentes slides académicos
const heroSlides = [
  {
    id: 1,
    title: "Posgrado de",
    subtitle: "Educación",
    description:
      ["La mayor felicidad de un docente es el reconocimiento que le brindan sus estudiantes y la huella que dejas en ellos.", 
        "Miguel Inga"].join("\n"),
    backgroundImage:
      "https://elcomercio-diariocorreo-prod.web.arc-cdn.net/resizer/v2/GFHCCM5GE5CNRHIPQLK5EQ5PJE.jpg?auth=7f5cb4b5bd661025807b4deab4a9e88919d54b6b6a04fa2f6cf722818268dec2&width=1200&height=800&smart=true&quality=75",
    accent: "Educación",
    buttonText: "",
    url: "https://posgradoeducacion.unmsm.edu.pe/programas",
  },
  {
    id: 2,
    title: "Programas de",
    subtitle: "Maestría",
    description:
      "Impulsa tu carrera docente con nuestros programas de maestría profesional en nuestros distintos campos de la educación.",
    backgroundImage:
      "https://posgradoeducacion.unmsm.edu.pe/assets/facultad-educacion.jpg",
    accent: "Maestría",
    buttonText: "Conoce Más",
    // aqui se redirigijira a la vista de progrmas de maestria, que es la misma vista de programas pero con un filtro de tipo de programa
    url: "/programas/maestria",
  },
  {
    id: 3,
    title: "Programa de",
    subtitle: "Doctorado",
    description:
      "Alcanza el más alto nivel académico con nuestros programas de doctorado en educación.",
    backgroundImage:
      "https://biologia-web-unmsm.s3.us-east-2.amazonaws.com/unmsm_invita_a_profesionales_a_estudiar_maestrias_y_doctorados_en_educacion_4e4efcf186.jpg",
    accent: "Doctorado",
    buttonText: "Explora Más",
    url: "/programas/doctorado",
  },
  // {
  //   id: 4,
  //   title: "Especialización en",
  //   subtitle: "Pedagogía",
  //   description:
  //     "Desarrolla competencias pedagógicas avanzadas para liderar procesos de innovación educativa.",
  //   backgroundImage:
  //     "https://unmsm-static-files.s3.us-east-2.amazonaws.com/whatsapp-image%202024-01-10%20at%202-1704915984822.jpeg",
  //   accent: "Pedagogía",
  //   buttonText: "Descubre Más",
  //   url: "https://posgradoeducacion.unmsm.edu.pe/programas",
  // },
];

function AcademicHeroCarousel() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play del carrusel
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % heroSlides.length);
      }, 10000); // 5 segundos
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Efecto parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función mejorada para manejar cambios de slide
  const handleSlideChange = (newSlideOrFunction, resetTimer = false) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Reset del timer si se especifica
    if (resetTimer && intervalRef.current) {
      clearInterval(intervalRef.current);
      
      // Reiniciar el timer si está en modo auto-play
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          handleSlideChange((prev) => (prev + 1) % heroSlides.length);
        }, 10000);
      }
    }
    
    if (typeof newSlideOrFunction === 'function') {
      setCurrentSlide(newSlideOrFunction);
    } else {
      setCurrentSlide(newSlideOrFunction);
    }
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      handleSlideChange(index, true); // Reset timer en navegación manual
    }
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % heroSlides.length, true); // Reset timer
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + heroSlides.length) % heroSlides.length, true); // Reset timer
  };

  // Funciones para eventos táctiles (swipe)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide(); // Ya incluye reset del timer
    } else if (isRightSwipe) {
      prevSlide(); // Ya incluye reset del timer
    }
  };

  return (
    <>
      {/* CSS personalizado para animaciones académicas */}
      <style jsx>{`
        @keyframes academicFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes bookFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes graduationCap {
          0%, 100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .academic-float {
          animation: academicFloat 6s ease-in-out infinite;
        }

        .book-flip {
          animation: bookFlip 8s linear infinite;
        }

        .graduation-cap {
          animation: graduationCap 4s ease-in-out infinite;
        }

        .slide-content-enter {
          animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .slide-subtitle-enter {
          animation: slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.1s;
        }

        .slide-description-enter {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.2s;
        }

        .slide-button-enter {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
        }

        .text-shadow-strong {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .content-container {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .slide-transition {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .background-transition {
          transition: opacity 0.8s ease-in-out;
        }
      `}</style>

      {/* Hero Section Principal */}
      <div
        className="relative min-h-screen overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Backgrounds con transición suave */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center background-transition ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${slide.backgroundImage}')`,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        ))}

        {/* Elementos decorativos académicos flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Libros flotantes */}
          <div className="absolute top-20 left-10 text-white/10 academic-float">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </div>

          {/* Birrete graduación */}
          <div className="absolute top-40 right-20 text-white/10 graduation-cap">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
            </svg>
          </div>

          {/* Átomo */}
          <div className="absolute bottom-40 left-20 text-white/10 book-flip">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="2" />
              <path d="m20.2 8.63.03.04c.83 1.06.83 2.6 0 3.66-.83 1.06-2.18 1.06-3.01 0-.82-1.06-.82-2.6 0-3.66.84-1.06 2.19-1.06 3.01 0z" />
            </svg>
          </div>

          {/* Partículas flotantes */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full academic-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Lado izquierdo - Espacio para imagen/contenido visual */}
              <div className="hidden lg:block">
                {/* Aquí puedes agregar elementos visuales adicionales si deseas */}
              </div>

              {/* Lado derecho - Texto y contenido */}
              <div className="lg:text-left text-center select-none">
                <div className="content-container">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={`slide-${slide.id}-${currentSlide}`}
                      className={`slide-transition ${
                        index === currentSlide
                          ? "opacity-100 transform translate-x-0 relative"
                          : "opacity-0 transform translate-x-10 absolute top-0 left-0 right-0"
                      }`}
                      style={{
                        visibility: index === currentSlide ? 'visible' : 'hidden',
                      }}
                    >
                      {/* Título principal */}
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 text-shadow-strong">
                        <span className={`inline-block ${index === currentSlide ? 'slide-content-enter' : ''}`}>
                          {slide.title}
                        </span>
                        <br />
                        <span className={`font-bold text-white inline-block ${index === currentSlide ? 'slide-subtitle-enter' : ''}`}>
                          {slide.subtitle}
                        </span>
                      </h1>

                      {/* Descripción (si trae "\n" es una cita con autor; si no, texto normal) */}
                      {(() => {
                        const [texto, autor] = slide.description.split("\n");
                        const animClass = index === currentSlide ? 'slide-description-enter' : '';

                        if (autor) {
                          return (
                            <blockquote
                              className={`mb-8 max-w-2xl border-l-4 border-white/40 pl-4 text-shadow-strong ${animClass}`}
                            >
                              <p className="text-white/90 text-lg md:text-xl lg:text-2xl italic font-light leading-relaxed">
                                &ldquo;{texto}&rdquo;
                              </p>
                              <footer className="not-italic text-white/70 text-base md:text-lg mt-3">
                                — {autor}
                              </footer>
                            </blockquote>
                          );
                        }

                        return (
                          <p className={`text-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl leading-relaxed font-light text-shadow-strong ${animClass}`}>
                            {texto}
                          </p>
                        );
                      })()}

                      {/* Botón CTA */}
                      {slide.buttonText && slide.buttonText.trim() !== "" && (
                        <div className={`${index === currentSlide ? 'slide-button-enter' : ''}`}>
                          <button
                            onClick={() => navigate(slide.url)}
                            className="group relative inline-flex items-center gap-3 bg-unmsm-green text-white px-8 py-4 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-500 hover:bg-unmsm-green-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden cursor-pointer"
                          >
                            {/* Efecto de onda al hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-unmsm-green to-unmsm-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Texto del botón */}
                            <span className="relative z-10 transition-transform duration-300">
                              {slide.buttonText}
                            </span>

                            {/* Ícono flecha */}
                            <svg
                              className="relative z-10 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>

                            {/* Efecto ripple */}
                            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 group-hover:animate-ping bg-white transition-opacity duration-300" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles del carrusel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-6">
            {/* Botón anterior - Solo desktop */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="hidden sm:block p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Indicadores de puntos */}
            <div className="flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            {/* Botón siguiente - Solo desktop */}
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="hidden sm:block p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Botón play/pause - Solo en desktop */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="hidden sm:block p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Indicador de scroll - Desktop */}
        {/* <div className="absolute bottom-8 right-8 z-20 hidden sm:block">
          <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
            <span className="text-sm mb-2 font-light tracking-wide select-none">
              Explorar
            </span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full relative overflow-hidden hover:border-white transition-colors duration-300">
              <div className="w-1 h-3 bg-white/70 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-bounce" />
            </div>
          </div>
        </div> */}

        {/* Barra de progreso */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="h-1 bg-white/20">
            <div
              className="h-full bg-unmsm-green transition-all duration-100 ease-linear"
              style={{
                width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademicHeroCarousel;