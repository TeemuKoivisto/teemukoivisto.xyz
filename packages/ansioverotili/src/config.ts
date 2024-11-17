import { version } from '$app/environment'

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

export const DEV = import.meta.env.DEV
// More about SvelteKit's default env variables https://vitejs.dev/guide/env-and-mode.html
// TODO rather than importing DEV everywhere, create logger that checks for DEV
// which also would allow for event logging like in Redux
export const SITE_METADATA = {
  url: 'https://ansiotuloverotili.pages.dev/',
  title: 'Ansiotuloverotili',
  lang: 'fi-FI',
  datePublished: '2024-11-17T11:45:10.294Z',
  dateModified: new Date(parseInt(version)).toISOString(),
  description: 'Loppu verokorttien kanssa sähläämiselle — yksi tili kaikille ansiotuloille',
  // image: 'https://teemukoivisto.xyz/img/avatar-200.avif',
  image: {
    url: 'https://midi-note-trainer.teemukoivisto.xyz/cover_image_1080.jpg',
    width: 1080,
    height: 566,
    alt: 'Image of MIDI Note Trainer UI',
  },
  tags: ['ansiotuloverotili', 'ansiotulo', 'verotus', 'Suomi', 'palkka.fi', 'vero.fi'],
  author: {
    name: 'Teemu Koivisto',
    image: 'https://teemukoivisto.xyz/img/avatar-460.avif',
  },
}
