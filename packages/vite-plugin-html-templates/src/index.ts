import { Plugin, UserConfig, ViteDevServer } from 'vite'
import shell from 'shelljs'
import fs from 'fs/promises'
import path from 'path'
import fsExtra from 'fs-extra'

import * as tools from './fs'

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
  ): Promise<
    { fileName: string; source: string }[] | { fileName: string; source: string } | undefined
  >
}

export const htmlTemplates = (opts: Options): Plugin => {
  const { templateFiles = ['**/*.html'], onRenderTemplate, onBuildTemplate } = opts
  let resolvedConfig: UserConfig
  return {
    name: 'html-templates',
    async config(config, env) {
      resolvedConfig = config
      if (env.command === 'build') {
        const projectRoot = config?.root || '.'
        const templates = await tools.findTemplates(projectRoot, templateFiles)
        const rendered = await Promise.all(
          templates.map((file) =>
            onBuildTemplate(() => fs.readFile(file.path, 'utf-8'), file.relativePath)
          )
        )
        const written = await Promise.all(
          rendered.map(async (entry) => {
            if (entry && Array.isArray(entry)) {
              const paths = entry.map((item) => ({
                path: path.join(projectRoot, item.fileName),
                fileName: item.fileName,
              }))
              await entry.map((item) =>
                fsExtra.outputFile(path.join(projectRoot, item.fileName), item.source)
              )
              return paths
            } else if (entry) {
              const filePath = path.join(projectRoot, entry.fileName)
              await fsExtra.outputFile(filePath, entry.source)
              return { path: filePath, fileName: entry.fileName }
            }
          })
        )
        const paths = written.flat().filter((p) => p !== undefined) as {
          path: string
          fileName: string
        }[]
        const input = paths.reduce((acc, p) => {
          acc[p.fileName] = p.path
          return acc
        }, {} as { [key: string]: string })
        config.build = config.build || {}
        config.build.rollupOptions = config.build.rollupOptions || {}
        config.build.rollupOptions.input = {
          ...input,
          main: path.join(projectRoot, 'index.html'),
        }
      }
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
    // transform(code, id) {
    //   console.log('yo transform ', id)
    // },
    // https://rollupjs.org/guide/en/#generatebundle
    // async buildStart() {
    //   console.log('buildStart')
    //   console.log('info', this.getModuleInfo('/Users/teemu/git_projects/omat/teemukoivisto.xyz/packages/client/src/pages/blog/index.html'))

    //   const projectRoot = resolvedConfig?.root || '.'
    //   const entries = await fg(
    //     templateFiles.map((glob) => path.resolve(path.join(projectRoot, glob)), {
    //       absolute: false,
    //       stats: true,
    //     })
    //   )
    //   const rendered = await Promise.all(
    //     entries
    //       .map((entry) => ({ path: entry, relativePath: path.relative(projectRoot, entry) }))
    //       .map((file) => onBuildTemplate(() => fs.readFile(file.path, 'utf-8'), file.relativePath))
    //   )
    //   rendered.map(entry => {
    //     if (entry && Array.isArray(entry)) {
    //       entry.forEach(item => this.emitFile({
    //         ...item,
    //         type: 'asset',
    //       }))
    //     } else if (entry) {
    //       // console.log('emit ', entry)
    //       this.emitFile({
    //         ...entry,
    //         type: 'asset',
    //       })
    //     }
    //   })
    //   // this.emitFile({
    //   //   type: 'asset',
    //   //   fileName: 'index.html',
    //   //   source: `
    //   //   <!DOCTYPE html>
    //   //   <html>
    //   //   <head>
    //   //     <meta charset="UTF-8">
    //   //     <title>Title</title>
    //   //    </head>
    //   //   <body>
    //   //     <script src="${this.getFileName(ref1)}" type="module"></script>
    //   //     <script src="${this.getFileName(ref2)}" type="module"></script>
    //   //     <script src="${this.getFileName(ref3)}" type="module"></script>
    //   //   </body>
    //   //   </html>`
    //   // });
    // },
    // generateBundle(opts, bundle) {
    //   console.log('hello bundle ', bundle)
    // },
    // outputOptions(opts) {
    //   // console.log('hello opts ', opts)
    //   console.log('this', this)
    //   // console.log(this.getFileName('blog/index.html'))
    //   // console.log('info', this.getModuleInfo('/Users/teemu/git_projects/omat/teemukoivisto.xyz/packages/client/src/pages/blog/index.html'))
    //   // for (const id in this.getModuleIds()) {
    //   //   console.log('id ', id)
    //   // }
    // },
    // closeBundle() {
    //   // console.log(this.getFileName('blog/index.html'))
    //   console.log('module ids ', Array.from(this.getModuleIds()))
    //   console.log('close bundle')
    // }
  }
}
