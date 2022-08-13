import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

customElements.define(
  'icon-links',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' })
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
)
