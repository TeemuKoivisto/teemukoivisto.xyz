---
datePublished: '2024-02-19'
dateModified: '2024-02-19'
title: TypeScript things
description: na
tags:
  - typescript
---

# Introduction

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
