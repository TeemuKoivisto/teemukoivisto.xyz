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

# In the beginning

Once upon a time I started making myself a blog. This was probably 2017, can't remember exactly. In my first attempt I used Jekyll which felt just a little too restricting to customize and unfamiliar with its Ruby to me. Same with Hugo even though in my both attempts I **could** have made a decent blog in no time. \<Sigh\> I guess I _had to_ do it the hard way and make my own custom dingy-wingy website with the coolest tools available at the time. Which in 2018 was Gatsby, TypeScript and Styled Components. All so exciting and new at the time.

Yet well, it was not exactly a piece of cake to write a blog from scratch with those tools. While I knew TypeScript and Styled Components fairly well, Gatsby was somewhat fickly beast that at the time was also very new and alas, had many interesting edge-cases. Through shedding blood and maybe a few tears, I managed to assemble a working site but there is something to be said about polishing and fine-tuning things. I could have shipped the first version and been quite happy with it, yet I decided to keep on fine-tuning it and adding little things that didn't matter to anyone except me.

I guess it is a type of analysis paralysis where you get so tunnel-visioned working out some details right when you should instead switch gears and start making content - the thing you were excited to do in the first place! Oh well.

During this epic journey I even went as far as to author my own SEO library just to modularize and archive some of the knowledge I accumulated during this process: <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">react-seo-meta-tags</a>. Now why would one even spend a disproportionately large amount of time making a _SEO_ library for a site with basically no readers or users? Hmm. A good question 🤔. Moving on..

However, SEO wasn't even the most annoying part of this project. While Gatsby pioneered the static React site generation, well-suited for blogs, it had a few pecularities involving its approach. What made me question my sanity a few times was the absolute maze of configuring Gatsby's `gatsby-node.js` and `gatsby-config.js` files and debugging GraphQL queries. The idea is great, composable pipelines and plugins, yey! But in practise there was just too many leaks that would have made it enjoyable. Add in the mix GraphQL which is another bulky beast to tame, especially when dealing with static files. **Static files**. Do you really care about overfetching static files which you **A)** have to parse in full in the first place and **B)** are processed into static HTML.

One of the fun bugs I encountered was a linting issue where you had to add an empty `.eslintrc` to the root of the project to prevent Gatsby from linting a locally linked library's source code. Another nice one was the ordering of the `gatsby-google-analytics` plugin. You had to have it in a specific order in relation to the other plugins and I got so frustrated with it, that I switched to another GA plugin. Aaand the parsing of the markdown data with the images seemed to be more of an arcane incantation than software engineering. The darn images would sometimes not reload yet adding a console.log statement, if I recall correctly, somehow made it work (I'm still extremely puzzled by that one).

**image about exploding brain**

---

Well, enough about that. Did I mention that I originally also wrote an AWS stack for this whole app? With S3 bucket, edge lambdas and a CloudFront distribution. And, God forbid, CSP rules applied by an edge lambda. Now if you are not familiar with edge lambdas they do not exactly work always the way you want them to. Namely deploying and updating them, at least the last time I tried, were major hurdles to do automatically. It's not possible to automatically deploy the new edge lambda version but you have to increment it _manually_ after which you can set the version number for the CF distribution. Things you do to make a blog...

# 2 years later

So anyway, the whole thing became quite a drag and I never really finished this thing to the level I wanted it to. Also I went apparently half-insane writing my first content here which didn't seem to fit the tone of a professional website intended to showcase my immeasurable programming talents. Writing interesting content is always nice but I think I should have another venue for pure ranting rather than technical articles.

After letting this site languish for two years, I finally had a good programming groove to tackle it once more with a new, more pragmatic angle. Also I wanted to trial two new fascinating technologies, Next.js and TailwindCSS that seemed quite promising.

Why? Well, from my experience with Next.js it does seem and feel less magical way of deploying static sites with React where you, the programmer, can work with a lot more suitable set of primitives and abstractions compared to the magical soup of Gatsby. I don't mean to start gang-banging on Gatsby here, it's a fine tool but I've definitely felt a lot less pain with Next.js.

For example, to render the markdown into HTML you basically write the reading logic by yourself using any tool you like, for example `remark`, and use plugins that you may desire. Gatsby does this (almost) behind the scenes yet because it was configured with one, very error prone file of `gatsby-node.js`, in a generation step that wasn't exactly quick the feedback loop wasn't that great. Also Vercel, the company behind Next.js, has a nice variety of boilerplate projects in Github that showcase very useful libraries integrated with Next.js.

One other that Next.js seemed to have done better, at least the last time I checked, was the deployment. Of course, Gatsby has been catching up Next.js on this but I think Next.js is still far ahead. And compared to the AWS deployment deploying to Vercel seemed almost criminally easy (almost as if no pain indicates nothing of value was done). One thing where I feel Gatsby is still better, having rewrote this site from Gatsby to Next.js, is the image optimizations and the high-quality plugins for some markdown stuff at least (such as autolinking headers). But I think Next.js is closing that gap but definitely it's nice to have such vibrant innovation on this area!

## Tailwind

The another new library that I wanted to learn was and still is Tailwind, an atomic set of CSS utility classes provided in a nice, structured form. I had my doubts about it, and still do, but Tailwind has proven to me that with a smaller, opinionated API for CSS developers can produce elegant UI designs much quicker. Tailwind isn't necessarily a tool to style your JSX components but a design system to organize your styles in a much more compact form. Without enforcing the encapsulation of the styles around JSX components like styled-components do, Tailwind is much closer to writing inline CSS that, as you might imagine, can appear quite messy to an outsider.

Yet it's the efficiency of writing those styles that in the end separates Tailwind from other CSS libraries or tools. Working with CSS directly, many developers get the insatiable feeling of wanting to tune a few details here and there to their heart's desire. Which is fine to learn CSS but isn't necessarily the most productive way to produce nice UIs. Tailwind has some limitations to it, certainly, such as having no built-in way of adding :before or :after elements. Yet it navigates through its downsides very remarkably and makes a difficult problem (styling web pages) seem almost trivial. And you can organize your classes with lint rules and so forth.

Well, enough of praising. It's not the tools that make a good programmer but how you use them. Anyone can make terrible code with even the most sophisticated tools but it's the self-discipline of avoiding doing too much and too little, that is the balance that only experience can make a good programmer.

To compare the Gatsby site to this version, the Gatsby version took maybe month's worth of work to create it. This site took perhaps a week's worth of work. Of course, I was able to use basically the same layout and avoid a lot of the designing of the UI. But still I would it was much nicer and quicker to work with Next.js and StyledComponents/SCSS. Sometimes it's not a bad idea to invest in researching and learning some promising tools to speed up your development routines that you are already very comfortable with. Shaking things up definitely keeps things interesting.

Hohhoijaa. So what next? Maybe another blog post. Maybe I'll finally get to actually writing new stuff instead of rewriting the same projects all over again.

While this setup currently is (probably) the most hipstery way of launching personal blogs that isn't completely esoteric, I probably won't rewrite this in a veery long time. Time is limited. Our lives last merely a fraction in the timespan of the universe. Do I **really** want to spend my limited existence redoing something I've already done before? I would rather just hang out in my underwear and drink beer. That at least wouldn't require one more style fix to satisfy my OCD.

# 1 year later

I'm not really sure why I last time stopped xx when I was so close to the finish line. I kinda recall that I, as a silly xxx, I tried to add as a final thing Google Analytics which seemed to have killed off my motivation to get xx. And who can blame me, that piece of crap is one soul-sucking piece of bloated UI that is as useful

# 2 years later

Now this chapter has been written with what I would say more maturity and insightfulness. I look back at these previous attempts as experiments that were more fun as the actual end result. Which is fine! As you can not really quantify the satisfaction one gets from making something you're excited about just to throw it away at later point. At work, you are stuck with your deprecated tools for a long time. For your own projects, you can get crazy - if you feel like it. And making this blog has been nothing but a journey to understand why I do things they way I do them.

## Svelte

So first things first. Svelte.

My first encounter with Svelte and SvelteKit was shortly after I make my NextJS version of my blog in 2021. I started rewriting this developer tool called [prosemirror-dev-tools](https://github.com/d4rkr00t/prosemirror-dev-tools) and after evaluating different options, decided to go with Svelte. I have to say I was at first hesitant and doubtful about Svelte. After all, I had learnt to love composable components with React's TSX and StyledComponents so having to switch my mindset 180 degrees felt weird.

Single-file components? Class-based styling? Custom directives and no JS in HTML? What is this, 2010? And how the hell this `$` thing works?

I remember questioning a lot of things in the beginning. Making mistakes like failing to auto-subscribe variables or just not wrapping them right in writables. However, something kept me going. Of course I had this primary motive of making a library (which I've developed beyond my original plans into a Chrome extension as well [https://github.com/TeemuKoivisto/prosemirror-dev-toolkit](https://github.com/TeemuKoivisto/prosemirror-dev-toolkit)) which gave me clear idea not to get side-tracked into dweling too deep into it. Yet after a while, I kinda realized that "this was it". "I got it".

No more grasping of bizarre behaviors of MobX observables or Redux actions that seem to twist your brain. No more leaky React hooks triggering gazillion times because you didn't understand . Or, God forbid, you forgot to add all your dependencies to your `useEffect` hook which I feel is the biggest waste of time _ever_ and I am strongly against it (as I explain here).

It just. Works. I especially like the provided state-management which is just the right amount of magic to make you not need any external library and which is so simple you don't have to spend too much figuring it out.

And classes! Even though I was first strongly against them I can see the beauty of simple class-based styling which gets you pretty much 95% to where StyledComponents could get you without becoming overly convoluted spagetti with million `border-top: ${({ top, theme }) => top ? 1px + theme.colors.blue : ''}` per component.

Only thing I am a little sad about is the zeal about using JSDoc over TypeScript. Sure, it probably makes sense for a library their size. But why reinvent another wheel in this case? JavaScript is moving towards typing, which is great, but at this point it's a little premature, in my opinion, to go all in with it. Especially when JSDoc to TS is not a full conversion and you basically end up typing everything either way. IDK.

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

<figure class="mt-16 mb-24 flex items-center justify-center">
  <img src="/blog/key-and-peele.gif" alt="Meh." loading="lazy"/>
</figure>
