declare module 'remark-prism' {
  import { Plugin } from 'unified'
  interface remarkPrismOptions extends HastUtilToHtmlOptions {
    /**
     * Default false
     */
    transformInlineCode?: boolean

    /**
     * Prism plugins
     */
    plugins?: any[]
  }

  declare const prism: Plugin<[remarkPrismOptions?]>
  export = prism
}
