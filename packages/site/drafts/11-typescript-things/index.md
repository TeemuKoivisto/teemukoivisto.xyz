---
datePublished: '2024-02-19'
dateModified: '2024-02-19'
title: My collection of TypeScript/JavaScript tricks you may or may not have heard of
description: na
tags:
  - typescript
---

# Introduction

object merging without libraries:

```ts
db.query(
  data: {
    name: 'John',
    ...(value && { pants: value })
  }
)
// same with arrays
db.query(
  items: [
    'John',
    ...(value ? [pants]: [])
  ]
)
```

setTimeout type -> learn to love `typeof`
se joku yksinkertainen juttu jonka tein mindbridissä taas
interface vs type
Record vs `{key: string}: any`
Array<any> vs any[]
semicolons -> no
never use `#foo` but `private foo` -> you can still access foo when debugging, #foo is permanently hidden
...args
keyof typeof
Observable
get foo() {

} -> runs the logic when called, does _NOT_ memoize it(?)
readonly
JSON.stringify(object, null, 2)
library stuff -> multiple entry points from library, type generation
"bundler" vs "nodejs" resolution, _.d.ts
TS aliases -> /_ and /

## Avoid casting

Because if you change that type signature, you'll get nice subtle bugs as all the intellisense has disappeared already.

```ts
// don't
const arr = [1, 2] as [number, number]

// do
const arr: [number, number] = [1, 2]
```

## Use Result types

As in Rust. My version:

```ts
export type Ok<T> = {
  data: T
}
export type Err = {
  err: string
  code: number
}
export type Result<T> = Ok<T> | Err

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
```

## Typing .filter calls

https://stackoverflow.com/questions/43010737/way-to-tell-typescript-compiler-array-prototype-filter-removes-certain-types-fro

Use User-Defined Type Guards feature of TypeScript:

```ts
const arry = [1, 2, 3, 4, '5', 6]
const numArry: number[] = arry.filter((i): i is number => {
  return typeof i === 'number'
})
// numArry = [1, 2, 3, 4, 6]
```

Regular type guard functions work like:

```ts
function isDuck(x: Animal): x is Duck {
  return x.type === 'duck'
}
```

But with classes the easiest way to type-cast is with `instanceof`:

```ts
if (x instanceof Duck) {
  // TypeScript knows x is duck here
}
```

## Generics

Are easy with functions:

```ts
function getValue<K>(key: K, value: V) {}
```

A little bit harder with arrow functions:

```ts
const getValue = () => V
```

But as you can see if you write this in your editor, TS can't properly infer the correct parameter V for the key K. It instead resolves to union which just loses all type safety.

It's rather annoying and I have went as far as asking this question on StackOverflow [link] in which x kindly explained the whole deal. Hopefully it'll land in TypeScript one day, but in the mean time the only way to strongly type generic event types is to use tuples:

```ts
// tuple example
```

This comes handy when you're working with events. Here's an example from my own repo:

link to midi-trainer

## `satisfies` keyword

Came in TypeScript `4.7`. What it basically does is allow you to type-check your object literals against interfaces without casting them into specific object types (and losing the literal signature).

## `infer` keyword

Have no idea what it does

## Type hacking

`Omit` and `Pick` are your friends.

## Augmenting global interfaces

Say you're using an old library but it does not have types, what to do:

```ts
declare module 'markdown-it-table-of-contents' {
  import MarkdownIt from 'markdown-it'
  function toc(parser: MarkdownIt, options: any): void
  export default toc
}
```

You can also augment package interfaces with your own methods (and ts-ignore that hacky monkeypatching):

```ts
declare module 'library' {
  interface LibInterface {
    monkeypatch(x: number): number
  }
}
```

However, you _can't_ override methods — the function/property signature must be the same. It might be better idea to just shim the library yourself eg creating a wrapper class around it.

A usual application is augmenting the global window object:

```ts
declare global {
  interface Window {
    applyDevTools: typeof applyDevTools
    ...
  }
}
```

This is a snippet from my own project dev-toolkit

## Generators

You have heard of them but probably never had a real reason to use them. And if you did, you probably used callbacks instead. Which is a shame since they can be really powerful tool in making sure your asynchronous jobs work in perfect sequence and are easily cancellable at any time.

So the basic synchronous generator is like:

```ts
// sync generator
```

This is an example from my actual project where I iterate over text and then yield to the parent process whenever I've parsed a whole word. Much cleaner than callbacks.

But the real power of generators is with asynchronous events:

```ts
// async generator
```

Now this baby is given an URL to fetch data from in chunks which it returns to parent process than can eg send it to storage or to user. The important part is the **sequential** nature of async generators. Awaiting the yielded promises in the parent loop:

```ts
for (await const evt in generator(url, params)) {

}
```

Ensures they are processed in order as they come. If instead you'd want to run them in parallel you're much better off with regular `Promise.all` hacks:

```ts
// use the index hack
const promises: any[] = []
for (const req in createRequests(url, params)) {
  promises.push(req)
}
const resp = await Promise.all(promises)
```

As you can see, a lot messier with no retrying or canceling or timed out promises. This promise-index tuple hack is what I use when I have to use more than 2 filters on the returned promise array. Not the type-safest but sometimes you just want to live on the edge.

But back to the generators, the reason they are so powerful that I can inside the generator rerun it after a timeout:

```ts
// example
```

As well as provide `AbortController` to whatever `fetch` call it uses which you can immediately abort with `controller.abort()`. This will make all fetch calls that use that signal to interrupt with x error.

## Iterators

So `Map.entries()` returns an iterator as you probably knew. Which is why you have to use `Array.from(Map.entries())` to actually iterate it in eg filter. But incase you're wondering what they really are, here's a short explanation:

## Just little things

We all know that in JavaScript `false` `undefined` `null` are falsy but also `0` and `""`. Which is why in conditionals it's advised to use not `x || y` but `x ?? y`. So here `y` is returned over `x` whenever it's falsy.However, just so you remember `??` returns `y` when x is _either_ of `undefined` or `null`. Don't be a dummy and forget that and think it's only on `undefined`.

You can iterate list with the following ways:

```ts
list.forEach((v, idx) => {
  console.log(`${v} ${idx}`)
})

for (let i = 0; i < list.length; i += 1) {
  console.log(`${list[i]} ${i}`)
}

for (const key of list) {
  console.log(`${list[key]}`)
}

for (const value in list) {
  console.log(`${value}`)
}
```

So which one to use? Up to you, but I recommend either `for (const value in list)` or `forEach` / `for` loop. The benefit `for` loops have over `forEach` is that it's a little faster (no function call) but mainly that you can `yield` from inside for-loop. Really important detail when working with generators.
