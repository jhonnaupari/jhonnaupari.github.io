# Jhon Ñaupari — Personal Portfolio

Portafolio personal de **Jhon Ñaupari** (economista · datos y finanzas).
Sitio **estático** (HTML + CSS + JavaScript vanilla), **sin paso de build** y listo para
publicarse gratis en **GitHub Pages** o **Vercel**.

> Estética editorial + tecnológica · modo claro/oscuro · bilingüe (ES/EN) ·
> accesible · optimizado para SEO. Hecho desde cero, sin plantillas.

---

## 1. Estructura del proyecto

```
.
├── index.html            # Home
├── about.html            # Sobre mí
├── experience.html       # Experiencia (línea de tiempo)
├── projects.html         # Listado de proyectos
├── project.html          # Detalle de proyecto (?slug=...)
├── research.html         # Investigación
├── resume.html           # CV (con descarga de PDF)
├── writing.html          # Blog / artículos
├── article.html          # Detalle de artículo (?slug=...)
├── contact.html          # Contacto
├── 404.html              # Página de error
├── robots.txt            # SEO
├── sitemap.xml           # SEO
├── site.webmanifest      # PWA / icono
├── .nojekyll             # Evita el procesado Jekyll en GitHub Pages
├── .github/workflows/
│   └── deploy.yml         # Despliegue automático a GitHub Pages
└── assets/
    ├── css/main.css      # Sistema de diseño (tokens, temas, componentes)
    ├── js/
    │   ├── data.js        # ⭐ TODO TU CONTENIDO va aquí (editable)
    │   └── site.js        # Motor: header/footer, tema, idioma, animaciones
    └── img/
        ├── favicon.svg
        └── og.svg         # Imagen para redes (ver nota en § 6)
```

**La mayor parte del contenido se edita en un solo archivo: [`assets/js/data.js`](assets/js/data.js).**
El HTML de cada página contiene los textos principales (bueno para SEO); los listados
(proyectos, experiencia, artículos, investigación, contacto) se generan desde `data.js`.

---

## 2. Cómo editar el contenido

Abre `assets/js/data.js`. Está comentado y organizado por secciones:

| Quieres cambiar… | Edita el objeto… |
|---|---|
| Nombre, rol, ubicación, email, GitHub, LinkedIn, CV | `window.SITE` |
| Habilidades y herramientas | `window.SKILLS` |
| Experiencia (línea de tiempo) | `window.EXPERIENCE` |
| Proyectos y su detalle | `window.PROJECTS` |
| Investigación / tesis / papers | `window.RESEARCH` |
| Artículos del blog | `window.WRITING` |

- Los textos con dos idiomas usan `{ en: "...", es: "..." }`.
- Los ítems con `provisional: true` muestran una etiqueta **"Borrador · En curso"**.
  Déjala hasta tener el contenido real. **No pongas fechas ni métricas inventadas.**

Textos de interfaz (menú, botones) y traducciones ES/EN de la navegación están en el
objeto `UI` al inicio de `assets/js/site.js`.

### Añadir un proyecto
Agrega un objeto a `window.PROJECTS` con un `slug` único. Su página es
`project.html?slug=tu-slug` (se enlaza automáticamente desde las tarjetas).

### Añadir un artículo
Agrega un objeto a `window.WRITING`. El cuerpo es una lista de bloques:
`{ h2 }`, `{ h3 }`, `{ p }`, `{ quote }`, `{ ul: [...] }`.

---

## 3. Ver el sitio en local

No necesitas Node. Opciones:

- **Doble clic** en `index.html` (funciona, aunque algunas funciones van mejor con servidor).
- **Servidor local** (recomendado), con cualquiera de estos:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.
(Si tienes Node algún día: `npx serve` también sirve.)

---

## 4. Publicar en GitHub Pages (gratis)

1. Crea un repositorio en GitHub. Para URL limpia (`https://TUUSUARIO.github.io`),
   nómbralo exactamente **`TUUSUARIO.github.io`**. Si usas otro nombre, el sitio vivirá en
   `https://TUUSUARIO.github.io/NOMBRE-REPO/` (ver § 6 sobre URLs absolutas).
2. Sube el contenido de esta carpeta al repo.
3. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Cada push a la rama `main` publica el sitio automáticamente (workflow en
   `.github/workflows/deploy.yml`). También puedes lanzarlo manualmente desde la pestaña
   **Actions**.

> No subas secretos ni credenciales. Este sitio no los necesita.

## 5. Publicar en Vercel (gratis, plan Hobby)

1. Entra a vercel.com e importa el repositorio de GitHub.
2. Framework preset: **Other** · Build command: *(vacío)* · Output directory: `.`
3. Deploy. Vercel sirve los archivos estáticos tal cual.
4. Cada push a `main` genera un nuevo despliegue. Puedes añadir tu dominio en
   **Project → Settings → Domains**.

---

## 6. SEO y metadatos — qué actualizar tras desplegar

Las etiquetas canónicas y Open Graph usan como base
`https://jhonnaupari.github.io`. **Cámbiala por tu URL real** cuando la tengas:

- En cada `*.html`: `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`.
- En `sitemap.xml` y `robots.txt`: la URL base.
- En `assets/js/data.js`: `SITE.baseUrl`.

**Imagen para redes sociales:** se incluye `assets/img/og.svg`. Varias plataformas
(X, LinkedIn, WhatsApp) prefieren **PNG/JPG de 1200×630**. Exporta `og.svg` a
`assets/img/og-default.png` (desde Figma, un editor, o abriendo el SVG y exportando) y
luego cambia las referencias `og.svg` → `og-default.png` en los `*.html`. Es opcional:
sin PNG el sitio funciona, solo puede no mostrarse la miniatura en algunas apps.

---

## 7. Temas, idioma y accesibilidad

- **Tema:** botón ☾/☀ en el header. Respeta `prefers-color-scheme` en la primera visita y
  recuerda la elección (localStorage).
- **Idioma:** botones EN/ES en el header. **Español por defecto**; recuerda la elección.
- **Accesibilidad:** navegación por teclado, `:focus-visible`, enlace "saltar al contenido",
  `prefers-reduced-motion` respetado (desactiva animaciones).

---

## 8. Personalización rápida del diseño

Todo el sistema visual vive en `assets/css/main.css` como variables CSS (`:root`).
Para cambiar el **color de acento**, edita `--accent` (y `--accent-soft`, `--selection`)
en los bloques de tema oscuro y claro. Tipografías: variables `--font-display`,
`--font-sans`, `--font-mono` (se cargan desde Google Fonts en cada página).

---

## 9. Checklist de datos pendientes

Ver [`CONTENT-TODO.md`](CONTENT-TODO.md).
