import { parseBlogPosts } from '$lib/render'

/** @type {import('./$types').PageLoad} */
export async function load({ params }: any) {
  const posts = await parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true }))
  return {
    posts: posts.map(p => {
      const { html, ...rest } = p
      return rest
    })
  }
}
