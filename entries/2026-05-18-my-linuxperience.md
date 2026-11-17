---
title: My Linuxperience
date: 2026-05-18
description: How I introduced myself into linux
thumbnail: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSE-7pwAKFIFJ0VuM3O-SC-WOxYiFA61adug&s
---

# My Linuxperience


Back in September 2025, while I was studying **computer science** at university and carrying my laptop around every day, I had my first real approach to Linux.

I already knew Linux existed, of course, but I never felt interested enough to actually try it. In my mind, Linux was something people used for **work** and **development**, not for everyday use or gaming.

Then one day I came across a video about Linux customization, and that completely changed the way I saw it. Suddenly, Linux didn't look like a boring programmer-only operating system anymore. It looked personal, flexible, and actually fun to use.

That curiosity was enough to make me give it a try.

## The Terminal Rabbit Hole

While I was still using Windows, I started developing more frequently. At some point, the VSCode Git UI stopped being enough, so I slowly began using the terminal instead.

Everything there felt unfamiliar. **Commands** looked **intimidating**, and most of the time I barely understood what I was doing. It felt like opening the door to a completely different side of **computers**.

During one conversation with a friend, he told me:

> "If you want to really learn how computers work, you NEED to try Linux."

That sentence stayed in my head for a while.

### My First Linux Install

As a complete newcomer to the **Linux** environment, **Linux Mint** felt like the safest place to start.

I already had some experience installing Windows, so getting through the installer and learning about **GRUB** wasn't too difficult. At first, everything actually seemed easier than expected.

Then I ran into the first real obstacle of the journey:

**disk partitions.**
.

### The Part Nobody Mentions

The main issue was that I couldn't format my disk because Windows had it encrypted. Unless I went back to Windows and disabled the encryption, installing Linux simply wasn't possible.

Once that was finally solved, I got introduced to Ubuntu's **GNOME-based** environment for the first time. I ended up choosing the **MATE** flavor because the website described it as a good option for people who already know what they want from their computer.

Since Ubuntu was also known for being easy to install and beginner-friendly, choosing one of its flavors felt like the safest decision at the time. Looking back, I think I made the right choice.

### Trouble

Ubuntu felt... fine, I guess, but it wasn't what I expected. The whole experience reminded me of a cheaper version of macOS, and after around two weeks, the excitement started fading away.

That feeling of discomfort never really disappeared, but university was taking most of my time anyway. Between classes, assignments, and carrying my laptop around every day, Linux slowly became something sitting in the background rather than the main focus.

Then, almost without noticing, two months passed.

And then **December 2025** arrived.

### A New Challenger Appears: Arch Linux

Around the middle of December, I found a video about ricing — yeah, *ricing*, not racing.

The whole idea was about customizing your system and turning it into something personal. Some setups even reminded me of those old Windows XP and Windows 7 Frutiger Aero styles that older users probably remember.

That was the spark I needed to fall straight into the ricing rabbit hole.

And in almost every single video, there it was:

the infamous, loved and hated, **Arch Linux**.

### Arch Takes the Advantage

My history with Arch is curious, to say the least.

Usually, when someone wants to learn something difficult, they start with the easy stuff first so the harder parts become manageable over time.

That was definitely not my case.

After using Linux for barely two weeks, the only thing I really understood was that there was a terminal and there was a graphical interface. Most people seemed to use a mix of both: installing programs through the terminal while keeping customization and settings inside a UI.

Then Arch Linux completely broke that idea.

When I first installed Arch — thanks to a **PewDiePie** Linux video, of all things — I had absolutely no idea what kind of rabbit hole I was getting into.

At first, everything felt confusing and intimidating. The system expected me to actually understand what I was doing instead of just clicking buttons and moving on.

But little by little, that feeling of fear and confusion started turning into fascination and curiosity.


### Arch...

Entering Arch for the first time felt intimidating.

After logging into the system, there was... basically nothing. Just a dark terminal staring back at me.

Of course, I couldn't leave things like that, so I started researching everything I could. Most of what I learned came from **YouTube tutorials** — shoutout to Bog and his Arch Linux experience video.

Little by little, the system finally started becoming usable.

That was also the moment I discovered the difference between Desktop Environments (DEs) and Window Managers (WMs). Following a tutorial, I ended up installing **Hyprland**, a tiling window manager that looked incredibly modern compared to anything I had used before.

At that point, my setup was still pretty basic: SDDM, Hyprland, SwayNC, and a few default Wayland tools for customization.

Then I ran into another huge wall:

editing **dotfiles**.

### The Dotfiles Rabbit Hole

To keep things simple, dotfiles are configuration files that Linux systems usually keep hidden by default because their names start with a dot, like this:

```sh
.hyprland
```

That folder contains most of Hyprland's **configuration files** and settings. At the time, this whole concept was completely new to me.

During my first attempts at using Arch and installing things on my own, **everything was broken**. Half the system barely worked, some configs were missing, and most of the time I had no idea what I was doing wrong.

Eventually, I found a script-based setup called **Jakoolit Arch Install**. It came with Hyprland, login customization, preconfigured dotfiles, and a lot of quality-of-life tweaks already done for you.

For the first time, things actually worked.

But at the same time, it also felt wrong.

Even though the system looked amazing, it didn't really feel like *my* setup. I was using someone else's configurations without understanding how anything worked underneath.

Still, I kept using it for around a month while learning everything I could before reinstalling Arch and trying to do things properly this time.

And that's when I met what would become my greatest ally while using Arch Linux:

the glorious **Arch Wiki**.

# Let's Get More Technical

So far, I wanted this page to stay easy and comfortable to read, but it's impossible to talk about Arch Linux without getting at least a little technical.

So here we go.

## What Is Arch Linux?

Arch Linux is a Linux distribution built around the **KISS** philosophy.

No, not the band.

It stands for:

> Keep It Simple, Stupid.

The idea behind Arch is to keep the system minimal and simple instead of hiding everything behind layers of automation. Rather than giving users a fully preconfigured experience, Arch expects them to build their own environment piece by piece.

Because of that, Arch has a reputation for being difficult compared to beginner-friendly distributions like Ubuntu or Linux Mint.

Personally, I wouldn't say Arch is *hard*.

What it really demands is time, patience, and a willingness to read documentation. Arch is the kind of distro made for people who genuinely want to understand and control their system.

The downside is that this level of freedom also means you can completely break your installation with a single bad command if you don't know what you're doing.

## The Arch Community

The Arch community is... strange, to say the least.

On YouTube, I found a lot of creators encouraging people to try Arch as a way to learn more about Linux and how computers actually work underneath the surface.

In many ways, Arch feels like a distribution made for technology enthusiasts.

Reddit, on the other hand, was a completely different experience.

Almost every post had someone replying with:

> "Did you check the wiki?"

or simply:

> "Read the wiki."

At first, that attitude felt frustrating. Sometimes it honestly came across as gatekeeping instead of helping.

But after spending more time with Arch, I started understanding *why* people kept saying it.

The Arch Wiki is genuinely one of the best technical resources I've ever used. Almost everything is documented in detail, and most problems already have an explanation somewhere inside the wiki.

Outside of Reddit, though, the Arch ecosystem has one of the strongest communities I've seen.

One of the best examples is the **AUR** — the Arch User Repository.

The AUR is a massive community-driven repository where users can share packages and installation scripts for software that isn't officially included in the default repositories.

From browsers like Brave to tools like Prism Launcher, almost everything I wanted was already there.

Honestly, coming from Windows, this felt revolutionary.

No more downloading random `.exe` installers from sketchy websites or searching through outdated forums just to install programs.

Everything was centralized, accessible, and surprisingly easy to manage.

## Pacman and the AUR

Arch Linux uses a package manager called **pacman**.

And yes, the name comes from **PAC**kage **MAN**ager, not the game.

Pacman handles installing, updating, and removing software directly from the terminal. Combined with the AUR, it creates one of the most complete software ecosystems I've personally used.

To this day, I've rarely had problems finding software on Arch.

Most of the time, if something exists for Linux, someone has probably already packaged it for the AUR.

# Technical Descent Into Madness

## Dotfiles and Customization

I know I already talked a little about dotfiles before, but this is probably the moment where Linux truly started making sense to me.

In the Jakoolit Arch setup, most of the configuration files were already prepared and ready to use. Everything looked polished from the beginning.

But in a fresh Arch installation, things are completely different.

There is no magical setup waiting for you. Most programs either generate their config files after the first launch or expect you to create and edit them yourself.

At first, this felt terrifying.

Then it became addictive.

A dotfile is usually just a hidden configuration file that starts with a dot, like this:

```sh
.hyprland
```

Inside those files lives almost everything that makes your system feel personal:
- wallpapers,
- keyboard shortcuts,
- animations,
- bars,
- themes,
- startup apps,
- window behavior,
- audio controls,
- and basically your entire workflow.

For the first time, it felt like the operating system actually belonged to me.

## Ricing Everything

Once I discovered customization, I completely fell into the ricing rabbit hole.

For people outside Linux communities, "ricing" means heavily customizing your desktop environment or window manager to make it look and behave exactly the way you want.

And honestly, some people take it *very* seriously.

I spent hours changing tiny details that nobody else would probably notice:
- window gaps,
- terminal transparency,
- blur effects,
- fonts,
- animations,
- colors,
- login screens,
- and bars.

It sounds ridiculous now, but there was something incredibly satisfying about slowly building a setup that felt uniquely mine.

At some point, the computer stopped feeling like a generic machine and started feeling like a personal workspace.

## Hyprland and Window Managers

One of the biggest discoveries during this phase was **Hyprland**.

Unlike traditional desktop environments, Hyprland is a tiling window manager. Instead of opening windows freely like Windows usually does, applications automatically organize themselves across the screen.

The first time I used it, my brain almost exploded.

Opening multiple apps no longer meant dragging windows around manually. Everything snapped into place automatically.

At first, it felt uncomfortable and confusing.

Then suddenly it became hard to go back.

**Hyprland** was also my introduction to **keyboard-driven workflows**. Instead of relying on the mouse all the time, almost everything could be controlled through shortcuts:
- opening applications,
- switching workspaces,
- moving windows,
- launching scripts,
- controlling audio,
- and even changing monitors.

It genuinely changed the way I interacted with my computer.

Of course, Hyprland also comes with its own problems.

Since it's based on Wayland, some applications can behave strangely, especially Electron apps or older software designed around X11.

That led me into another Linux rabbit hole:
**Wayland vs X11**.

And trust me, Linux users *love* arguing about that.

## **KDE**, **GNOME**, and the Endless Linux Debate

At some point, I also discovered the two giants of the Linux desktop world:
**KDE** and **GNOME**.

**KDE** felt closer to Windows. It was flexible, feature-rich, and familiar enough that almost anyone could start using it immediately.

**GNOME**, on the other hand, felt cleaner and more minimalistic. Its workflow reminded me a lot of macOS, which is probably why so many people love it.

Linux users love debating which one is better.

And honestly?

They will probably continue arguing about it forever.

The funny thing is that Linux communities eventually stop judging you for your distro and start judging you for your window manager instead.

Well...

fake. They still judge both.

# The Real Arch Experience

## Breaking Everything

**Arch Linux** would never be this famous if it wasn't also incredibly easy to break.

Because Arch follows a **rolling release model**, updates arrive constantly. New kernels, drivers, packages, or system changes can sometimes break things unexpectedly.

Unlike distributions like Ubuntu with slower and more stable release cycles, Arch always tries to stay at the front line of software updates.

And sometimes that means suffering.

But honestly?

Nothing teaches faster than failure.

Most of what I learned came from breaking my own system and trying to fix it afterward.

Sometimes the problem was huge.

Sometimes it was just a missing semicolon.

After reinstalling Arch multiple times, something interesting started happening:
I slowly stopped making the same mistakes.

By the third reinstall, I finally felt like I understood what I was doing.

That was also the moment I created my first real rice, inspired by the anime *The Ancient Magus' Bride*.

For the first time, the system felt stable, personal, and completely mine.

## Learning Through the Terminal

Using Arch also forced me to become comfortable with the terminal.

At first, the black screen felt intimidating.

Now it feels normal.

Updating the entire system eventually became part of my routine:

```sh
sudo pacman -Syu
```

And honestly, there is something weirdly satisfying about managing your entire operating system from a single command.

**Pacman**, combined with the **AUR**, made software management feel incredibly clean compared to my old Windows workflow of downloading random installers from dozens of websites.

## The Arch Mindset

If you ever decide to install Arch Linux, don't be afraid of breaking things.

Seriously.

Break the system.
Reinstall it.
Fix it.
Read documentation.
Fail multiple times.

That's probably the best way to learn.

Over time, Linux stopped feeling like some mysterious hacker operating system and started feeling like a tool I actually understood.

More importantly, it changed the way I approach technology in general.

Instead of being scared of problems, I became curious about them.

And I think that's the biggest thing Arch Linux taught me.

# Where I Ended Up

Currently, I'm using **CachyOS**, an Arch-based distribution focused on performance and usability.

At this point, I simply don't have the same amount of free time or energy to constantly repair my system every time something breaks.

CachyOS gives me a balance I really like:
- the flexibility of Arch,
- the power of the AUR,
- and a much more stable daily experience.

It still feels customizable and lightweight, but without needing to rebuild everything from scratch every few weeks.

Looking back, Linux became much more than just an operating system for me.

It taught me how to research, troubleshoot, read documentation, and understand my computer beyond simply using it.

And honestly, if you're interested in technology, programming, or computers in general, sooner or later you will probably run into Linux too.

So don't be afraid of trying it.

Start with something beginner-friendly or jump directly into chaos like I did.

Either way, the experience will teach you something.