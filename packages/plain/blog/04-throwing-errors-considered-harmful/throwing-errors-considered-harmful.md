---
datePublished: '2023-04-13'
dateModified: '2023-04-13'
title: Throwing errors considered harmful in JS/TS - return values instead
description: Many use errors in JS to halt execution flow which often leads to unintended consequences
tags:
  - typescript
  - nodejs
  - errors
  - rust
---

Like many, when I started learning JavaScript I encountered a curious native global object: `Error`. This error seemed similar to what I had used in Java so without much further thought, I started using it in various cases. Perhaps I had a function where, as I used it, noticed that there were erroronous inputs so I added a validation where I simply had:

```js
if (good) {
  ...
} else {
  throw Error(`Wrong parameters passed to function bar(): ${params}`)
}
```

_Good!_ I thought and went on with my merry way.

However, once upon a midnight dreary while I pondered weak and weary, as I visited my production site I noticed something awkward. As I accidentally hit a submit to a form that _ought_ to have been validated the whole app stopped function. "What?" I thought. "Is there some fatal bug in my code?"

It turns out that my beautiful `bar()` function that I so carefully crafted above, functioned as intended and receiving an incorrect value threw an error - as I had written it. **But** unlike what I had intended this minor Error halted my whole application from executing. A rather unfortunate consequence to an unvalidated input...

As I quickly scrammed to my editor to `git push origin master` a hotfix to prevent this bug from causing anymore trouble, I did what was the first xx that came to me: use `try-catch` to wrap the exception - just like I had in Java so long ago.

Which turned into:

```js
try {
  bar()
} catch (err) {
  msg = `Incorrect input passed to form.`
}
```

**Phew.** Done. Mission accomplished - no more breaking site. All is good. Or is it?

## Months later

As I gained more experience and started to have my own opinions about JS/TS and programming in general, I started to refactor my beautiful SPA to make it _nicer_. More pleasant to eyes.

-> return error string?

## Here comes TypeScript

## Promises promises promises

##
