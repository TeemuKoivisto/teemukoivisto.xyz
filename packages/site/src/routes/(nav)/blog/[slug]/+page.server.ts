import type * as Kit from '@sveltejs/kit'

import { parseBlogPosts, type BlogPost } from '$lib/render'
import * as commentApi from '$lib/api/comments'

import type { Comment } from '@teemukoivisto.xyz/utils'

type RouteParams = {
  slug: string
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
  const comments = []
  // if ('data' in res[0] && res[0].data.comments) {
  //   comments = res[0].data.comments
  // }
  return { slug, comments, post: res[1].find(p => p.slug === slug) } as PageData
}
