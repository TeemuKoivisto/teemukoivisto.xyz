import { defineConfig } from 'vite'
import { htmlTemplates, getAllBlogPosts } from '@teemukoivisto.xyz/vite-plugin-html-templates'
import path from 'path'

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
          return blogPosts.map((post) => ({
            fileName: path.join('blog', post.slug) + '.html',
            source: Handlebars.compile(template)({ html: post.html }),
          }))
          // const compiled = blogPosts.map((post) => ({
          //   ...post,
          //   file: {
          //     path: path.join('./dist/blog', post.slug) + '.html',
          //     data: Handlebars.compile(template)({ html: post.html }),
          //   }
          // }))
          // await Promise.all(
          //   compiled.map((post) =>
          //     fsExtra.outputFile(post.file.path, post.file.data)
          //   )
          // )
          // return compiled.map(p => p.file.path)
        } else if (relativePath === 'blog/index.html') {
          return {
            fileName: 'blog/index.html',
            source: Handlebars.compile(await readFile())({ posts: blogPosts }),
          }
          // const compiled = Handlebars.compile(await readFile())({ posts: blogPosts })
          // const filePath = path.join('./dist', 'blog', 'index.html')
          // await fsExtra.outputFile(filePath, compiled)
          // return filePath
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
      // input: {
      //   main: new URL('./src/pages/index.html', import.meta.url).pathname,
      //   blog: new URL('./src/pages/blog/index.html', import.meta.url).pathname,
      //   'hello-world': new URL('./src/pages/blog/hello-world.html', import.meta.url).pathname,
      // },
    },
  },
})
