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
      labels: frontMatter.labels || [],
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

  const meta = {};
  let listKey = null;

  for (const line of markdown.slice(3, end).trim().split("\n")) {
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && listKey) {
      meta[listKey].push(unquote(listItem[1].trim()));
      continue;
    }

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    listKey = null;

    if (key === "labels") {
      if (!value) {
        meta.labels = [];
        listKey = key;
      } else if (value.startsWith("[") && value.endsWith("]")) {
        meta.labels = value.slice(1, -1).split(",").map((label) => unquote(label.trim())).filter(Boolean);
      } else {
        meta.labels = [unquote(value)];
      }
    } else {
      meta[key] = unquote(value);
    }
  }

  return meta;
}

function unquote(value) {
  return value.replace(/^["']|["']$/g, "");
}

function readingTime(markdown) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min`;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
