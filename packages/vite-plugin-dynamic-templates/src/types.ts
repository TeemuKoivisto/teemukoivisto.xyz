export type Template = {
  path: string
  relativePath: string
  directoryPath: string[]
  paramName: string | undefined
  paramValue: string | undefined
  url: string
  ext: string
}
export type RenderedTemplate =
  | (Template & {
      source: string
    })
  | {
      path: string
      url: string
      source: string
    }

export type Ok<T> = {
  data: T
}
export type Error = {
  err: string
  code: number
}
export type Maybe<T> = Ok<T> | Error
