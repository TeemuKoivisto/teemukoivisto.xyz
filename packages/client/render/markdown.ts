import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import prismPlugin from 'markdown-it-prism'
import toc from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'

import { validate, BLOG_POST_SCHEMA } from './validate'
import { findBlogPosts } from './fs'
import { SITE_DATA } from './site'

import { BlogPost } from './types'
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

export async function findAndParseBlogPosts(dirPath: string) {
  const posts = await findBlogPosts(dirPath)
  const sources = await Promise.all(posts.map((p) => p.readFile()))
  const sourcesWithHeaders = sources.map((src) => matter(src))
  const parsed = sourcesWithHeaders.map((entry, idx) => ({
    ...entry.data,
    slug: posts[idx].name,
    url: `${SITE_DATA.url}/blog/${posts[idx].name}`,
    html: parser.render(entry.content, {}),
  }))
  const withSiblings = parsed.map((entry, idx) => {
    if (idx !== 0) {
      const { html, prevPost, nextPost, ...rest } = parsed[0]
      entry.nextPost = rest
    }
    if (idx !== parsed.length - 1) {
      const { html, prevPost, nextPost, ...rest } = parsed[parsed.length - 1]
      entry.prevPost = rest
    }
    return entry
  })
  const validated = withSiblings.map((entry) => validate<BlogPost>(BLOG_POST_SCHEMA, entry))
  return validated
}
