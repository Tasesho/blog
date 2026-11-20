# Blog Markdown Formatting Style Guide

## 1. Purpose

This document defines the formatting rules for transforming raw blog entries (`.raw.md`) into properly formatted Markdown articles.

The goal is to improve readability, visual hierarchy, and consistency while preserving the author's original writing style and personality.

The raw document is the source of truth. The AI must act as a Markdown formatter, not as a co-author or editor.

## 2. Core Rules

**Content preservation is the highest priority.**

- Do not remove, summarize, rewrite, or replace any original content.
- Do not correct grammar, spelling, punctuation, or vocabulary unless explicitly requested.
- Do not translate the text.
- Do not change the author's tone, personality, humor, expressions, or wording.
- Preserve informal expressions, slang, kaomojis, emoticons, and intentional grammatical mistakes.
- Do not invent explanations, examples, technical details, or conclusions.
- Do not remove repetitive sentences just because they seem unnecessary.
- Preserve all URLs, references, commands, configuration examples, and code snippets.
- Do not change technical values, paths, commands, or configuration syntax.

When in doubt, preserve the original text exactly.

## 3. General Writing Style

The blog should feel like a personal technical journal rather than formal documentation.

The writing style is:

- **Personal:** First-person explanations and experiences are welcome.
- **Informal:** Conversational language is preferred over academic or corporate language.
- **Technical:** Technical concepts should remain understandable without oversimplifying them.
- **Honest:** Include mistakes, frustrations, experiments, and personal opinions.
- **Expressive:** Preserve humor, personality, and informal expressions.

Avoid making the article sound like:
- Corporate documentation.
- Academic reports.
- Marketing material.
- Generic AI-generated tutorials.
- Formal technical manuals.

The author's personality should remain visible throughout the article.

## 4. Markdown Structure

Use Markdown formatting to organize the article without changing its content.

### Headings

Use a consistent hierarchy:

- `#` for the main article title or major sections.
- `##` for secondary sections.
- `###` for subsections.
- `####` only when genuinely necessary.

Avoid excessive heading fragmentation. Not every paragraph needs a heading.

### Paragraphs

- Keep paragraphs reasonably short.
- Separate different ideas with blank lines.
- Do not split a paragraph unnecessarily.
- Preserve the original order of ideas.

### Emphasis

Use formatting selectively:

- `**Bold**` for important concepts, tools, technical names, and key statements.
- `*Italic*` for subtle emphasis, personal remarks, or terminology.
- `~~Strikethrough~~` only when the author is expressing a correction, joke, or deliberate contradiction.

Do not bold entire paragraphs or overuse emphasis.

### Lists

Use unordered lists for collections of related items.

Use ordered lists when the original content describes a sequence of steps.

Do not turn ordinary paragraphs into lists just to make the article look more structured.

### Blockquotes and Callouts

Use blockquotes for:

- Direct quotations from official documentation.
- Relevant external statements.
- Short personal reflections that deserve visual emphasis.

Use simple Markdown blockquotes for warnings, notes, and important information:

> **NOTE:** Additional information that helps the reader understand a particular section.

> **IMPORTANT:** Information that should not be overlooked.

> **WARNING:** A relevant risk or potentially destructive action.

Only introduce a callout when the original text supports it. Never invent warnings or additional information.

## 5. Technical Content

Technical examples must remain intact and easy to copy.

### Code Blocks

Always use fenced code blocks with the appropriate language identifier when known.

Examples:

```yaml
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
```

```bash
docker compose up -d
```

```json
{
  "example": true
}
```

Use:
- `bash` for shell commands.
- `yaml` for YAML configuration.
- `json` for JSON.
- `toml` for TOML.
- `java` for Java.
- `python` for Python.
- `html` for HTML.
- `css` for CSS.
- `javascript` for JavaScript.
- `text` when the language is unknown or the content is plain text.

Do not modify code, commands, paths, IP addresses, ports, or configuration values.

### Inline Code

Use backticks for:
- File names: `docker-compose.yml`
- Directories: `/home/user/homepage`
- Commands: `docker compose up -d`
- Variables: `HOMEPAGE_ALLOWED_HOSTS`
- Ports: `3000`
- Configuration keys: `showStats`

### Tables

Use Markdown tables when they genuinely improve the presentation of structured information.

Good use cases:
- Comparing tools or services.
- Explaining configuration parameters.
- Listing file purposes.
- Summarizing technical specifications.

Do not convert normal prose into tables. Never omit details to make a table shorter.

## 6. Links and References

Preserve all original links.

Use descriptive link text when the original document already provides enough context.

Example:

[Homepage – Services](https://gethomepage.dev/configs/services/)

Do not invent URLs, references, documentation links, or citations.

## 7. Article Layout

When appropriate, organize articles using this general structure:

1. Introduction — A personal opening explaining the topic or problem.
2. Context — Why the topic matters and what motivated the author.
3. Main content — Technical explanations, experiments, configurations, or experiences.
4. Observations — Results, problems, opinions, or lessons learned.
5. Final thoughts — A short personal conclusion.

This is a guideline, not a mandatory template. Do not force sections that do not exist in the original document.

## 8. Visual Consistency

Keep the formatting clean and relatively minimal.

- Use horizontal rules (`---`) to separate major parts when appropriate.
- Avoid excessive emojis and decorative symbols.
- Preserve existing kaomojis and emoticons.
- Avoid unnecessary nested lists.
- Avoid excessive blockquotes.
- Avoid adding headings to every paragraph.
- Maintain consistent heading levels and code formatting.

The final result should be readable in a standard Markdown renderer.

## 9. Final Output Requirements

When processing a `.raw.md` file:

1. Read the entire original document.
2. Preserve every original sentence and piece of information.
3. Apply Markdown formatting according to this guide.
4. Keep the original order and structure unless a formatting adjustment is necessary.
5. Return the complete formatted Markdown document.
6. Do not include explanations, summaries, or commentary outside the formatted document.

**Never silently remove content.**

If a section appears incomplete, confusing, or technically incorrect, preserve it as written rather than attempting to fix it.

## 10. Processing Instruction

The following instruction should be used alongside this style guide whenever an AI processes a raw article:

> Format the provided raw Markdown document according to this `STYLES.md` guide. Your task is strictly limited to Markdown formatting and structural organization. Do not rewrite, proofread, translate, summarize, correct, or remove any content. Preserve the author's original wording, personality, technical details, examples, and links. Return the entire formatted Markdown document and nothing else.