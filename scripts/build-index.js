#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const entriesDir = path.join(root, "entries");
const outputPath = path.join(entriesDir, "index.json");

const posts = fs
  .readdirSync(entriesDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const fullPath = path.join(entriesDir, file);
    const markdown = fs.readFileSync(fullPath, "utf8");
    const frontMatter = readFrontMatter(markdown);
    const body = markdown.replace(/^---[\s\S]*?---/, "").trim();
    const fallbackTitle = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "").replace(/-/g, " ");
    const dateFromFile = file.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1] || "";
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");

    return {
      title: frontMatter.title || titleCase(fallbackTitle),
      date: frontMatter.date || dateFromFile,
      description: frontMatter.description || "",
      thumbnail: frontMatter.thumbnail || "",
      slug,
      file,
      readingTime: readingTime(body),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date) || b.file.localeCompare(a.file));

fs.writeFileSync(outputPath, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, outputPath)} with ${posts.length} entries.`);

function readFrontMatter(markdown) {
  if (!markdown.startsWith("---")) return {};

  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return {};

  return markdown
    .slice(3, end)
    .trim()
    .split("\n")
    .reduce((meta, line) => {
      const separator = line.indexOf(":");
      if (separator === -1) return meta;

      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
      meta[key] = value;
      return meta;
    }, {});
}

function readingTime(markdown) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min`;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
