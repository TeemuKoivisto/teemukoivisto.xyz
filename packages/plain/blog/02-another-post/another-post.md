---
datePublished: '2021-04-16'
dateModified: '2021-04-16'
title: Perils of over-engineering
description: The bane of programmers 🤓🤯😵
tags:
  - programming
  - productivity
---

It must somehow be in our blood. By us, I mean anyone who has ventured into programming for any
extend periods of time. The fact that we can seemingly create _anything_ if we just set our minds
into it is at the same time exhilariting yet daunting. Of the million opportunities in front of us,
which one we should choose?

[[toc]]

To get into the meat of the issue, I want to talk about **over-engineering**. That perilous yet, somehow,
exciting hobby that we tend to drift into too often than I'd for sure like. How come!? Shouldn't it
be easy to decide once and for all that _this_ tool is what I'm going to use - regardless what others say -
and just make this _one_ thing.

Cut to: 3 months later you have abandoned your original project and are consumed by a side-project B of the
said project A which should make creating the project A much smoother. **AND** were you to make projects
C and D, the project B would surely be an immense help. And also, it could generate you some visibility
with GitHub stars and whatnot - possibilities are endless! Because the way A is done currently is crap and
therefore, to be a good OSS advocate, _you_ have decided to change the status quo and make a lasting impact
on this xx world.

I'd wager that most of software engineers have veered into this kind of situation. And, having burnt out after
6 months without getting neither A or B done, we ask ourselves - why? Why do I this to myself? Am I just so
**stupid** that I can't just organize my thoughts and willpower to do just a simple thing on my own.

It's quite demoralizing really. To understand that even with your wizard-like skills, you are merely an ape
pressing buttons and as easy to distract as a cat with xx tied to an end of stick. Somehow, the rigor how you
have done your work and in general, set yourself to do simple tasks just does not translate into long-term
projects and facing the ever-growing vortex of infinite possibilities.

So what can you do about it? Or should you just accept this as fact of life?

## Case study: myself

Okay, so I'll be the first to admit to be a practisioner of this dreadful sin. I'll let you guess how many
times I have started writing this blog only to fail pathetically at the finish line. 2? 3? 4? Good guesses!

I have to rake my memory a little but I think the answer is, let me see...

First with Jekyll, then with Hugo and then with Gatsby. At this point I started my own SEO library <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">react-seo-meta-tags</a> which nicely derailed that version. Of course,
the killing blow was adding Google Analytics which I, for some insane reason, wanted to add before this blog
would be ready. Okay, so then there was NextJS because of course I had try out the **best** blog framework for React
out there. I guess it was all right, wasn't too happy about though its strict linting rules and in general just
the athmosphere of React. Then I found out Svelte and you'd think I found my Holy Grail in the form of SvelteKit?

Nope. To be the silly man I am, I wanted to first try out how to make my own **blog engine** based on Web Components and
Vite. To see whether you can just sprinkle little web components here and there and bundle your site as static HTML.
To cut the long story short, web components were crap and unusable without a proper framework to accompany them. Just the
fact you don't have templating nor can reuse styles easily makes them a big pain in the ass. Would be a blog post of its
own to lay down all of them (but Rich Harris was right).

So that was 5 tries and the _6th one_ was SvelteKit - as I regained my sanity. However, while the framework and the tools
were my liking this time (mainly SvelteKit and Tailwind), I felt that my original shabby Gatsby site which styles I had
copied over smally altered from one site to another, were kinda crap. And to be honest, they were. But the fact I had
xx this long only to produce a big chunk of scheisse did not sit with me. So, I abandoned my blog for good 6 months **until**.

Drumroll.

I got down and wrote this. It is SvelteKit and Tailwind, yes. It borrows much from my original design of 2019 with the icons
and styles staying pretty much the same. However this time I had something else. I had an ability to _ship_.

In a short span of a bored Sunday evening I had regurgigated my old styles into a much simpler and, in my opinion, better
design which was dark-mode only and without analytics or comment scripts of any kind. No GA. No Google verified site.
SEO tags, yes but only the bare minimum.

So how did that happen? How did I finally reach this apotheosis?

## Explanation

While there was no huge change between 6 months ago and today, I think I did learn _something_. That something being
a social push that was xxx by a joint project between me and a friend which, as a by-product, helped me to finally
get out of the mind-set of tinkering and get into **shipping** things.

To be exact, during this project with a friend (a game in Rust to be exact) we've had to produce the most amount of
code in the short time we have to contribute to it together. At first, I did some work outside the sessions but now
it has mostly subsided to be an occasional hobby project we pursue together.

However, the most important part about it was that it crystallized to me that _tools matter but speed matters more_.
There are not really prizes to be won with writing good quality code. Sure, I like to do that and in general avoid it
as much as possible. However, when you just need to get something **done** does it matter you've copy-pasted the same
snippet in multiple places intead of separating it into a component? No! And does it matter that your server fails to
x players and at times, fails mysteriously while you play-test it? No - wait yes? Okay, not sure about that 😅.

What I mean is, that we get what we focus on. If as we start our project we are hyper-focused on using the latest and
bestest of tools, there's a high chance we'll be distracted at various points by other tools and options as we go along.
But if our goal is just to make a site, to make a game? Our whole mindset will be altered. We'd probably pick something
easy at first, like say Hugo or Unity, and then just copy-paste an example and start twisting it into our own purposes.
That's we pretty much did with our game. While we started from bootstraps at various points we just wildly copy-pasted
an example and just went with it. As a fun anecdote, it was only 4 months in with Rust I learn how exactly traits work.
No Rust-book, no tutorials read. Okay, in this case it helped immensely that I had a buddy to share and extract information
from on. But in the end, it was the choice of just getting things done that prevailed and, in ways, changed my outlook
as a programmer.

## Takeaway

This post is not a warning tale about over-engineering. In part because I wanted to make a good blog site I had the
impetus to try many new interesting things, such as Tailwind or authoring my own npm package, that in the long run
were much more helpful than the simple task of making a blog.

But also I've noted that tools are just tools. One does another thing well, the other a different thing. They are not
strictly superior over eachother. So pick the one you feel the most comfortable and just get coding. Be it copy-paste
snippets or starting from scratch, just getting something there. You can refactor it later.
