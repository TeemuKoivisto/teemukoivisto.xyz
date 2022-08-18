import { Plugin, UserConfig, ViteDevServer } from 'vite'
import shell from 'shelljs'
import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'

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

// export async function writeTemplatesToDisk(projectRoot: string, templateFiles: string[]) {
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
// }
