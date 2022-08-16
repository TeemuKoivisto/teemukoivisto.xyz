import { defineConfig } from 'vite'
import { myPlugin, htmlPlugin, getAllBlogPosts } from '@teemukoivisto.xyz/vite-plugin-html-templates'
import { resolve } from 'path'

import fs from 'fs/promises'

const blogPosts = await getAllBlogPosts(resolve('./blog'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    myPlugin({
      dir: resolve('./blog'),
    }),
    htmlPlugin({
      async onRenderTemplate(data) {
        const found = blogPosts.find((post) => post.slug === data.props.slug)
        const htmlFile = await fs.readFile(data.path, 'utf-8')
        return htmlFile.replace('{{ HTML }}', found.html)
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
