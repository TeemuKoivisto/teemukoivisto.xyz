import { parseBlogPosts } from '$lib/render'

/** @type {import('./$types').PageLoad} */
export async function load({ params }: any) {
  const posts = await parseBlogPosts(import.meta.glob('/blog/**/*.md', { as: 'raw', eager: true }))
  // console.log(posts)
  return { posts }
}
