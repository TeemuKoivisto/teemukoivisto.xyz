import { promises as fs } from 'fs'
import { join } from 'path'

import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

import { validate, BLOG_POST_SCHEMA } from './validate'
import { SITE_DATA } from './site'

import { BlogPost } from './types'

async function findBlogPosts(path: string) {
  const entries = await fs.readdir(path, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => (b.name < a.name ? -1 : 1)) // Sort in descending order, newest first
    .map((dir) => ({
      name: dir.name.slice(3),
      path: join(path, dir.name, dir.name.slice(3) + '.md'),
    }))
}

function processMarkdown(content: string) {
  return remark()
    .use(prism, {
      transformInlineCode: true,
    })
    .use(html)
    .process(content)
}

async function readBlogPostMarkdown(path: string, opts = { parse: true }) {
  const file = await fs.readFile(path, 'utf-8')
  const { data, content } = matter(file)
  const parsedMarkdown = opts.parse ? await processMarkdown(content) : ''
  return {
    html: parsedMarkdown ? parsedMarkdown.toString() : '',
    ...data,
  }
}

function createBlogPost(data: { [key: string]: any }, slug?: string) {
  return validate<BlogPost>(BLOG_POST_SCHEMA, {
    ...data,
    slug,
    url: `${SITE_DATA.url}/blog/${slug}`,
  })
}

// export async function getBlogPostBySlug(slug: string) {
//   const foundFiles = await findBlogPosts()
//   const foundIdx = foundFiles.findIndex((f) => f.name === slug)
//   const prevPostFile = foundIdx !== foundFiles.length - 1 ? foundFiles[foundIdx + 1] : undefined
//   const nextPostFile = foundIdx !== 0 ? foundFiles[foundIdx - 1] : undefined
//   if (foundIdx === -1) {
//     return undefined
//   }
//   const post = createBlogPost(await readBlogPostMarkdown(foundFiles[foundIdx].path), slug)
//   const prevPost = createBlogPost(
//     await readBlogPostMarkdown(prevPostFile?.path, false),
//     prevPostFile?.name
//   )
//   const nextPost = createBlogPost(
//     await readBlogPostMarkdown(nextPostFile?.path, false),
//     nextPostFile?.name
//   )
//   return {
//     post,
//     prevPost,
//     nextPost,
//   }
// }

export async function getAllBlogPosts(path: string) {
  const foundFiles = await findBlogPosts(path)
  const parsed = await Promise.all(
    foundFiles.map((f) => readBlogPostMarkdown(f.path, { parse: true }))
  )
  return parsed.map((p, idx) => createBlogPost(p, foundFiles[idx].name))
}
