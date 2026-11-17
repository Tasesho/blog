---
title: I Swear This is the Last Distro
date: 2026-11-01
description: This time I bring you my experience on Garuda Linux :)
thumbnail: /assets/thumbnails/garuda.jpg
---

# I Swear This is the Last Distro

Hewwo :)

It's been a while! This time, I bring you a little tutorial and my experience installing and using **Garuda Linux**. So, let's hop into it.

## Garuda Linux

Garuda is a Linux distribution based on **Arch Linux**. This means it follows the same philosophy while adding, removing, or modifying some of its features. In this case, it keeps the **rolling release model** and minimalism, but adds its own kernels and configurations. Pretty similar to CachyOS.

After looking around the Garuda website, I downloaded the **Garuda Mokka** ISO file. Unlike CachyOS and other distributions, where you can select which WM or themes you want during installation, Garuda comes with everything pre-installed.

The Mokka flavor uses a **Catppuccin theme** and comes with a fully customized KDE setup. It uses its own wallpaper, DOCK, and terminal customization. Obviously, we're going to change a good part of this.

But before we start with the step-by-step...

## Void Linux??

Yeah, before deciding to install Garuda Linux, I was choosing between Void and Garuda.

Well, short story: Void has a unique presentation. It's very advanced, in my opinion, simply because it has its own package manager and "compiler", or builder, to put it better.

They're called `xbps` and `xbps-src`. This means they have their own repositories. They also support C libraries such as **musl** and **GNU libc**.

They also got rid of **systemd** and replaced it with their own init system, called **runit**.

Honestly, I think it's pretty interesting to go down that rabbit hole, but I need my PC to work and help me study every day, so distro-hopping isn't something I really need right now. Anyways, it will definitely be my next distro when I have some free time.

## Installation

The installation process is pretty simple, nothing out of the ordinary. Just download the flavor you want from Garuda's downloads page. As I already mentioned, I chose the **Mokka flavor**.

Then, you should flash it onto your bootable USB and boot from it through the BIOS. In my case, I used **Ventoy**, simply because I'm used to it and I like collecting distros and ISO files on it.

The next step is to run the installation script located on the desktop.

Something I really like about Linux distributions is that you can test them before installing them, using the **Live USB** environment.

Here, I discovered **FireDragon**, a Firefox fork. It's pretty similar to LibreWolf, but not as extreme. By this, I mean you can keep your passwords, history, etc., while still being able to get rid of telemetry.

I've been using it, and so far, it works really nice.

Once the installation script has finished, restart your PC and boot from the drive. Then, your Garuda Linux installation should be ready!!!

## The First Boot, and First Impressions

On the first boot, hopefully, everything worked out of the box. Everything worked as it should.

I didn't really like the behavior of the floating windows, so I removed the animations and did some tinkering, like making the remaining animations faster, setting up some keyboard shortcuts, and installing my apps.

## Gaming Experience

I should play the lottery because, once again, I didn't encounter any **new** problems!

I tried **Minecraft** using PrismLauncher, with optimization mods and some demanding mods as well. I got an average of **144 FPS**.

On the competitive side, I downloaded **Overwatch**, but this is where the problems started. There's an unusual bug where, I think, there are memory leaks when using DX11. This suddenly makes Overwatch crash, and killing the process doesn't solve it, so you'll have to restart your entire PC.

After doing some tinkering (again), the problem was solved by using some special launch options on Steam.

The next game I tested was **Satisfactory**, and once again, everything worked as it should. Sadly, my GPU isn't the best, so I can only play it on low graphics...

Finally, I tried a **Castlevania** game for the first time in my life! I played *Symphony of the Night* on an emulator. I used DuckStation, and the performance was exquisite.

I'm looking forward to completing the game.

## Development and Study

In this section, I want to talk about my coding performance, using AI, and taking notes.

Starting with the study section, I installed the **LibreOffice** suite, and it worked pretty well. No issues, just the typical format conversion problems. Aside from that, Google Docs and Presentations run in the cloud through a browser, so you should be fine.

### Coding (^x^)

Here, the terrain gets messy.

First, I messed up the installation of **VSCodium**. Instead, I downloaded `vscode-bin` from the AUR repository. It's the unofficial version of VS Code by Microsoft.

However, VSCodium is another program. It also tries to be a substitute for VS Code, but instead of being a clone, I **feel** like they're trying to build their own community-driven version of VS Code.

Aside from that, the experience is wonderful. Whenever I want to open it, it launches so fast compared to Windows.

After customizing it a bit, it's pretty comfortable to study and develop my own projects.

Finally, I've recently started developing using **Codex** and the latest model, **GPT-6**. Aside from the fact that I've only been using it for about a month (thanks to the free ChatGPT Plus trial), the experience has been great right out of the box.

Just install the `openAI.codex` package, and you should be fine.

#### **VSCodium JSON Config**

Since I tend to distro-hop, one of my biggest issues has always been forgetting to back up my customizations. Well, this time, that's going to change!!
I've already uploaded my JSON configuration file and extensions list to a repository [here](https://github.com/Tasesho/Vscode-config.git).
I bet this will save me quite some time in the future :pp

## Ricing (x-x)

To start with this, I must say that **Garuda Linux is already a pretty well-customized distro**, especially if you've chosen the Mokka flavor or the GNOME one.

Because of that, my ricing will take a lot less effort. So, I'll list the most remarkable modifications I made.

### 1. Forked System24 Discord Theme

As I said before, I used AI to modify some things and develop a few projects. This was one of them.

I used the **System24 Discord theme** and modified its colors and borders to match the same colors as this blog.

### 2. Installing Matuwall

**Matuwall** is a wallpaper switcher that uses specific backends to make it work.

I mention this because I was trying to make it work until I finally read the documentation. You should use the `-b` flag, followed by the backend you want to use. In this case, **Plasma**.

After successfully running the Matuwall switcher, I needed to add a shortcut so I wouldn't have to open the terminal and type the whole command every time.

First of all, I edited the configuration file, specifically the backend attribute. I added `plasma` instead of `awww`, which comes by default.

After that, I opened the shortcuts menu in KDE and added **Super + K** as the shortcut. Super means the Windows key btw!!

### 3. Wallpapers Directory

This one is pretty easy. Just map the Matuwall directory to Pictures/Wallpapers, and voilà!

In my case, I already had a repository with wallpapers, so I cloned it into this directory, and I was ready to use the tool.

### 4. Fonts

One of the most important customizations you can make is changing the fonts in your system.

Personally, I love the **Iosevka Mono** and **JetBrainsMono Nerd Font** fonts.

Just install those two, change them in your browser and KDE configuration, and enjoy!

### 5. Terminal

Garuda already comes with a customized terminal, but I don't really like it, so I installed my favorite terminal: **Alacritty**.

I especially like it because of its `.toml` configuration file. It's so much easier to edit!

Then, I modified **Fastfetch**, using my favorite ASCII art and colors.

I also use **Fish** as my shell. I like it more than Oh My Zsh.

After customizing everything, I feel much more comfortable in this new environment.

## **1 Week After...**

This part is actually being written a week after installing everything, and so far, I've had **NO issues** using this distro. But anyways, I want to share a few things about the user experience.

Before switching to this distro, I was pretty much a purist when it came to desktop animations. I went from disabling animations on Windows to using instant animations on KDE. Well, that has changed quite a lot!!

First of all, KDE has a default animation speed setting that you can adjust. This time, since Garuda already comes pretty well customized, I decided to keep the animations just for the sake of aesthetics. And honestly, I was missing out on so much **quality of life** by not using them!!

This whole thing goes back to my first days using a PC. As you may know, Windows is horribly optimized, to the point where it uses half your RAM just by being IDLE.

One of the easiest ways to get a noticeable performance boost is to change the performance settings in the Advanced System Settings panel. I've been doing that since around 2018, simply because it gives the system a smoother feel.

Well, on Linux, the whole situation changes. While IDLE, with everything fully customized, animations and all, my system uses just **1.7 GB of RAM**.

**AMAZING numbers.**

## **Final Thoughts**

What a wonderful experience I've had using this distro! But I think the most important thing is that I actually had fun discovering Garuda Linux.

This distro has quickly become **one of my favorite Linux distributions**. As you've already read, **0 issues, 0 weird problems**. Just plug n' play! And even after tinkering with it and modifying configuration files, it keeps working amazingly well. I'm pretty sure Garuda will climb up the DistroWatch [Popularity Rankings](https://distrowatch.com/dwres.php?resource=popularity) due to its great performance and quality-of-life improvements.

One of the best things it offers is its browser. I've always liked **LibreWolf**, but the fact that your history, passwords, and cookies don't persist by default is a pain in the ass.
**FireDragon** keeps the privacy features while maintaining cookies and user data. That might sound contradictory, but switching to a privacy-focused browser like DuckDuckGo is a jump I'm simply not willing to make.

Just to wrap things up, remember that Garuda is an **Arch-based distro** with a **rolling-release model**, so be careful not to break your system while tinkering (like me) :P

That's all for today! THX very much for reading until the end, and see you next time!!

(˶ᵔᗜᵔ˶)ﾉﾞ (˶ᵔᗜᵔ˶)ﾉﾞ