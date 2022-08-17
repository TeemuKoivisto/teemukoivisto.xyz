import { defineConfig } from 'vite'
import { htmlTemplates, getAllBlogPosts } from '@teemukoivisto.xyz/vite-plugin-html-templates'
import { resolve } from 'path'

import Handlebars from 'handlebars'

const blogPosts = await getAllBlogPosts(resolve('./blog'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    htmlTemplates({
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
    }),
  ],
  clearScreen: false,
  root: 'src/pages',
  publicDir: '../../public',
  // assetsInclude: ['**/*.js', '**/*.css', '**/*.html'],
  resolve: {
    alias: {
      $api: resolve('./src/api'),
      $components: resolve('./src/components'),
      $config: resolve('./src/config'),
      $elements: resolve('./src/elements'),
      $stores: resolve('./src/stores'),
      $utils: resolve('./src/utils'),
    },
  },
  build: {
    outDir: '../../dist',
    rollupOptions: {
      input: {
        main: new URL('./src/pages/index.html', import.meta.url).pathname,
        blog: new URL('./src/pages/blog/index.html', import.meta.url).pathname,
        post: new URL('./src/pages/blog/[slug].html', import.meta.url).pathname,
      },
    },
  },
})
