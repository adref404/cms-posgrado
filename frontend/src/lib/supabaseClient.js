import { createClient } from "@supabase/supabase-js";

// Cliente único de Supabase para todo el proyecto (auth + datos + storage de
// imágenes de Noticias/Eventos/Comunicados). Las credenciales viven en
// variables de entorno (.env, no se sube a git) — ver .env.example.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Faltan las variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Revisa el archivo .env (ver .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Bucket público donde se guardan las fotos que sube el admin desde el panel.
export const BUCKET_NOVEDADES = "novedades-imagenes";

// Bucket público donde se guardan los PDF que el admin sube desde el panel
// de Transparencia (además de poder simplemente pegar un link externo).
export const BUCKET_TRANSPARENCIA = "transparencia-archivos";

// Bucket público donde se guardan los CV/biodata que el admin suba desde el
// panel de Plana Docente (además de poder simplemente pegar un link externo).
export const BUCKET_PLANA_DOCENTE = "plana-docente-archivos";
