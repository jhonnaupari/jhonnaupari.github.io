/* =========================================================================
   CONTENT LAYER  —  Edit everything about you here.
   ---------------------------------------------------------------------------
   Text with two languages uses { en: "...", es: "..." }.
   Items marked  provisional: true  render a "Draft / WIP" badge. Real,
   CV-verified content (profile, education, experience, skills, certifications,
   languages) is NOT provisional. Projects/research/writing stay provisional
   until you fill them in. Never add fake dates or metrics.
   ========================================================================= */

/* ----------------------------- Site config ------------------------------ */
window.SITE = {
  name: "Jhon Ñaupari",
  fullName: "Jhon Fernando Ñaupari Ruiz",
  role: { en: "Economist · FP&A · Data", es: "Economista · FP&A · Datos" },
  statement: "Understanding economics. Building with data.",
  location: { en: "Lima, Peru", es: "Lima, Perú" },

  summary: {
    en: "Economics graduate (UPC, top third of class) with 1.5+ years in Financial Planning & Analysis (FP&A) and budget control across the private and public sectors. I work in financial modeling, P&L forecasting, variance analysis, and the consolidation and automation of data workflows (ETL, Power Query, Excel/Power BI) for high-impact management reporting and decision-making.",
    es: "Bachiller en Economía (UPC, tercio superior) con más de 1.5 años de experiencia en Planeamiento Financiero (FP&A) y control presupuestal en los sectores privado y público. Domino el modelado financiero, el P&L forecasting, el análisis de variaciones y la consolidación y automatización de flujos de datos (ETL, Power Query, Excel/Power BI) para reportería gerencial de alto impacto y toma de decisiones."
  },

  // --- Contact & links ---
  email: "jhon09jf@gmail.com",
  // Phone is on your CV but NOT shown on the public site by default (spam/privacy).
  // It still travels inside the downloadable CV PDF. Set show:true to display it.
  phone: { value: "(+51) 912 593 532", show: false },
  github: "https://github.com/jhonnaupari",    // confirmed
  linkedin: "https://www.linkedin.com/in/jhon-fernando-n09/",

  // Your CV is bundled and the download button is live.
  resume: { available: true, file: "assets/jhon-naupari-cv.pdf" },

  availability: { en: "Open to opportunities", es: "Abierto a oportunidades" },

  // Update after you deploy (used for SEO/OG absolute URLs).
  baseUrl: "https://jhonnaupari.github.io"
};

/* ------------------------------ Education ------------------------------- */
window.EDUCATION = [
  {
    degree: { en: "B.A. in Economics & International Business", es: "Bachiller en Economía y Negocios Internacionales" },
    org: "Universidad Peruana de Ciencias Aplicadas (UPC)",
    location: { en: "Lima, Peru", es: "Lima, Perú" },
    period: { en: "Mar 2018 — Dec 2024", es: "Mar 2018 — Dic 2024" },
    note: { en: "Top third of class", es: "Tercio Superior" }
  }
];

/* --------------------------- Skills / tools ----------------------------- */
window.SKILLS = {
  focus: [
    "Financial Planning & Analysis (FP&A)",
    "Corporate Finance",
    "Financial Modeling & Forecasting",
    "Quant Finance",
    "Data Analytics",
    "Machine Learning"
  ],
  groups: [
    { title: { en: "Finance & ERP", es: "Finanzas & ERP" },
      items: ["Oracle PeopleSoft", "Financial Modeling", "P&L", "FP&A", "OpEx", "Forecasting"] },
    { title: { en: "Data & BI", es: "Datos & BI" },
      items: ["Excel (Advanced)", "Power Query / Pivot", "VBA", "Power BI (Advanced)", "SQL"] },
    { title: { en: "Quant analysis", es: "Análisis cuantitativo" },
      items: ["R (Advanced)", "Python", "Stata"] },
    { title: { en: "Workflow", es: "Flujo de trabajo" },
      items: ["ETL", "Git", "Reproducible workflows"] }
  ]
};

/* ------------------------------ Languages ------------------------------- */
window.LANGUAGES = [
  { name: { en: "Spanish", es: "Español" }, level: { en: "Native", es: "Nativo" } },
  { name: { en: "English", es: "Inglés" }, level: { en: "Intermediate (in progress)", es: "Intermedio (en progreso · UNTELS)" } }
];

/* --------------------------- Certifications ----------------------------- */
window.CERTIFICATIONS = [
  { title: "BI Essentials for Finance Analysts", org: "Corporate Finance Institute (CFI)", year: "2026" },
  { title: { en: "Introduction to Machine Learning for Public Policy", es: "Introducción a Machine Learning para Políticas Públicas" }, org: "CIES", year: "2024" },
  { title: "Learn SQL Basics for Data Science", org: "University of California, Davis", year: "2023" },
  { title: "Excel Skills for Business: Advanced", org: "Macquarie University", year: "2022" },
  { title: "Python for Everybody", org: "University of Michigan", year: "2022" },
  { title: "Bloomberg Market Concepts", org: "Bloomberg", year: "2021" }
];

/* ---------------------------- Experience -------------------------------- */
/* Newest first. These are CV-verified → not provisional. */
window.EXPERIENCE = [
  {
    role: { en: "FP&A Professional Intern", es: "Practicante Profesional de FP&A" },
    org: "Laureate Perú",
    location: { en: "Lima, Peru", es: "Lima, Perú" },
    period: { en: "Sep 2025 — Nov 2026", es: "Set 2025 — Nov 2026" },
    provisional: false,
    points: {
      en: [
        "Support monthly OpEx closes: loading forecasting reports, consolidating accounting provisions across 4 business units, and running multi-unit Budget vs. Actuals variance analysis to identify spend-efficiency drivers.",
        "Build and optimize ETL data workflows (Power Query/Pivot, Excel/Power BI modeling) for management reporting (CFO / Finance Director), cutting processing time and integrity errors.",
        "Coordinate with budget owners across business units (Corporate, UPC, UPN, CIBERTEC) to validate financial inputs and keep close and forecasting schedules on track.",
        "Manage daily budget transfers and reallocations across multi-unit cost centers, ensuring budget compliance and fund traceability.",
        "Maintain daily, weekly and monthly financial management reports, improving Excel/Power BI visualization and usability for faster decisions."
      ],
      es: [
        "Soporte en los cierres de mes OpEx: carga de reportes de forecasting, consolidación de provisiones contables (4 unidades de negocio) y análisis de variaciones Budget vs. Actuals multi-unidad, identificando drivers de eficiencias de gasto.",
        "Desarrollo y optimización de flujos de datos ETL (Power Query/Pivot, modelado Excel/Power BI) para reportería gerencial (CFO/Director de Finanzas), reduciendo tiempos de procesamiento y errores de integridad.",
        "Coordinación con budget owners de múltiples unidades (Corporativo, UPC, UPN, CIBERTEC) para validar inputs financieros y cumplir cronogramas de cierre y forecasting.",
        "Gestión de transferencias y traslados presupuestales diarios en centros de costo multi-unidad, asegurando compliance presupuestal y trazabilidad de fondos.",
        "Actualización y mantenimiento de reportes diarios, semanales y mensuales de gestión financiera, con mejoras de visualización y usabilidad en Excel/Power BI."
      ]
    },
    stack: ["Oracle PeopleSoft", "Excel", "Power Query", "Power BI", "SQL"]
  },
  {
    role: { en: "Planning & Budget Intern", es: "Practicante Preprofesional de Planeamiento y Presupuesto" },
    org: { en: "Instituto Vial Provincial de Chanchamayo (IVP)", es: "Instituto Vial Provincial de Chanchamayo (IVP)" },
    location: { en: "Chanchamayo, Peru", es: "Chanchamayo, Perú" },
    period: { en: "Jan 2025 — Aug 2025", es: "Ene 2025 — Ago 2025" },
    provisional: false,
    points: {
      en: [
        "Produced budget-execution reports and expense classifications in coordination with the operations area.",
        "Processed 3–5 monthly valuations for regional infrastructure contractors, with the corresponding fund reconciliation.",
        "Prepared public-fund accountability reports in compliance with local-government regulations."
      ],
      es: [
        "Elaboración de reportes de ejecución presupuestal y clasificación de gastos en coordinación con el área operativa.",
        "Procesamiento de 3 a 5 valorizaciones mensuales para contratistas de infraestructura regional, con la conciliación de fondos correspondiente.",
        "Preparación de rendiciones de fondos públicos cumpliendo las normativas de los gobiernos locales."
      ]
    },
    stack: ["Excel", "Presupuesto público"]
  },
  {
    role: { en: "Administrative & Logistics Assistant", es: "Auxiliar administrativo / logístico" },
    org: "K.L. Logistics & Tai Loy S.A.",
    location: { en: "Lima, Peru", es: "Lima, Perú" },
    period: { en: "2019 — 2022", es: "2019 — 2022" },
    provisional: false,
    points: {
      en: [
        "Supported the automation of Excel reports and operational control of high daily volume."
      ],
      es: [
        "Apoyo en la automatización de reportes en Excel y el control operativo de alto flujo diario."
      ]
    },
    stack: ["Excel", "VBA"]
  }
];

/* ------------------------------ Projects -------------------------------- */
/* PROVISIONAL scaffolds — fill in and set provisional:false when presentable.
   Add the real GitHub repo URL in `repo`. */
window.PROJECTS = [
  {
    slug: "financial-forecasting-automation",
    provisional: true,
    tag: { en: "Finance · Automation", es: "Finanzas · Automatización" },
    title: { en: "Financial Forecasting & Automation", es: "Forecasting Financiero y Automatización" },
    teaser: {
      en: "Forecasting models and automated reporting to shorten the planning cycle.",
      es: "Modelos de proyección y reporting automatizado para acortar el ciclo de planeamiento."
    },
    stack: ["Python", "SQL", "Power BI", "Excel"],
    repo: "",
    detail: {
      problem: { en: "Manual forecasting and reporting is slow and error-prone, delaying decisions.", es: "La proyección y el reporting manuales son lentos y propensos a errores, lo que retrasa decisiones." },
      context: { en: "Placeholder context. Describe the setting and why it mattered.", es: "Contexto provisional. Describe el entorno y por qué importaba." },
      data: { en: "To be documented.", es: "Por documentar." },
      method: { en: "To be documented — modelling and automation approach.", es: "Por documentar — enfoque de modelado y automatización." },
      results: { en: "To be documented. Do not present estimated metrics as final.", es: "Por documentar. No presentar métricas estimadas como finales." },
      limitations: { en: "To be documented.", es: "Por documentar." }
    }
  },
  {
    slug: "ml-football-performance",
    provisional: true,
    tag: { en: "Machine Learning · Sports", es: "Machine Learning · Deporte" },
    title: { en: "Machine Learning & Football Performance", es: "Machine Learning y Rendimiento en Fútbol" },
    teaser: {
      en: "Applying ML to football performance data to find signal in the noise.",
      es: "Aplicar ML a datos de rendimiento futbolístico para encontrar señal en el ruido."
    },
    stack: ["Python", "scikit-learn", "pandas"],
    repo: "",
    detail: {
      problem: { en: "Placeholder — the predictive question this project answers.", es: "Provisional — la pregunta predictiva que resuelve este proyecto." },
      context: { en: "Placeholder context.", es: "Contexto provisional." },
      data: { en: "To be documented.", es: "Por documentar." },
      method: { en: "To be documented.", es: "Por documentar." },
      results: { en: "To be documented.", es: "Por documentar." },
      limitations: { en: "To be documented.", es: "Por documentar." }
    }
  },
  {
    slug: "applied-economics-research",
    provisional: true,
    tag: { en: "Econometrics · Research", es: "Econometría · Investigación" },
    title: { en: "Applied Economics Research", es: "Investigación en Economía Aplicada" },
    teaser: {
      en: "Econometric analysis of microdata to study an applied economic question.",
      es: "Análisis econométrico de microdatos para estudiar una pregunta económica aplicada."
    },
    stack: ["R", "Stata", "Econometrics"],
    repo: "",
    detail: {
      problem: { en: "Placeholder — the research question and its relevance.", es: "Provisional — la pregunta de investigación y su relevancia." },
      context: { en: "Placeholder context.", es: "Contexto provisional." },
      data: { en: "To be documented (e.g. household survey microdata).", es: "Por documentar (p. ej. microdatos de encuestas de hogares)." },
      method: { en: "To be documented — identification strategy and models.", es: "Por documentar — estrategia de identificación y modelos." },
      results: { en: "To be documented.", es: "Por documentar." },
      limitations: { en: "To be documented.", es: "Por documentar." }
    }
  },
  {
    slug: "data-analytics-dashboards",
    provisional: true,
    tag: { en: "Analytics · BI", es: "Analítica · BI" },
    title: { en: "Data Analytics Dashboards", es: "Dashboards de Analítica de Datos" },
    teaser: {
      en: "Interactive dashboards that turn raw data into decisions.",
      es: "Dashboards interactivos que convierten datos crudos en decisiones."
    },
    stack: ["Power BI", "SQL", "Power Query"],
    repo: "",
    detail: {
      problem: { en: "Placeholder — the reporting/analytics gap this closes.", es: "Provisional — la brecha de reporting/analítica que cubre." },
      context: { en: "Placeholder context.", es: "Contexto provisional." },
      data: { en: "To be documented.", es: "Por documentar." },
      method: { en: "To be documented.", es: "Por documentar." },
      results: { en: "To be documented.", es: "Por documentar." },
      limitations: { en: "To be documented.", es: "Por documentar." }
    }
  }
];

/* ------------------------------ Research -------------------------------- */
window.RESEARCH = [
  {
    slug: "thesis-wip",
    provisional: true,
    type: { en: "Thesis · In progress", es: "Tesis · En curso" },
    title: { en: "Economics thesis (working title)", es: "Tesis de Economía (título provisional)" },
    abstract: {
      en: "Placeholder abstract. A short summary of the research question, data and method will go here once defined.",
      es: "Resumen provisional. Aquí irá un breve resumen de la pregunta, datos y método una vez definidos."
    },
    links: []
  }
];

/* ------------------------------ Writing --------------------------------- */
window.WRITING = [
  {
    slug: "hello-world",
    provisional: true,
    date: "",
    readingTime: { en: "3 min read", es: "3 min de lectura" },
    title: { en: "Why I'm building in public", es: "Por qué construyo en público" },
    excerpt: {
      en: "A short first note on economics, data and the questions I want to explore here.",
      es: "Una primera nota breve sobre economía, datos y las preguntas que quiero explorar aquí."
    },
    tags: ["Meta"],
    body: {
      en: [
        { h2: "A place to think out loud" },
        { p: "This is a placeholder article. Replace it with your first real post. The writing section is designed for short, rigorous notes on economics, finance, machine learning and AI." },
        { p: "Each post lives as an item in the WRITING array in assets/js/data.js — no build step required." }
      ],
      es: [
        { h2: "Un lugar para pensar en voz alta" },
        { p: "Este es un artículo provisional. Reemplázalo con tu primer post real. La sección de escritura está pensada para notas breves y rigurosas sobre economía, finanzas, machine learning e IA." },
        { p: "Cada post es un ítem del arreglo WRITING en assets/js/data.js — sin paso de build." }
      ]
    }
  }
];

/* ---------------- Home hero: interactive profile map --------------------
   Each tab is a facet of your profile. `core` is the central node, `nodes`
   are the satellites (up to 5), and `define` is the "how I'd define myself"
   line shown below the map. Edit freely — labels can be a plain string or
   { en, es } for both languages. */
window.PROFILE_MAP = [
  {
    key: "perfil",
    tab: { en: "Profile", es: "Perfil" },
    hint: { en: "PROFILE", es: "PERFIL" },
    core: { en: "Economist", es: "Economista" },
    nodes: [
      { en: "Finance", es: "Finanzas" },
      { en: "Data", es: "Datos" },
      { en: "Research", es: "Investigación" },
      { en: "Decision", es: "Decisión" },
      { en: "AI", es: "IA" }
    ],
    define: {
      en: "An FP&A economist who reads the economy through data and builds the tools to decide.",
      es: "Economista de FP&A que lee la economía con datos y construye las herramientas para decidir."
    }
  },
  {
    key: "finanzas",
    tab: { en: "Finance", es: "Finanzas" },
    hint: { en: "FINANCE", es: "FINANZAS" },
    core: "FP&A",
    nodes: [
      "Forecast",
      "P&L",
      { en: "Budget", es: "Presupuesto" },
      { en: "Modeling", es: "Modelado" },
      { en: "Variance", es: "Variaciones" }
    ],
    define: {
      en: "I turn scattered numbers into a clear picture: forecasting, P&L and budget control.",
      es: "Convierto números dispersos en una imagen clara: forecasting, P&L y control presupuestal."
    }
  },
  {
    key: "datos",
    tab: { en: "Data", es: "Datos" },
    hint: { en: "DATA", es: "DATOS" },
    core: "Data / BI",
    nodes: ["Power BI", "SQL", "ETL", "Power Query", "Dashboards"],
    define: {
      en: "I automate and visualize the data flow end to end.",
      es: "Automatizo y visualizo el flujo de datos de punta a punta."
    }
  },
  {
    key: "research",
    tab: { en: "Research", es: "Investigación" },
    hint: { en: "RESEARCH", es: "INVESTIGACIÓN" },
    core: "Research",
    nodes: [
      { en: "Econometrics", es: "Econometría" },
      { en: "Microdata", es: "Microdatos" },
      "ML / IA",
      { en: "Economics", es: "Economía" },
      { en: "Evidence", es: "Evidencia" }
    ],
    define: {
      en: "Econometric rigor and microdata, with machine learning applied to economics.",
      es: "Rigor econométrico y microdatos, con machine learning aplicado a economía."
    }
  }
];
