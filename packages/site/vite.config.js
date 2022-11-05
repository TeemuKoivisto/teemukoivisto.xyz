import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { sveltekit } from '@sveltejs/kit/vite'

import { resolve } from 'path'

const { GH_PAGES } = process.env

/** @type {import('vite').UserConfig} */
export default {
  plugins: [sveltekit()],
  base: GH_PAGES ? '/teemukoivisto.xyz/' : undefined,
  resolve: {
    alias: {
      $api: resolve('./src/api'),
      $components: resolve('./src/components'),
      $config: resolve('./src/config'),
      $context: resolve('./src/context'),
      $elements: resolve('./src/elements'),
      $stores: resolve('./src/stores'),
      $types: resolve('./src/types'),
      $utils: resolve('./src/utils')
    }
  },
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
}
