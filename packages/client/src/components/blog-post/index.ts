import { htmlToElement } from '$utils/html'

// import '$components/icon-links'

import html from './template.html?raw'

customElements.define(
  'blog-post',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' })
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
)
