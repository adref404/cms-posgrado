import { MdFolder } from "react-icons/md";
import DocumentCard from "./DocumentCard";

const DocumentSection = ({ titulo, documentos }) => (
  <section>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-unmsm-bg flex items-center justify-center flex-shrink-0">
        <MdFolder className="text-unmsm-navy text-lg" />
      </div>
      <h3 className="font-bold text-unmsm-navy uppercase tracking-wide text-sm md:text-base">
        {titulo}
      </h3>
    </div>
    <div className="h-px bg-unmsm-line mb-4" />
    <div className="grid sm:grid-cols-2 gap-4">
      {documentos.map((doc) => (
        <DocumentCard key={doc.titulo} {...doc} />
      ))}
    </div>
  </section>
);

export default DocumentSection;
