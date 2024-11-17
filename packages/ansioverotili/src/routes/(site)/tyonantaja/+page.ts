import { createSeoTags } from '$stores/seo'

export const load: import('./$types').PageLoad = params => {
  return createSeoTags(
    params.url.toString(),
    'Työnantaja',
    'Työnantajan palkanmaksu käyttöliittymä'
  )
}
