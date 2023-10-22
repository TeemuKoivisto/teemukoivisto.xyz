---
datePublished: '2023-09-14'
dateModified: '2023-09-14'
title: Hello World! Journey into writing a blog with Gatsby, Next.js and SvelteKit
description: Following the ancient traditions of software engineers...
tags:
  - making a blog
  - react
  - gatsby
  - typescript
  - nextjs
  - tailwind
  - svelte
  - sveltekit
  - cloudflare
coverImage:
  src: /blog/hello-world.png
  alt: Hello world in TypeScript
---

<figure class="my-16">
  <img src="/blog/hello-world.png" alt="Hello world in TypeScript." loading="lazy"/>
  <figcaption>
    A timeless classic.
  </figcaption>
</figure>

[[toc]]

Foreword:

So this is a mushed together collage from multiple parts, written between 2018-2023 while I worked on making my blog on-off. Many parts of it seem silly to me now but I guess that's growing.

# In the beginning

Once upon a time I decided to make a blog. This was probably 2017, can't remember exactly. In my first attempt I used Jekyll which felt just a little too restricting to customize and unfamiliar with its Ruby to me. Same with Hugo even though in my both attempts I **could** have made a decent blog in no time 😶. Instead, I wanted to craft my own custom dingy-wingy website from scratch with the coolest tools available. Which in 2018 was Gatsby, TypeScript and styled-components. All so exciting and new at the time.

## Gatsby

But it was not exactly a piece of cake to write a blog with those tools. While I knew TypeScript and styled-components fairly well, Gatsby was somewhat fickly beast and also very new at the time and alas, had many interesting edge-cases.

Now in general writing React components with Gatsby was somewhat easy - no question about it. Server-side rendering worked and there were a lot of plugins to do all kinds of things that would have taken a lot of effort before Gatsby. One particular problem was, and I believe still is, that Gatsby gives you too much rope to hang yourself with.

What made me question my sanity a few times was the absolute maze of configuring Gatsby's `gatsby-node.js` and `gatsby-config.js` files and debugging GraphQL queries. The idea is great, composable pipelines and plugins, yey! But in practise those abstractions leaked like a cheese grater swimming in Atlantic. Add in the mix GraphQL which is another bulky beast to tame, especially when dealing with static files. **Static files**. Do you really care about overfetching static files which you **A)** have to parse in full in the first place and **B)** are processed into static HTML.

One of the fun bugs I encountered was a linting issue where you had to add an empty `.eslintrc` to the root of the project to prevent Gatsby from linting a locally linked library's source code. Another nice one was the ordering of the `gatsby-google-analytics` plugin. It had to be in a specific order in relation to the other plugins and I got so frustrated with it, that I switched to another GA plugin. And the parsing of the markdown data with images seemed to be more of arcane incantation than software engineering. The darn images would sometimes not reload yet adding a console.log statement, if I recall correctly, somehow made it work (I'm still extremely puzzled by that one).

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/exploding-brain.gif" alt="Exploding brain" loading="lazy"/>
</figure>

---

Through shedding blood and maybe a few tears, I did however manage to assemble a working site (which remnants can be [found here](https://github.com/TeemuKoivisto/simple-gatsby-typescript-blog)). In an attempt to add SEO meta tags I got so deep into it that I authored a SEO library <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">react-seo-meta-tags</a> to really nail it down. Now why spend a disproportionately large amount of time making a _SEO library_ for a site with basically no readers or users? Hmm. A good question 🤔. Moving on..

Back in the day, frontend build tools weren't as hugely popular as they are today so I decided, the smart man I was, to create my own AWS infra with CloudFormation. It had a S3 bucket, CloudFront distribution and two edge lambdas to rewrite URLs and another to enforce CSP rules because it was the best practise™.

🤦‍♂️

Now if you aren't familiar with edge lambdas they do not always exactly work they way you want them to. Namely deploying and updating them, at least the last time I tried, was a major PITA to do automatically. For reasons unknown to me, you can't automatically deploy a new edge lambda version but have to increment it first _manually_ and then use the new version for the CF distribution. Add in CSP rules which is probably great for super cereal websites but mine was a static blog(!). So each time I got a CSP rule wrong, I had to go through all the hoops to deploy a new edge lambda to prevent all those hackers from stealing my data.

Things you do to make a blog...

One of the reasons CSP was such a pain was because I used an external library named Disqus to add comments. I really like having the option of shouting out to the author but it's not exactly CSP-friendly in the slightest. Also it adds an additional 1 MB of extra JS loaded _and_ uses your data for whatever analytics purposes. Similar to Google. Which is, if you think about it, kinda annoying.

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/three-years-later.jpeg" alt="Three years later" loading="lazy"/>
</figure>

# 3 years later

What in the end happened was, that having spent a considerable amount of time banging my head against various issues with Gatsby and other tools alike, I failed to muster strength to run past the finish line. I had the domain, I had the whole CI pipeline and infra setup but I just couldn't finish it.

A _little_ CSS fix here and there, I told myself, but the fact was other things, like school work and work work (I worked part-time) had a little more priority than torturing myself with this blog.

And I have to say that some of my original writing was a bit tongue in cheek. Probably caused by the madness I had to deal with, no doubt, but it left me pondering whether I was making a comedy site or a technical blog. I think blog should be written relatively entertainingly but comedy is something that doesn't always translate well across audiences.

## Next.js

The blog was left to languish as I carried on with school and work. I graduated with a <a href="https://github.com/TeemuKoivisto/msc-thesis">MSc. from data science</a> and started working full time. Then one day a new server-side rendering framework gained my attention named [Next.js](https://nextjs.org/). It had a lot of hype and it seemed fun to try out alongside this fancy CSS library named [TailwindCSS](https://tailwindcss.com/).

My impressions were... good. Straight from the get-go Next.js felt a lot less magical as you didn't have to wrap your head around GraphQL but could, instead, just parse Markdown files with normal file operations. Neat. Also the abstractions felt a lot less leaky and the file-to-page approach was very easy to grasp. I don't want to outrightly say Gatsby was inferior in all aspects, it is a fine tool which (once you figure it out) can produce wonderful sites! But these are like, my opinion man.

However, I do want to note Gatsby's strange infatuation with its silly `gatsby-node.js` config file. It's just a nightmare to debug compared to Next.js where I could just use `fs` and `remark` to parse the markdown. No need to rebuild the site constantly and debug using console logs from terminal or invent queries from the GraphQL GUI. (Hopefully things have changed since then)

And the deployment! One can say Next.js was among the first to offer the modern frontend deployment flow where you just click buttons from the console and vóila! You have setup a working pipeline from your GitHub repo to a website. Goodbye edge lambdas and stupid CSP rules. Also, at least back then, Next.js was far ahead in image optimization.

## Tailwind

<<< too much its

Another tool I trialed out then was Tailwind; atomic set of CSS utility classes provided in a nice, structured form. I had my doubts about it, and still do, but Tailwind has proven to me that with a smaller, opinionated API for CSS developers can produce elegant UI designs much quicker.

Tailwind is more of a design system than a tool which works best in reducing wandering into dead-ends while styling. It isn't as component-oriented as styled-components which lets you to do all kinds of customizations, but more akin to writing inline CSS _really_ fast. And yes, it can be a bit messy.

It is, however, the efficiency of writing those styles that in the end separated Tailwind from the other CSS libraries I had used. Working with CSS directly many developers get the insatiable feeling of wanting to tune a few details here and there to their heart's desire. Which is fine to learn CSS but isn't necessarily the most productive way to create nice UIs. Also with how many CSS libraries you can copy-paste an example HTML snippet and it just works?

Tailwind has some limitations to it, certainly, such as having no built-in way of adding `::before` or `::after` elements (seems this has been fixed as of date). But it navigates through its downsides very remarkably and makes a difficult problem (styling web pages) seem almost trivial. And you can organize your classes with lint rules and so forth.

Well, enough of praising. It's no silver bullet but works for people who want something that looks nice fast.

To illustrate the time difference though, the Gatsby + styled-components version took maybe a month's worth of work to create from scratch. The Next.js + Tailwind version took perhaps a week's worth of work. Of course, I copy-pasted much of the layout and components, refactoring them into Tailwind as I went. But still I dare say it was an easier journey.

## Google Analytics

Since I was building the bestest blog I had this weird notion that every "proper" site needed analytics service. Something I picked up from work, I guess, but in hindsight a terribly misguided conception.

So what I did was, I stuck my hands elbow deep in the poop called Google Analytics and tried to put up event listeners and whatnot for every interesting metric possible. Hah hah. Haa... Outbound links and that kind of things. Not specifically the most enjoyable way to spend your free-time.

---

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/dafoe-goes-crazy.gif" alt="Wille Dafoe goes crazy" loading="lazy"/>
  <figcaption>What Google Analytics does to a man</figcaption>
</figure>

So things started to stall. I can't put the blame solely on GA though. Or my wonky styles or crazy texts. Something about the whole process just annoyed me. Next.js and React felt rather irritating and enterprisey for something I did for fun. Solving React hooks which whined about every function I left out of the dependency array. Or have the whole build crash because Next.js zealous lint rules.

Here's how I left it https://github.com/TeemuKoivisto/nextjs-blog-typescript-tailwind as I went on to procrastinate by doing something more fun.

# 2 years later

Now during the 2 years between Next.js version and the next, I would say I did grow a bit as a developer. I look at the two previous attempts as more of experiments in modern frontend development which were more fun than the end result. Which is fine! As you can not really quantify the satisfaction one gets from making something you're excited about just to throw it away at later point. At work, you are stuck with your deprecated tools for a long time. For your own projects, you can get crazy - if you feel like it. And making this blog has been nothing but a journey in finding zen in this maddness called JavaScript.

## Svelte

So first things first. Svelte.

My first encounter with Svelte coincided with creating my Next.js version in 2021. As that project started to resemble inadvertent masochism, I started a new exciting project I long had had on my mind. There was this tool called [prosemirror-dev-tools](https://github.com/d4rkr00t/prosemirror-dev-tools) which had become near-abandoned so I decided, since no one else was doing it, to rewrite it completely. After evaluating different options I chose Svelte as my tool as it suited perfectly the needs of a stand-alone UI widget.

I have to say I was at first hesitant and doubtful about Svelte. After all, I had learnt to love composable components with React's TSX and styled-components and wasted so much time learning all the quirks of hooks and various state libraries.

Single-file components? Class-based styling? Custom directives and no JS in HTML? What is this, 2010? And how the hell this `$` thing works?

I remember questioning a lot of things in the beginning. Making mistakes like failing to auto-subscribe variables or just not wrapping them right in writables. However, something kept me going. Of course I had this primary motive of making a library (which I've developed beyond my original plans into a Chrome extension as well [https://github.com/TeemuKoivisto/prosemirror-dev-toolkit](https://github.com/TeemuKoivisto/prosemirror-dev-toolkit)) that gave me clear direction that prevented me from getting too side-tracked.

<<< here

But pretty soon it clicked. I think it was the unlearning of React's quirks that in the end won me over. Suddenly, as I didn't have to burden myself with analyzing the use of my React hooks or the state library I used (MobX), I had a lot more bandwidth to just create things. With React, I had learnt to get accustomed to continous small annoyments that were, as I was told, "good" and that I should learn to appreciate them. But I say having your linter constantly nag about your missing dependencies for a `useEffect` hook is such a waste of time I don't care how smart it is.

With Svelte things just worked. I especially like the built-in state management which has (in my opinion) just the right amount of magic to make you not need any external library. Granted I think there should be a built-in persistence layer included to hydrate and rehydrate data from eg localStorage.

And classes! Even though I was first strongly against them I can see the beauty of simple class-based styling which gets you pretty much 95% to where styled-components could get you. And you do this without sprinkling your components with `border-top: ${({ top, theme }) => top ? 1px + theme.colors.blue : ''}` kind of hacks.

<<< end

## Web components

So uhh. Before I fully committed to using Svelte and SvelteKit to redo my blog, I did have a momentary lapse of judgement to try and ditch _all the frameworks_. Perhaps something I picked up from reading too much HackerNews but I wondered whether these frameworks were just gimmicks and all I needed was some file pipelines and good old mustache templates.

I was wrong. I really did try to make it work but at some point I realized that what I was doing was just stupid.

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/putting-on-clown-makeup.jpeg" alt="Putting on clown makeup" loading="lazy"/>
</figure>

The somewhat working prototype can be <a href="https://github.com/TeemuKoivisto/teemukoivisto.xyz/tree/ff77578bec715e659708961dd3d00424d6c1e87c/packages/client">found here</a> but just as <a href="https://dev.to/richharris/why-i-don-t-use-web-components-2cia">Rich Harris said in a blog post</a>, the spec is sorely lacking in ergonomics to be any kind of replacement of modern JS frameworks. You end up writing your own crappier versions of things without being able to leverage any of their ecosystems.

Just as a few examples, there is no templating in web components (eg `{{ name }}`). So you need to add that. Or directives eg `{#if loggedIn}`. To pass state you can use CustomEvents but probably need an event bus of sorts (eg. observables). And some kind of diffing to know what has changed unless you just rerender everything.

Also web components are all JS - not static markup meaning you can't serve them as HTML from the server. So you have to either hydrate & rehydrate them yourself which is no small task in itself. Unless, of course, you are fine with all of your widgets flickering each time user loads the page uncached.

There are tools, like <a href="https://lit.dev/">Lit</a>, that make them tolerable but if you are using a library why not use something you are already familiar with..?

## SvelteKit

Svelte it was and specifically, SvelteKit. Having wasted time on Gatsby, Next.js and web components it did feel a little overwhelming to do everything _all over again_. But sometimes you just gotta do what you gotta do. And do I really have better things to do in life than rewriting my blog? Hah hah. Haa.

I started using SvelteKit from `1.0.0-next.158` when it was still in its infancy. Back then things broke quite often either due to bugs or breaking changes which made using it rather precarious. Still, it was a sacrifice I was willing to make to escape React-land.

<<< here

Now comparing SvelteKit with Gatsby and Next.js, if you skip the obvious fact you are writing Svelte instead of React, the biggest difference I think just comes down to ergonomics. While at start it may feel a little tedious relearning everything the runway to take off I think is a lot shorter with Svelte/Kit. Once you have grasped how subscription works and writables and derived values, you really don't need much to start making things. Compare this to React where things might appear simple but they easily trip you up when you start going deeper. Hooks anyone? And do I need to mention Redux vs MobX vs something and `react-router`?

That I feel is the biggest upside of Svelte/Kit. It's just simpler. Much simple, such pragmatism. Having much more standardized ways of doing things might seem limiting but in reality, it just removes another source of confusion and possibility of doing this really wrong. And in Svelte's case the standard way is often really good.

One big difference between SvelteKit and the G/N is the lack of file-to-page mapping as it was deemed to restricing. Instead you create folders with your route's name and include various files such as `+page.svelte` for the page view or `+layout.svelte` for a layout applied to the page and all of its subpages. And of course, the lack of hooks although with the latest rune addition it kinda does start to look like writing hooks. Oh well, at least there's no dependency array.

Some less trodden paths you might wander into that are not as well supported (at least when this post was written) were at least intercepting page transitions when navigating pages. I had to make a manual hacky script to add handlers to each link and `beforeNavigation` event. And base urls, such as you use for deploying to GitHub pages, didn't really work as nicely as with React but perhaps that has improved since.

One big thing I also did for this new version was a completely new layout. Originally, I followed the very much beaten-to-death way of making a full width navbar and footer with rather plain light theme.

In the new version, inspired by the <a href="https://man7.org/linux/man-pages/man1/man.1.html">man-page layout</a>, I kinda realized you can be a lot more minimalistic with your style.

ditched the xxx navbar and footer and went with really minimalistic approach. Also I noticed that man page uses very small indents to make the text appear more hierarchial which I thought was cool. For color scheme, I decided to write it in dark-mode only but later I did relent to adding light-mode as well.

SEO

<<< end

## Cloudflare

It wouldn't be a blog in my opinion without comments. No matter how few if any there would ever be. But as of building this blog, the current state of art didn't seem to satisfy my needs.

Disqus was just too bloated and irritating. I ruled out <a href="https://staticman.net/docs/">Staticman</a> since it required a server to run. I used <a href="https://github.com/utterance/utterances">utterances</a> for a while but I wasn't really happy about over-loading issues for comments. I mean, I get it. It's really clean and if you expect all your users to have a GitHub account it's probably ideal effort-wise. (It seems there's now a new library that uses Discussions instead of issues which seems a lot better)

Feeling the incurable itch to tinker yet again, I saw this as a perfect opportunity to experiment with Cloudflare's built-in serverless storage and workers.

Now for those who don't know, Cloudflare offers perhaps the best DX for building cloud workers/functions. It also has various services for storing data which are quite cheap being pay-as-you-go (although some are behind 5$ monthly subscription). In my case, I want to maintain a nice tidy JSON of the comments per post in block storage with the ability to login with Oauth provider and edit posts even when the session has expired.

This time I won't go into too much detail but I did manage to pull it off: https://github.com/TeemuKoivisto/teemukoivisto.xyz/tree/main/packages/worker Quite nice and easy to do. It's open-source so if you have a need for comments yourself, feel free to get inspired by it. One of these days I'll get around adding Google Oauth as well...

# The journeys end

As I try to wrap this up somehow, I see there isn't much of an overall conclusion to make.

Perhaps this story can warn you from getting side-tracked but then again, isn't that how you learn? And many of my side-steps were worthwhile if not for their results then for the experience of not trying them again.

I guess the main revelation for me has been that I'm a craftsman who enjoys building as much as the result. Which isn't necessarily a bad thing, only that it may not overlap with the goal of producing blog content.

Or whatever. The point is - sometimes it's not about the goal but how you get there. Unless it's only about the goal. Then you really want to just _get there_ as fast as you can.

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/key-and-peele.gif" alt="Meh." loading="lazy"/>
  <figcaption class="mt-1 flex flex-col items-center">
    <div>In conclusion</div>
    <div class="text-xs mt-2">Key & Peele</div>
  </figcaption>
</figure>
