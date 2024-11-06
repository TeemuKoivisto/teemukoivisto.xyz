import adapter from '@sveltejs/adapter-cloudflare'
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
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      // config: 'wrangler.toml',
      // platformProxy: {
      //   configPath: 'wrangler.toml',
      //   environment: undefined,
      //   experimentalJsonConfig: false,
      //   persist: true,
      // },
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
