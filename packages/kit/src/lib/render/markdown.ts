import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import prismPlugin from 'markdown-it-prism'
import toc from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'

import { validate, BLOG_POST_SCHEMA } from './validate'
import { findBlogPosts } from './fs'

import type { BlogPost } from './types'
import type Token from 'markdown-it/lib/token'

const parser = new MarkdownIt('default', {
  html: true,
  linkify: true,
  typographer: true
})
parser.use(prismPlugin)
parser.use(anchor)
toc(parser, {
  listType: 'ol',
  containerHeaderHtml: '<h2>Table of Contents</h2>'
})
parser.renderer.rules.code_inline = (tokens: Token[], idx: number) => {
  return `<code class="language-text">${tokens[idx].content}</code>`
}

/**
 * Parses globbed markdown files passed as {'/blog/02-another-post/another-post.md': "asdf\n", ...} object
 * @param globbed
 * @returns
 */
export async function parseBlogPosts(globbed: Record<string, string>) {
  const posts = Object.entries(globbed).map(([key, value]) => ({
    name: key.split('/').pop()?.slice(0, -3), // another-post
    matter: matter(value)
  }))
  const parsed = posts.map((entry, idx) => ({
    ...entry.matter.data,
    slug: posts[idx].name,
    html: parser.render(entry.matter.content, {})
  }))
  // The post[0] is the newest, therefore always the post at previous index is the nextPost
  const withSiblings = parsed.map((entry, idx) => {
    if (idx !== 0) {
      const { html, prevPost, nextPost, ...rest } = parsed[idx - 1]
      entry.nextPost = rest
    }
    if (idx !== parsed.length - 1) {
      const { html, prevPost, nextPost, ...rest } = parsed[idx + 1]
      entry.prevPost = rest
    }
    return entry
  })
  const validated = withSiblings.map(entry => validate<BlogPost>(BLOG_POST_SCHEMA, entry))
  return validated
}

export async function findAndParseBlogPosts(dirPath: string) {
  const posts = await findBlogPosts(dirPath)
  const sources = await Promise.all(posts.map(p => p.readFile()))
  const sourcesWithHeaders = sources.map(src => matter(src))
  const parsed = sourcesWithHeaders.map((entry, idx) => ({
    ...entry.data,
    slug: posts[idx].name,
    html: parser.render(entry.content, {})
  }))
  // The post[0] is the newest, therefore always the post at previous index is the nextPost
  const withSiblings = parsed.map((entry, idx) => {
    if (idx !== 0) {
      const { html, prevPost, nextPost, ...rest } = parsed[idx - 1]
      entry.nextPost = rest
    }
    if (idx !== parsed.length - 1) {
      const { html, prevPost, nextPost, ...rest } = parsed[idx + 1]
      entry.prevPost = rest
    }
    return entry
  })
  const validated = withSiblings.map(entry => validate<BlogPost>(BLOG_POST_SCHEMA, entry))
  return validated
}
