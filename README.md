# OG Fit Club — Landing page

Landing page de **OG Fit Club**, de Oscar García, nutriólogo y entrenador.
Es un sitio estático (HTML + CSS + JS) sin dependencias ni proceso de compilación.

## Ver en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Antes de publicar

En `main.js`, completa `CONFIG.whatsapp` con tu número (solo dígitos, con lada de país;
por ejemplo `52` + 10 dígitos). Con eso, todos los botones abren WhatsApp con un mensaje
ya escrito que incluye la membresía elegida.

Revisa también en `index.html`:
- Los beneficios de cada membresía (Simplicity, Levels y Platinum).
- El precio de Platinum (ahora dice "A consultar").
- El precio de las bolsas de licuado verde (ahora dice "Pregunta").

## Estructura

```
index.html        Contenido de la página
styles.css        Estilos (tema oscuro, rojo de marca #E61F30)
main.js           Configuración, animaciones, video y enlaces de WhatsApp
assets/img/       Pantallas de la app tomadas del video de la historia
assets/video/     Versión web del video (720p)
```

## Publicar

Se puede subir tal cual a cualquier hosting estático: GitHub Pages, Netlify, Vercel o Cloudflare Pages.
