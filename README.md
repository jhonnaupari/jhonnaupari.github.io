# Jhon Ñaupari — Personal Portfolio

Portafolio personal de **Jhon Ñaupari** (economista · datos y finanzas).
Sitio **estático** (HTML + CSS + JavaScript vanilla)

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

## 3. SEO y metadatos — qué actualizar tras desplegar

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

## 4. Temas, idioma y accesibilidad

- **Tema:** botón ☾/☀ en el header. Respeta `prefers-color-scheme` en la primera visita y
  recuerda la elección (localStorage).
- **Idioma:** botones EN/ES en el header. **Español por defecto**; recuerda la elección.
- **Accesibilidad:** navegación por teclado, `:focus-visible`, enlace "saltar al contenido",
  `prefers-reduced-motion` respetado (desactiva animaciones).

---

## 5. Personalización rápida del diseño

Todo el sistema visual vive en `assets/css/main.css` como variables CSS (`:root`).
Para cambiar el **color de acento**, edita `--accent` (y `--accent-soft`, `--selection`)
en los bloques de tema oscuro y claro. Tipografías: variables `--font-display`,
`--font-sans`, `--font-mono` (se cargan desde Google Fonts en cada página).

---

## 6. Checklist de datos pendientes propios

Ver [`CONTENT-TODO.md`](CONTENT-TODO.md).
