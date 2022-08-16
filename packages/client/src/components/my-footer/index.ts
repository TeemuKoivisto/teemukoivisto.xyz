import { htmlToElement } from '$utils/html'

import '$components/icon-links'

import html from './template.html?raw'

customElements.define(
  'my-footer',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
    }
  }
)
