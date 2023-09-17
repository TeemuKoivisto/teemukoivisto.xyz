import type * as Kit from '@sveltejs/kit'

import { parseBlogPosts } from '$lib/render'

type RouteParams = {
  slug: string
}

export const load: Kit.Load<RouteParams> = async ({ params }) => {
  const { slug } = params
  const posts = await parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true }))
  return { slug, post: posts.find(p => p.slug === slug) }
}
