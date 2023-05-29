---
datePublished: '2023-04-13'
dateModified: '2023-04-13'
title: Multi-threading in browser with workers as generators
description: Is surprisingly easy
tags:
  - javascript
  - browsers
  - workers
  - multi-threading
  - generators
---

One of the best things about JS/TS is its single-threaded eventpool. One of the worst things about JS/TS is its single-threaded eventpool. Depending on which side you're on you got your own perspective but I'd argue what makes JS/TS so universal and used by companies and enthuasists alike, is its simplicity. Yes. JS defined as simple. Now, okay I'm first to admit it got some stupid language constructs and conventions that are just impossible to remove now (I'm looking at you `typeof null`). However, one of the good things about how JS developed is its single-threadedness where you, by default, are expected to run most of your code in the same "main thread" (also known as "UI thread") and it just works most of the time.

Yet we, developers, curious by our nature sometimes might pause and wonder if this is all. You have your modal and a loading spinner fetching loads of data while you want the user experience to stay completely smooth without any jank. But blast it, you realize not every customer uses the latest MBP M1 and their ancient machine starts to cough miserably once they do multiple operations while the fetch is processed. An awful jank that clears up once the data is parsed but still, a stain on the zen of your mind that can't be erased. Or can it?

Well everyone who has worked with JS and browsers have probably heard about workers and the much feared service workers. Weird things that not many give much second thought. Pulling up a service worker for a silly thing like this _seems_ overkill and I agree, it probably is, but using just a regular worker can be surprisingly easy and frictionless (I would not go so far as to promise that though 😅).

_Yes yes, enough of the prelude. Provide some examples!_ 

Okay. So, I'll still first go and explain my own use case in order to give you the necessary context. I made this simple Google Drive file tree component that once shown to the user, starts fetching its own contents in the background. Somewhat silly but since the API calls go directly to Google, no burden on **my servers** so heck, why not.

Anyway, these requests can be tad heavy as depending on the amount and the contents of the users's Drives, there might be terabytes of data stashed in hundreds of nested folders. Yikes. **And** while this is running, the UI has to be updated as the new data arrives and the whole UI should stay responsive and jank free. Even on my MBP M1 this starts to make the site seem sluggish.

And that won't do! So I embarked on the task of improving this and discarding servie-worker as much too complicated and heavy solution, I picked the regular `Worker` construct and I was pleasantly surprised how well it combined with the `JS` generator functions.

Let me show you, so you first have to create your `worker.ts` file. Here's an example:

worker.ts
```ts


```

Notice the namespace that I import & modify. I do this to keep the messages I send type-safe.

Which is then called on every root folder users has (such as `My Drive`, some Shared Drive and `Shared With Me`) starting each tree-recursion in a separate thread, keeping the UI thread less congested.

driveStore
```ts
```

The point of some possible bugs here is the import path to your `worker.ts`. Since the worker runs in its own separate context, the files it can access are limited to those it entry point has. Meaning that unless you want to bring your whole JS into the worker, you have to make a separate `worker.js` entrypoint into your `vite.config.js` to make the worker as light-weight and fast as possible.

vite.config.js
```

```

And that is basicall the big picture. Once we get down to the details, however, it gets a little tricker. So you _could_ just create a recursive function that call itself on receiving new folders from the drive API. It would work **but** one big benefit of using a generator function with its nifty `yield` statements is that we can further limit the xxx of the worker to just a single API call at a time. Yes, you understood correctly.

If you are familiar with this pattern:

```
for (await listFiles)
```

What basically this does is it awaits every call from `listFiles` before calling the subsequent. Therefore, if your user has a million folder in its root folder you will _not_ fire million fetch requests and instead just bombard the API with one request at the time, the new yields xxx to the end of the queue.

Pretty cool in my opinion! Also generators make recursion much more straightforward in my experience and you can xxx something easily compared (cancel them?) to recursion.

Bringing this all together, so this is the most minimal example I could come up with:

```
lot of code
```

Which you can see in action in this [JS sandbox]()

link to source code

## Summary

blaa blaa