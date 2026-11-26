---
title: Why I Turned My Phone Into a Walkman~
date: 2026-06-20
description: small talk about how i convert my old phone onto a DAC for offline music.
thumbnail: /assets/thumbnails/images.jpg
labels: [music, Android]
---

# Why I Turned My Phone Into a Walkman~

Hewwo people.

As the title suggests, I recently turned an old **smartphone** into a dedicated **music player**. Not exactly a classic **Walkman**, but close enough.

The idea started after watching a video by Kimu x64 called "He Creado Mi Propio **Spotify**". In that video, she talks about listening to **music locally**, building a personal **music library**, and the different **DACs** you can use to improve your listening experience.

After finishing the video, a question immediately came to mind:

>Could I turn an old phone into a dedicated **music player** instead of buying a separate **DAC** or **MP3 player**?

The short answer is **yes**.

The long answer is also **yes**, but it involves **custom ROMs**, a bit of experimentation, and falling into another technology rabbit hole.

Before talking about the technical side, though, I think it's important to explain why I wanted to do this in the first place.


## A look back at the Past...

When I was a kid, almost everyone around me pirated music, movies, games, and software.

Back then, tools like Ares and eMule were incredibly popular. Using peer-to-peer networks to download files was simply normal.

In fact, some of my earliest memories with computers involve downloading songs and transferring them to a small Sony Walkman MP3 player.

Growing up in Chile, we didn't always have access to the latest technology or digital services. Between 2007 and 2015, streaming platforms were either unavailable, limited, or simply not popular enough to replace piracy.

Most playlists looked something like this:

Unknown Artist - 12783668123.wav

And somehow, everyone still knew exactly what song it was.

I'm not here to argue whether people should pirate things or pay for them. What matters to me is **ownership**.

One thing I've always liked is actually owning the things I pay for.

I've been paying for music streaming services since around 2018. First Spotify, then YouTube Music in 2025.

They work well, and honestly, they're incredibly convenient.

But after a while, I started noticing something strange.

The moment you lose internet access, your entire music library suddenly depends on whether the application decides you can access it or not. Even downloaded albums aren't really yours. Most of the time they're just encrypted cache files stored somewhere inside the app.

That realization reminded me of something I hadn't done in years:

building my own **music library**.

For the first time in a long while, I started downloading music again.

Not because I wanted to stop using streaming services, but because I wanted a collection that actually belonged to me.

Something I could organize, back up, move between devices, and keep listening to regardless of what happened to any platform.

And that's when I started searching for a way to build that library from scratch.

## Building My Music Library

So I started downloading music after a long time. While researching different ways to build a local music library, I ended up reading the r/piracy megathread and discovered several options.

The first one I tried was Lucida. It is a simple web application where you can search for songs, albums, or artists from different sources such as Qobuz, Tidal, and Deezer, then download them directly. It worked surprisingly well, but I ran into several issues, especially with metadata, album organization, and occasional conversion problems.

My second option was **Soulseek**. A lot of people recommended it, and I quickly understood why: its library is enormous. The problem was that I simply didn't enjoy using it. The interface felt outdated, confusing, and difficult to navigate for someone who just wanted to download and organize music.

Eventually, I discovered **Nicotine+**, a modern client for the **Soulseek** network.

This ended up being the solution I was looking for.

Nicotine+ was much easier to use while still giving access to the same huge community-driven music library. The only real downside is that the community strongly encourages sharing files with others. The philosophy is simple: if you want to download from the network, you should contribute something as well.

In practice, this means sharing a folder containing media such as music, movies, software, books, or other files. If you have nothing available to share, some users may block downloads from their libraries entirely.

Despite that, once everything was configured correctly, building my own music collection became surprisingly enjoyable. Instead of depending on streaming platforms and subscriptions, I was slowly creating a library that actually belonged to me.

## Choosing the Hardware

If you're into the world of music, you probably know that there is a device for every kind of listener. From old MP3 players to specialized DAPs (Digital Audio Players) like the Hatsune Miku edition from HiBy, there are plenty of options available.

Personally, I really liked the Hatsune Miku DAP. The design was amazing, and as a Vocaloid fan, it instantly caught my attention. Unfortunately, I couldn't justify spending that much money on a dedicated music player.

While researching it, I discovered that the device actually runs a modified version of Android. For a moment, I wondered if I could simply install that software on an old phone and get a similar experience.

The answer was **no**.

After digging deeper, I learned that those custom systems are heavily modified to work with the specific hardware inside the DAP. Even if I somehow obtained the firmware, my old phone probably wouldn't even boot.

The more I looked into dedicated music players, the more I realized how expensive they could get. Even some entry-level modern DAPs easily cost over $150 USD.

That's when I looked at the drawer where my old Moto G7 Power had been collecting dust for years.

And suddenly, the project had a starting point.

### Why the Moto G7 Power?

In reality, almost any Android phone can work for this project, as long as it still functions properly and has decent battery life. In this case, the battery is about 5000mAh, so for just music it's in a perfect spot.

The Moto G7 Power happened to be a perfect candidate. Released in 2019, it sits in a sweet spot: old enough that I no longer use it daily, but modern enough to run current software without major issues.

One of the first things I would recommend is installing LineageOS if your device is supported. Their documentation is excellent, and most common installation problems are already covered in their wiki.

A clean Android installation without years of accumulated apps and background services makes a huge difference for a dedicated music player.

### Storage Matters

The most important hardware consideration isn't actually the processor.

It's storage.

Music files add up surprisingly fast, especially if you're collecting entire albums instead of individual songs.

My recommendation would be:

| Storage capacity | Recommendation |
| --- | --- |
| 16 GB or less | Buy a microSD card immediately |
| 32 GB | Usable, but consider extra storage for larger libraries |
| 64 GB or more | Probably enough for most people, even for FLAC collections |

If you're planning to carry your entire music collection offline, **storage** becomes much more important than raw **performance**.

### Don't Forget the Headphones

The final piece of the puzzle is a decent pair of headphones.

Personally, I prefer in-ear monitors (IEMs), but honestly, anything comfortable and reasonably well-built will work.

I'm not saying you need a $300 audiophile setup. However, I would strongly recommend avoiding the cheapest $5 earbuds if you want to enjoy the experience.

Good headphones will improve your listening experience far more than most software tweaks ever could.

As for FLAC versus MP3, I'll be honest: I can't reliably hear the difference most of the time.

Maybe some people can. Maybe it's my ears.

Or maybe audiophiles have successfully convinced us all that we need 2 GB albums to listen to a four-minute song.

I'll let you decide that one for yourself.

## LineageOS

Once you have your device ready to be wiped, first make sure it is supported by LineageOS. If it is **NOT** supported, do not continue with this process because you risk bricking your device.

After you confirm that your exact device and model are supported by LineageOS, you can begin installation. But first, there are a few small tweaks to prepare.

### USB Debugging

The first thing you need to do is enable **USB debugging**, since you'll need a computer to unlock the bootloader.

Personally, I would recommend doing this step on **Windows** rather than **Linux**. My current setup gave me so many issues that I ended up borrowing a Windows laptop just to complete the process.

To unlock the bootloader, you first need to enable Developer Options on your Android device. The most common way to do this is by repeatedly tapping the Build Number in the device information menu until Android tells you that Developer Options have been enabled.

Once unlocked, open the Developer Options menu and enable USB Debugging.

While you're there, make sure the USB connection mode is set to File Transfer (MTP) instead of charging only.

Also, double-check your USB cable. Not all USB cables support data transfer. Many cheap cables are designed only for charging, and those won't work for bootloader unlocking, ADB, or **Fastboot** commands.

Trust me, spending thirty minutes troubleshooting only to discover that your cable can't transfer data is not a fun experience.

## Issues and more Issues...

This part wasn't nearly as smooth as I expected.

At first, I thought:

> "Android is Linux-based, so this should be easier on Linux than on Windows."

Wrong.

Very wrong.

While Android development tools are available on Linux, most guides and troubleshooting resources assume you're using Windows. Because of that, setting everything up can become surprisingly frustrating depending on your distribution.

In my case, I was using **NixOS**.

Unlike more traditional distributions, NixOS requires you to declare packages and services inside your configuration. Normally that's not a problem, but Android development tools come with a lot of moving parts, and getting everything configured correctly took more effort than I expected.

One of the most annoying issues I encountered was simple:

> Phone not found.

### Android Tools

The package I was using provided two essential tools:

* **ADB** (**Android Debug Bridge**) — used to communicate with the phone while Android is running.
* **Fastboot** — used to interact with the device's bootloader and flash partitions.

If you're planning to install a custom ROM, you'll be using both extensively.

ADB is usually responsible for detecting the phone, transferring files, rebooting into recovery mode, and several other tasks.

**Fastboot** takes over once the device enters bootloader mode and allows you to unlock, flash, and recover the system.

At least, that's how it's supposed to work.

### Waiting for Phone...

One of the most common messages I kept seeing was:

```sh
Waiting for device...
```

No matter what I tried, my system simply refused to recognize the phone.

I enabled the Android tools package in my NixOS configuration.

I changed USB ports.

I swapped cables.

I checked USB debugging.

I rebooted both the phone and the computer.

Nothing worked.

After spending nearly an hour troubleshooting, I finally accepted defeat.

I borrowed a Windows laptop, installed the Android SDK tools, plugged the phone in, and everything worked almost immediately.

Was there probably a Linux solution?

Absolutely.

Did I have enough patience left to find it?

Absolutely NOT.


## Flashing the device

This is where the fun finally begins.

Once my phone was successfully detected by the Windows laptop, the first step was downloading the required tools from Motorola:

- Android SDK Platform Tools
- Motorola USB Drivers

After installing both, everything became significantly easier. Surprisingly, this was probably the smoothest part of the entire process.

### Checking the Connection

Before doing anything else, we need to make sure the phone is properly detected by ADB.

Open either Command Prompt or PowerShell and run:

```sh
adb devices
```

If everything is working correctly, you should see your device listed.

Once confirmed, reboot the phone into bootloader mode:

```sh
adb reboot bootloader
```

Alternatively, you can power off the device completely and hold:

```text
Volume Down + Power
```

while turning it on.

This will open the bootloader screen.

At this point, don't touch anything yet.

The bootloader contains useful information such as:

- Serial Number
- Device Model
- Bootloader Status (Locked or Unlocked)
- Battery Information

The most important thing to check here is whether the bootloader is locked.

### Unlocking the Bootloader

Unfortunately, this step depends on the manufacturer.

In Motorola's case, you must request an unlock key from Motorola's website. The process involves obtaining a device identifier from **Fastboot**, submitting it to Motorola, and waiting for an unlock key to be sent to your email.

Once you receive the key, you can unlock the bootloader using **Fastboot**.

Be aware that unlocking the bootloader will completely wipe your device, so make sure you've backed up anything important beforehand.

After the process is complete, the bootloader status should change from:

LOCKED

to

UNLOCKED

Only then are you ready to install a custom recovery.

## Installing LineageOS Recovery

Now we can finally boot into the LineageOS recovery environment.

First, download the recovery image provided by the LineageOS project for your specific device.

Once the phone is in **Fastboot** mode, verify that the computer can see it:

```sh
fastboot devices
```

If your device appears in the list, you're ready to continue.

Depending on the installation instructions for your device, you'll either boot or flash the recovery image.

For my Moto G7 Power, I used the recovery image provided by LineageOS and followed the official installation guide.

After successfully entering LineageOS Recovery, the hardest part of the process was finally over.

Or at least that's what I thought.


## LineageOS — Running

Since I'm not an expert, I kept changes minimal and used the defaults. I downloaded the signed build from the **LineageOS** website and some optional addons. At first I wanted to keep everything default and didn't install any plugins, but you may want to add some later.

First of all, you need the signed ZIP for **LineageOS**. In **LineageOS Recovery** go to "Apply update" → "Apply from ADB" to begin sideload. When the phone is waiting for sideload, run on your PC:

```sh
adb -d sideload copy-partitions-20220613-signed.zip
```

Once it loads, you technically have **LineageOS** installed, but it's a bare Android build with no **Google Apps (GApps)**. You may need GApps for paid apps; in my case I did.

The wiki and installation pages mention that if you want to install plugins or addons, this is the time to do it.

### First look inside

The first boot usually takes longer than normal, so don't panic. The setup is similar to stock Android, but you won't be prompted for a Google account. The desktop felt much cleaner — without so many apps you avoid distractions.

Everything looked nice and clean, but I encountered one inconvenience: installing certain apps was not straightforward. I downloaded **Poweramp.apk** from the official site, but installation failed because the app requires Google Play billing verification.

I discovered that installing an APK via a file manager works for many apps, but apps that require Play Billing still need Google services to verify purchases.

### Fixing the billing issue

Because I purchased the app on Google Play, I needed Google services. **MicroG** did not provide billing support in my case, so I had to use a Windows laptop to install an addon that provides the required services.

### Addons: GApps vs MicroG

Addons: GApps vs MicroG
Addon	Pros	Cons
GApps (Google Apps)	Provides Play Store, Play Billing, and full compatibility with paid apps	Larger footprint; may add background services
MicroG	Lightweight; privacy-friendly replacement for some Google services	Does not reliably support Play Billing in many cases

To install GApps, sideload the GApps package the same way as LineageOS:

```sh
adb sideload open_gapps-arm64-<version>.zip
```

The recovery may warn that the package is not signed by LineageOS — accept the prompt if you understand the risk.

### Poweramp

**Poweramp** is the app I chose. Since 2025 I've been building my own music library and Poweramp's free trial is excellent: it includes multiple EQs, solid library organization, **FLAC** support, and strong metadata handling. For this project, **Poweramp** is my recommendation.

If you purchased the app from Google Play, install **GApps** first so billing verification works. Alternatively, use apps that do not require Play Billing.



## Finishing the setup

To finish the setup I installed the addon **MindTheGapps**. **MindTheGapps** is a lightweight, open-source, minimal package of **Google services**—enough to make **Poweramp** work properly. Install it the same way you sideloaded LineageOS (via recovery). After installation:

- Add your Google account in **Settings → Accounts**.
- Open **Google Play Store** and install the apps you need.

I strongly recommend avoiding social networks on this device: the goal is to use it **only for listening to music** and disconnecting from social apps. Once **Poweramp** is downloaded, activate your purchase in the app settings so billing is verified.

With that done, you'll be ready to listen to your whole library. Next: how to transfer the files.

### File transfer via WiFi (and alternatives)

You can transfer music via USB (MTP) or wirelessly. I had trouble connecting the phone to my PC over USB, so I used **LocalSend** over WiFi and **F-Droid** to install it without Google Play.


| Method | Pros | Cons |
| --- | --- | --- |
| USB (MTP) | Fast, simple for large transfers | Requires cable and drivers; sometimes driver issues on Linux/Windows |
| **LocalSend** (WiFi) | Wireless, cross-platform, easy to use | Depends on local network; both devices need the app |
| FTP/SSH | Flexible, scriptable | Requires setup and some technical knowledge |


Recommended steps for **LocalSend + F-Droid**:

1. On your PC, install the LocalSend desktop app or use the web receiver if available.
2. On the phone, install **F-Droid** (the open-source app repository) and then install **LocalSend** from F-Droid.
3. Open LocalSend on both devices, select the files/folders on your PC, and send them to your phone's music folder.

If you prefer USB:

```text
Connect phone → select "File Transfer (MTP)" → copy files to /sdcard/Music or your desired folder
```

### Final thoughts

I've been using this setup for a few days and I'm quite happy with the result despite the hiccups. Day-to-day, I use the device for commuting and errands so I don't check social media; my main phone stays in my backpack while the **LineageOS** phone stays in my pocket.

This project costs effectively **$0** if you reuse an old device. Even without **Poweramp**, you can use a free player and still get a great experience.

My message: keep recycling, avoid creating more e‑waste, and try small, fun projects like this—you learn a lot and most important, Have fun :pp

