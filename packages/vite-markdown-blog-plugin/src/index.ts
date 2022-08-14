import { Plugin } from 'vite'

import { getAllBlogPosts } from './markdown'

export async function myPlugin(config: any): Promise<Plugin> {
  const { dir } = config
  // const posts = await getAllBlogPosts(dir)
  // console.log('posts ', posts)
  return {
    name: 'transform-file',
    transform(code, id) {
      // if (id.split('/')[-1] === '[slug].html') {
      //   console.log('found')
      //   console.log(code)
      // }
      // replace {{ HTML }} with html ?
      // output [slug]
      // console.log(src)
      // console.log(id)
      // return undefined
      // if (/\.html$/.test(id)) {
      //   return {
      //     code: '<code>code</code>',
      //     map: null, // provide source map if available
      //   }
      // }
    },
  }
}

export const htmlPlugin = (): Plugin => {
  return {
    name: 'html-transform',
    transformIndexHtml(html, ctx) {
      console.log(ctx.path)
      return html.replace(/<title>(.*?)<\/title>/, `<title>Title replaced!</title>`)
    },
  }
}
