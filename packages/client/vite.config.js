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
      async onRenderTemplate(readFile, relativePath, template) {
        console.log('rendering template: ' + relativePath)
        if (relativePath === '/blog/[slug].html') {
          const post = blogPosts.find((post) => post.slug === template.templateValue)
          if (!post) return undefined // 404
          return Handlebars.compile(await readFile())({ html: post.html })
        } else if (relativePath === '/blog/index.html') {
          return Handlebars.compile(await readFile())({ posts: blogPosts })
        }
        return undefined
      },
      async onBuildTemplate(readFile, relativePath) {
        if (relativePath === 'blog/[slug].html') {
          const template = await readFile()
          return blogPosts.map((post) => ({
            fileName: path.join('blog', post.slug) + '.html',
            source: Handlebars.compile(template)({ html: post.html }),
          }))
        } else if (relativePath === 'blog/index.html') {
          return {
            fileName: 'blog/index.html',
            source: Handlebars.compile(await readFile())({ posts: blogPosts }),
          }
        }
        return undefined
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
