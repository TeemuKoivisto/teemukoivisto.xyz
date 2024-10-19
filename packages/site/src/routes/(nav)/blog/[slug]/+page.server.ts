import type * as Kit from '@sveltejs/kit'

import { parseBlogPosts } from '$lib/markdown'

import type { EntryGenerator } from './$types'
import type { Comment } from '$lib/schemas'

type RouteParams = {
  slug: string
}
export interface BlogImage {
  url: string
  alt: string
  width?: number
  height?: number
}
export type SiblingPost = Omit<BlogPost, 'html' | 'nextPost' | 'prevPost'>
export interface BlogPost {
  draft: boolean
  slug: string
  url: string
  title: string
  description: string
  datePublished: string // In 2021-04-10 format
  dateModified: string
  tags: string[]
  coverImage?: BlogImage
  squareImg?: BlogImage
  cardImg?: BlogImage
  nextPost?: SiblingPost
  prevPost?: SiblingPost
  html: string
}
export interface PageData {
  slug: string
  comments: Comment[]
  post: BlogPost
}

export const load: Kit.Load<RouteParams> = async ({ params }) => {
  const { slug } = params
  const res = await Promise.all([
    // commentApi.listComments(slug),
    Promise.resolve(),
    parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true })),
  ])
  const comments: Comment[] = []
  // if ('data' in res[0] && res[0].data.comments) {
  //   comments = res[0].data.comments
  // }
  const post = res[1].find(p => p.slug === slug)
  return { slug, comments, post }
}

// Pre-renders pages that are not linked elsewhere (drafts)
// https://kit.svelte.dev/docs/page-options#entries
export const entries: EntryGenerator = async () => {
  const posts = await parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true }))
  return posts
}

export const prerender = true
