import { sveltePreprocess } from 'svelte-preprocess'

const preprocessOptions = {
  preserve: ['ld+json'],
  scss: {},
}

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: sveltePreprocess(preprocessOptions),
  preprocessOptions,
  compilerOptions: {
    hydratable: true,
  },
}
