---
title: Setting up a Blog
date: 2026-05-19
description: How to set a self-hosted blog.
thumbnail: https://i.imgur.com/Xa1hHVX.png?auto=format&fit=crop&w=900&q=80
labels: [blog, self-hosting]
---

# Setting Up a Blog

Welcome.

In this post, I want to show how I built my own self-hosted blog, why I decided to do it this way, and how you can do something similar without paying monthly fees to a third-party platform.

But before getting into the technical side, it's probably a good idea to explain what a **self-hosted blog** actually is.

## A Little Context

A self-hosted blog is exactly what it sounds like:
a blog running on infrastructure managed by yourself instead of a service like WordPress, Medium, or Substack.

In my case, the goal was simple:
I wanted a lightweight blog where I could write posts in **Markdown**, fully customize the site, and keep complete **control** over everything.

There are many ways to host a blog, but for this setup, I decided to run everything directly from my own computer using self-hosted tools and services.

# What You'll Need

Before starting the blog setup, these are the main tools I used throughout the project.

- **Docker**  
  I used Docker to keep everything containerized and isolated from the rest of my system. It also makes the setup much cleaner and easier to maintain later.

- **VSCode**  
  This became my main editor while developing the blog. You can absolutely use something like NeoVim if that's your thing, but VSCode is simple, reliable, and beginner-friendly.

- **Cloudflare Tunnel**  
  This is optional, but incredibly useful if you own a domain and want to expose your local server to the internet without opening ports manually. If you don't have a domain yet, you can safely skip this part.


# But Why?

As I mentioned before, one of the biggest reasons I wanted to build this blog was control.

I wanted something that actually felt *mine*.

The idea of creating a blog started around April 2025 after talking with one of my university teachers. During that conversation, she mentioned that having a personal blog was a great way to document projects, experiences, and personal growth over time.

That idea stayed in my head for months.

At first, I looked into platforms like Blogger and WordPress, but something about them never fully convinced me. They felt too dependent on external platforms and infrastructure. I didn't want my blog to feel like just another account inside someone else's ecosystem.

I wanted my own space on the internet.

So I started researching different ways to host a blog myself, but at the time, most solutions either felt too complicated or simply didn't click with me.

Eventually, the idea faded for a while.

Ironically, it was through other personal projects that I slowly learned the exact tools I would later need to finally build this blog.

Since I'm part of the GitHub Student Developer Pack, I was also able to get a free domain, which honestly became the final push I needed to stop overthinking and just build the thing.

And if you're curious enough to inspect this page, you might notice that every post is rendered as **HTML**.

Technically, that's true.

But not really.

The posts are actually written in **Markdown** first and later converted into **HTML** through a parser during the build process.


# Building the Blog

## Structure

When I started building the blog, I wanted the entire system to stay as simple as possible.

No APIs.
No databases.
No heavy frameworks.
No unnecessary dependencies.

I wanted something lightweight that future me could still understand without needing to read hundreds of pages of documentation.

So the project ended up being organized into a few simple parts:

- a folder containing all the blog entries written in Markdown,
- a folder for the visible website and frontend files,
- and a small scripts folder with helper tools and `.sh` scripts to automate repetitive tasks.

The structure looked something like this:

```sh
├── docker-compose.yml
├── **Docker**file
├── entries
├── public
└── scripts

```

## Turning Markdown Into a Real Website

One of the biggest inspirations for this blog was the website of [Sammwy](https://x.com/sammwy).

At some point, curiosity won, so I opened the browser inspector and started looking through the page structure to understand how everything worked underneath.

What surprised me was realizing that most blog entries were ultimately rendered inside an `index.html` page.

After doing some research, I discovered the actual process behind it:
parsing Markdown into HTML.

The idea is surprisingly simple.

Instead of writing every post directly in HTML, the content is first written in Markdown. Then, during the build process, a parser converts the Markdown into HTML and injects it into a page template automatically.

Because of that, every post follows the same structure while still being incredibly easy to write, edit, and maintain.


## Understanding the Project Structure

The project is separated into different folders, and each one exists for a specific reason.

At first, the structure looked a little excessive for such a small blog, but over time it made the whole workflow much easier to maintain.

- **Entries**  
  This folder contains every Markdown file used as a blog post.

  It also includes the `index.json` file, which acts as the main source of information for the frontend. Without it, the homepage would have no idea what posts exist, even if the Markdown files are still there.

- **Public**  
  Inside this folder are the three main components of the website:
  
  - `index.html`
  - `styles.css`
  - `app.js`

  The HTML and CSS handle the visual side of the blog, while `app.js` contains the logic responsible for rendering posts, loading content, and making the page interactive.

- **Scripts**  
  This folder contains some helper scripts that became essential for the workflow.

  The most important one is `build-index.js`.

  Its job is not only to generate the `index.json` file, but also to extract metadata from the Markdown files through the front matter section.

  During that process, the script also calculates extra information such as:
  - reading time,
  - generated slugs,
  - dates,
  - and post metadata.

  This script basically became the heart of the entire blog structure.

> Front matter is the metadata section usually placed between `--- ---` at the beginning of a Markdown file.

The second script is `**new-entry.sh**`.

This small shell script automatically creates a new **Markdown** post using the title provided in the command.

```sh
./scripts/**new-entry.sh** "title to a new entry"
```

It sounds simple, but removing tiny repetitive tasks like this makes writing feel much smoother over time.

- **Root Files**  
  The remaining files in the root directory are mostly configuration files for **Docker**, **Cloudflare Tunnel**, and general project documentation.


## Final Thoughts

This project taught me a lot of things, but one of the biggest lessons was realizing how useful **automation** and scripts can be in a modern workflow.

Using scripts doesn't make you "less of a developer".

If anything, it makes you better.

Saving time on repetitive tasks means having more time to focus on the things that actually matter. And in real-world environments, especially in companies or collaborative projects, time matters a lot more than people sometimes realize.

More importantly, this blog gave me something I didn't really have before:
my own space on the internet.

A place where I can share projects, ideas, experiences, technical guides, or simply write about whatever is happening in my life at the moment.

And honestly, that's probably my favorite part of the entire project.

As always, thank you very much for reading :)))
