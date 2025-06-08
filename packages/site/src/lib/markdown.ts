import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import prismPlugin from 'markdown-it-prism'
import toc from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import { createHighlighter } from 'shiki'

import { BLOG_POST_RAW } from '$lib/schemas'

import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type { Token } from 'markdown-it/index.js'

const highlighter = await createHighlighter({
  themes: ['dracula'],
  langs: ['javascript', 'typescript', 'json', 'bash', 'xml'],
})

const md = new MarkdownIt('default', {
  html: true,
  linkify: true,
  typographer: true,
})
anchor(md, { tabIndex: false })
toc(md, {
  listType: 'ol',
  containerHeaderHtml: '<h2>Table of Contents</h2>',
})
// https://github.com/markdown-it/markdown-it/issues/871
const proxyRule = (...parameters: Parameters<RenderRule>) =>
  parameters[4].renderToken(parameters[0], parameters[1], parameters[2])
const defaultHeadingOpenRenderer = md.renderer.rules['heading_open'] || proxyRule
const defaultHeadingCloseRenderer = md.renderer.rules['heading_close'] || proxyRule
const defFence = md.renderer.rules.fence || proxyRule
const increase = (tokens: Token[], idx: number) => {
  // dont go smaller than 'h6'
  if (parseInt(tokens[idx].tag[1]) < 6) {
    tokens[idx].tag = tokens[idx].tag[0] + (parseInt(tokens[idx].tag[1]) + 1)
  }
}
md.renderer.rules.code_inline = (tokens: Token[], idx: number) => {
  return `<code class="language-text">${tokens[idx].content}</code>`
}
md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  return highlighter.codeToHtml(tokens[idx].content, {
    lang: tokens[idx].info,
    theme: 'dracula',
  })
}
md.renderer.rules.image = function (tokens, idx, options, env, self) {
  // @example <img src="./android-studio-emulator.png" alt="" title="Title">
  return tokens[idx].content.replace('src=".', 'src="/images')
}
md.renderer.rules['heading_open'] = function (tokens, idx, options, env, self) {
  increase(tokens, idx)
  const h = defaultHeadingOpenRenderer(tokens, idx, options, env, self)
  const found = tokens[idx].attrs?.find(([k, _]) => k === 'id')
  const id = found ? found[1] : ''
  return `${h}<a class="anchor" href="#${id}">`
}
md.renderer.rules['heading_close'] = function (tokens, idx, options, env, self) {
  increase(tokens, idx)
  const h = defaultHeadingCloseRenderer(tokens, idx, options, env, self)
  return `</a>${h}`
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
  draft?: boolean
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
    url: `https://teemukoivisto.xyz/blog/${posts[idx].name}`,
    html: md.render(entry.matter.content, {}),
  }))
  // Link the previous and next posts to a post, omitting drafts
  let current: { idx: number; prev: number } | undefined = undefined
  for (let i = 0; i < parsed.length; i += 1) {
    const post = parsed[i]
    if (current && !post.draft) {
      const { html, prevPost, nextPost, ...next } = parsed[i]
      parsed[current.idx].nextPost = next
      if (current.prev >= 0) {
        const { html, prevPost, nextPost, ...prev } = parsed[current.prev]
        parsed[current.idx].prevPost = prev
      }
      current = { idx: i, prev: current.idx }
    } else if (!current && !post.draft) {
      current = { idx: i, prev: -1 }
    }
  }
  if (current && current.prev >= 0) {
    const { html, prevPost, nextPost, ...prev } = parsed[current.prev]
    parsed[current.idx].prevPost = prev
  }
  return parsed.map(entry => BLOG_POST_RAW.parse(entry))
}
