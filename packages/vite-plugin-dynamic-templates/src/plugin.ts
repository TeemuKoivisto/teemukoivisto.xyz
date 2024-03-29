import { ConfigEnv, Plugin, ViteDevServer } from 'vite'
import fs from 'fs/promises'
import path from 'path'

import { findTemplates } from './findTemplates'

import { RenderedTemplate, Template } from './types'

export interface Options {
  templateFiles?: string[] // default ['**/*.html']
  onRenderTemplate(
    template: Template,
    readFile: () => Promise<string>,
    env: ConfigEnv
  ): Promise<string | RenderedTemplate[] | undefined>
}

export const dynamicTemplates = (opts: Options): Plugin => {
  const { templateFiles = ['**/*.html'], onRenderTemplate } = opts
  let resolvedEnv: ConfigEnv,
    templateCache: Promise<Template[]> = Promise.resolve([]),
    renderedTemplates: RenderedTemplate[] = []
  return {
    name: 'dynamic-templates',
    async config(config, env) {
      resolvedEnv = env
      const projectRoot = config.root || '.'
      templateCache = findTemplates(projectRoot, templateFiles)
      if (env.command === 'build') {
        const templates = await Promise.all(
          (await templateCache).map(async tmpl => {
            const r = await onRenderTemplate(tmpl, () => fs.readFile(tmpl.path, 'utf-8'), env)
            if (Array.isArray(r)) return r
            else if (r) return { ...tmpl, source: r }
            return undefined
          })
        )
        renderedTemplates = templates.flat().filter(e => e !== undefined) as RenderedTemplate[]
        const input = renderedTemplates.reduce(
          (acc, r) => {
            acc[r.url.slice(1)] = r.path
            return acc
          },
          {} as { [key: string]: string }
        )
        config.build = config.build || {}
        config.build.rollupOptions = config.build.rollupOptions || {}
        config.build.rollupOptions.input = {
          ...input,
          main: path.join(projectRoot, 'index.html'),
        }
      }
    },
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const { originalUrl: url } = req
          if (!url) return next()
          const cache = await templateCache
          const directoryPath = url.slice(1).split('/').slice(0, -1)
          const template =
            cache.find(tmpl => tmpl.url === url || tmpl.relativePath === url) ||
            cache.find(tmpl => {
              if (!tmpl.paramName) return undefined
              let match = true
              tmpl.directoryPath.forEach((dir, idx) => {
                match = match && dir === directoryPath[idx]
              })
              return match
            })
          if (!template) return next()
          const paramValue = template ? url.split('/').slice(-1)[0] : undefined
          const rendered = await onRenderTemplate(
            { ...template, paramValue },
            () => fs.readFile(template.path, 'utf-8'),
            resolvedEnv
          )
          if (!rendered || Array.isArray(rendered)) return next()
          const html = await server.transformIndexHtml(url, rendered, req.originalUrl)
          res.end(html)
        })
      }
    },
    resolveId(id) {
      if (renderedTemplates.find(tmpl => tmpl.path === id)) return id
    },
    load(id) {
      const found = renderedTemplates.find(tmpl => tmpl.path === id)
      if (found) {
        this.emitFile({
          id,
          type: 'chunk',
        })
        return found.source
      }
    },
  }
}
