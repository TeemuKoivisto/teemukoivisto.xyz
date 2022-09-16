import { parseBlogPosts } from '$lib/render'

/** @type {import('./$types').PageLoad} */
export async function load({ params }: any) {
  const { slug } = params
  const posts = await parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true }))
  return { post: posts.find(p => p.slug === slug) }
}
