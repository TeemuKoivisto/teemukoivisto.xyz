import { createSeoTags } from '$stores/seo'

export const load: import('./$types').PageLoad = params => {
  return createSeoTags(
    params.url.toString(),
    'Esimerkki',
    'Esimerkki palkanlaskija.fi 2025 verosäännöksistä'
  )
}
