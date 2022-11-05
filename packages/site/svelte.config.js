import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const { GH_PAGES } = process.env

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
      preserve: ['ld+json']
    })
  ],

  kit: {
    trailingSlash: 'never',
    files: {
      routes: './src/routes',
      lib: './src/lib'
    },
    paths: {
      base: GH_PAGES ? '/teemukoivisto.xyz/' : undefined,
    },
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null
    })
  }
}
