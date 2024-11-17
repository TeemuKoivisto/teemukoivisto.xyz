import { version } from '$app/environment'
import { SITE_METADATA } from '$config'

import type { JsonLdProps, MetaTagsProps } from 'svelte-meta-tags'

export function createSeoTags(url: string, title?: string, desc?: string) {
  const metatags = {
    title: title || SITE_METADATA.title,
    description: desc || SITE_METADATA.description,
    canonical: url,
    keywords: SITE_METADATA.tags,
    openGraph: {
      type: 'website',
      url: url,
      title: title || SITE_METADATA.title,
      description: desc || SITE_METADATA.description,
      images: [SITE_METADATA.image],
    },
  } satisfies MetaTagsProps
  const jsonld = {
    '@type': 'WebPage',
    headline: title || SITE_METADATA.title,
    datePublished: SITE_METADATA.datePublished,
    dateModified: SITE_METADATA.dateModified,
    description: desc || SITE_METADATA.description,
    image: [SITE_METADATA.image.url],
    keywords: SITE_METADATA.tags,
    author: {
      '@type': 'Person',
      name: SITE_METADATA.author.name,
    },
  } satisfies JsonLdProps['schema']
  return {
    metatags,
    jsonld,
  }
}
