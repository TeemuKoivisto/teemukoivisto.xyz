import shell from 'shelljs'
import path from 'path'

import { Maybe } from './types'

export function parseTemplate(
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
