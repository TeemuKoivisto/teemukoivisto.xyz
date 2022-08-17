import { defineConfig } from 'vite'
import { htmlTemplates, getAllBlogPosts } from '@teemukoivisto.xyz/vite-plugin-html-templates'
import path from 'path'
import fsExtra from 'fs-extra'

import Handlebars from 'handlebars'

const blogPosts = await getAllBlogPosts(path.resolve('./blog'))

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
      async onBuildTemplate(readFile, relativePath) {
        if (relativePath === 'blog/[slug].html') {
          const template = await readFile()
          const compiled = blogPosts.map((post) => ({
            ...post,
            page: Handlebars.compile(template)({ html: post.html }),
          }))
          await Promise.all(
            compiled.map((post) =>
              fsExtra.outputFile(path.join('./dist/blog', post.slug) + '.html', post.page)
            )
          )
        } else if (relativePath === 'blog/index.html') {
          const compiled = Handlebars.compile(await readFile())({ posts: blogPosts })
          await fsExtra.outputFile(path.join('./dist', 'blog', 'index.html'), compiled)
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
    rollupOptions: {
      // input: true,
      // input: {
      //   main: new URL('./src/pages/index.html', import.meta.url).pathname,
      //   blog: new URL('./src/pages/blog/index.html', import.meta.url).pathname,
      //   post: new URL('./src/pages/blog/[slug].html', import.meta.url).pathname,
      // },
    },
  },
})
