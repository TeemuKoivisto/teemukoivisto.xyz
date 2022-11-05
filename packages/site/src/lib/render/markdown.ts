import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import prismPlugin from 'markdown-it-prism'
import toc from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'

import { validate, BLOG_POST_SCHEMA } from './validate'

import type { BlogPost } from './types'
import type Token from 'markdown-it/lib/token'

const parser = new MarkdownIt('default', {
  html: true,
  linkify: true,
  typographer: true,
})
parser.use(prismPlugin)
parser.use(anchor)
toc(parser, {
  listType: 'ol',
  containerHeaderHtml: '<h2>Table of Contents</h2>',
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
  const posts = Object.entries(globbed)
    .map(([key, value]) => ({
      order: parseInt(key.split('/')[2].split('-')[0]),
      name: key.split('/').pop()?.slice(0, -3), // another-post
      matter: matter(value),
    }))
    .sort((a, b) => (b.order < a.order ? -1 : 1)) // Sort in descending order, newest first
  const parsed = posts.map((entry, idx) => ({
    ...entry.matter.data,
    slug: posts[idx].name,
    html: parser.render(entry.matter.content, {}),
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
