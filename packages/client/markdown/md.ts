import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

import { validate, BLOG_POST_SCHEMA } from './validate'
import { findBlogPosts } from './fs'

import { BlogPost } from './types'

const parser = new MarkdownIt('default', {
  html: true,
  linkify: true,
  typographer: true,
})

export async function findAndParseBlogPosts(dirPath: string) {
  const posts = await findBlogPosts(dirPath)
  const sources = await Promise.all(posts.map((p) => p.readFile()))
  const sourcesWithHeaders = sources.map((src) => matter(src))
  const parsed = sourcesWithHeaders.map((entry, idx) => ({
    ...entry.data,
    slug: posts[idx].name,
    html: parser.render(entry.content, {}),
  }))
  const withSiblings = parsed.map((entry, idx) => {
    function getProps(nextOrPrev: any) {
      return {
        title: nextOrPrev.title,
        slug: nextOrPrev.slug,
        description: nextOrPrev.description,
        datePublished: nextOrPrev.datePublished,
        dateModified: nextOrPrev.dateModified,
        tags: nextOrPrev.tags,
      }
    }
    if (idx !== 0) entry.nextPost = getProps(parsed[0])
    if (idx !== parsed.length - 1) entry.prevPost = getProps(parsed[parsed.length - 1])
    return entry
  })
  const validated = withSiblings.map((entry) => validate<BlogPost>(BLOG_POST_SCHEMA, entry))
  return validated
}
