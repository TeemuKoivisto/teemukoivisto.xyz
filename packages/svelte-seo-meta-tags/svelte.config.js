import autoPreprocess from 'svelte-preprocess'

const preprocessOptions = {
  preserve: ['ld+json'],
  scss: {},
}

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: autoPreprocess(preprocessOptions),
  preprocessOptions,
  compilerOptions: {
    hydratable: true,
  },
}
