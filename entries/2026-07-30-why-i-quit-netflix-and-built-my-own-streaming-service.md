---
title: Why I Quit Netflix and Built My Own Streaming Service
date: 2026-07-30
description: Local Media Server As a new way of Streaming Service
thumbnail: /assets/thumbnails/tbn.jpg
---

# Streamming in 2026

Hewwo people.

As you can probably guess from the title and thumbnail, today's topic is streaming in 2026. I'm going to talk about the giant corporations that dominate the industry, but more importantly, about the business model behind the services they provide.

First of all...

## What is a Streamming Service?

That's a surprisingly broad question, but for this article I'm referring to subscription-based digital services.

The basic idea is simple: a company gives you access to movies, TV shows, music, games, or software, and in return you pay a monthly fee. This business model has existed for decades, but thanks to the internet and faster connections, it has become the default way of consuming digital content.

At first, this sounded like a fantastic idea. Instead of buying DVDs, downloading files, or waiting for something to air on TV, you could instantly watch almost anything with just a few clicks.

Unfortunately, things didn't stay that simple.

### Is Straming THAT bad?

Not at all.

In fact, streaming was one of the best things that happened to media consumption.

Before Netflix became popular, renting a movie usually meant going to a local video rental store, paying for a DVD, and remembering to return it before getting charged a late fee.

Netflix completely changed that experience. Instead of driving to a store, you could simply open an app and instantly watch the movie you wanted from their servers.

It wasn't just more convenient—it was a better experience in almost every way.

That's why services like Netflix effectively killed the old video rental business. They weren't competing on price alone; they were competing on convenience.

### What changed.

Over the years, streaming services have gradually become worse for consumers.

Back in 2015 or 2016, around $10 a month could get you Netflix's best experience: multiple user profiles, 4K streaming, and access to almost everything the platform had to offer.

Fast forward to 2026, and that same amount of money only gets you a fraction of what it used to. Prices have increased, features have been locked behind more expensive plans, and some services even include ads despite charging a monthly subscription.

This didn't happen by accident.

As more companies realized how profitable streaming had become, every major studio decided to launch its own platform. Netflix was no longer the only option. Disney+, HBO Max, Paramount+, Prime Video, Apple TV+, and many others entered the market, each keeping their own exclusive content.

The biggest problem with streaming today isn't necessarily the price of a single subscription—it's fragmentation.

If you want to watch Breaking Bad, you might need one service. If you want to watch a Marvel movie, you'll need another. Maybe your favorite anime is only available on Crunchyroll, while another movie is exclusive to Max.

Before you realize it, you're paying for four or five different subscriptions just to watch the content you're interested in.

Ironically, streaming became popular because it was more convenient than piracy. Today, many people feel that convenience has disappeared.

## Why I Built My Own Streaming Service

Despite the fact that I don't have a stable income, the reason why I decided to build my own Netflix and Spotify was simple: I missed the feeling of ownership.

This feeling started when I wanted to watch an anime on Crunchyroll (thanks Ivan), but I discovered that they only had the page for that anime — the episodes were not available.

The same thing happened with another series. The episodes were there, but they didn't have Spanish subtitles.

At that point, I realized that the convenience these platforms promise is not always guaranteed. You don't really own anything; you only have access while the platform decides to keep providing it.

To solve this problem, I started downloading anime from different sources, mostly through torrents. Surprisingly, the experience was great. It was simple: find the content, click the torrent, let the download manager do its job, and then watch.

However, I quickly reached another problem.

The process was ugly and repetitive. Every time I wanted to watch something new, I had to repeat the same steps: search, download, rename files, organize folders, and make sure everything was compatible.

Then I asked myself:

**Could I automate this? Could I build a better Netflix for myself?**

I have to say, this was not an easy journey, and I would not recommend doing it to everyone. You have been warned...

# My Own Netflix

To solve the problem of manually searching, downloading, and organizing all the anime I wanted to watch, I started researching possible solutions.

That's when I discovered Jellyfin.

The idea behind Jellyfin is not to compete directly with Netflix, but to recreate the experience of having a modern streaming platform while keeping full ownership of your media library.

I have to admit that before my current setup, I tried building this system three different times. The previous attempts worked, but the results were far from perfect.

Today, after one week of using Jellyfin from scratch, I can say that I am more than satisfied with the experience.

However, Jellyfin does not deserve all the credit.

Jellyfin is only the interface where I watch and organize my content. It does not search for new releases, download files, or automatically organize my library.

For that, I needed the rest of the pieces of the puzzle.

### The PipeLine

To help you visualize how the system works, I want to clarify some things first.

Jellyfin does not include any of these tools. They are external applications that are compatible with Jellyfin, and most of them can also work with other media servers like Plex.

With that said, the pipeline is actually quite simple.

First, a new anime episode is released. **Sonarr** detects that a new episode is available and searches for it through **Prowlarr**, which acts as an indexer manager.

Prowlarr connects to the selected indexers and returns the available releases to Sonarr. Once Sonarr finds the correct release, it sends the download request to **qBittorrent**.

After the episode finishes downloading, Sonarr detects the new file, automatically renames it, organizes it, and moves it into the correct media library folder.

Finally, **Jellyfin** scans the library, detects the new episode, retrieves its metadata, and makes it available to watch.

The entire process happens automatically.

A new episode is released → the system finds it → downloads it → organizes it → and makes it available on my personal streaming platform.

# My Own Spotify

The same problem happened with music streaming.

Spotify has become more expensive over the years, while also introducing more limitations to the experience. Other alternatives like YouTube Music are good, but they still don't have all the music I want.

So once again, I started building my own solution.

I don't want to explain too much about my reasons here because I already talked about my relationship with music and digital ownership in a previous blog entry, so take your time and read it :))

To create my own personal music streaming service, I started looking into **Navidrome**.

Navidrome is an open-source music server that allows you to host your own music library and access it from any compatible client, creating a Spotify-like experience while keeping full control over your files.

Setting it up was surprisingly straightforward.

You mainly need Docker and, if you want to access your music outside your home network, a solution like Cloudflare Tunnel to securely expose your service without opening ports directly.

The initial configuration is simple. You only need to define in your `docker-compose.yml` file where your music library is located. After that, whenever you add new music to that folder, Navidrome can automatically scan and update your library.

For downloading music, I use **Nicotine+**. To make the workflow easier, I configured my music folder on the server as an SMB network share. This allows me to access the folder directly from Windows and download music straight into my server's library instead of manually transferring files over the network.

The result is a personal Spotify-like service where I control the library, the files, and the entire experience.

However, just like Jellyfin, having the server is only one part of the experience. You also need a good client to actually listen to your music.

Navidrome does include an integrated web player, but in my opinion it is not as polished as it could be. To improve the experience, you can search for Navidrome-compatible music players.

For Windows, I recommend **Feishin**. It is a modern and minimalist music player that supports Navidrome and other compatible services. Despite its simple design, it includes many useful options and provides a much better experience than using the default web player.

For Linux, I recommend **Strawberry**. It is an older but reliable music player that supports Navidrome. It is lightweight, easy to use, and works very well, even though its user interface feels a little outdated.
For Android, I don't have a specific recommendation yet, mainly because I haven't done enough research on available clients.

The app I currently use is called **DSub2000**. It allows me to connect directly to my Navidrome server and works correctly, but the interface feels outdated and not very polished.

So, for Android users, I recommend doing your own research and trying different Navidrome-compatible players. I personally haven't had any major issues with DSub2000 so far, but I believe there are probably better alternatives available.


# Final Thoughts

After spending some time with my own streaming setup, I can finally answer the main question:

Was it worth it?

The answer is: yes, but probably not for the reasons you might expect.

If your only goal is to save money, building your own streaming service is probably not the best option. You need hardware, storage, time, and patience. Setting everything up is not as simple as opening Netflix and pressing play.

However, the biggest difference is not the price.

The biggest difference is ownership.

With services like Netflix, Spotify, and other streaming platforms, you are not buying the content. You are only renting access to it. Your favorite movie, album, or anime can disappear at any moment because of licensing agreements, regional restrictions, or business decisions.

With my own server, I have something different. I have control over my library, how it is organized, and how I consume my media.

The funny thing is that I did not build this because I hate streaming services. Actually, I think they were one of the best inventions in modern entertainment.

The problem is that the original idea was lost.

Streaming became popular because it was simple: open an app, search for something, and watch it. Today, that same experience is divided across multiple platforms, subscriptions, and restrictions.

By building my own system, I went back to that original idea, but with one important difference:

This time, I am the one in control.

Maybe this setup is not for everyone, and honestly, I would not recommend everyone to build their own media server.

But if you enjoy learning, experimenting, and having control over your own digital life, self-hosting is one of the most rewarding things you can do.


That it for today, As always Thanks you very much for reading :)))


