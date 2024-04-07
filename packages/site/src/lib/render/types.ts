export interface BlogImage {
  url: string
  alt: string
  width?: number
  height?: number
}
export type SiblingPost = Omit<BlogPost, 'html' | 'nextPost' | 'prevPost'>
export interface BlogPost {
  draft: boolean
  slug: string
  url: string
  title: string
  description: string
  datePublished: string // In 2021-04-10 format
  dateModified: string
  tags: string[]
  coverImage?: BlogImage
  squareImg?: BlogImage
  cardImg?: BlogImage
  nextPost?: SiblingPost
  prevPost?: SiblingPost
  html: string
}
