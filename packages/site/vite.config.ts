import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { resolve } from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: resolve('./src/components'),
      $config: resolve('./src/config'),
      $context: resolve('./src/context'),
      $elements: resolve('./src/elements'),
      $stores: resolve('./src/stores'),
      $types: resolve('./src/types'),
    },
  },
})
