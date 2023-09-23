---
datePublished: '2023-09-14'
dateModified: '2023-09-14'
title: Hello World!
description: Following the ancient traditions of software engineers..
tags:
  - typescript
  - tailwind
  - vite
  - nextjs
  - gatsby
  - hello world
  - blogging
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

So this is a mushed together collage from multiple parts, written between 2018-2023 while I worked on making my blog on-off. Many parts of it seem silly to me now but I guess that is a part of growing.

# In the beginning

Once upon a time I decided to make a blog. This was probably 2017, can't remember exactly. In my first attempt I used Jekyll which felt just a little too restricting to customize and unfamiliar with its Ruby to me. Same with Hugo even though in my both attempts I **could** have made a decent blog in no time. I guess I _had to_ do it the hard way and make my own custom dingy-wingy website with the coolest tools available at the time. Which in 2018 was Gatsby, TypeScript and styled-components. All so exciting and new at the time.

## Gatsby

But it was not exactly a piece of cake to write a blog from scratch with those tools. While I knew TypeScript and styled-components fairly well, Gatsby was somewhat fickly beast and also very new at the time and alas, had many interesting edge-cases. Through shedding blood and maybe a few tears, I managed to assemble a working site but there is something to be said about polishing and fine-tuning things. I could have shipped the first version and been quite happy with it, yet I decided to keep on fine-tuning it and adding little things that didn't matter to anyone except me.

I guess it is a type of analysis paralysis where you get so tunnel-visioned working out some details right when you should instead switch gears and start making content - the thing you were excited to do in the first place! Oh well.

During this epic journey I even went as far as to author my own SEO library just to modularize and archive some of the knowledge I accumulated during this process: <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">react-seo-meta-tags</a>. Now why would one even spend a disproportionately large amount of time making a _SEO library_ for a site with basically no readers or users? Hmm. A good question 🤔. Moving on..

However, SEO wasn't even the most annoying part of this project. While Gatsby pioneered the static React site generation, well-suited for blogs, it had a few pecularities involving its approach. What made me question my sanity a few times was the absolute maze of configuring Gatsby's `gatsby-node.js` and `gatsby-config.js` files and debugging GraphQL queries. The idea is great, composable pipelines and plugins, yey! But in practise there was just too many leaks that would have made it enjoyable. Add in the mix GraphQL which is another bulky beast to tame, especially when dealing with static files. **Static files**. Do you really care about overfetching static files which you **A)** have to parse in full in the first place and **B)** are processed into static HTML.

One of the fun bugs I encountered was a linting issue where you had to add an empty `.eslintrc` to the root of the project to prevent Gatsby from linting a locally linked library's source code. Another nice one was the ordering of the `gatsby-google-analytics` plugin. It had to be in a specific order in relation to the other plugins and I got so frustrated with it, that I switched to another GA plugin. Aaand the parsing of the markdown data with the images seemed to be more of an arcane incantation than software engineering. The darn images would sometimes not reload yet adding a console.log statement, if I recall correctly, somehow made it work (I'm still extremely puzzled by that one).

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/exploding-brain.gif" alt="Exploding brain" loading="lazy"/>
</figure>

---

Well, enough about that. Did I mention that I originally also wrote an AWS stack for this whole app? With S3 bucket, Edge Lambdas and a CloudFront distribution. And, God forbid, CSP rules applied by an Edge Lambda. Now if you are not familiar with Edge Lambdas they do not exactly work always the way you want them to. Namely deploying and updating them, at least the last time I tried, was major PITA to do automatically. For reasons unknown to me, you can't automatically deploy a new edge lambda version but have to increment it first _manually_ and then use the new version for the CF distribution. Things you do to make a blog...

## Disqus

# 2 years later

So anyway, the whole thing became quite a drag and while I produced a working site it felt incomplete and annoying. Some of my original writing was also a bit tongue-in-cheek which left me pondering whether I was making a comedy site or technical blog. I think blog should be written in relatively entertaining tone but comedy is something that doesn't always translate well across audiences.

## Next.js

After letting the blog languish for two years I finally decided that the new, yet again exciting, framework called [Next.js](https://nextjs.org/) seemed fun to try out alongside [TailwindCSS](https://tailwindcss.com/).

My impressions were... good. Straight from the get-go Next.js felt a lot less magical as you didn't have to wrap your head around GraphQL but could, instead, just parse Markdown files with normal file operations. Neat. Also the abstractions felt a lot less leaky and the file-to-page approach was very intuitive and sane. I don't want to outrightly trash Gatsby here, it is a fine tool which (once you figure it out) can produce wonderful sites! But these are like, my opinion man.

However, I do want to contrast Gatsby's strange infatuation with its silly `gatsby-node.js` config file which is just a nightmare to debug compared to Next.js I could just use `fs` and `remark` to parse the markdown. No need to rebuild the stie constantly and trying to read console logs from terminal or inventing queries from the GraphQL GUI. (Hopefully things have changed since then but this was how I felt)

And the deployment! One can say Next.js pioneered the modern frontend deployment flow where you just click buttons from the console and voila! You have setup a working pipeline from your GitHub repo to a working website. Goodbye edge lambdas and stupid CSP rules. Also, at least back then, Next.js was far ahead in image optimization. Probably things have changed since 2021.

## Tailwind

Another tool I trialed out then was Tailwind; atomic set of CSS utility classes provided in a nice, structured form. I had my doubts about it, and still do, but Tailwind has proven to me that with a smaller, opinionated API for CSS developers can produce elegant UI designs much quicker. It's more a design system than a tool which just reduces wandering into dead-ends while styling. It isn't as encapsulated as styled-components which really allow you to tinker with every little detail but more like writing inline CSS _really_ fast. And yes, it can be a bit messy.

But it's the efficiency of writing those styles that in the end separates Tailwind from the other CSS libraries or tools. Working with CSS directly many developers get the insatiable feeling of wanting to tune a few details here and there to their heart's desire. Which is fine to learn CSS but isn't necessarily the most productive way to produce nice UIs. Tailwind has some limitations to it, certainly, such as having no built-in way of adding `::before` or `::after` elements. Yet it navigates through its downsides very remarkably and makes a difficult problem (styling web pages) seem almost trivial. And you can organize your classes with lint rules and so forth.

Well, enough of praising. It's no silver bullet but works for people who have too much on their plates already. And you can create crap with any tool.

To illustrate the time difference though, the Gatsby + styled-components version took maybe a month's worth of work (during my studies) to create from scratch. The Next.js + Tailwind version took perhaps a week's worth of work. Of course, I copy-pasted much of the layout and components, refactoring them into Tailwind as I went. But still I dare say it was an easier journey.

So was I happy?

## Google Analytics

Since I was building the bestest blog I had this weird notion that every "proper" site needed analytics service. Something I picked up from work, I guess, but in hindsight a terribly misguided conception.

So what I did was, I stuck my hands elbow deep in the poop called Google Analytics and tried to put up event listeners and whatnot for every necessary metric possible. Hah hah. Haa... Outbound links and that kind of things. Not specifically the most enjoyable way to spend your free-time.

That, in combination with just a little off styling, soured me on this whole ordeal and once again I decided that it was too much trouble than it was worth. Also, to be frank, Next.js started to kinda annoy me with its very enterprisey feel to it that didn't feel that nice for a fun little side-project. And seriously, why the heck the whole build has to fail if I forget the run lint?!?

# 2 years later

Now this chapter has been written with what I would say more maturity and insightfulness. I look back at these previous attempts as experiments that were more fun than the actual end result. Which is fine! As you can not really quantify the satisfaction one gets from making something you're excited about just to throw it away at later point. At work, you are stuck with your deprecated tools for a long time. For your own projects, you can get crazy - if you feel like it. And making this blog has been nothing but a journey to understand why I do things they way I do them.

## Svelte

So first things first. Svelte.

My first encounter with Svelte and SvelteKit was shortly after I made the Next.js version in 2021. I started rewriting this developer tool called [prosemirror-dev-tools](https://github.com/d4rkr00t/prosemirror-dev-tools) and after evaluating different options, decided to go with Svelte. I have to say I was at first hesitant and doubtful about Svelte. After all, I had learnt to love composable components with React's TSX and StyledComponents so having to switch my mindset 180 degrees felt weird.

Single-file components? Class-based styling? Custom directives and no JS in HTML? What is this, 2010? And how the hell this `$` thing works?

I remember questioning a lot of things in the beginning. Making mistakes like failing to auto-subscribe variables or just not wrapping them right in writables. However, something kept me going. Of course I had this primary motive of making a library (which I've developed beyond my original plans into a Chrome extension as well [https://github.com/TeemuKoivisto/prosemirror-dev-toolkit](https://github.com/TeemuKoivisto/prosemirror-dev-toolkit)) which gave me clear idea not to get side-tracked into dweling too deep into it. Yet after a while, I kinda realized that "this was it". "I got it".

No more grasping of bizarre behaviors of MobX observables or Redux actions that seem to twist your brain. No more leaky React hooks triggering gazillion times because you didn't understand . Or, God forbid, you forgot to add all your dependencies to your `useEffect` hook which I feel is the biggest waste of time _ever_ and I am strongly against it (as I explain here).

It just. Works. I especially like the provided state-management which is just the right amount of magic to make you not need any external library and which is so simple you don't have to spend too much figuring it out.

And classes! Even though I was first strongly against them I can see the beauty of simple class-based styling which gets you pretty much 95% to where StyledComponents could get you without becoming overly convoluted spagetti with million `border-top: ${({ top, theme }) => top ? 1px + theme.colors.blue : ''}` per component.

Only thing I am a little sad about is the zeal about using JSDoc over TypeScript. Sure, it probably makes sense for a library their size. But why reinvent another wheel in this case? JavaScript is moving towards typing, which is great, but at this point it's a little premature, in my opinion, to go all in with it. Especially when JSDoc to TS is not a full conversion and you basically end up typing everything either way. IDK.

## Web components

Minor detour

## Cloudflare

Of course I needed to make my own comment widget.

## Writing blog v3

Okay, enough about that. So I learnt Svelte but I really hesitated rewriting my blog in it. Of course, I had just written it in NextJS so it would be **madness** to rewrite it again. And I didn't.

Writing my dev tools took surprising amount of time which I had left for side-project coding and then came another projects I had with rich-text editing which I started, in Svelte and SvelteKit, so blog was off the menu.

And SvelteKit yeah. Back then I think it was at @alpha107 or something when I first installed it. The experience wasn't exactly smooth sailing as there were numerous little problems that xx my head. Like writing Svelte component library in TypeScript or how sometimes the SvelteKit bundling failed either by erroring or just silently bugging. It was an interesting experience for sure.

And yet, after all of that, I stuck with it. Now SvelteKit is a little

# The end

So here we are, 5 years later after the initial prototype.

What did I learn from all this?

I would say, I learnt to appreciate plugn'play solutions. Once you give an option to somebody you are also causing them some cognitive burden of having to decide. That's bad if you really need to make something (and fast). Taking the most basic Hugo template and just rolling with it, I would have been ready in no time.

However. I've realized, over the years, that I am a craftsman. Copying somebody else's work and using their stylesheets just doesn't sit well with me. I want to understand how it works. I want to know all the trade-offs that went into making it and most of all, how I could improve it and make it my own. I abhor limited decisionspace when I know it's . Don't get me wrong, I like Go language from the few times I xxx with it and I try to simplify my processes as best I can.

But I don't know. I am an artist. And sometimes, you just gotta follow your instincts - no matter if logically they might not be optimal. And besides, having learnt now Gatsby, NextJS and SvelteKit I can pretty easily tell what I like about SSR frameworks and what I don't. I know

What else.

Oh, and also I went deployment-wise from AWS (S3, CloudFront+EdgeLambda) to Vercel to Netlify to Cloudflare Pages. That also taught me a lot of what you're actually paying with those fancy build services. Yeah, AWS really has a lot of catching up on this - you migth feel smart writing your edge lambdas but that quickly evaporates after you realize how waste of a time it is. And why Cloudflare? Well I think they have the most xxxkattavin stack with the least amount of corporatory stain.

They don't have a big bar of how many build minutes you've used this month from your free quota and why this and that makes your life so much better and why not use this proprietary tool because you don't have to pay for it (until you hit your quota).

I don't know. But that has been my experience.

So uhh. Lesson here is, I guess, that make things that matter to you. This blog, while fun ultimate goal, was more or less just a playground to try out my ideas. Yeah, I could've written some dingy-wingy blog posts over all these years but I rather take this experience of having it done it the hard way while learning the xxx between the choices through and through.

It's not just about the goal but how you get there. Unless it's just about the goal. Then you want to just _get there_ as fast as you can.

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/key-and-peele.gif" alt="Meh." loading="lazy"/>
  <figcaption class="mt-1 flex flex-col items-center">
    <div>In conclusion</div>
    <div class="text-xs mt-2">Key & Peele</div>
  </figcaption>
</figure>
