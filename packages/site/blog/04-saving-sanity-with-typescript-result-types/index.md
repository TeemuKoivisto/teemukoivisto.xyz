---
draft: true
datePublished: '2024-04-08'
dateModified: '2024-04-11'
title: Saving sanity with TypeScript result types
description: Or how I learnt not to fear errors
tags:
  - typescript
  - programming
coverImage:
  url: https://teemukoivisto.xyz/blog/02/rejecting-carbs.jpg
  alt: Rejecting the temptation of carbs
  width: 1080
  height: 566
---

# Introduction

eli kerron lyhyesti miksi Result tyypit on ainoa toimiva tapa käsitellä virheitä applikaation sisäisissä rajapinnoissa

we all know JavaScript creator didn't exactly figure out all the ergonomics of the language before launching

throwing errors was and still is very common pattern in Java — sometimes fails, you throw an error

which is a fine, simple idea with simple aplications without gargantuan interfaces and with _typing that something can error_ this part is what really missed the mark with JS design — sure you have errors but WITHOUT a way to mark them? Granted, as a dynamic language JS in its early days cut a lot of corners, some for the better (no forced semicolons) and some for the worse (errors, single global variable type `var`). But this had to be one of the dumber ones.

Without knowing whether something can error and having to rely only on crude heuristics, mostly based on instinct, building fully-fledged applications in JS was and still is pain. And you might think, "Hah, silly webdev, learn to code", but the truth is if you can't see the problem immediately you only learn its existence through mistakes and wasted life while scrambling to fix crashed websites.

The sheer madness of it is easily demonstrated by just trying to parse an integer. _Of course_ this should just crash and burn right:

```
const x = JSON.parse('x')
```

Silly dev, should know better. But so look at this then:

```
let x
try {
  x = JSON.parse('x')
} catch (err) {
  x = undefined
}
```

Looks beautiful right? Clear an concise. But wait, so does this mean `parseInt(x)` crashes as well? Well, of course not — that's a `NaN`. Which is by the way a much saner way to behave.

I know, I know. Back in the day failing to parse JSON was (and still is) pretty big deal so crashing the whole application for it could be seen as reasonable (instead of quietly passing an `undefined` to an unsuspecting function down the line). Good intentions, bad implementation.

In languages since then (or during? not sure about the history of this) somebody had an itching realization as I did that there must be a way to handle these errors without having to wrap everything in try—catches all around. And that was `Result`.

In Rust, Result is simply:

```

```

Which is either `ok` with a value that you can unwrap or `err` with some `std:error` that you could then process as:

```
match
```

Hmm. That's kinda nice. Well, it is. Especially when you factor in that you can now actually _see_ that the resulf of the function is indeed either success or error. Which you can throw and panic if you want to or pass upwards or handle it do whatever. Even before I started to learn Rust I really sought an answer to how to implement something similar in TypeScript without having to write some tedious helper functions or boilerplate. And without much further ado, here it is:

```ts
export type Ok<T> = {
  data: T
}
export type Err = {
  err: string
  code: number
}
```

[wow image]

Wow. Fantastic. "Tears are running down from my eyes"-unbelievable right? The pure simplicity of it so mesmerizing. "But wait", I hear you say. "How does TypeScript infer these types from eachother?"

Now as you might know, TypeScript doesn't allow you to just randomly access a property to see if it's undefined and infer the type based on that.

```ts
const x: Result<string> = { data: 'x' }
if (x.data) {
  // Type-check error here
}
```

Which creates a bit of a pickle. What is an obvious solution to this is to introduce an additional property which maps to either Ok or Err or even additional return types.

```ts
export type Ok<T> = {
  ok: true
  data: T
}
export type Err = {
  ok: false
  err: string
  code: number
}
const x: Result<string> = { ok: true, data: 'x' }
if (x.ok) {
  // works
}
```

And this works pretty nicely and is quite nice and easy to read. However, as I use this pattern more and more, the times I had to write `ok: true` or `ok: false` for some one-off code that I'd later just erase, just started to annoy me. This wasn't the functional bliss that I wanted it to be. Should I just create a function to do this?

```ts
function ok<T>(data: T) {
  return { ok: true, data }
}
function err(err: string, code: number) {
  return { ok: false, err, code }
}
const x: Result<string> = ok('x')
```

Hmmmmmm. It's better, I guess... But so I have to now do `import { ok, err } from '@lib/utils'` for every single file I want to use Results in? Ohmygadddh.

[image]

It seemed for a moment that all of this was just a waste of time and sanity to avoid a simple thing (writing "ok" booleans). Perhaps there wasn't a solution.

But indeed there was! So there are many nifty features of TypeScript which the uninitiated, such as myself, have not been made everywhere as well, nobody really expects you to read a language spec or take a course in it. So you _can_ do this:

```ts
const x: Result<string> = { data: 'x' }
if ('data' in x) {
  // x is Ok<string> wee!
}
```

And lo and behold, we made it? Well, kind of. It's still a bit clunky looking I suppose, `'data' in x` or `err in x` are a bit sillier than just `x.ok` or `!x.ok`. However, now that I have used it for years (2? 3? 4?) I think that `'err'` or `'data'` kinda pops out rather nicely and while adding an additional property felt redundant, this is more like just being more explicit.

But wait, there's more! So while this is the technical details of it, in practise this has become a rather massive boost to my programming. You might have noticed my addition to this spec, the `code` property. Somewhat innocuous looking, it has given me a long awaited peace while throwing errors from my APIs. Long before this, I something like:

```ts
export interface IError extends Error {
  statusCode?: number
}

export class CustomError extends Error implements IError {
  statusCode: number

  constructor(message: string, errorCode = 500) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends Error implements IError {
  readonly statusCode = 400

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
```

Which don't just look outdated and clunky, are impossible to safely pass around without having to constantly be mindful where you throw them. And then you might still end up doing something like:

```ts
let x
try {
  x = foo()
} catch (err: unknown) {
  if (err instanceof NotFoundError) {
    // thing was already deleted or something
    return undefined
  } else {
    throw err
  }
}
```

Whereas with Results you could simply:

```ts
const x = foo()
if ('err' in x && x.code === 404) {
  return { data: undefined }
} else {
  return x
}
// x is now Ok<string>
```

I know which one I prefer looking. And while this was a bit contrived example, it should be quite obvious how nicely HTTP status codes work for error codes in general as they cover quite many scenarios while being very explicit to the user. You don't even have to understand the `err` string (which should explain it even better) and there's 0 ambiguity which status code to use for the API response. I even have extended the `Ok` with 'code' in one of my projects where I wanted to indicate various `2xx` statuses more semantically.

Only issue here you could attribute to the Result type is the lack of a stack trace to the user. Which is a fair criticism but in practise, all of the `err` messages are string-searchable and easier to digest for you and the user reading it when the whole app has burst into flames. In general errors you Result should be known error states that are explicit but I admit at times I do result to:

```ts
try {
  const x = foo()
  if ('err' in x && x.code === 404) {
    return { data: undefined }
  } else {
    return x
  }
} catch (err) {
  console.error(err)
  return { err: err.toString(), code: 500 }
}
```

Which is horrible and should include an API call with full alerts to your loggig service. But isn't it nicer when it's opt-in rather than opt-out? Personally, I would perhaps refactor the `foo` method to try-catch the error _first_, maintaining a nice interface (and Result type) to the parent caller.

Anyway. I'm not sure what other evidence I should add here in order to convince you and the rest of TypeScript populace that this is "The Way[tm]". I'm sure there are many libraries out there that let you do this but I personally think that if a primitive like `Result` requires an import of any kind it's not a **real** Result but another 'lodash'-virus spreading in your codebase. Yes, it's a nice library but wouldn't it be nice if
