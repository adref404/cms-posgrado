import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdLink,
  MdLinkOff,
} from "react-icons/md";

// Botón de la barra de herramientas: resaltado cuando el formato está
// activo en la posición actual del cursor.
const BotonBarra = ({ activo, onClick, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    className={`p-1.5 rounded transition-colors ${
      activo ? "bg-unmsm-navy text-white" : "text-unmsm-navy hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

// Editor de texto enriquecido para el "cuerpo" de noticias/eventos/
// comunicados: negrita, cursiva, subtítulos, listas, cita y links. Guarda y
// recibe HTML plano (string) — value/onChange, como un input controlado.
const RichTextEditor = ({ value, onChange, placeholder = "Escribe el contenido..." }) => {
  // Guarda el último HTML que salió del editor (por onUpdate) o que le
  // entró desde afuera (por setContent), para saber si un cambio en
  // "value" es realmente externo o es el eco de lo que el propio editor
  // acaba de emitir — así nunca hace falta leer editor.getHTML() de
  // vuelta, que en StrictMode puede correr mientras el editor todavía se
  // está montando/desmontando y explota ("Cannot read properties of null").
  const ultimoValorRef = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      ultimoValorRef.current = html;
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "rich-content min-h-[10rem] px-3 py-2 focus:outline-none",
      },
    },
  });

  // Si "value" cambia desde afuera (ej: al abrir otro registro para editar),
  // sincroniza el contenido sin disparar un onUpdate en bucle.
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (value !== ultimoValorRef.current) {
      ultimoValorRef.current = value;
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const ponerLink = () => {
    const url = window.prompt("URL del enlace:", editor.getAttributes("link").href || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-unmsm-navy">
      <div className="flex flex-wrap items-center gap-1 bg-unmsm-bg border-b border-gray-200 px-2 py-1.5">
        <BotonBarra title="Negrita" activo={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <MdFormatBold className="text-lg" />
        </BotonBarra>
        <BotonBarra title="Cursiva" activo={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <MdFormatItalic className="text-lg" />
        </BotonBarra>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <BotonBarra
          title="Subtítulo grande"
          activo={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <span className="text-xs font-bold px-0.5">H2</span>
        </BotonBarra>
        <BotonBarra
          title="Subtítulo pequeño"
          activo={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <span className="text-xs font-bold px-0.5">H3</span>
        </BotonBarra>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <BotonBarra
          title="Lista con viñetas"
          activo={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted className="text-lg" />
        </BotonBarra>
        <BotonBarra
          title="Lista numerada"
          activo={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered className="text-lg" />
        </BotonBarra>
        <BotonBarra
          title="Cita"
          activo={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <MdFormatQuote className="text-lg" />
        </BotonBarra>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <BotonBarra title="Insertar enlace" activo={editor.isActive("link")} onClick={ponerLink}>
          <MdLink className="text-lg" />
        </BotonBarra>
        {editor.isActive("link") && (
          <BotonBarra title="Quitar enlace" onClick={() => editor.chain().focus().unsetLink().run()}>
            <MdLinkOff className="text-lg" />
          </BotonBarra>
        )}
      </div>
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
};

export default RichTextEditor;
