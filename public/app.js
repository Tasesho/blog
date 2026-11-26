const appEl = document.querySelector("#app");

let entries = [];
let searchQuery = "";
let selectedTopic = "";
let scrollRaf = null;

init();
initCustomCursor();
initVisitorCounter();
initBackToTop();

async function init() {
  try {
    entries = await fetchJson("/entries/index.json");
    window.addEventListener("hashchange", router);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const navInput = document.querySelector("#nav-entry-search");
    if (navInput) {
      navInput.value = searchQuery;
      navInput.addEventListener("input", (event) => {
        searchQuery = event.target.value.trim();
        if (window.location.hash.startsWith("#/post/")) {
          window.location.hash = "#/";
        } else {
          renderHome();
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      const editing = event.target.closest("input, textarea, select, [contenteditable='true']");
      if (event.key === "/" && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        navInput?.focus();
      }
    });

    router();
  } catch (error) {
    renderStatus("No se pudo cargar el indice de entradas.");
    console.error(error);
  }
}

function handleScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    const offset = Math.min(window.scrollY, 220) * 0.14;
    document.documentElement.style.setProperty("--scroll-offset", `${offset}px`);
    updateReadingProgress();
    scrollRaf = null;
  });
}

function initCustomCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const cursor = document.querySelector("#custom-cursor");
  if (!cursor) return;

  document.body.classList.add("has-custom-cursor");
  window.addEventListener("pointermove", (event) => {
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.add("is-visible");
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    cursor.classList.toggle("is-hovering", Boolean(event.target.closest("a, button, input, textarea, select, [role='button']")));
  });
  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) cursor.classList.remove("is-visible", "is-hovering");
  });
}

function initBackToTop() {
  const button = document.querySelector("#back-to-top");
  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  });
}

async function initVisitorCounter() {
  const countEl = document.querySelector("#visitor-count");
  if (!countEl) return;

  let lastCounted = 0;
  try {
    const storedTimestamp = Number(localStorage.getItem("blog-visitor-counted-at") || 0);
    lastCounted = Number.isFinite(storedTimestamp) ? storedTimestamp : 0;
  } catch (error) {
    console.warn("Visitor count storage is unavailable.", error);
  }

  if (Date.now() - lastCounted >= 24 * 60 * 60 * 1000) {
    try {
      const response = await fetch("/api/visits", { method: "POST" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      try {
        localStorage.setItem("blog-visitor-counted-at", String(Date.now()));
      } catch (error) {
        console.warn("Visitor count storage is unavailable.", error);
      }
    } catch (error) {
      console.warn("Visitor count could not be updated.", error);
    }
  }

  try {
    const response = await fetch("/api/visits");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { count } = await response.json();
    countEl.textContent = new Intl.NumberFormat().format(count);
  } catch (error) {
    countEl.textContent = "—";
    console.warn("Visitor count could not be loaded.", error);
  }
}

// Router minimo basado en hash:
// #/ muestra el grid, #/post/slug carga una entrada Markdown.
function router() {
  const route = parseRoute();

  if (route.name === "post") {
    renderPost(route.slug, route.section);
    return;
  }

  window.scrollTo(0, 0);
  renderHome();
}

function parseRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, "").replace(/^\/?/, "/");
  const postMatch = path.match(/^\/post\/([^/?]+)(?:\?section=([^&]+))?$/);

  if (postMatch) {
    return {
      name: "post",
      slug: decodeURIComponent(postMatch[1]),
      section: postMatch[2] ? decodeURIComponent(postMatch[2]) : "",
    };
  }

  return { name: "home" };
}

function renderHome() {
  document.title = "~blog.tasedev.me";

  if (!entries.length) {
    renderStatus("Todavia no hay entradas publicadas.");
    return;
  }

  const visibleEntries = filterEntries(entries, searchQuery, selectedTopic);
  const featuredEntry = !searchQuery && visibleEntries.length
    ? visibleEntries[Math.floor(Math.random() * visibleEntries.length)]
    : null;
  const archiveEntries = featuredEntry
    ? visibleEntries.filter((entry) => entry.slug !== featuredEntry.slug)
    : visibleEntries;
  const resultsLabel = searchQuery
    ? `<p class="search-summary">Results for “${escapeHtml(searchQuery)}”: ${visibleEntries.length}</p>`
    : "";
  const topicButtons = renderTopicFilters(entries);
  const timeline = renderTimeline(archiveEntries);

  appEl.innerHTML = `
    <section class="home-view" aria-labelledby="entries-title">
      <header class="home-hero">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> PROJECT LOG / PERSONAL NOTES</p>
          <h1>Devblog<span aria-hidden="true">_</span></h1>
          <p>Projects, experiments, and things I’m still figuring out.</p>
          <div class="hero-stats"><strong>${entries.length}</strong><span>published entries</span><span class="hero-divider">/</span><span>Linux · homelab · music</span></div>
        </div>
        <div class="hero-decoration" aria-hidden="true"><span>~/</span><i></i><i></i><i></i></div>
      </header>
      ${resultsLabel}
      <section class="topic-bar" aria-label="Filter entries by topic">
        <div class="topic-heading"><span class="kicker">EXPLORE BY TOPIC</span><span class="shortcut-hint">Press <kbd>/</kbd> to search</span></div>
        <div class="topic-filters">${topicButtons}</div>
      </section>
      ${featuredEntry ? renderFeaturedCard(featuredEntry) : ""}
      <header class="view-header">
        <div><p class="kicker">THE ARCHIVE / ${archiveEntries.length} ENTRIES</p><h2 id="entries-title">From the notebook</h2></div>
        ${selectedTopic ? `<button class="clear-filter" type="button" data-topic-filter="">Clear “${escapeHtml(selectedTopic)}” filter ×</button>` : ""}
      </header>
      ${archiveEntries.length ? timeline : `
        <div class="empty-state">
          <p>No entries match this search and topic.</p>
        </div>
      `}
    </section>
  `;

  const navInput = document.querySelector("#nav-entry-search");
  if (navInput) {
    navInput.value = searchQuery;
  }

  appEl.querySelectorAll("[data-topic-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTopic = button.dataset.topicFilter;
      renderHome();
    });
  });
  observeReveals();
}

function filterEntries(items, query, topic = "") {
  const normalized = query.toLowerCase();
  return items.filter((entry) => {
    const matchesQuery = !normalized || (
      entry.title.toLowerCase().includes(normalized) ||
      entry.description.toLowerCase().includes(normalized) ||
      entry.slug.toLowerCase().includes(normalized) ||
      (entry.labels || []).some((label) => label.toLowerCase().includes(normalized))
    );
    const matchesTopic = !topic || (entry.labels || []).some((label) => label.toLowerCase() === topic.toLowerCase());
    return matchesQuery && matchesTopic;
  });
}

function renderTopicFilters(items) {
  const counts = new Map();
  const names = new Map();
  items.forEach((entry) => (entry.labels || []).forEach((label) => {
    const key = label.toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
    if (!names.has(key)) names.set(key, label);
  }));

  const preferred = ["linux", "homelab", "music"];
  const topics = [...counts.keys()].sort((a, b) => {
    const ai = preferred.indexOf(a);
    const bi = preferred.indexOf(b);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    return counts.get(b) - counts.get(a) || a.localeCompare(b);
  }).slice(0, 6);

  return `
    <button class="topic-chip ${selectedTopic ? "" : "is-active"}" type="button" data-topic-filter="">All <span>${items.length}</span></button>
    ${topics.map((key) => `<button class="topic-chip ${selectedTopic.toLowerCase() === key ? "is-active" : ""}" type="button" data-topic-filter="${escapeHtml(names.get(key))}">${escapeHtml(names.get(key))}<span>${counts.get(key)}</span></button>`).join("")}
  `;
}

function renderFeaturedCard(entry) {
  const thumbnail = entry.thumbnail
    ? `<img src="${escapeHtml(entry.thumbnail)}" alt="">`
    : "";
  const labels = (entry.labels || []).slice(0, 3).map((label) => `<span class="card-label">${escapeHtml(label)}</span>`).join("");

  return `
    <section class="featured-section" aria-labelledby="featured-title">
      <p class="eyebrow">FEATURED PROJECT / <span>01</span></p>
      <a class="featured-card" href="#/post/${encodeURIComponent(entry.slug)}" data-reveal>
        <div class="featured-image">${thumbnail}<span class="featured-image-mark" aria-hidden="true">LAB<br>_LOG</span></div>
        <div class="featured-copy">
          <p class="card-meta">${escapeHtml(formatDate(entry.date))} / ${escapeHtml(entry.readingTime)}</p>
          <h2 id="featured-title">${escapeHtml(entry.title)}</h2>
          <p>${escapeHtml(entry.description || "A project from the notebook.")}</p>
          <span class="card-labels">${labels}</span>
          <span class="featured-link">Read project notes <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </section>
  `;
}

function renderTimeline(items) {
  const grouped = new Map();
  items.forEach((entry) => {
    const year = entry.date ? entry.date.slice(0, 4) : "Undated";
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year).push(entry);
  });
  return [...grouped.entries()].map(([year, yearEntries]) => `
    <section class="timeline-year" aria-labelledby="year-${escapeHtml(year)}">
      <h3 class="timeline-year-label" id="year-${escapeHtml(year)}">${escapeHtml(year)}</h3>
      <div class="timeline-list">${yearEntries.map(renderPostCard).join("")}</div>
    </section>
  `).join("");
}

function observeReveals() {
  const targets = appEl.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((items, currentObserver) => {
    items.forEach((item) => {
      if (!item.isIntersecting) return;
      item.target.classList.add("is-visible");
      currentObserver.unobserve(item.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((target) => observer.observe(target));
}

function renderPostCard(entry) {
  const thumbnail = entry.thumbnail
    ? `<img class="card-thumb" src="${escapeHtml(entry.thumbnail)}" alt="">`
    : '<span class="card-thumb card-thumb-fallback" aria-hidden="true">~/</span>';
  const labels = Array.isArray(entry.labels) && entry.labels.length
    ? `<span class="card-labels" aria-label="Labels">${entry.labels.map((label) => `<span class="card-label">${escapeHtml(label)}</span>`).join("")}</span>`
    : "";

  return `
    <a class="post-card" href="#/post/${encodeURIComponent(entry.slug)}" data-reveal>
      <span class="card-media">${thumbnail}</span>
      <span class="card-body">
        <span class="card-meta">${escapeHtml(formatDate(entry.date))} <span aria-hidden="true">/</span> ${escapeHtml(entry.readingTime)}</span>
        <span class="card-title">${escapeHtml(entry.title)}</span>
        ${labels}
        ${entry.description ? `<span class="card-description">${escapeHtml(entry.description)}</span>` : ""}
      </span>
    </a>
  `;
}

async function renderPost(slug, section = "") {
  const entry = entries.find((item) => item.slug === slug);

  if (!entry) {
    renderNotFound();
    return;
  }

  renderStatus("Cargando entrada...");

  try {
    const markdown = await fetchText(`/entries/${entry.file}`);
    const { body } = splitFrontMatter(markdown);

    document.title = `${entry.title} / ~blog.tasedev.me`;
    appEl.innerHTML = `
      <div class="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
      <article class="post-view">
        <a class="back-link" href="#/">volver a posts</a>
        <header class="post-header">
          <p class="kicker">${escapeHtml(formatDate(entry.date))} / ${escapeHtml(entry.readingTime)}</p>
          <h1>${escapeHtml(entry.title)}</h1>
          ${entry.description ? `<p>${escapeHtml(entry.description)}</p>` : ""}
        </header>
        <div class="post-reading-layout">
          <aside class="post-toc"><details open><summary>On this page</summary><nav aria-label="Table of contents"><ol id="post-toc-links"></ol></nav></details></aside>
          <div class="content">${renderMarkdown(body)}</div>
        </div>
      </article>
    `;
    setupTableOfContents(entry.slug);
    updateReadingProgress();
    if (section) {
      requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ block: "start" }));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error) {
    renderStatus("No se pudo cargar esta entrada.");
    console.error(error);
  }
}

function setupTableOfContents(slug) {
  const content = appEl.querySelector(".content");
  const toc = appEl.querySelector(".post-toc");
  const list = appEl.querySelector("#post-toc-links");
  if (!content || !toc || !list) return;

  const usedIds = new Set();
  const headings = [...content.querySelectorAll("h1, h2, h3")];
  headings.forEach((heading, index) => {
    const baseId = heading.textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index + 1}`;
    let id = baseId;
    let suffix = 2;
    while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
    usedIds.add(id);
    heading.id = id;

    const item = document.createElement("li");
    item.className = `toc-level-${heading.tagName.slice(1)}`;
    const link = document.createElement("a");
    link.href = `#/post/${encodeURIComponent(slug)}?section=${encodeURIComponent(id)}`;
    link.textContent = heading.textContent;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      history.replaceState(null, "", link.href);
      heading.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    item.append(link);
    list.append(item);
  });

  if (!headings.length) toc.hidden = true;
  if (window.matchMedia("(max-width: 800px)").matches) {
    toc.querySelector("details")?.removeAttribute("open");
  }
}

function updateReadingProgress() {
  const article = appEl.querySelector(".post-view");
  const progress = appEl.querySelector(".reading-progress");
  if (!article || !progress) return;

  const articleTop = article.getBoundingClientRect().top + window.scrollY;
  const scrollRange = Math.max(1, article.offsetHeight - window.innerHeight);
  const value = Math.max(0, Math.min(100, ((window.scrollY - articleTop) / scrollRange) * 100));
  progress.style.setProperty("--progress", `${value}%`);
  progress.setAttribute("aria-valuenow", String(Math.round(value)));
}

function renderNotFound() {
  document.title = "Post no encontrado / ~blog.tasedev.me";
  appEl.innerHTML = `
    <section class="empty-state">
      <p>No encontre esa entrada.</p>
      <a class="back-link" href="#/">volver a posts</a>
    </section>
  `;
}

function renderStatus(message) {
  appEl.innerHTML = `<p class="status">${escapeHtml(message)}</p>`;
}

async function fetchJson(path) {
  const cacheBuster = `?v=${new Date().getTime()}`;
  const response = await fetch(path + cacheBuster);
  if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${path}`);
  return response.json();
}

async function fetchText(path) {
  const cacheBuster = `?v=${new Date().getTime()}`;
  const response = await fetch(path + cacheBuster);
  if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${path}`);
  return response.text();
}

function splitFrontMatter(markdown) {
  if (!markdown.startsWith("---")) return { meta: {}, body: markdown };
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: markdown };
  return {
    meta: markdown.slice(3, end).trim(),
    body: markdown.slice(end + 4).trim(),
  };
}

// Renderer Markdown deliberadamente pequeno: cubre lo que este blog usa hoy
// Markdown rendering using marked with GitHub Flavored Markdown support.
function renderMarkdown(markdown) {
  if (typeof marked !== "undefined") {
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: false,
      mangle: false,
      smartypants: false,
    });
    return marked.parse(markdown);
  }

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let inCode = false;
  let code = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```") ) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
      continue;
    }

    const quote = line.match(/^>\s?(.+)$/);
    if (quote) {
      flushParagraph();
      flushList();
      html.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  return html.join("\n");
}

function renderInline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" rel="noreferrer" target="_blank">$1</a>');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "sin fecha";
  return new Intl.DateTimeFormat("es-CL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
