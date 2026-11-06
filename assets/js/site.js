/* =========================================================================
   SITE ENGINE  —  header/footer, theme, i18n, animations, renderers.
   No framework, no build. Progressive enhancement: content is in the HTML,
   this layer adds chrome and interactivity.
   ========================================================================= */
(function () {
  "use strict";

  /* ------------------------- small helpers ------------------------------ */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // pick language value from {en,es} or plain string
  function pick(v, lang) {
    if (v && typeof v === "object" && ("en" in v || "es" in v)) return v[lang] || v.en || v.es || "";
    return v == null ? "" : v;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* --------------------------- UI strings ------------------------------- */
  var UI = {
    "nav.home": { en: "Home", es: "Inicio" },
    "nav.about": { en: "About", es: "Sobre mí" },
    "nav.experience": { en: "Experience", es: "Experiencia" },
    "nav.projects": { en: "Projects", es: "Proyectos" },
    "nav.research": { en: "Research", es: "Investigación" },
    "nav.resume": { en: "Resume", es: "CV" },
    "nav.writing": { en: "Writing", es: "Escritura" },
    "nav.contact": { en: "Contact", es: "Contacto" },

    "common.viewProject": { en: "View project", es: "Ver proyecto" },
    "common.readMore": { en: "Read", es: "Leer" },
    "common.allProjects": { en: "All projects", es: "Todos los proyectos" },
    "common.getInTouch": { en: "Get in touch", es: "Contáctame" },
    "common.viewWork": { en: "View work", es: "Ver trabajo" },
    "common.downloadCv": { en: "Download CV", es: "Descargar CV" },
    "common.repo": { en: "Repository", es: "Repositorio" },
    "common.backProjects": { en: "Back to projects", es: "Volver a proyectos" },
    "common.backWriting": { en: "Back to writing", es: "Volver a escritura" },
    "common.draft": { en: "Draft · WIP", es: "Borrador · En curso" },
    "common.notFound": { en: "Not found", es: "No encontrado" },
    "common.toc": { en: "Sections", es: "Secciones" },
    "a11y.skip": { en: "Skip to content", es: "Saltar al contenido" },

    "proj.problem": { en: "Problem", es: "Problema" },
    "proj.context": { en: "Context & motivation", es: "Contexto y motivación" },
    "proj.data": { en: "Data", es: "Datos" },
    "proj.method": { en: "Methodology", es: "Metodología" },
    "proj.stack": { en: "Technologies", es: "Tecnologías" },
    "proj.results": { en: "Results & metrics", es: "Resultados y métricas" },
    "proj.limitations": { en: "Limitations", es: "Limitaciones" },

    "footer.tagline": {
      en: "Economist working at the intersection of finance, data and research.",
      es: "Economista en la intersección de finanzas, datos e investigación."
    },
    "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
    "footer.built": { en: "Built from scratch · no templates.", es: "Hecho desde cero · sin plantillas." }
  };

  function tr(key, lang) { return UI[key] ? pick(UI[key], lang) : key; }

  /* --------------------------- state ------------------------------------ */
  var LANG_KEY = "jn-lang", THEME_KEY = "jn-theme";
  var lang = localStorage.getItem(LANG_KEY) || "es";  // Spanish by default
  if (lang !== "es") lang = "en";

  var reRenderers = []; // functions to re-run on language change

  /* --------------------------- theme ------------------------------------ */
  function getTheme() { return document.documentElement.getAttribute("data-theme") || "dark"; }
  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_KEY, mode);
    $$(".theme-toggle").forEach(function (b) {
      b.setAttribute("aria-label", mode === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  /* --------------------------- nav model -------------------------------- */
  /* Menu is intentionally lean (5 items). Research now lives inside About,
     the CV is a download button, and Writing stays hidden until the first
     real post — the .html pages still exist and work by direct link. */
  var NAV = [
    { key: "nav.home", href: "index.html" },
    { key: "nav.about", href: "about.html" },
    { key: "nav.experience", href: "experience.html" },
    { key: "nav.projects", href: "projects.html" },
    { key: "nav.contact", href: "contact.html" }
  ];
  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  /* ------------------------ build header -------------------------------- */
  function buildHeader() {
    var host = $("#site-header");
    if (!host) return;
    var cur = currentPage();
    var links = NAV.map(function (n) {
      var active = (n.href === cur) ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '" data-i18n="' + n.key + '"' + active + '>' + tr(n.key, lang) + "</a></li>";
    }).join("");

    host.innerHTML =
      '<div class="container"><nav class="nav" aria-label="Primary">' +
        '<a class="brand" href="index.html" aria-label="' + esc(SITE.name) + ' — home">' +
          '<span class="brand-mark">JÑ</span><span>' + esc(SITE.name) + "</span></a>" +
        '<ul class="nav-links">' + links + "</ul>" +
        '<div class="nav-tools">' +
          '<div class="lang-toggle" role="group" aria-label="Language">' +
            '<button type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
            '<button type="button" data-lang="es" aria-pressed="' + (lang === "es") + '">ES</button>' +
          "</div>" +
          '<button type="button" class="icon-btn theme-toggle" aria-label="Toggle theme">' +
            '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>' +
            '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>' +
          "</button>" +
          '<button type="button" class="nav-burger" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          "</button>" +
        "</div>" +
      "</nav></div>" +
      '<div class="mobile-menu" id="mobile-menu"><ul>' +
        NAV.map(function (n) {
          var active = (n.href === cur) ? ' aria-current="page"' : "";
          return '<li><a href="' + n.href + '" data-i18n="' + n.key + '"' + active + '>' + tr(n.key, lang) + "</a></li>";
        }).join("") +
      "</ul></div>";

    // wire tools
    $$(".theme-toggle").forEach(function (b) {
      b.addEventListener("click", function () { setTheme(getTheme() === "dark" ? "light" : "dark"); });
    });
    $$(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    var burger = $(".nav-burger"), menu = $("#mobile-menu");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () { menu.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
          menu.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); burger.focus();
        }
      });
    }

    // scrolled state
    var header = host;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------ build footer -------------------------------- */
  function buildFooter() {
    var host = $("#site-footer");
    if (!host) return;
    var links = [];
    if (SITE.github) links.push('<a href="' + esc(SITE.github) + '" target="_blank" rel="noopener">GitHub</a>');
    if (SITE.linkedin) links.push('<a href="' + esc(SITE.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>');
    if (SITE.email) links.push('<a href="mailto:' + esc(SITE.email) + '">Email</a>');

    host.innerHTML =
      '<div class="container"><div class="footer-grid">' +
        '<div><div class="f-brand">' + esc(SITE.name) + "</div>" +
          '<p data-i18n="footer.tagline">' + tr("footer.tagline", lang) + "</p></div>" +
        '<div class="footer-links">' + links.join("") + "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>© " + new Date().getFullYear() + " " + esc(SITE.name) + " · <span data-i18n=\"footer.rights\">" + tr("footer.rights", lang) + "</span></span>" +
        '<span data-i18n="footer.built">' + tr("footer.built", lang) + "</span>" +
      "</div></div>";
  }

  /* --------------------------- i18n apply ------------------------------- */
  function applyStaticI18n() {
    document.documentElement.setAttribute("lang", lang);
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (UI[key]) el.textContent = tr(key, lang);
    });
    // elements that carry both languages inline via data-en / data-es
    $$("[data-en]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val != null) el.innerHTML = val;
    });
    $$(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem(LANG_KEY, lang);
    applyStaticI18n();
    reRenderers.forEach(function (fn) { try { fn(); } catch (e) {} });
  }

  /* ------------------------ scroll reveal ------------------------------- */
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------ card spotlight ------------------------------ */
  function initSpotlight() {
    if (prefersReduced) return;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ---------------------------- marquee --------------------------------- */
  function initMarquee() {
    var track = $(".marquee-track");
    if (!track || track.dataset.doubled) return;
    track.innerHTML = track.innerHTML + track.innerHTML;
    track.dataset.doubled = "1";
  }

  /* ---------------------- page fade transition -------------------------- */
  function initPageTransitions() {
    if (prefersReduced) return;
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || a.target === "_blank" || a.hasAttribute("download")) return;
      if (a.host !== location.host || /^(mailto:|tel:)/.test(href)) return;
      e.preventDefault();
      document.body.style.transition = "opacity .2s var(--ease)";
      document.body.style.opacity = "0";
      setTimeout(function () { location.href = href; }, 180);
    });
    window.addEventListener("pageshow", function (ev) {
      if (ev.persisted) { document.body.style.opacity = "1"; }
    });
  }

  /* ======================= content renderers ============================ */

  function chipRow(arr) {
    return '<div class="chips">' + (arr || []).map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + "</div>";
  }
  function wipBadge() { return '<span class="badge-wip">' + tr("common.draft", lang) + "</span>"; }

  /* skills marquee (home) */
  function renderMarquee() {
    var el = $("#skills-marquee");
    if (!el) return;
    el.innerHTML = '<div class="marquee-track"><span>' +
      SKILLS.focus.map(esc).join("</span><span>") + "</span></div>";
    initMarquee();
  }

  /* focus list / skills groups (about) */
  function renderSkillGroups() {
    var el = $("#skill-groups");
    if (!el) return;
    el.innerHTML = SKILLS.groups.map(function (g) {
      return '<div class="skill-group" data-reveal><h4>' + esc(pick(g.title, lang)) + "</h4>" + chipRow(g.items) + "</div>";
    }).join("");
    initReveal();
  }

  /* conceptual illustration (synthetic, decorative) for a project by index */
  function projArt(i) {
    var n = ((i % 4) + 4) % 4;
    var labels = [
      "FORECAST_MODEL", "PATTERN_SPACE", "EMPIRICAL_NOTEBOOK", "ANALYTICS_WORKSPACE"
    ];
    var caps = [
      "INPUT → MODEL → SCENARIO",
      "PATTERNS / NOT PREDICTIONS",
      "QUESTION → EVIDENCE → READING",
      "STRUCTURE / CLARITY / CONTEXT"
    ];
    var g;
    if (n === 0) {
      g = '<svg viewBox="0 0 500 150" aria-hidden="true">' +
        '<path d="M0 135 45 125 85 133 125 90 165 105 205 60 245 76 285 35 325 50 365 20 410 36 460 8" fill="none" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M205 60 460 6 460 70 205 150Z" fill="currentColor" opacity=".10"/>' +
        '<path d="M205 60 460 34" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 6" fill="none"/></svg>';
    } else if (n === 1) {
      var dots = "";
      for (var j = 0; j < 40; j++) {
        dots += '<circle cx="' + (26 + (j * 67) % 450) + '" cy="' + (16 + (j * 37) % 118) + '" r="' + (3 + j % 4) + '" fill="currentColor" opacity="' + (0.25 + (j % 4) * 0.14).toFixed(2) + '"/>';
      }
      g = '<svg viewBox="0 0 500 150" aria-hidden="true">' + dots +
        '<ellipse cx="258" cy="76" rx="135" ry="52" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="4 6"/></svg>';
    } else if (n === 2) {
      g = '<div class="equation" aria-hidden="true">y = α + βx + ε</div>';
    } else {
      g = '<div class="bars" aria-hidden="true">' +
        '<i style="height:40%"></i><i style="height:72%"></i><i style="height:55%"></i><i style="height:88%"></i>' +
        '<i style="height:48%"></i><i style="height:95%"></i><i style="height:63%"></i><i style="height:80%"></i></div>';
    }
    return '<div class="proj-art"><small>' + labels[n] + "</small>" + g + "<small>" + caps[n] + "</small></div>";
  }

  /* projects (home featured + full list) */
  function projectCard(p, i) {
    var href = "project.html?slug=" + encodeURIComponent(p.slug);
    return '<a class="card project-card" href="' + href + '" data-reveal style="--reveal-delay:' + (i % 3) * 0.08 + 's">' +
        '<div>' + projArt(i) +
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem">' +
          '<span class="tag">' + esc(pick(p.tag, lang)) + "</span>" + (p.provisional ? wipBadge() : "") +
        "</div>" +
        "<h3>" + esc(pick(p.title, lang)) + "</h3>" +
        "<p>" + esc(pick(p.teaser, lang)) + "</p></div>" +
        '<div class="card-foot">' + chipRow((p.stack || []).slice(0, 3)) +
          '<span class="link-arrow">' + tr("common.viewProject", lang) +
          ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg></span>' +
        "</div></a>";
  }
  function renderFeatured() {
    var el = $("#featured-projects");
    if (!el) return;
    el.innerHTML = PROJECTS.slice(0, 4).map(projectCard).join("");
    initReveal();
  }
  function renderProjects() {
    var el = $("#projects-grid");
    if (!el) return;
    el.innerHTML = PROJECTS.map(projectCard).join("");
    initReveal();
  }

  /* experience timeline */
  function renderExperience() {
    var el = $("#experience-timeline");
    if (!el) return;
    el.innerHTML = EXPERIENCE.map(function (job) {
      var pts = pick(job.points, lang) || [];
      return '<div class="tl-item" data-reveal>' +
        '<div class="tl-date">' + esc(pick(job.period, lang)) + (job.provisional ? "  ·  " + tr("common.draft", lang) : "") + "</div>" +
        "<h3>" + esc(pick(job.role, lang)) + "</h3>" +
        '<div class="tl-org">' + esc(pick(job.org, lang)) + (job.location ? ' <span class="text-faint" style="color:var(--text-faint)">· ' + esc(pick(job.location, lang)) + "</span>" : "") + "</div>" +
        "<ul>" + pts.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
        chipRow(job.stack) +
      "</div>";
    }).join("");
    initReveal();
  }

  /* research list */
  function renderResearch() {
    var el = $("#research-list");
    if (!el) return;
    if (!RESEARCH.length) { el.innerHTML = ""; return; }
    el.innerHTML = RESEARCH.map(function (r) {
      var links = (r.links || []).map(function (l) {
        return '<a class="link-arrow" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
      }).join(" ");
      return '<article class="card" data-reveal style="padding:1.6rem">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:.6rem">' +
          '<span class="tag" style="font-family:var(--font-mono);font-size:var(--fs-100);letter-spacing:.14em;text-transform:uppercase;color:var(--text-faint)">' + esc(pick(r.type, lang)) + "</span>" +
          (r.provisional ? wipBadge() : "") + "</div>" +
        '<h3 style="font-family:var(--font-display);font-weight:400;font-size:var(--fs-600)">' + esc(pick(r.title, lang)) + "</h3>" +
        '<p class="text-muted" style="margin-top:.6rem;font-size:var(--fs-300)">' + esc(pick(r.abstract, lang)) + "</p>" +
        (links ? '<div style="margin-top:1rem">' + links + "</div>" : "") +
      "</article>";
    }).join("");
    initReveal();
  }

  /* writing list */
  function renderWriting() {
    var el = $("#writing-list");
    if (!el) return;
    el.innerHTML = '<div class="row-list">' + WRITING.map(function (w) {
      var href = "article.html?slug=" + encodeURIComponent(w.slug);
      var date = w.date ? w.date : (lang === "es" ? "Sin fecha" : "Undated");
      return '<a class="row-item" href="' + href + '" data-reveal>' +
        '<span class="r-date">' + esc(date) + "</span>" +
        "<div><h3>" + esc(pick(w.title, lang)) + (w.provisional ? " " + wipBadge() : "") + "</h3>" +
        "<p>" + esc(pick(w.excerpt, lang)) + "</p></div>" +
        '<span class="r-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg></span>' +
      "</a>";
    }).join("") + "</div>";
    initReveal();
  }

  /* project detail (project.html?slug=) */
  function renderProjectDetail() {
    var el = $("#project-detail");
    if (!el) return;
    var slug = new URLSearchParams(location.search).get("slug");
    var p = PROJECTS.filter(function (x) { return x.slug === slug; })[0];
    if (!p) { el.innerHTML = notFoundBlock("projects.html", "common.backProjects"); return; }
    document.title = pick(p.title, lang) + " · " + SITE.name;
    var d = p.detail || {};
    var idx = PROJECTS.indexOf(p);
    function block(labelKey, val) {
      var v = pick(val, lang);
      if (!v) return "";
      return '<section data-reveal><h2 data-i18n="' + labelKey + '">' + tr(labelKey, lang) + "</h2><p>" + esc(v) + "</p></section>";
    }
    el.innerHTML =
      '<a class="link-arrow" href="projects.html" style="margin-bottom:1.5rem;display:inline-flex">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform:rotate(180deg)"><path d="M7 17 17 7M9 7h8v8"/></svg> ' +
        tr("common.backProjects", lang) + "</a>" +
      '<div class="article-head" style="border:0;padding-top:0">' +
        '<span class="eyebrow">' + esc(pick(p.tag, lang)) + "</span>" +
        "<h1>" + esc(pick(p.title, lang)) + (p.provisional ? " " + wipBadge() : "") + "</h1>" +
        '<p class="lede-block">' + esc(pick(p.teaser, lang)) + "</p>" +
        (p.repo ? '<a class="btn btn-ghost" style="margin-top:1.4rem" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + tr("common.repo", lang) + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg></a>' : "") +
      "</div>" +
      projArt(idx) +
      (p.provisional ? '<div class="note" data-reveal style="margin-top:2rem"><strong>' + (lang === "es" ? "Proyecto en construcción." : "Project in progress.") + "</strong> " + (lang === "es" ? "El contenido es provisional y no debe considerarse final." : "Content is provisional and should not be read as final.") + "</div>" : "") +
      '<div class="content-prose" style="margin-top:2.5rem">' +
        block("proj.problem", d.problem) +
        block("proj.context", d.context) +
        block("proj.data", d.data) +
        block("proj.method", d.method) +
        '<section data-reveal><h2 data-i18n="proj.stack">' + tr("proj.stack", lang) + "</h2>" + chipRow(p.stack) + "</section>" +
        block("proj.results", d.results) +
        block("proj.limitations", d.limitations) +
      "</div>";
    initReveal();
  }

  /* article detail (article.html?slug=) */
  function renderArticle() {
    var el = $("#article-detail");
    if (!el) return;
    var slug = new URLSearchParams(location.search).get("slug");
    var a = WRITING.filter(function (x) { return x.slug === slug; })[0];
    if (!a) { el.innerHTML = notFoundBlock("writing.html", "common.backWriting"); return; }
    document.title = pick(a.title, lang) + " · " + SITE.name;
    var body = (pick(a.body, lang) || []).map(function (node) {
      if (node.h2) return "<h2>" + esc(node.h2) + "</h2>";
      if (node.h3) return "<h3>" + esc(node.h3) + "</h3>";
      if (node.p) return "<p>" + esc(node.p) + "</p>";
      if (node.quote) return "<blockquote>" + esc(node.quote) + "</blockquote>";
      if (node.ul) return "<ul>" + node.ul.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
      return "";
    }).join("");
    el.innerHTML =
      '<a class="link-arrow" href="writing.html" style="margin-bottom:1.5rem;display:inline-flex">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform:rotate(180deg)"><path d="M7 17 17 7M9 7h8v8"/></svg> ' +
        tr("common.backWriting", lang) + "</a>" +
      '<div class="article-head" style="border:0;padding-top:0">' +
        '<div class="article-meta"><span>' + esc(a.date || (lang === "es" ? "Sin fecha" : "Undated")) + "</span><span>" + esc(pick(a.readingTime, lang)) + "</span></div>" +
        "<h1>" + esc(pick(a.title, lang)) + (a.provisional ? " " + wipBadge() : "") + "</h1>" +
      "</div>" +
      '<div class="content-prose prose" style="margin-top:2rem">' + body + "</div>";
    initReveal();
  }

  function notFoundBlock(backHref, backKey) {
    return '<div class="center" style="padding-block:4rem"><p class="eyebrow" style="justify-content:center">404</p>' +
      '<h1 class="display" style="font-size:var(--fs-700);margin:1rem 0">' + tr("common.notFound", lang) + "</h1>" +
      '<a class="btn btn-ghost" href="' + backHref + '">' + tr(backKey, lang) + "</a></div>";
  }

  /* contact */
  function renderContact() {
    var el = $("#contact-links");
    if (!el) return;
    var items = [];
    if (SITE.email) items.push({ label: "Email", value: SITE.email, href: "mailto:" + SITE.email });
    if (SITE.github) items.push({ label: "GitHub", value: SITE.github.replace(/^https?:\/\//, ""), href: SITE.github, ext: true });
    if (SITE.linkedin) items.push({ label: "LinkedIn", value: SITE.linkedin.replace(/^https?:\/\//, ""), href: SITE.linkedin, ext: true });
    el.innerHTML = items.map(function (it) {
      var ext = it.ext ? ' target="_blank" rel="noopener"' : "";
      return '<a class="contact-link" href="' + esc(it.href) + '"' + ext + ' data-reveal>' +
        '<span class="cl-label">' + esc(it.label) + "</span>" +
        '<span class="cl-value">' + esc(it.value) + " ↗</span></a>";
    }).join("");
    initReveal();
  }

  /* resume: wire every CV-download control on the page (#cv-download on the
     résumé page, plus any .js-cv-download button elsewhere) */
  function renderResume() {
    var btns = $$("#cv-download, .js-cv-download");
    if (!btns.length) return;
    var ok = SITE.resume && SITE.resume.available;
    btns.forEach(function (btn) {
      if (ok) {
        btn.href = SITE.resume.file;
        btn.setAttribute("download", "");
        btn.removeAttribute("aria-disabled");
        btn.classList.remove("is-disabled");
        btn.style.opacity = "";
        btn.style.pointerEvents = "";
      } else {
        btn.href = "#";
        btn.setAttribute("aria-disabled", "true");
        btn.style.opacity = "0.5";
        btn.style.pointerEvents = "none";
      }
    });
    if (!ok) { var note = $("#cv-note"); if (note) note.hidden = false; }
  }

  /* inject SITE-driven bits anywhere via [data-site] */
  function renderSiteBits() {
    $$("[data-site]").forEach(function (el) {
      var k = el.getAttribute("data-site");
      if (k === "name") el.textContent = SITE.name;
      else if (k === "role") el.textContent = pick(SITE.role, lang);
      else if (k === "location") el.textContent = pick(SITE.location, lang);
      else if (k === "email") { el.textContent = SITE.email; if (el.tagName === "A") el.href = "mailto:" + SITE.email; }
      else if (k === "availability") el.textContent = pick(SITE.availability, lang);
      else if (k === "summary") el.textContent = pick(SITE.summary, lang);
      else if (k === "fullName") el.textContent = SITE.fullName || SITE.name;
    });
  }

  /* education */
  function renderEducation() {
    var el = $("#education-list");
    if (!el || !window.EDUCATION) return;
    el.innerHTML = EDUCATION.map(function (e) {
      return '<div class="tl-item" style="padding-left:0" data-reveal>' +
        '<div class="tl-date">' + esc(pick(e.period, lang)) + (e.note ? "  ·  " + esc(pick(e.note, lang)) : "") + "</div>" +
        "<h3>" + esc(pick(e.degree, lang)) + "</h3>" +
        '<div class="tl-org">' + esc(pick(e.org, lang)) + (e.location ? " · " + esc(pick(e.location, lang)) : "") + "</div>" +
      "</div>";
    }).join("");
    initReveal();
  }

  /* certifications */
  function renderCertifications() {
    var el = $("#certifications-list");
    if (!el || !window.CERTIFICATIONS) return;
    el.innerHTML = '<div class="row-list">' + CERTIFICATIONS.map(function (c) {
      return '<div class="row-item" style="cursor:default" data-reveal>' +
        '<span class="r-date">' + esc(c.year || "") + "</span>" +
        "<div><h3>" + esc(pick(c.title, lang)) + "</h3>" +
        '<p>' + esc(pick(c.org, lang)) + "</p></div>" +
        "<span></span></div>";
    }).join("") + "</div>";
    initReveal();
  }

  /* languages */
  function renderLanguages() {
    var el = $("#languages-list");
    if (!el || !window.LANGUAGES) return;
    el.innerHTML = LANGUAGES.map(function (l) {
      return '<div class="skill-group" style="border:0;padding:0" data-reveal>' +
        '<h4 style="margin-bottom:.3rem">' + esc(pick(l.name, lang)) + "</h4>" +
        '<span class="text-muted" style="font-size:var(--fs-300)">' + esc(pick(l.level, lang)) + "</span></div>";
    }).join("");
    initReveal();
  }

  /* ---------------- animated hero node-map (home) ----------------------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(name, attrs) {
    var e = document.createElementNS(SVGNS, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    return e;
  }
  function renderHeroMap() {
    var svg = $("#hero-map");
    if (!svg) return;
    var edgesG = $(".nm-edges", svg), nodesG = $(".nm-nodes", svg);
    if (!edgesG || !nodesG) return;
    edgesG.textContent = ""; nodesG.textContent = "";

    var center = { x: 170, y: 125, r: 15, main: true, label: "FP&A" };
    var outer = [
      { x: 58,  y: 42,  r: 8, label: { en: "Data", es: "Datos" } },
      { x: 292, y: 56,  r: 8, label: { en: "Model", es: "Modelo" } },
      { x: 300, y: 180, r: 8, label: "Forecast" },
      { x: 150, y: 215, r: 8, label: { en: "Decision", es: "Decisión" } },
      { x: 40,  y: 165, r: 8, label: { en: "Signal", es: "Señal" } }
    ];

    var spokes = [];
    outer.forEach(function (o) {
      var l = svgEl("line", { x1: center.x, y1: center.y, x2: o.x, y2: o.y, class: "nm-edge nm-edge-spoke" });
      edgesG.appendChild(l); spokes.push(l);
    });
    for (var i = 0; i < outer.length; i++) {
      var a = outer[i], b = outer[(i + 1) % outer.length];
      var r = svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "nm-edge nm-edge-ring" });
      edgesG.appendChild(r); spokes.push(r);
    }

    function addNode(n, idx) {
      var g = svgEl("g", { class: "nm-node" + (n.main ? " nm-node-main" : "") });
      var c = svgEl("circle", { cx: n.x, cy: n.y, r: n.r, class: "nm-dot" });
      if (!prefersReduced) {
        c.style.transformOrigin = n.x + "px " + n.y + "px";
        c.style.animationDelay = (idx * 0.4) + "s";
      }
      g.appendChild(c);
      var t = svgEl("text", {
        x: n.x, y: n.main ? n.y + 3 : n.y - n.r - 6,
        "text-anchor": "middle", class: "nm-label" + (n.main ? " nm-label-main" : "")
      });
      t.textContent = pick(n.label, lang);
      g.appendChild(t);
      nodesG.appendChild(g);
    }
    outer.forEach(addNode);
    addNode(center, outer.length);

    if (!prefersReduced) {
      spokes.forEach(function (l, idx) {
        var len = l.getTotalLength();
        l.style.strokeDasharray = len;
        l.style.strokeDashoffset = len;
        // force reflow so the transition runs
        l.getBoundingClientRect();
        l.style.transition = "stroke-dashoffset .9s var(--ease)";
        l.style.transitionDelay = (0.12 * idx) + "s";
        l.style.strokeDashoffset = "0";
      });
    }
  }

  function initHeroParallax() {
    if (prefersReduced) return;
    var svg = $("#hero-map");
    if (!svg) return;
    var card = svg.closest(".signal") || svg.parentNode;
    var nodesG = $(".nm-nodes", svg), edgesG = $(".nm-edges", svg);
    if (!card || !nodesG) return;
    nodesG.style.transition = edgesG.style.transition = "transform .35s var(--ease)";
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width / 2) / r.width;
      var dy = (e.clientY - r.top - r.height / 2) / r.height;
      nodesG.style.transform = "translate(" + (dx * 9) + "px," + (dy * 9) + "px)";
      edgesG.style.transform = "translate(" + (dx * 4) + "px," + (dy * 4) + "px)";
    });
    card.addEventListener("pointerleave", function () {
      nodesG.style.transform = ""; edgesG.style.transform = "";
    });
  }

  /* --------------------------- boot ------------------------------------- */
  function boot() {
    buildHeader();
    buildFooter();
    applyStaticI18n();

    // register language-sensitive renderers
    reRenderers = [renderMarquee, renderSkillGroups, renderFeatured, renderProjects,
      renderExperience, renderResearch, renderWriting, renderProjectDetail,
      renderArticle, renderContact, renderSiteBits, renderResume,
      renderEducation, renderCertifications, renderLanguages, renderHeroMap];

    renderMarquee(); renderSkillGroups(); renderFeatured(); renderProjects();
    renderExperience(); renderResearch(); renderWriting(); renderProjectDetail();
    renderArticle(); renderContact(); renderResume(); renderSiteBits();
    renderEducation(); renderCertifications(); renderLanguages(); renderHeroMap();

    initReveal();
    initSpotlight();
    initPageTransitions();
    initHeroParallax();

    document.body.classList.add("page-fade");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
