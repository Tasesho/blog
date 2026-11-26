---
title: Managing My services With Homepage
date: 2026-11-16
description: Monitoring is Important too!
thumbnail: https://static.wikia.nocookie.net/vocaloid/images/7/7a/Monitoring.jpg/revision/latest?cb=20241123115450
labels: [homelab, monitoring, self-hosting]
---

# Managing My services With Homepage

hewwo people (˶ᵔᗜᵔ˶)ﾉﾞ

---

Have you ever wondered whether your services are actually up and running? Well, that happens to me a lot. Sometimes my server goes down due to internet issues, and other times it's simply because someone disconnected the power. So, I decided I had to do something about it. My solution was to look for monitoring services to keep an eye on my services. Yeah, that sounds confusing... But hang in there, I'll explain everything.

## Why Monitoring Matters

Monitoring is just as important as keeping your **SSH keys safe** or making sure your services have **proper authentication** (especially if they're exposed to the internet). Many people overlook this step, myself included. I've been running my server for about nine months, and I'm only NOW setting up proper monitoring tools. In this case, I'll be talking about **Homepage** and **Uptime Kuma**.

> **A little reminder:** This setup might be somewhat unnecessary if you're only running three or four services. This setup is more suitable for larger homelabs or even production environments.

---

I needed a way to monitor my services because there were times when I tried to access my **Navidrome server**, only to find it was down. The worst part? I had no idea what had happened. Imagine being at university and having to wait around **6–8 hours** just to **FIND OUT** what happened to your server. Well, that actually happened to me.

**The culprit?** My mother had unplugged my server to use the wall outlet.

---

Another issue, and probably a more annoying one, was accessing services that weren't hosted behind my domain. Every time I wanted to access one of them, I had to type something like:

```
http://<ip-of-my-server>:<port>
```

And honestly, remembering the port numbers for **Jellyfin, Sonarr, Radarr, qBittorrent**, and all my other services gets pretty annoying.

So, for the sake of convenience, I decided to give **Homepage** a try.

# Homepage

Homepage describes itself as:

> A modern, _fast_, secure, _fully proxied_, highly customizable application dashboard with integrations for over 100 services.

But, to put it simply, **Homepage is a dashboard** that allows you to manage and access your services from a single webpage. It can integrate with Docker, retrieve information about your running containers, and display useful information through widgets.

For this guide, we'll be using it as a **landing page for our services**. This means you'll have a centralized place to access all your applications without having to remember their IP addresses and port numbers.

> **Important:** Homepage doesn't automatically turn every Docker container into a dashboard entry. You'll need to configure your services manually, using its configuration files.

---

### File Infrastructure

To keep things organized, I recommend creating a dedicated directory for Homepage in your server's main services directory, or wherever you usually manage your Docker projects.

In my case, I'll be using:

```
/home/user/homepage
```

Inside this directory, we'll create our initial `docker-compose.yml` file. Here, you'll declare the **port** you want to use (I recommend sticking with the default port, `3000`) and, most importantly, configure the **volume mappings**.

For my setup, these are the volumes I'm using:

```
volumes:
  - ./config:/app/config
  - /var/run/docker.sock:/var/run/docker.sock:ro
  - /:/host/root:ro
  - /home:/host/home:ro
```

Let's [break them down:](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnE1bWRqMzBybTMwMGNwdHl2Y2IzM3Nqbmt5ZGYzcjh5ZTY1aHNsdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CaHASfbvuIFf88vM3h/giphy.gif)

|Volume mapping|Purpose|
|---|---|
|`./config:/app/config`|Stores Homepage's configuration files on your host machine.|
|`/var/run/docker.sock:/var/run/docker.sock:ro`|Allows Homepage to retrieve information about your Docker containers.|
|`/:/host/root:ro`|Gives Homepage read-only access to the host's root filesystem.|
|`/home:/host/home:ro`|Provides read-only access to the host's home directory.|

> **NOTE:** The last two mappings are optional and depend on which widgets or integrations you intend to use.

You can also configure authentication through an external authentication provider, the built-in Auth (only available on 2.0 version) or a reverse proxy if you want to restrict access to your dashboard.

Finally, you can connect Homepage to a **dedicated Docker network**. This is particularly useful if you intend to integrate other monitoring tools, such as Uptime Kuma, and want your containers to communicate with each other.

# Configs

This section deserves its own space because configuration files are the **core of Homepage**. Long story short, Homepage comes with several different files that you can tweak to customize your dashboard.

Among them, you'll find:

```
bookmarks.yaml
custom.css
custom.js
docker.yaml
kubernetes.yaml
proxmox.yaml
services.yaml
settings.yaml
widgets.yaml
```

I'll be focusing on three of them: `**services.yaml**`**,** `**settings.yaml**`**, and** `**widgets.yaml**`.

### Services

This is where you'll declare all the services you want to display on your dashboard. You can organize them into different groups, creating something similar to separate windows or categories to make your applications easier to find.

In my case, a basic example would look like this:

```
- Media:
    - Jellyfin:
        href: http://<ip>:<port>
```

You can add more parameters, such as **icons, descriptions, Docker container names, or** `**showStats**`.

And the best part? You can reuse this structure for as many services as you want. `Media` is simply the title of the group. I followed the same approach for `Automation`, where I grouped my *arr services, and `Personal Projects`.

I recommeut the offnd checking oicial documentation for more examples and configuration templates: [Homepage – Services](https://gethomepage.dev/configs/services/).

### Settings

This file is where you manage the general appearance and behavior of your dashboard. You can customize things like the **browser tab title, description, language, theme, header style**, and much more.

However, the most important section for my setup was the **layout configuration**. These parameters determine how your service groups are displayed and organized.

Here's what my configuration looks like:

```
layout:
  System:
    style: row
    columns: 3

  Infrastructure:
    style: row
    columns: 3

  Applications:
    style: row
    columns: 3

  Gaming:
    style: row
    columns: 3
```

Basically, this creates a **three-column layout** for each group, allowing the services to be displayed in a more organized grid.

As with the previous file, you can find more examples and customization options in the official documentation: [Homepage – Settings](https://gethomepage.dev/configs/settings/).

### Widgets

Finally, we have widgets. This is where you can display additional information about your server, such as **CPU usage, memory consumption, storage, and uptime**.

Think of it as a small system monitor integrated directly into your dashboard. Nothing too complicated, but incredibly convenient.

My configuration is pretty straightforward. However, by integrating **Glances**, you can customize the information displayed on your dashboard:

```
- glances:
    url: http://glances:61208
    version: 4
    label: Tase Server
    cpu: true
    mem: true
    cputemp: true
    uptime: true
    disk: /
    expanded: true

- resources:
    cpu: true
    memory: true
    uptime: true

- resources:
    label: Storage
    expanded: true
    disk:
      - /host/root
      - /host/home

- datetime:
    text_size: M
    format:
      dateStyle: short
      timeStyle: short
      hour12: false

- search:
    provider: duckduckgo
    target: _blank
```

As you can see, most of these settings are pretty self-explanatory. Perhaps **Glances** is the most confusing one at first, but even that is relatively simple to understand once you get familiar with it.

If you want to explore more possibilities, Homepage has plenty of predefined widgets and integrations. You can find them here: [Homepage – Information Widgets](https://gethomepage.dev/configs/info-widgets/).

# Uptime Kuma

My final addition to this setup was Uptime Kuma. It's an open-source, self-hosted monitoring tool designed to keep track of your services and, most importantly, notify you whenever something goes down.

As described in its official documentation:

> Uptime Kuma is an open-source, free and easy-to-use self-hosted monitoring tool for websites, servers, Docker containers, APIs, and other services.

The configuration process is relatively simple. You just need to create another dedicated directory to hold its `docker-compose.yml` file and deploy the container. Unlike Homepage, most of the configuration is done directly through its web interface.

However, after setting everything up and configuring my monitors, I realized that it added a few extra steps to my workflow that I wasn't particularly interested in maintaining.

I know this might sound contradictory, but for my particular use case, simply accessing my Homepage dashboard allows me to check whether my Docker containers are running and quickly access my services.

Another thing worth mentioning is notifications. If you want to receive alerts directly on your phone or PC, you'll need to configure a notification provider in Uptime Kuma. There are several integrations available, but they require some additional setup.

For now, I decided to keep things simple and stick with Homepage.

# Final Thoughts

As mentioned before, [monitoring](https://www.youtube.com/watch?v=kbNdx0yqbZE&list=RDkbNdx0yqbZE&start_radio=1) is a crucial part of managing a homelab, or even a production server. Even though setting up basic monitoring is relatively simple, I don't know why so many people, myself included, tend to neglect it for so long.

Having a centralized dashboard doesn't solve every problem, but it makes managing your infrastructure much easier. And sometimes, that's all you need to get started.

Anyways, thanks for reading :pp See you next time... ヾ(＾ ∇ ＾)
