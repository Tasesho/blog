---

title: How I Use a Reverse Proxy to Manage My Homelab

date: 2026-08-20

description: Cloudflare is really a nice tool...

thumbnail: /assets/thumbnails/cloudflare.jpg

---

# How I Use a Reverse Proxy to Manage My Homelab

Hewwo people :)

It has been a while since I made an update to my homelab, so I thought it was time to talk about what has changed, what services I am currently running, and why I decided to use a **reverse proxy**.

The reason I wanted to write about this is pretty simple: if you want to run an online **service**, such as a notes application or a music server, you need a way to make that service accessible from the Internet.

With that said, let me show you what my current setup looks like.

| Service   | Function                                  | Behind Proxy? |
| --------- | ----------------------------------------- | :-----------: |
| Jellyfin  | Local multimedia server                   |       No      |
| Navidrome | Local music server                        |      Yes      |
| Trilium   | Notes + Notion-like application           |      Yes      |
| Blog      | Blog for sharing thoughts and tech essays |      Yes      |
| Miki-Bot  | Discord Bot                               |  No (almost)  |

## A Small Explanation

I'll quickly explain what services I'm running and why.

### Jellyfin

**Jellyfin** is a local multimedia server that I use to watch anime and other media.

It's important to clarify that I **do not expose it to the Internet**. One of the reasons is that Cloudflare's proxy infrastructure has limitations around certain types of heavy traffic, especially long-running media streams.

Streaming a lot of video through this kind of setup is simply not what I want for my homelab. I prefer to keep Jellyfin accessible only from my local network.

### Navidrome

**Navidrome** is my local music server. However, music streaming is considerably lighter than video streaming, so this is a much better fit for my reverse-proxy setup.

I currently run Navidrome behind my proxy, and I can access it through a URL such as:

`music.mydomain.com`

This URL can also be used with different clients that support the **Subsonic API**, which makes Navidrome particularly convenient for me.

### Trilium

**Trilium** is my most recent addition to my homelab.

It's a note-taking application with some features that remind me of Notion. I added it because I don't usually carry a notebook or laptop with me, so when I'm at university, I often have to rely on the computers available in class.

Because of that, having my notes available online is extremely convenient. I can access my notes through a URL such as:

`notes.mydomain.com`

This makes my notes available from practically anywhere without having to carry another device around.

### My Blog

And then there is this blog. xD

I've already written an entry explaining how I set up my blog, so if you're interested, you can check it out:

[Setting Up a Blog](https://blog.tasedev.me/#/post/setting-up-a-blog)

The blog is also exposed through a domain and managed through my proxy setup.

### Miki-Bot

**Miki-Bot** is a special case.

Discord bots don't need a traditional reverse proxy in the same way that a web application does. Instead, the bot communicates directly with the **Discord API**.

So, if you're developing a Discord bot, you generally don't need to put it behind a reverse proxy or expose a web port to the Internet just for the bot itself.

There are exceptions, of course, especially if your bot also provides a web dashboard, webhook endpoint, or another HTTP service. But for the bot itself, a reverse proxy isn't necessary.

---

As you can see, I'm running quite a few services. I only mentioned the main ones here.

In my current server, everything is running through **Docker**, which makes managing my services much easier and keeps them isolated from the rest of my system.

Each service also has its own corresponding directory inside my home directory (`~`), which keeps everything organized.

Since I took an AWS course as part of my major, I also had the opportunity to learn more about **Linux system administration**. Because of that, things like managing permissions, creating users, and installing packages are relatively straightforward for me.

However, as the number of services on my server increased, another problem started to appear:

**How do I expose all of these services without having to manage a bunch of different ports?**

And that's where the reverse proxy comes in.

# Reverse Proxy

Before anything else, we need to understand a few things about how networks work (that rhymed xD).

When you click on a webpage, your browser is essentially requesting a resource from a server. To reach that server, your request needs an **IP address** and a **port**.

You've probably seen something like this before:

`localhost:8080`

But before we get into that, let's talk about IP addresses.

An IP address is basically an identifier used to locate a device on a network. There are different kinds of IP addresses, but for this article, I'll only talk about **IPv4** and ignore IPv6.

I'm pretty sure you've seen this before:

`192.168.0.1`

That's an example of a **private IPv4 address**, commonly used inside local networks.

> **Small clarification:** an IP address is not a "mask". An IP address identifies a device or network interface, while a subnet mask defines which part of the address represents the network and which part represents the host.

## Ports

Ports are probably one of the most important concepts in the networking ecosystem.

A port allows a device to run multiple network services at the same time. Instead of having only an IP address, you can think of the combination of an IP and a port as a more specific destination.

For example:

`192.168.0.10:8080`

This means:

* `192.168.0.10` → the device
* `8080` → the port where a service is listening

There are also **well-known ports** that are commonly associated with specific protocols:

* `22` → SSH
* `80` → HTTP
* `443` → HTTPS
* `53` → DNS

However, a port is not permanently locked to a specific protocol. You *can* technically run a web server on port `22`, for example.

The problem is that doing so would make things confusing. If SSH is normally expected to be listening on port `22`, running a web server there means you wouldn't be able to use SSH on that port at the same time.

A port can generally only be occupied by one service at a time for a given network interface and protocol.

## `localhost:8080`

Ahh, if I had a penny for every time I shared a `localhost:8080` link, I would have like three coins.

It's not much, but it's concerning that it has happened three times. xD

`localhost` is a special hostname that refers to **the machine you're currently using**.

So when you access:

`localhost:8080`

you're basically saying:

> "Connect to port 8080 on this machine."

This distinction is extremely important:

**"This machine" != "this network"**

If I start a web server on my computer and it listens only on `localhost:8080`, I can access it from my own computer, but another device on my network usually won't be able to access it.

For example, if my computer has the address:

`192.168.0.10`

and my web server is listening only on:

`127.0.0.1:8080`

another device trying to access:

`192.168.0.10:8080`

won't reach that service because the application is only listening on the loopback interface.

This is one of the reasons why `localhost` is so useful during development: you can run a service without immediately making it accessible to the rest of your network.

## Forward Proxy vs. Reverse Proxy

Now that we understand IP addresses, ports, and `localhost`, we can finally talk about proxies.

A **proxy** is basically a server that sits between a client and another server.

The important question is: **who is the proxy representing?**

This is where the difference between a **forward proxy** and a **reverse proxy** comes in.

### Forward Proxy

A **forward proxy** sits between the **client and the Internet**.

Instead of connecting directly to a website, the client sends its request to the proxy. The proxy then makes the request on behalf of the client.

From the perspective of the destination server, the request comes from the proxy rather than directly from the original client.

This can be useful for things such as:

* Hiding the client's IP address
* Filtering outgoing traffic
* Caching resources

A common example would be a company using a proxy to control the Internet access of its employees.

In this case, the proxy is mainly concerned with **outgoing traffic**. The client is the thing we are trying to protect or control.

### Reverse Proxy

A **reverse proxy** works in the opposite direction.

Instead of representing the client, it represents the **server**.

Imagine that I have several services running on my homelab:

`localhost:3000` → Trilium
`localhost:4533` → Navidrome
`localhost:8080` → My Blog

Technically, I could expose each of these services using different ports.

For example:

`mydomain.com:3000`
`mydomain.com:4533`
`mydomain.com:8080`

But this quickly becomes annoying.

I would have to remember which port belongs to which service, and I would also have to expose multiple ports to the Internet. This is where a reverse proxy becomes useful.

Instead, I can use different hostnames:

`notes.mydomain.com`
`music.mydomain.com`
`blog.mydomain.com`

The reverse proxy receives the request and determines which internal service should handle it. From the user's perspective, everything looks like a normal website. The internal services don't need to be directly exposed to the Internet.

This also gives me a single place to handle things such as:

* HTTPS
* Domain names
* Authentication
* Access control
* Routing
* Logging
* Rate limiting
* Caching

So, while a forward proxy is mainly concerned with **protecting or controlling clients**, a reverse proxy is mainly concerned with **protecting and managing servers**.

And this is exactly the kind of architecture that makes sense for a homelab like mine.

## Why I Use a Reverse Proxy

At this point, you might be wondering:

**Why not just open a port for every service?**

Well... technically, I could.

I could forward port `3000` from my router to Trilium, another port to Navidrome, another one to my blog, and so on.

But since I live in **Chile**, port forwarding can be surprisingly complicated if you're a regular home user like me. Depending on your ISP and connection, you may not have direct control over inbound connections, or you may have to request changes from your provider. In my case, getting that kind of configuration would require a formal request to my ISP.

So my solution was simple:

**A reverse proxy... and a domain.**

The domain name tells the proxy which service I want, while the proxy takes care of the internal networking. This also means that I don't have to expose every Docker container directly to the Internet.

## How This Fits Into My Homelab

My services are running inside Docker containers, and most of them are only useful to me. For example, Navidrome doesn't need to know anything about the Internet. It only needs to provide its web interface and API. The same applies to Trilium and my blog.

The proxy becomes the public-facing part of my infrastructure, while the actual services can remain inside my server.

In my case, I use **Cloudflare** as part of this setup. Cloudflare handles the public side of my domains, while **Cloudflare Tunnel** provides the connection between Cloudflare's infrastructure and my homelab.

This is particularly convenient because I don't need to expose a large number of ports on my router. Instead, the `cloudflared` service running on my server establishes an outbound connection to Cloudflare.

The important part is that my individual services don't need to be directly reachable from the public Internet. Cloudflare receives the request for a hostname, the tunnel connects that request to my server, and the appropriate service handles it.

The best part is that I only need **a single tunnel for all my services**.

The setup I use isn't necessarily the best practice for every environment, but for a homelab or small personal project, I find it incredibly convenient.

All I need to do is configure my Cloudflare Tunnel and define the hostnames and the services they should point to. For example:

`music.mydomain.com` → `http://localhost:4343`

Once everything is configured, I don't really have to think about ports anymore. I just remember the hostname:

`notes.mydomain.com`

`music.mydomain.com`

That's it.

It's a centralized configuration that lets me manage multiple services through a single tunnel instead of creating a separate tunnel for every application.

## A Few Things I Don't Put Behind the Proxy

Of course, not everything in my homelab needs to be publicly accessible. This is an important distinction. Just because I *can* expose a service to the Internet doesn't mean I *should*.

For example, **Jellyfin stays inside my local network**.

I don't need my entire media library to be publicly accessible, and streaming large amounts of video traffic through this kind of infrastructure isn't something I want to deal with. Other services, such as my Discord bot, don't need a reverse proxy at all. The bot communicates with Discord through the Discord API, so there is no reason to expose a web server just for the bot.

This gives me a fairly simple rule for my homelab:

> **If a service needs to be accessed from the Internet, I consider putting it behind the proxy.**

> **If it only needs to work locally, I keep it local.**

This keeps the number of publicly accessible services relatively small while still allowing me to access the things I actually need from anywhere.

And that's basically why the reverse proxy became such an important part of my homelab. It isn't just about making the URLs look nicer. It gives me a central place to manage how my services are exposed, while allowing the actual applications to remain isolated inside my server.

For a small homelab, that's a pretty good deal.

# Final Thoughts

For sure, a reverse proxy is a pretty powerful tool in server administration. If you're interested in homelabbing, networking, or self-hosting, there's a good chance you'll eventually run into one.

The thing I like about reverse proxies is that they can look intimidating at first, but the basic idea is actually pretty simple: **receive a request, figure out where it needs to go, and send it to the appropriate service.**

In my homelab, that simple idea lets me access everything from a small blog to a music server and a personal notes application, all through clean domain names instead of a collection of random ports.

From a small personal webpage to enormous music collections, it's all just traffic being redirected to the right place.

Such a beautiful little piece of infrastructure.