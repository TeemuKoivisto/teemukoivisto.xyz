import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'

import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      postcss: {
        // @TODO you are not supposed to need both configFilePath & plugins but the intellisense doesn't
        // work with configFilePath and providing plugins directly doesn't load Tailwind so...
        configFilePath: resolve('postcss.config.js'),
        plugins: [tailwindcss, autoprefixer, nested],
      },
    }),
  ],

  kit: {
    files: {
      routes: './src/routes',
      lib: './src/lib',
    },
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: '200.html',
    }),
    alias: {
      $components: 'src/components',
      $config: 'src/config',
      $elements: 'src/elements',
      $hooks: 'src/hooks',
      $lib: 'src/lib',
      $stores: 'src/stores',
    },
  },
}
