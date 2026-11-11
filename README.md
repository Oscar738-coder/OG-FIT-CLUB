# OG Fit Club — Landing page

Landing page de **OG Fit Club**, de Oscar García, nutriólogo y entrenador.
Es un sitio estático (HTML + CSS + JS) sin dependencias ni proceso de compilación.

## Ver en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Contacto

- WhatsApp: el número se configura en `main.js` (`CONFIG.whatsapp`, con lada de país `52`).
  Los botones abren WhatsApp con un mensaje ya escrito que incluye la membresía elegida.
- Instagram: [@coach_oscargh](https://www.instagram.com/coach_oscargh/)

## Precios

- Planes de servicio (`#planes`): Esencial $500, Force $500, Pro $799 y Elite $1,699 MXN/mes,
  con 10% de descuento por compromiso trimestral pagado por adelantado.
- Membresías OG para tienda y paquetes (`#membresias`): Simplicity $189, Levels $289 y Platinum $585 al mes.
  Las tarjetas son 3D (siguen el cursor y se voltean al tocarlas). Sus beneficios están en el
  reverso de cada tarjeta, dentro de `index.html` (`card3d__benefits`).

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
