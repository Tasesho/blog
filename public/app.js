const appEl = document.querySelector("#app");

let entries = [];

init();

async function init() {
  try {
    entries = await fetchJson("/entries/index.json");
    window.addEventListener("hashchange", router);
    router();
  } catch (error) {
    renderStatus("No se pudo cargar el indice de entradas.");
    console.error(error);
  }
}

// Router minimo basado en hash:
// #/ muestra el grid, #/post/slug carga una entrada Markdown.
function router() {
  const route = parseRoute();

  if (route.name === "post") {
    renderPost(route.slug);
    return;
  }

  renderHome();
}

function parseRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, "").replace(/^\/?/, "/");
  const postMatch = path.match(/^\/post\/([^/]+)$/);

  if (postMatch) {
    return {
      name: "post",
      slug: decodeURIComponent(postMatch[1]),
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

  appEl.innerHTML = `
    <section class="home-view" aria-labelledby="entries-title">
      <header class="home-hero">
        <h1>BLog<span aria-hidden="true">_</span></h1>
        <p>Ingresa a una entrada para leer.</p>
      </header>
      <header class="view-header">
        <p class="kicker">entries/${entries.length}</p>
        <h1 id="entries-title">posts</h1>
      </header>
      <div class="post-grid">
        ${entries.map(renderPostCard).join("")}
      </div>
    </section>
  `;
}

function renderPostCard(entry) {
  const thumbnail = entry.thumbnail
    ? `<img class="card-thumb" src="${escapeHtml(entry.thumbnail)}" alt="">`
    : '<span class="card-thumb card-thumb-fallback" aria-hidden="true">~/</span>';

  return `
    <a class="post-card" href="#/post/${encodeURIComponent(entry.slug)}">
      <span class="card-media">${thumbnail}</span>
      <span class="card-body">
        <span class="card-title">${escapeHtml(entry.title)}</span>
        <span class="card-meta">${escapeHtml(formatDate(entry.date))} / ${escapeHtml(entry.readingTime)}</span>
        ${entry.description ? `<span class="card-description">${escapeHtml(entry.description)}</span>` : ""}
      </span>
    </a>
  `;
}

async function renderPost(slug) {
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
      <article class="post-view">
        <a class="back-link" href="#/">volver a posts</a>
        <header class="post-header">
          <p class="kicker">${escapeHtml(formatDate(entry.date))} / ${escapeHtml(entry.readingTime)}</p>
          <h1>${escapeHtml(entry.title)}</h1>
          ${entry.description ? `<p>${escapeHtml(entry.description)}</p>` : ""}
        </header>
        <div class="content">${renderMarkdown(body)}</div>
      </article>
    `;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    renderStatus("No se pudo cargar esta entrada.");
    console.error(error);
  }
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
  const response = await fetch(path);
  if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${path}`);
  return response.json();
}

async function fetchText(path) {
  const response = await fetch(path);
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
// sin meter dependencias ni convertir esto en un CMS.
function renderMarkdown(markdown) {
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
    if (line.trim().startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
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
