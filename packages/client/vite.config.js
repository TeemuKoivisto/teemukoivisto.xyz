import { defineConfig } from 'vite'
import { dynamicTemplates } from '@teemukoivisto.xyz/vite-plugin-dynamic-templates'
import Handlebars from 'handlebars'

import path from 'path'

import { findAndParseBlogPosts, renderMetaTags } from './render'

const { GH_PAGES } = process.env
const BASE_URL = GH_PAGES ? '/teemukoivisto.xyz/' : '/'

const blogPosts = findAndParseBlogPosts(path.resolve('./blog'))
Handlebars.registerHelper('json', (obj) => JSON.stringify(obj))

function compile(input, options) {
  const html = Handlebars.compile(input)(options)
  return html
    .replaceAll('src="/', `src="${BASE_URL}`)
    .replaceAll("@import url('/", `@import url('${BASE_URL}`)
    .replaceAll('href="/', `href="${BASE_URL}`)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dynamicTemplates({
      async onRenderTemplate(tmpl, readFile, env) {
        const source = await readFile()
        switch (tmpl.url) {
          case '/blog':
            return compile(source, {
              posts: await blogPosts,
              metatags: renderMetaTags(),
            })
          case '/blog/[slug]':
            if (env.command === 'build') {
              return (await blogPosts).map((post) => ({
                path: path.join(path.dirname(tmpl.path), post.slug) + '.html',
                url: `/blog/${post.slug}`,
                source: compile(source, {
                  post,
                  metatags: renderMetaTags(post),
                }),
              }))
            } else {
              const post = (await blogPosts).find((post) => post.slug === tmpl.paramValue)
              if (!post) return undefined // 404
              return compile(source, {
                post,
                metatags: renderMetaTags(post),
              })
            }
          default:
            return compile(source, {
              metatags: renderMetaTags(),
            })
        }
      },
    }),
  ],
  clearScreen: false,
  root: 'src/pages',
  publicDir: '../../public',
  base: GH_PAGES ? '/teemukoivisto.xyz/' : undefined,
  resolve: {
    alias: {
      $api: path.resolve('./src/api'),
      $components: path.resolve('./src/components'),
      $config: path.resolve('./src/config'),
      $elements: path.resolve('./src/elements'),
      $stores: path.resolve('./src/stores'),
      $utils: path.resolve('./src/utils'),
    },
  },
  build: {
    outDir: '../../dist',
  },
})
