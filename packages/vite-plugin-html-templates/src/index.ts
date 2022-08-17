import { Plugin, UserConfig, ViteDevServer } from 'vite'
import shell from 'shelljs'
import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'

export { getAllBlogPosts } from './markdown'

export type Ok<T> = {
  data: T
}
export type Error = {
  err: string
  code: number
}
export type Maybe<T> = Ok<T> | Error

function parseTemplate(
  url: string,
  host: string
): Maybe<{ file: string; templateParam: string; templateValue: string }> {
  const directoryPath = path.join('src/pages', url, '..')
  const files = shell.ls(path.resolve(directoryPath))
  const templateIdx = files.findIndex((file) => {
    const leftBracketIdx = file.indexOf('[')
    const rightBracketIdx = file.indexOf(']', -1)
    return leftBracketIdx !== -1 && rightBracketIdx !== -1 && leftBracketIdx < rightBracketIdx
  })
  if (templateIdx === -1) {
    return { err: `No template found at ${directoryPath} with pattern [<name>]`, code: 404 }
  }
  const file = files[templateIdx]
  const leftBracketIdx = file.indexOf('[')
  const rightBracketIdx = file.indexOf(']', -1)
  const templateParam = file.slice(leftBracketIdx + 1, rightBracketIdx)
  const segments = new URL(url, `http://${host}`).pathname.split('/')
  // Handle potential trailing slash
  const slug = (segments.pop() || segments.pop() || '').slice(0, -'.html'.length)
  return { data: { file, templateParam, templateValue: slug } }
}

interface Options {
  templateFiles?: string[] // default ['.html']
  onRenderTemplate(
    readFile: () => Promise<string>,
    relativePath: string,
    template?: { file: string; templateParam: string; templateValue: string }
  ): Promise<string | undefined> | undefined
  onBuildTemplate(
    readFile: () => Promise<string>,
    relativePath: string
  ): Promise<string | undefined> | undefined
}

export const htmlTemplates = (opts: Options): Plugin => {
  const { templateFiles = ['**/*.html'], onRenderTemplate, onBuildTemplate } = opts
  let resolvedConfig: UserConfig
  return {
    name: 'html-templates',
    config(config) {
      resolvedConfig = config
    },
    transformIndexHtml(html, ctx) {
      console.log('ctx.path', ctx.path)
      return html.replace(/<title>(.*?)<\/title>/, `<title>Title replaced!</title>`)
    },
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // if not html, next it.
          const { url } = req
          if (!url?.endsWith('.html') && url !== '/') {
            return next()
          }
          const projectRoot = resolvedConfig?.root || '.'
          let filePath = path.resolve(path.join(projectRoot, url)),
            fileExists,
            foundTemplate
          try {
            fileExists = await fs.stat(filePath)
          } catch (err) {
            foundTemplate = parseTemplate(url, req.headers.host || '')
          }
          let html
          if (foundTemplate && 'data' in foundTemplate) {
            const { data } = foundTemplate
            filePath = path.resolve(path.join(projectRoot, url, '..', data.file))
            html = await onRenderTemplate(
              () => fs.readFile(filePath, 'utf-8'),
              path.join(url, '..', data.file),
              data
            )
          } else {
            html = await onRenderTemplate(() => fs.readFile(filePath, 'utf-8'), url)
          }
          if (!html) return next()
          html = await server.transformIndexHtml(url, html, req.originalUrl)
          res.end(html)
        })
      }
    },
    async closeBundle() {
      const projectRoot = resolvedConfig?.root || '.'
      const entries = await fg(
        templateFiles.map((glob) => path.resolve(path.join(projectRoot, glob)), {
          absolute: false,
          stats: true,
        })
      )
      const files = await Promise.all(
        entries
          .map((entry) => ({ path: entry, relativePath: path.relative(projectRoot, entry) }))
          .map((file) => onBuildTemplate(() => fs.readFile(file.path, 'utf-8'), file.relativePath))
      )
      console.log('hello close: ' + files)
      return
    },
  }
}
