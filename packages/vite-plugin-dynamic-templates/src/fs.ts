import path from 'path'
import fg from 'fast-glob'
import fsExtra from 'fs-extra'

import { Rendered, FilePath } from './types'

export async function findTemplates(projectRoot: string, templateFiles: string[]) {
  const entries = await fg(
    templateFiles.map((glob) => path.resolve(path.join(projectRoot, glob)), {
      absolute: false,
      stats: true,
    })
  )
  return await Promise.all(
    entries.map((entry) => ({ path: entry, relativePath: path.relative(projectRoot, entry) }))
  )
}

export async function writeTemplatesToDisk(
  projectRoot: string,
  rendered: (Rendered | Rendered[] | undefined)[]
): Promise<FilePath[]> {
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
  return written.flat().filter((p) => p !== undefined) as {
    path: string
    fileName: string
  }[]
}
