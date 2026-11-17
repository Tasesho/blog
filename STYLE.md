# Blog Writing and Markdown Style

This guide describes the conventions used by the entries in this blog. The writing should remain personal and conversational while still being easy to read and technically useful.

## File format

Every entry is a Markdown file inside `entries/`. Its filename starts with the publication date and uses lowercase words separated by hyphens:

```text
YYYY-MM-DD-short-entry-title.md
```

Each entry begins with YAML front matter delimited by `---`:

```yaml
---
title: Entry title
date: 2026-01-01
description: A short description of the entry.
thumbnail: /assets/thumbnails/example.jpg
---
```

Use these fields consistently:

- `title`: the entry's title.
- `date`: the publication date in `YYYY-MM-DD` format.
- `description`: a short summary suitable for an entry listing.
- `thumbnail`: a local asset path or a complete image URL. Leave it empty when no thumbnail is available.

## Document structure

- Begin the body with an H1 (`#`) matching the entry's visible title.
- Use H2 (`##`) headings for major sections and H3 (`###`) headings for subsections.
- Use H4 (`####`) only for a subsection that genuinely belongs under an H3.
- Keep headings descriptive, natural, and consistent in capitalization.
- Add a blank line between paragraphs, headings, lists, tables, quotes, and code blocks.
- Organize longer essays into a clear progression: introduction, context or explanation, main experience/tutorial, and final thoughts.
- Finish personal or tutorial-style entries with a closing section such as `## Final Thoughts`, `## Wrapping Up`, or `## Final thoughts`.

Avoid adding a heading for every short paragraph. A section should contain enough related material to justify its heading.

## Voice and prose

- Write in the first person when describing personal experiences, opinions, projects, or mistakes.
- Keep the tone informal, warm, and honest. Greetings, humor, expressive wording, and emoticons are part of the blog's personality when they fit the entry.
- Explain technical ideas in plain language before using specialized terminology.
- Prefer short paragraphs, usually one idea at a time.
- Preserve the author's meaning, opinions, and personal voice when proofreading.
- Use AI for spelling, grammar, vocabulary, clarity, and Markdown recommendations; AI should not invent experiences or change the author's point of view.
- Use standard English spelling and grammar unless an intentionally informal phrase is part of the voice.

## Emphasis and inline formatting

- Use **bold** for important concepts, software names, technologies, keywords, and terms being introduced.
- Use *italics* for light emphasis, titles of works, or an intentionally stressed phrase.
- Use inline code for commands, filenames, paths, configuration keys, package names, flags, URLs used as examples, and literal values: `` `localhost:8080` ``.
- Use links with descriptive text rather than displaying a long raw URL:

```markdown
[Arch Wiki](https://wiki.archlinux.org/)
```

Do not bold or italicize entire paragraphs. Combine formatting only when it improves comprehension.

## Code and technical examples

Use fenced code blocks for commands, configuration, directory trees, and multi-line output. Add a language identifier when one is known:

```sh
docker compose up --build
```

Use `sh` for shell commands, `text` for directory trees or terminal output, and the appropriate language for configuration or source code. Explain what an example does before or after the block, and avoid presenting unexplained commands.

## Tables and lists

Use a table when readers need to compare multiple items or properties. Give the table a header row and keep each cell concise:

```markdown
| Tool | Purpose |
| --- | --- |
| Docker | Runs services in containers |
| Nginx | Serves or routes web traffic |
```

Use unordered lists for related items without a required order. Use numbered lists for procedures, rankings, or steps that must be followed in sequence. Keep list items parallel in grammar and add a short explanation when an item is not self-explanatory.

## Quotes and callouts

Use blockquotes for dialogue, memorable wording, quotations, or a short clarification:

```markdown
> "Read the documentation first."
```

Use GitHub-style alert callouts when a point needs special attention:

```markdown
> [!NOTE]
> This is useful context for understanding the example.

> [!WARNING]
> This action can delete data or make a system harder to recover.

> [!IMPORTANT]
> This step is required for the setup to work.
```

Choose the callout type according to its purpose. Keep callouts short and do not use them for ordinary paragraphs.

## Separators and spacing

Use `---` between large, intentionally distinct parts of an essay when a heading alone is not enough. Do not use horizontal rules between every section. Keep one blank line around separators and all other block elements.

## Final review checklist

Before publishing an entry, check that:

- the filename, date, and front matter are valid;
- the title, description, and thumbnail are present or intentionally empty;
- the body has a clear H1 and logical heading hierarchy;
- paragraphs are readable and technical terms are explained;
- code blocks have suitable language labels;
- tables and lists are used only where they improve clarity;
- links, commands, paths, and filenames are formatted correctly;
- warnings or important instructions use an appropriate callout;
- the author's experience and voice remain unchanged after proofreading.
