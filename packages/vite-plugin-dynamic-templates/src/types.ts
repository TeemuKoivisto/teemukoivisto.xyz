// fs
export type Rendered = {
  fileName: string
  source: string
}
export type FilePath = {
  path: string
  fileName: string
}

// plugin
export type BuiltTemplate = {
  fileName: string
  source: string
}

// Utils
export type Ok<T> = {
  data: T
}
export type Error = {
  err: string
  code: number
}
export type Maybe<T> = Ok<T> | Error
