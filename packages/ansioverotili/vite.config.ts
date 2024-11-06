import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { resolve } from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: resolve('./src/components'),
      $config: resolve('./src/config'),
      $elements: resolve('./src/elements'),
      $hooks: resolve('./src/hooks'),
      $lib: resolve('./src/lib'),
      $modals: resolve('./src/modals'),
      $stores: resolve('./src/stores'),
    },
  },
})
