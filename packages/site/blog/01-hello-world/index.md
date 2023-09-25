---
datePublished: '2023-09-14'
dateModified: '2023-09-14'
title: Hello World!
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

Now in general writing React components with Gatsby was somewhat easy - no question about. The server-side rendering worked and there were a lot of plugings to do all kinds of things that would have taken a long time before Gatsby. One particular problem was, and I believe still is, that Gatsby kinda gives you too much of a rope to hang yourself with.

What made me question my sanity a few times was the absolute maze of configuring Gatsby's `gatsby-node.js` and `gatsby-config.js` files and debugging GraphQL queries. The idea is great, composable pipelines and plugins, yey! But in practise those abstractions leak like a cheese grater in Atlantic. Add in the mix GraphQL which is another bulky beast to tame, especially when dealing with static files. **Static files**. Do you really care about overfetching static files which you **A)** have to parse in full in the first place and **B)** are processed into static HTML.

One of the fun bugs I encountered was a linting issue where you had to add an empty `.eslintrc` to the root of the project to prevent Gatsby from linting a locally linked library's source code. Another nice one was the ordering of the `gatsby-google-analytics` plugin. It had to be in a specific order in relation to the other plugins and I got so frustrated with it, that I switched to another GA plugin. Aaand the parsing of the markdown data with the images seemed to be more of an arcane incantation than software engineering. The darn images would sometimes not reload yet adding a console.log statement, if I recall correctly, somehow made it work (I'm still extremely puzzled by that one).

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/exploding-brain.gif" alt="Exploding brain" loading="lazy"/>
</figure>

---

Through shedding blood and maybe a few tears, I did however manage to assemble a working site (which remnants can be [found here](https://github.com/TeemuKoivisto/simple-gatsby-typescript-blog)). Even though I got side-tracked into authoring my own SEO library <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">react-seo-meta-tags</a> of all things. Now why would one even spend a disproportionately large amount of time making a _SEO library_ for a site with basically no readers or users? Hmm. A good question 🤔. Moving on..

I even went as far as create AWS infra for the whole app. S3 bucket behind a CloudFront distribution with edge lambda to rewrite URLs and CSP rules to make things perfect. <u>CSP rules 🤦‍♂️</u>.

Now if you are not familiar with edge lambdas they do not exactly work always they way you want them to. Namely deploying and updating them, at least the last time I tried, was major PITA to do automatically. For reasons unknown to me, you can't automatically deploy a new edge lambda version but have to increment it first _manually_ and then use the new version for the CF distribution. Things you do to make a blog...

Also for that extra interactivity I added comments in the form of Disqus. Which is pretty cool as a free service but later on I realized that it adds about 1 MB of extra JS loaded _and_ it uses your data for whatever marketing purposes. Like Google. Which is, if you think about it, kinda annoying.

# 3 years later

What in the end happened was, that having spent a considerable amount of time banging my head against various issues with Gatsby and other tools alike, I failed to muster strength to run past the finish line. I had the domain, I had the whole CI pipeline and infra setup but I just couldn't finish it.

Just a _little_ CSS fix here and there, I told myself, but the fact was I had other (more important) things to do like school and work so having to deal with this pain wasn't on my mind.

Also I have to say though that some of my original writing was a bit tongue in cheek (caused be the madness of creating a blog with those tools no doubt) which left me pondering whether I was making a comedy site or technical blog. I myself believe blog should be written relatively entertainingly but perhaps for first impressions, comedy is something that doesn't always translate well across audiences.

## Next.js

The blog was left to languish as I mustered on with my school and work, and it took a while since I decided it was worth of my time to try again. I graduated with MSc. from data science and a new a framework arrived on the scene named [Next.js](https://nextjs.org/). It seemed quite fun to try out alongside alongside [TailwindCSS](https://tailwindcss.com/) so I thought "this time, definitely".

My impressions were... good. Straight from the get-go Next.js felt a lot less magical as you didn't have to wrap your head around GraphQL but could, instead, just parse Markdown files with normal file operations. Neat. Also the abstractions felt a lot less leaky and the file-to-page approach was very intuitive and sane. I don't want to outrightly say Gatsby is inferior in all aspects, it is a fine tool which (once you figure it out) can produce wonderful sites! But these are like, my opinion man.

However, I do want to note Gatsby's strange infatuation with its silly `gatsby-node.js` config file. It's just a nightmare to debug compared to Next.js where I could just use `fs` and `remark` to parse the markdown. No need to rebuild the site constantly or having to read console logs from terminal or inventing queries from the GraphQL GUI. (Hopefully things have changed since then but this was how I felt)

And the deployment! One can say Next.js pioneered the modern frontend deployment flow where you just click buttons from the console and vóila! You have setup a working pipeline from your GitHub repo to a website. Goodbye edge lambdas and stupid CSP rules. Also, at least back then, Next.js was far ahead in image optimization. But things have probably have changed since 2021.

## Tailwind

Another tool I trialed out then was Tailwind; atomic set of CSS utility classes provided in a nice, structured form. I had my doubts about it, and still do, but Tailwind has proven to me that with a smaller, opinionated API for CSS developers can produce elegant UI designs much quicker. It's more a design system than a tool which works best in reducing wandering into dead-ends while styling. It isn't as component-oriented as styled-components which lets you to do all kinds of customizations, but more akin to writing inline CSS _really_ fast. And yes, it can be a bit messy.

Yet it's the efficiency of writing those styles that in the end separates Tailwind from the other CSS libraries or tools. Working with CSS directly many developers get the insatiable feeling of wanting to tune a few details here and there to their heart's desire. Which is fine to learn CSS but isn't necessarily the most productive way to produce nice UIs. Tailwind has some limitations to it, certainly, such as having no built-in way of adding `::before` or `::after` elements. However it navigates through its downsides very remarkably and makes a difficult problem (styling web pages) seem almost trivial. And you can organize your classes with lint rules and so forth.

Well, enough of praising. It's no silver bullet but works for people who just want something that looks nice fast.

To illustrate the time difference though, the Gatsby + styled-components version took maybe a month's worth of work to create from scratch. The Next.js + Tailwind version took perhaps a week's worth of work. Of course, I copy-pasted much of the layout and components, refactoring them into Tailwind as I went. But still I dare say it was an easier journey.

## Google Analytics

Since I was building the bestest blog I had this weird notion that every "proper" site needed analytics service. Something I picked up from work, I guess, but in hindsight a terribly misguided conception.

So what I did was, I stuck my hands elbow deep in the poop called Google Analytics and tried to put up event listeners and whatnot for every necessary metric possible. Hah hah. Haa... Outbound links and that kind of things. Not specifically the most enjoyable way to spend your free-time.

---

Getting again frustrated with this self-induced complexity, my motivation to work on my blog plummeted.

I can not put the blame on solely GA or my wonky styles or incoherent babbling. Something just annoyed me with the whole process. Next.js and React started to feel a little too restricting and enterprisey for something that I did for fun. God damn hooks. And why the heck whole the whole build has to fail if I forget to run lint?!? The state of where I left it can be found here https://github.com/TeemuKoivisto/nextjs-blog-typescript-tailwind

# 2 years later

Now during this 2 years between the Next.js version and the next, I would say I did grow a bit as a developer. I started and finished some big projects which gave me confidence and insight into what it is to pass the finish line.

I look at the two previous attempts as more of experiments in modern frontend development which were more fun than the end result. Which is fine! As you can not really quantify the satisfaction one gets from making something you're excited about just to throw it away at later point. At work, you are stuck with your deprecated tools for a long time. For your own projects, you can get crazy - if you feel like it. And making this blog has been nothing but a journey in finding zen in this maddness of JS/TS development.

## Svelte

So first things first. Svelte.

My first encounter with Svelte coincided with creating my Next.js version in 2021. As that project started to become an exercise in masochims, I started a new exciting project I long had had on my mind. There was this tool called [prosemirror-dev-tools](https://github.com/d4rkr00t/prosemirror-dev-tools) which had fallen into disrepair so I decided, since no one else was doing it, to rewrite it myself. After evaluating different options I chose Svelte as my tool since it fit perfectly the use of a stand-alone library.

I have to say I was at first hesitant and doubtful about Svelte. After all, I had learnt to love composable components with React's TSX and styled-components and I had wasted so much time learning all the quirks of hooks and various state libraries. Single-file components? Class-based styling? Custom directives and no JS in HTML? What is this, 2010? And how the hell this `$` thing works?

I remember questioning a lot of things in the beginning. Making mistakes like failing to auto-subscribe variables or just not wrapping them right in writables. However, something kept me going. Of course I had this primary motive of making a library (which I've developed beyond my original plans into a Chrome extension as well [https://github.com/TeemuKoivisto/prosemirror-dev-toolkit](https://github.com/TeemuKoivisto/prosemirror-dev-toolkit)) which gave me a clear goal not to get side-tracked into dwelling too deep into it. And after a while something just clicked!

I think it was unlearning the quirks of the React that in the end won me over. I didn't have to grasp anymore how MobX observables or Redux actions worked that always seemed to require some twisting of my brains. No more I had to debug React hooks that were behaving inconsistently because I had mistaken some "trivial" concept about them. Or, God forbid, you forgot to add all your dependencies to your `useEffect` hook which I feel is the biggest waste of time _ever_ and I am strongly against it (as I explain here).

It just. Worked. I especially like the built-in state management which has (in my opinion) just the right amount of magic to make you not need any external library. Granted I think they should add a built-in persistence layer to eg localStorage.

And classes! Even though I was first strongly against them I can see the beauty of simple class-based styling which gets you pretty much 95% to where styled-components could get you. And you do this without making your components sprinkled with `border-top: ${({ top, theme }) => top ? 1px + theme.colors.blue : ''}` kind of hacks.

## Web components

So uhh. Before I fully committed to using Svelte and SvelteKit to redo my blog, I did have a momentary lapse of judgement to try and ditch _all the frameworks_. Perhaps something I picked up from reading too much HackerNews but I wondered whether these frameworks were just gimmicks and all I needed was some file pipelines and good old mustache templates.

I was wrong. I really did try it but at some point I realized that what I was doing was just stupid.

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/putting-on-clown-makeup.jpeg" alt="Putting on clown makeup" loading="lazy"/>
</figure>

The somewhat working prototype can be found here xxx but just as <a href="https://dev.to/richharris/why-i-don-t-use-web-components-2cia">Rich Harris said in a blog post</a>, the spec is sorely lacking in ergonomics to be of any-replacement to modern JS framworks. You just end up making your own crappier versions of things and realize, you can't really leverage any of machinery frameworks use to reduce your work.

Just as few pointers, there is no templating in web components (eg `{{ name }}`). So you need something for that. Or directives eg `{#if loggedIn}`. You have to wire-up the state management between components on your own (to decide what to re-render for example) and all web components are JS-only - they are only created when the JS is run. Hence making your site flicker nicely _unless_ of course you write your own static rendering widget... And probably other things as well I don't even want to remember.

## SvelteKit

Svelte it was and spefically, SvelteKit. Having wasted time on Gatsby, Next.js and web components it did feel a little overwhelming to do it _yet_ again with another tool. But sometimes you just gotta do what you gotta do it. And do I really better things to do in life than rewriting my blog? Hah hah. Haa.

I had started using SvelteKit from @alpha107 when it was quite still in its infancy. Things tended to break from time to time which I endured. Although it was a little irksome to adapt to new breaking changes every once in a while it was a sacrifice I was willing to make to escape React-land.

Now comparing SvelteKit with Gatsby and Next.js, if you skip the fact you are writing Svelte components instead of React components and hooks, the biggest difference I think just comes down to ergonomics. There isn't much you need to grasp to understand how it works - just pick up the boilerplate and start writing. There are some strict patterns you must remember though, like having to use `lib` folder for thingsxxx??. In SvelteKit, there is no file-to-page mapping as this was deemed to restricting.

Instead, you have folders with `+page.svelte` and corresponding `+page.server.ts` or whatever else layouts you have in there. It took a little bit of getting used to but I say it has been pretty smooth sailing since. What I like about SvelteKit is the lack of overly abstracted library methods that I'd have to use. SvelteKit tries to stay out of your way as much as it can.

Some edge cases that you might run into are when, for example, you want to create dynamic pages that are not server-side rendered. For that, you need a fallback page. Also, some things - such as intercepting page transitions to show eg alert to save changes - can require some manual work but all in all, I like it.

At this time I as well had inspiration for a completely new layout for this blog. In the original version, I used a pretty standard light-theme really plain spacings and colors.

In the new version, inspired by the <a href="https://man7.org/linux/man-pages/man1/man.1.html">man-page layout</a> I ditched the xxx navbar and footer and went with really minimalistic approach. Also I noticed that man page uses very small indents to make the text appear more hierarchial which I thought was cool. For color scheme, I decided to write it in dark-mode only but later I did relent to adding light-mode as well.

SEO

## Cloudflare

It wouldn't be a blog in my opinion without proper commenting. No matter how few if any there would ever be. But I had this problem that all the commenting tools out there seemed a little awkward to use.

Disqus was just too bloated and irrating. I ruled out Static Man since I didn't want to add additional build steps. I had comments.es for a while but I wasn't really happy about over-loading issues for comments. I mean, I get it. It's really clean and if you expect all your users to have a GitHub account it's probably ideal effort-wise.

However, as I felt my tinkerer-itch yet again, I saw this as a perfect opportunity to experiment with Cloudflare's built-in serverless storage for actual use.

Now for uninitiated, Cloudflare offers various tools to use with their workers that tend to be quite cheap as you only pay for what you use. In my case, I wanted to maintain a nice tidy JSON of the comments in block storage with some wiring to allow users to edit & delete their posts after they log in had expired. You can find the code here: https://github.com/TeemuKoivisto/teemukoivisto.xyz/tree/main/packages/worker and feel free to use it for your own blogs.

I wanted to add Google oauth as well, but I suppose I can add it later.

O

# The journey's end

As I try to wrap this up somehow, I see there isn't much of a conclusion to be drawn from all of it.

Perhaps I should try to warn people to warn to not to get side-tracked into doing things that aren't primary for their original goal but then again, why not. After all, isn't that how you'll to not to do it the next time? And I'd say many of my side-steps were worth of venturing if not for the experience of having gone there. (something something roads diverged)

In my case, I guess the main revelation that I've found is that I really want to build my own shit. Using somebody else's templates and styles doesn't really sit well with me and I really want to put my own mark on it. Also, I tend to learn depth-wise so for me learning all the layers from bottom-up is really comforting for my own sake - even if I won't ever have to use that information.

I suppose I am little bit of an artist. I have my own way of doing things and sometimes I take a few test shots just to see how hard something can be. Did I mention that I wrote my thesis, a long-ass 86 pages, by writing a complete first draft and then rewriting everything? Which gave me full marks but in the end, the 2 months spent writing it full time wasn't probably the wisest money-wise.

Anyway, the point is - sometimes it's not about the goal but how you get there. Unless it's only about the goal. Then you really want to just _get there_ as fast as you can.

<figure class="mt-16 mb-24 flex flex-col items-center justify-center">
  <img src="/blog/key-and-peele.gif" alt="Meh." loading="lazy"/>
  <figcaption class="mt-1 flex flex-col items-center">
    <div>In conclusion</div>
    <div class="text-xs mt-2">Key & Peele</div>
  </figcaption>
</figure>

# The end v1

I would say, I learnt to appreciate plugn'play solutions. Once you give an option to somebody you are also causing them some cognitive burden of having to decide. That's bad if you really need to make something (and fast). Taking the most basic Hugo template and just rolling with it, I would have been ready in no time.

However. I've realized, over the years, that I am a craftsman. Copying somebody else's work and using their stylesheets just doesn't sit well with me. I want to understand how it works. I want to know all the trade-offs that went into making it and most of all, how I could improve it and make it my own. I abhor limited decisionspace when I know it's . Don't get me wrong, I like Go language from the few times I xxx with it and I try to simplify my processes as best I can.

But I don't know. I am an artist. And sometimes, you just gotta follow your instincts - no matter if logically they might not be optimal. And besides, having learnt now Gatsby, NextJS and SvelteKit I can pretty easily tell what I like about SSR frameworks and what I don't. I know

What else.

Oh, and also I went deployment-wise from AWS (S3, CloudFront+EdgeLambda) to Vercel to Netlify to Cloudflare Pages. That also taught me a lot of what you're actually paying with those fancy build services. Yeah, AWS really has a lot of catching up on this - you migth feel smart writing your edge lambdas but that quickly evaporates after you realize how waste of a time it is. And why Cloudflare? Well I think they have the most xxxkattavin stack with the least amount of corporatory stain.

They don't have a big bar of how many build minutes you've used this month from your free quota and why this and that makes your life so much better and why not use this proprietary tool because you don't have to pay for it (until you hit your quota).

I don't know. But that has been my experience.

So uhh. Lesson here is, I guess, that make things that matter to you. This blog, while fun ultimate goal, was more or less just a playground to try out my ideas. Yeah, I could've written some dingy-wingy blog posts over all these years but I rather take this experience of having it done it the hard way while learning the xxx between the choices through and through.
