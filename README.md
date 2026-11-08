# Portafolio de Arnaldo Holt

Sitio personal estático (HTML, CSS y JavaScript puro). Sin instalación ni compilación. Todo el contenido editable está en `content.js`.

## Estructura

- `index.html`: estructura de las secciones.
- `styles.css`: diseño "Obsidiana & Oro" (tipografías Fraunces, Inter y JetBrains Mono desde Google Fonts).
- `script.js`: renderiza el contenido, animaciones y barra de progreso.
- `assets/arnaldo-holt.png`: retrato con fondo transparente (se muestra en la portada). Debe seguir existiendo en esa ruta.

## Cambiar tu lema

En `content.js` edita los bloques `hero`, `lema` (incluye las 3 prioridades y su nivel de barra) y `method`.

## Publicar en GitHub Pages

1. Sube todos los archivos (incluida la carpeta `assets`) a un repositorio.
2. **Settings → Pages → Deploy from a branch**, rama principal, carpeta `/ (root)`.
3. GitHub publicará `index.html`.
