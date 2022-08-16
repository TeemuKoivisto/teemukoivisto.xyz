import { Plugin, ViteDevServer } from 'vite'
import shell from 'shelljs'
import fs from 'fs/promises'
import path from 'path'

export { getAllBlogPosts } from './markdown'

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

interface Options {
  onRenderTemplate(data: any): Promise<string>
}

export const htmlPlugin = (opts: Options): Plugin => {
  const { onRenderTemplate } = opts
  return {
    name: 'html-transform',
    transformIndexHtml(html, ctx) {
      console.log('ctx.path', ctx.path)
      return html.replace(/<title>(.*?)<\/title>/, `<title>Title replaced!</title>`)
    },
    // ViteDevServer
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // if not html, next it.
          const { url } = req
          if (!url?.endsWith('.html') && url !== '/') {
            return next()
          }
          try {
            await fs.stat(path.resolve(path.join('src/pages', url)))
            return next()
          } catch (err) {}
          const files = shell.ls(path.resolve(path.join('src/pages', url, '..')))
          const templateIdx = files.findIndex((file) => {
            const leftBracketIdx = file.indexOf('[')
            const rightBracketIdx = file.indexOf(']', -1)
            return (
              leftBracketIdx !== -1 && rightBracketIdx !== -1 && leftBracketIdx < rightBracketIdx
            )
          })
          if (templateIdx === -1) return next()
          const file = files[templateIdx]
          const leftBracketIdx = file.indexOf('[')
          const rightBracketIdx = file.indexOf(']', -1)
          const paramName = file.slice(leftBracketIdx + 1, rightBracketIdx)
          if (!paramName) return next()
          const segments = new URL(url, `http://${req.headers.host}`).pathname.split('/')
          // Handle potential trailing slash
          const slug = (segments.pop() || segments.pop() || '').slice(0, -'.html'.length)
          const data = {
            file,
            path: path.resolve(path.join('src/pages', url, '..', file)),
            props: { [paramName]: slug },
          }
          let html = await onRenderTemplate(data)
          html = await server.transformIndexHtml(url, html, req.originalUrl)
          res.end(html)
        })
      }
    },
    closeBundle() {
      console.log('closeBundle')
    },
  }
}
