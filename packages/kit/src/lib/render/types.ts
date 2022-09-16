export interface BlogImage {
  src: string
  alt: string
}
export type SiblingPost = Omit<BlogPost, 'html' | 'nextPost' | 'prevPost'>
export interface BlogPost {
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
export interface SiteData {
  title: string
  url: string
  disqusShortname: string
  seo: {
    description: string
    squareImage: BlogImage
    cardImage: BlogImage
    facebookAppId: string
  }
  author: {
    name: string
    image: string
  }
}
