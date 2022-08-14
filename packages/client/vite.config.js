import { defineConfig } from 'vite'
import { myPlugin, htmlPlugin } from '@teemukoivisto.xyz/vite-markdown-blog-plugin'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    myPlugin({
      dir: resolve('./blog'),
    }),
    htmlPlugin(),
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
