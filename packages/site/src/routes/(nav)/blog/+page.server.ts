import type * as Kit from '@sveltejs/kit'

import { parseBlogPosts } from '$lib/render'

export const load: Kit.Load = async ({ params }) => {
  const posts = await parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true }))
  return {
    posts: posts
      .filter(p => !p.draft)
      .map(p => {
        const { html, ...rest } = p
        return rest
      }),
  }
}
