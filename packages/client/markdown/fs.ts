import fs from 'fs/promises'
import path from 'path'

export async function findBlogPosts(dirPath: string) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => (b.name < a.name ? -1 : 1)) // Sort in descending order, newest first
    .map((dir) => {
      const filePath = path.join(dirPath, dir.name, dir.name.slice(3) + '.md')
      return {
        // Remove eg 01- from the start of the name
        name: dir.name.split('-').slice(1).join('-'),
        path: filePath,
        readFile: () => fs.readFile(filePath, 'utf-8'),
      }
    })
}
