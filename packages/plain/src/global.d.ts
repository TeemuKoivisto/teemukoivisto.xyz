/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {}

declare module 'markdown-it-table-of-contents' {
  import MarkdownIt from 'markdown-it'
  function toc(parser: MarkdownIt, options: any): void
  export default toc
}
