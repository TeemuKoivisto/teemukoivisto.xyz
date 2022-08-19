import { defineConfig } from 'vite'
import { dynamicTemplates } from '@teemukoivisto.xyz/vite-plugin-dynamic-templates'
import Handlebars from 'handlebars'

import path from 'path'

import { getAllBlogPosts } from './markdown'

const blogPosts = await getAllBlogPosts(path.resolve('./blog'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dynamicTemplates({
      async onRenderTemplate(tmpl, readFile, env) {
        switch (tmpl.url) {
          case '/blog':
            return Handlebars.compile(await readFile())({ posts: blogPosts })
          case '/blog/[slug]':
            const source = await readFile()
            if (env.command === 'build') {
              return blogPosts.map((post) => ({
                path: path.join(path.dirname(tmpl.path), post.slug) + '.html',
                url: `/blog/${post.slug}`,
                source: Handlebars.compile(source)({ html: post.html }),
              }))
            } else {
              const post = blogPosts.find((post) => post.slug === tmpl.paramValue)
              if (!post) return undefined // 404
              return Handlebars.compile(source)({ html: post.html })
            }
          default:
            return undefined
        }
      },
    }),
  ],
  clearScreen: false,
  root: 'src/pages',
  publicDir: '../../public',
  // assetsInclude: ['**/*.js', '**/*.css', '**/*.html'],
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
