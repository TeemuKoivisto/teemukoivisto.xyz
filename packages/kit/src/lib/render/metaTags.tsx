// import React from 'react'
// import * as ReactDOMServer from 'react-dom/server'
// import { ReactSEOMetaTags } from 'react-seo-meta-tags'

// import { SITE_DATA } from './site'

// import { BlogPost } from './types'

// function CommonTags() {
//   return (
//     <>
//       <meta charSet="utf-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
//       <link rel="icon" type="image/x-icon" href="/favicon.ico" />
//       <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
//       <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//       <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//       <link rel="manifest" href="/site.webmanifest" />
//     </>
//   )
// }

// export function renderMetaTags(blogPost?: BlogPost) {
//   let html
//   if (blogPost) {
//     const { url, title, description, coverImage, datePublished, dateModified, tags } = blogPost
//     html = ReactDOMServer.renderToString(
//       <>
//         <CommonTags />
//         <ReactSEOMetaTags
//           website={SITE_DATA}
//           blogPost={{
//             url,
//             title,
//             description,
//             image: coverImage ? `${SITE_DATA.url}${coverImage.src}` : '',
//             datePublished,
//             dateModified,
//             tags,
//             author: SITE_DATA.author,
//           }}
//           facebook={{ facebookAppId: SITE_DATA.facebookAppId }}
//         />
//       </>
//     )
//   } else {
//     html = ReactDOMServer.renderToString(
//       <>
//         <CommonTags />
//         <ReactSEOMetaTags website={SITE_DATA} />
//       </>
//     )
//   }
//   return html.replaceAll('&quot;', '"')
// }
