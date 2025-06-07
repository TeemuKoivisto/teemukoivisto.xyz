---
draft: true
datePublished: '2025-06-07'
dateModified: '2025-06-07'
title: How to publish a SvelteKit webview/Capacitor app in 2025
description: wordz
tags:
  - programming
  - svelte
  - sveltekit
  - android
  - capacitor
  - playstore
  - webview
coverImage:
  url: https://teemukoivisto.xyz/blog/01/hello-world.jpg
  alt: Hello world in TypeScript
  width: 1080
  height: 566
---

# Introduction

> Hear ye, hear ye! In the year of the Lord 2025, a man can, if God willeth, be content in developing a webapp that can be transformed into a good enough native Android app. For SvelteKit is prosperous in its great skill in producing static websites as is Capacitor in bootstrapping your Android native code. To decree this great step, I shall write henceforth a guide to show many a-lost soul how this deed is performed.

So uhh, to summarize; I play Yatzy in a bar sometimes. A great game, but I always thought the scrosheet its own huge weakness. To prepare for our trip to Japan, I wrote a Yatzy scoresheet SvelteKit app that would allow us to play Yatzy if we wanted. And we played once. And the app worked! Although I had to publish a fix while in Japan, heh.

Anyway, the app was finished I was kinda intrigued whether I could publish it in webview-format to app store. PlayStore more specifically, because I'm not interested in paying for Apple's outrageous _yearly_ 100$ fee. I knew already the basics of it, having prototyped an Android app at worked with [https://capacitorjs.com/](Capacitor) which proved to be quite easy. Although Capacitor can be a bit janky with its plugins.

## Building the app

Building the SvelteKit is the easy part. Basically it can be any app you want, as long as you can build it `'@sveltejs/adapter-static'` adapter (meaning no SSG pages). The real killer of SvelteKit IMO is the ability to mix-and-mash 100% static pages with SPA-like pages, meaning you can render dynamic pages (`/books/[bookId]`) where SvelteKit performs a catchall-to any page navigated to that URL and instead of showing 404 page, renders the normal page (with the given path parameter).

It sounds pretty basic but let me tell you, React apps in this aspect are way behind. NextJS especially is infuriating in its stubborn refusal of giving you any escape hatch to render these dynamic pages statically. Why? So that everyone would use React Native instead? IDK but it sucks.

So, I won't describe here how to build your static app. If you're publishing a web version to say CloudFlare, use something like:

```ts
import cloudflare from '@sveltejs/adapter-cloudflare'
import adapterStatic from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'

import { resolve } from 'path'

const IS_STATIC = process.env.STATIC === 'true'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: sveltePreprocess({}),

  kit: {
    files: {
      routes: './src/routes',
      lib: './src/lib',
    },
    adapter: IS_STATIC
      ? adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: '404.html',
        })
      : cloudflare({
          pages: 'build',
          assets: 'build',
          fallback: '404.html',
          config: 'wrangler.toml',
          platformProxy: {
            configPath: 'wrangler.toml',
            environment: undefined,
            experimentalJsonConfig: false,
            persist: true,
          },
        }),
  },
}
```

and my `package.json` scripts are:

```json
  "scripts": {
    "install": "svelte-kit sync || true",
    "build": "vite build",
    "build:app": "STATIC=true vite build",
    "dev": "vite",
    "dpl": "pnpm build && wrangler pages deploy ./.svelte-kit/cloudflare",
    "preview": "vite preview",
    "svelte-check": "svelte-check",
    "test": "vitest run",
    "cap:add": "cap add android",
    "cap:sync": "cap sync",
    "cap:assets": "pnpx @capacitor/assets generate",
    "android:run": "cap run android",
    "android:open": "cap open android"
  },
```

I have also `service-worker.ts` for PWA capabilities, it's also extremely simple with SvelteKit so I won't describe it here. Only problem it seems is how to leave out the SW when building for the webview app but I didn't notice it affecting it behavior, seems it is disabled when rendered as webview(?)

## Creating the Android app with Capacitor

Now this is the second, more difficult part, of how to actually build your webview app. I've chosen to use **Capacitor** for this, as it provides the boilerplate out of the box as well as allows you to later use plugins, such as highly critical Google OAuth login. Without Capacitor you'd have to bridge those capabilities yourself with messages passed between the client JS and your Android code which seems just a lot of trial-and-error to make it work.

My only problem with Capacitor is that it's quite flaky and for example, when you install it with: `cap add android` the Android code doesn't actually build (at least didn't for me). Some random errors which I had to fix like these https://stackoverflow.com/questions/36465824/android-studio-task-testclasses-not-found-in-project https://github.com/ionic-team/capacitor/issues/7866#issuecomment-2634749666

Also it seems Capacitor tries to upsell you Ionic platform which includes many features Capacitor lacks and is probably intentionally prevented from adding. Anyway, it's free and and under MIT license so good enough!

There are tutorials how to setup your Capacitor, you probably need to install:

```json
    "@capacitor/android": "^7.2.0",
    "@capacitor/cli": "^7.2.0",
    "@capacitor/core": "^7.2.0",
```

and then run: `"cap:add": "cap add android",`. This should give the whole boilerplate with all the Gradle yuck and Java kitchensink tucked away in `android` folder. Building your static app bundle and then running `"cap:sync": "cap sync",` should copy it to your Android source files. Then just open Android Studio with `"android:open": "cap open android"` and see whether you can run it inside the emulator.

Not going to detail again about the Android Studio setup. Just ensure your architecture is correct if you eg. have M1 MBP (so arm64) when you create your emulator device. And that the Android/PlayStore version is high enough.

And you _should_ have something like this:

image.png

Congratulations! You are now one big step closer to your AppStore app.

One additional step I'd add is generating your own logo/cover image bundles. So find/create your 1024x1024 PNG/WEBP image, stick it inside `assets/logo.png` and run: `"cap:assets": "pnpx @capacitor/assets generate",`. This should replace all the placeholder logos with your own. **AND** you can copy-paste a few of these to your `static` folder and add it to your `manifest.json` as PWA pictures as well. Neat!

## Launching your Android app

Now here comes the trickiest part of them all; **deployment**. Well, technically I think figuring out the Android bugs took way longer than this but on cognitive load -level, this one can be bit tedious.

There are great guides already like this: https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/ of which mine is just a short summary of.

First, build a signed Android App bundle. Not APK package even though you might have used it for testing on your own phone. Seems that's no longer supported for PlayStore releases.

This probably requires you to create your own **keystore** file that's used for signing your app. And you should keep it secret, keep it safe. Preferably not in an envelope in your drawer. Not sure how important is the personal information data added to it, but just add your name at least.

Next, create your PlayStore developer account. You _can_ use your regular Google account for this but I don't recommend it. If something happens to either of them, like a faulty copyright strike, you'll be out of our Google services for a good while. Not ideal, in my opinion.

So make your secondary Google account, if you haven't already. Mine is cutely named after this website. And then, start the signup process https://play.google.com/console/u/0/signup

I created a personal Developer profile instead of an organization. Seemed more appropriate. I put as the Developer contact address the same email as the account but my personal one for the PlayStore communication. Possibly smarter would be to create a CloudFlare redirecting email address under your domain (like app@teemukoivisto.xyz) but I went this route this time. Maybe I'll change it later. And also, you have to pay the developer fee of $25.

Within your PlayStore console https://play.google.com/console/ you should see a nag message about "Finish setting up your developer account". It'll take a few days to complete these steps, seems the verification of your residence is the tricky part. Dunno what exactly are they looking for in that document, I had to submit my rental contract.

## Deploying your app

After the verification clears, you can try running through the **Create app** form next. 

picture of the create new app page

So, pick a great name. Or just the least crappy one. Mine was "YatzySheet". Then, upload your `.apb` bundle and fill in the details. I put current date 7-6-2025 as the version. You should create an internal app email list, so bother a few of your **good** friends by luring them into this "app" scheme of yours.

Then, if you did everything as instructed, your app should be available in PlayStore for those few lucky ones in a few days(???)

????

# Conclusion

Well, that was fun, wasn't it? Not gonna say it was necessarily easy but to me, this has opened a brand new vista of app ideas that I can turn into mobile apps for fun and profit. Especially impressed I am of the SvelteKit's static build capabilities, which have now enforced my opinion that all web-apps should be possible to build statically. Otherwise, you don't have a web-app. More like, a flashy website. And no, service-worker doesn't help here.

Having a static site is just much more robust and performant than a dynamic site. No more fetching of assets from server. No more service worker errors that pollute your cache so stale versions get stuck. Just HTML, CSS and JS served in a nice packet that is full offline capable, although for the API operations you probably need a sync engine of sorts. Perhaps, that's something I'll write in a future post as well 🙂

Hope you have found this useful! Leave any comments incase I've made silly errors somewhere.

-Teemu

## Additional tricks

Is your status bar looking stupid with wrong color scheme than the rest of your app? You can easily it customize by editing your `styles.xml`:

```xml
    ...
    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:background">@null</item>
        <!-- These two lines make it white with dark icon colors -->
        <item name="android:statusBarColor">#ffffff</item>
        <item name="android:windowLightStatusBar">true</item>
    </style>
    ...
```

