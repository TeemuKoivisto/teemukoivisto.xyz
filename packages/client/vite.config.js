import { defineConfig } from 'vite'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
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
        yjs: new URL('./src/pages/yjs/index.html', import.meta.url).pathname,
      },
    },
  },
})
