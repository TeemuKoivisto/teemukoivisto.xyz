const getEnv = (key: string, required = true) => {
  const env = import.meta.env[key]
  if (!env && required) {
    throw new Error(`Environment variable ${key} was undefined!`)
  }
  return env
}

const parseInteger = (env?: string) => {
  try {
    return parseInt(env || '')
  } catch (err) {}
  return undefined
}

export const CV_EMAIL = import.meta.env.VITE_CV_EMAIL
export const CV_PHONE = import.meta.env.VITE_CV_PHONE
export const DEV = import.meta.env.DEV
// More about SvelteKit's default env variables https://vitejs.dev/guide/env-and-mode.html
export const SITE_METADATA = {
  url: 'https://teemukoivisto.xyz',
  title: 'teemukoivisto.xyz',
  datePublished: '2024-04-04T08:22:58.055Z',
  description: 'A blog about programming and other irrelevant things in life',
  image: 'https://teemukoivisto.xyz/img/avatar-200.avif',
  facebookAppId: '2200410943508452',
  author: {
    name: 'Teemu Koivisto',
    image: 'https://teemukoivisto.xyz/img/avatar-460.avif',
  },
}
