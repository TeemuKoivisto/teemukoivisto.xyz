import { htmlToElement } from '$utils/html'

// import '$components/icon-links'

import html from './template.html?raw'

customElements.define(
  'blog-pager',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
    }
  }
)
