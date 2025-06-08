import type * as Kit from '@sveltejs/kit'

import { parseBlogPosts } from '$lib/markdown'

export const load: Kit.Load = async ({ params }) => {
  const posts = await parseBlogPosts(
    import.meta.glob('/blog/**/*.md', { query: '?raw', import: 'default', eager: true })
  )
  return { posts: posts.filter(p => !p.draft) }
}
