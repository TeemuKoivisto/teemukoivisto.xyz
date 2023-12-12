import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import prismPlugin from 'markdown-it-prism'
import toc from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'

import { validate, BLOG_POST_SCHEMA } from './validate'

import type { BlogPost } from './types'
import type Token from 'markdown-it/lib/token'
import type { RenderRule } from 'markdown-it/lib/renderer'

const md = new MarkdownIt('default', {
  html: true,
  linkify: true,
  typographer: true,
})
md.use(prismPlugin)
md.use(anchor)
toc(md, {
  listType: 'ol',
  containerHeaderHtml: '<h2>Table of Contents</h2>',
})
md.renderer.rules.code_inline = (tokens: Token[], idx: number) => {
  return `<code class="language-text">${tokens[idx].content}</code>`
}
// https://github.com/markdown-it/markdown-it/issues/871
const proxyRule = (...parameters: Parameters<RenderRule>) =>
  parameters[4].renderToken(parameters[0], parameters[1], parameters[2])
const defaultHeadingOpenRenderer = md.renderer.rules['heading_open'] || proxyRule
const defaultHeadingCloseRenderer = md.renderer.rules['heading_close'] || proxyRule
const increase = (tokens: Token[], idx: number) => {
  // dont go smaller than 'h6'
  if (parseInt(tokens[idx].tag[1]) < 6) {
    tokens[idx].tag = tokens[idx].tag[0] + (parseInt(tokens[idx].tag[1]) + 1)
  }
}
md.renderer.rules['heading_open'] = function (tokens, idx, options, env, self) {
  increase(tokens, idx)
  return defaultHeadingOpenRenderer(tokens, idx, options, env, self)
}
md.renderer.rules['heading_close'] = function (tokens, idx, options, env, self) {
  increase(tokens, idx)
  return defaultHeadingCloseRenderer(tokens, idx, options, env, self)
}

/**
 * @example
  {
    datePublished: '2023-09-14',
    dateModified: '2023-09-14',
    title: 'I made a blog, does anybody care?',
    description: 'Following the ancient traditions of software engineers..',
    tags: [ 'blog', 'svelte', 'sveltekit', 'typescript', 'tailwind' ],
    coverImage: { src: '/blog/hello-world.png', alt: 'Hello world in TypeScript' }
  }
 */
interface BlogMarkdown {
  datePublished: string
  dateModified: string
  title: string
  description: string
  tags: string[]
  coverImage: {
    src: string
    alt: string
  }
  prevPost?: BlogMarkdown
  nextPost?: BlogMarkdown
}

/**
 * Parses globbed markdown files passed as {'/blog/02-another-post/another-post.md': "asdf\n", ...} object
 * @param globbed
 * @returns
 */
export async function parseBlogPosts(globbed: Record<string, string>) {
  const posts = Object.entries(globbed)
    .map(([key, value]) => {
      // ['02-another-post']
      const dir = key.split('/')[2]
      return {
        order: parseInt(dir.slice(0, 2)),
        name: dir.slice(3),
        matter: matter(value),
      }
    })
    .sort((a, b) => (b.order < a.order ? -1 : 1)) // Sort in descending order, newest first
  const parsed = posts.map((entry, idx) => ({
    ...(entry.matter.data as BlogMarkdown),
    slug: posts[idx].name,
    html: md.render(entry.matter.content, {}),
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
