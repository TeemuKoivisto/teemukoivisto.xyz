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

export const COMMENT_API_URL = getEnv('VITE_COMMENT_API_URL')
export const CV_EMAIL = import.meta.env.VITE_CV_EMAIL
export const CV_PHONE = import.meta.env.VITE_CV_PHONE
export const DEV = import.meta.env.DEV
// More about SvelteKit's default env variables https://vitejs.dev/guide/env-and-mode.html
