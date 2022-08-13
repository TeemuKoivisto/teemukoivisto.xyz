import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

customElements.define(
  'my-footer',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' })
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
)
