<?php
/**
 * og-preview.php — página mínima con etiquetas Open Graph (título, imagen,
 * descripción) para que WhatsApp/Facebook/Twitter/LinkedIn arme la tarjeta
 * de vista previa al compartir un link de noticia/evento/comunicado.
 *
 * Los visitantes reales NUNCA llegan al modo "página" de este archivo: el
 * .htaccess solo redirige acá cuando detecta el User-Agent de un robot de
 * red social conocido (ver public/.htaccess). Cualquier persona real sigue
 * viendo la app de React de siempre.
 *
 * Además sirve un segundo modo (?img=1) que devuelve la foto de la
 * noticia/evento ya recortada a 1200x630 (la proporción "panorámica" que
 * exige Open Graph para mostrar la tarjeta grande) — así no importa si el
 * admin subió una foto vertical, cuadrada o lo que sea: siempre sale bien.
 */

const SUPABASE_URL = 'https://kouyptydakrdksoywjhj.supabase.co';
// Credencial pública (anon key), protegida por Row Level Security en
// Supabase — es la misma que ya viaja expuesta en el JS del sitio.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdXlwdHlkYWtyZGtzb3l3amhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NjA0NjIsImV4cCI6MjEwMjMzNjQ2Mn0.RxCnzvWW2MoOIdwtgxidcUVdTdUIkfkzs-DfKB_VbEg';

function curlGet($url, $binario = false) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if (!$binario) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'apikey: ' . SUPABASE_ANON_KEY,
            'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        ]);
    }
    $resultado = curl_exec($ch);
    curl_close($ch);
    return $resultado;
}

function obtenerItem($tabla, $slug) {
    $tablasValidas = ['noticias', 'eventos', 'comunicados'];
    if (!in_array($tabla, $tablasValidas, true) || $slug === '') return null;

    $endpoint = SUPABASE_URL . '/rest/v1/' . $tabla . '?slug=eq.' . urlencode($slug) . '&select=*&limit=1';
    $items = json_decode(curlGet($endpoint), true);
    return (is_array($items) && count($items) > 0) ? $items[0] : null;
}

$tabla = isset($_GET['tabla']) ? $_GET['tabla'] : '';
$slug = isset($_GET['slug']) ? $_GET['slug'] : '';

// ── Modo imagen: recorta la foto real a 1200x630 y la sirve como JPEG ──
if (isset($_GET['img'])) {
    $item = obtenerItem($tabla, $slug);
    $anchoDestino = 1200;
    $altoDestino = 630;

    if ($item && !empty($item['imagen']) && function_exists('imagecreatefromstring')) {
        $datos = curlGet($item['imagen'], true);
        $origen = $datos ? @imagecreatefromstring($datos) : false;

        if ($origen !== false) {
            $anchoOrigen = imagesx($origen);
            $altoOrigen = imagesy($origen);
            $escala = max($anchoDestino / $anchoOrigen, $altoDestino / $altoOrigen);
            $anchoEsc = (int) ceil($anchoOrigen * $escala);
            $altoEsc = (int) ceil($altoOrigen * $escala);

            $escalada = imagecreatetruecolor($anchoEsc, $altoEsc);
            imagecopyresampled($escalada, $origen, 0, 0, 0, 0, $anchoEsc, $altoEsc, $anchoOrigen, $altoOrigen);
            imagedestroy($origen);

            $offsetX = (int) max(0, ($anchoEsc - $anchoDestino) / 2);
            $offsetY = (int) max(0, ($altoEsc - $altoDestino) / 2);

            $lienzo = imagecreatetruecolor($anchoDestino, $altoDestino);
            imagecopy($lienzo, $escalada, 0, 0, $offsetX, $offsetY, $anchoDestino, $altoDestino);
            imagedestroy($escalada);

            header('Content-Type: image/jpeg');
            header('Cache-Control: public, max-age=86400');
            imagejpeg($lienzo, null, 85);
            imagedestroy($lienzo);
            exit;
        }
    }

    // Sin foto propia (o GD no disponible en el servidor): manda el logo tal cual.
    header('Location: /universidad-logo.png');
    exit;
}

// ── Modo página: HTML con las etiquetas Open Graph ──
$sitioUrl = 'https://' . $_SERVER['HTTP_HOST'];
$urlActual = $sitioUrl . '/' . $tabla . '/' . $slug;

$item = obtenerItem($tabla, $slug);

$titulo = $item['titulo'] ?? 'Posgrado de Educación UNMSM';
$descripcion = $item['resumen'] ?? $item['descripcion'] ?? 'Facultad de Educación · Universidad Nacional Mayor de San Marcos';
$tieneImagenPropia = $item && !empty($item['imagen']);
$imagen = $tieneImagenPropia
    ? $sitioUrl . '/og-preview.php?tabla=' . urlencode($tabla) . '&slug=' . urlencode($slug) . '&img=1'
    : $sitioUrl . '/universidad-logo.png';

$e = function ($texto) {
    return htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');
};

header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title><?php echo $e($titulo); ?></title>

<meta property="og:type" content="article">
<meta property="og:site_name" content="Posgrado de Educación UNMSM">
<meta property="og:title" content="<?php echo $e($titulo); ?>">
<meta property="og:description" content="<?php echo $e($descripcion); ?>">
<meta property="og:image" content="<?php echo $e($imagen); ?>">
<?php if ($tieneImagenPropia): ?>
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<?php endif; ?>
<meta property="og:url" content="<?php echo $e($urlActual); ?>">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo $e($titulo); ?>">
<meta name="twitter:description" content="<?php echo $e($descripcion); ?>">
<meta name="twitter:image" content="<?php echo $e($imagen); ?>">

<meta http-equiv="refresh" content="0;url=<?php echo $e($urlActual); ?>">
</head>
<body>
<p><a href="<?php echo $e($urlActual); ?>"><?php echo $e($titulo); ?></a></p>
</body>
</html>
