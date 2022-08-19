import path from 'path'
import fg from 'fast-glob'

import { Template } from './types'

const paramTemplateRegex = /\/\[\w+\]/

export async function findTemplates(
  projectRoot: string,
  templateFiles: string[]
): Promise<Template[]> {
  const entries = await fg(
    templateFiles.map((glob) => path.resolve(path.join(projectRoot, glob)), {
      absolute: false,
      stats: true,
    })
  )
  return await Promise.all(
    entries.map((entry) => {
      const relativePath = path.relative(projectRoot, entry)
      const pathWithoutExt = relativePath.slice(0, relativePath.lastIndexOf('.'))
      const pathWithoutIndex =
        pathWithoutExt.slice(-5) === 'index' ? pathWithoutExt.slice(0, -6) : pathWithoutExt
      const isParamRoute = paramTemplateRegex.test(pathWithoutExt)
      return {
        path: entry,
        relativePath,
        directoryPath: relativePath.split('/').slice(0, -1),
        paramName: isParamRoute
          ? pathWithoutExt.slice(pathWithoutExt.indexOf('[') + 1, -1)
          : undefined,
        paramValue: undefined,
        url: `/${pathWithoutIndex}`,
        ext: relativePath.slice(relativePath.lastIndexOf('.')),
      }
    })
  )
}
