import path from 'path'
import fg from 'fast-glob'

import { Template } from './types'

const paramTemplateRegex = /\/\[\w+\]/

export async function findTemplates(
  projectRoot: string,
  templateFiles: string[]
): Promise<Template[]> {
  return (
    await fg(
      templateFiles.map(glob => path.resolve(path.join(projectRoot, glob)), {
        absolute: false,
        stats: true,
      })
    )
  ).map(entry => {
    const relativePath = path.relative(projectRoot, entry)
    const pathWithoutExt = relativePath.slice(0, relativePath.lastIndexOf('.'))
    const pathWithoutIndex = pathWithoutExt.endsWith('index')
      ? pathWithoutExt.slice(0, -6)
      : pathWithoutExt
    return {
      path: entry,
      relativePath,
      directoryPath: relativePath.split('/').slice(0, -1),
      paramName: paramTemplateRegex.test(pathWithoutExt)
        ? pathWithoutExt.slice(pathWithoutExt.indexOf('[') + 1, -1)
        : undefined,
      paramValue: undefined,
      url: `/${pathWithoutIndex}`,
      ext: relativePath.slice(relativePath.lastIndexOf('.')),
    }
  })
}
