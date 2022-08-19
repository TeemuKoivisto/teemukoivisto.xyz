import { Plugin, UserConfig, ViteDevServer } from 'vite'
import fs from 'fs/promises'
import path from 'path'

import { findTemplates, writeTemplatesToDisk } from './fs'
import { parseTemplate } from './parse'

import { BuiltTemplate } from './types'

export interface Options {
  templateFiles?: string[] // default ['.html']
  onRenderTemplate(
    readFile: () => Promise<string>,
    relativePath: string,
    template?: { file: string; templateParam: string; templateValue: string }
  ): Promise<string | undefined> | undefined
  onBuildTemplate(
    readFile: () => Promise<string>,
    relativePath: string
  ): Promise<BuiltTemplate[] | BuiltTemplate | undefined>
}

export const dynamicTemplates = (opts: Options): Plugin => {
  const { templateFiles = ['**/*.html'], onRenderTemplate, onBuildTemplate } = opts
  let resolvedConfig: UserConfig
  return {
    name: 'dynamic-templates',
    async config(config, env) {
      resolvedConfig = config
      if (env.command === 'build') {
        const projectRoot = config?.root || '.'
        const templates = await findTemplates(projectRoot, templateFiles)
        const rendered = await Promise.all(
          templates.map((file) =>
            onBuildTemplate(() => fs.readFile(file.path, 'utf-8'), file.relativePath)
          )
        )
        const paths = await writeTemplatesToDisk(projectRoot, rendered)
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
      console.log('transform index.html ', ctx.path)
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
  }
}
