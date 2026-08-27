import { MdEdit, MdClass, MdDownload, MdEmail, MdPhone, MdPlayCircleOutline } from "react-icons/md";
import PageHero from "../../../components/ui/PageHero";
import InfoBanner from "../../../components/matricula/InfoBanner";
import { procesoMatricula } from "../../../data/matricula";
import { MATRICULA_HERO_IMAGE } from "../../../utils/constants";

// Cuando haya un video grabado, pegar acá el ID de YouTube (lo que sigue a
// "v=" en la URL del video, ej: "dQw4w9WgXcQ") — el reproductor se activa
// solo. Mientras esté vacío, se muestra el aviso de "Próximamente".
const VIDEO_YOUTUBE_ID = "";

const ProcesoMatriculaPage = () => {
  return (
    <div className="min-h-screen bg-unmsm-bg">
      <PageHero
        eyebrow="Matrícula"
        title="Proceso de Matrícula"
        subtitle="Guía paso a paso para completar tu matrícula en el SUM"
        image={MATRICULA_HERO_IMAGE}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: la guía completa */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <InfoBanner icon={MdEdit} title="Proceso de Matrícula Virtual" tone="blue">
              Sigue estos pasos en orden para completar tu matrícula en el SUM.
            </InfoBanner>

            <div className="grid gap-6">
              {procesoMatricula.map((paso, index) => {
                const IconComponent = paso.icono;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: paso.color }}
                        >
                          {paso.paso}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center mb-2">
                          <IconComponent
                            className="text-xl mr-2 flex-shrink-0"
                            style={{ color: paso.color }}
                          />
                          <h4 className="text-lg font-semibold text-gray-800">
                            {paso.titulo}
                          </h4>
                        </div>
                        <p className="text-gray-600">{paso.descripcion}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-800 mb-4">
                Enlaces y Contactos
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <a
                    href="https://sum.unmsm.edu.pe/alumnoWebSum/v2/inicio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-unmsm-navy hover:text-unmsm-blue transition-colors"
                  >
                    <MdClass className="mr-2 flex-shrink-0" />
                    Acceder al SUM
                  </a>
                  <a
                    href="https://manual-de-usuario.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-unmsm-navy hover:text-unmsm-blue transition-colors"
                  >
                    <MdDownload className="mr-2 flex-shrink-0" />
                    Descargar Manual de Usuario
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MdEmail className="mr-2 flex-shrink-0" />
                    <span className="break-all">upg.educacion@unmsm.edu.pe</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdPhone className="mr-2 flex-shrink-0" />
                    Mesa de Partes - Trámites
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: video de ayuda (sticky en desktop) */}
          <div className="min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:sticky lg:top-28">
              {VIDEO_YOUTUBE_ID ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${VIDEO_YOUTUBE_ID}`}
                    title="Video de ayuda para el proceso de matrícula"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-unmsm-navy/5 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <MdPlayCircleOutline className="text-unmsm-blue text-5xl" />
                  <div>
                    <p className="font-semibold text-unmsm-navy">
                      Video de ayuda para el proceso de matrícula
                    </p>
                    <p className="text-unmsm-muted text-sm mt-1">Próximamente</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcesoMatriculaPage;
