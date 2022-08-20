import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { ReactSEOMetaTags } from 'react-seo-meta-tags'

import { SITE_DATA } from './site'

import { BlogPost } from './types'

export function renderMetaTags(blogPost?: BlogPost) {
  if (blogPost) {
    const { url, title, description, coverImage, datePublished, dateModified, tags } = blogPost
    return ReactDOMServer.renderToString(
      <ReactSEOMetaTags
        website={SITE_DATA}
        blogPost={{
          url,
          title,
          description,
          image: coverImage ? `${SITE_DATA.url}${coverImage.src}` : '',
          datePublished,
          dateModified,
          tags,
          author: SITE_DATA.author,
        }}
        facebook={{ facebookAppId: SITE_DATA.facebookAppId }}
      />
    )
  }
  return ReactDOMServer.renderToString(<ReactSEOMetaTags website={SITE_DATA} />)
}
