import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

customElements.define(
  'share-buttons',
  class extends HTMLElement {
    constructor() {
      super()
      const url = this.attributes.getNamedItem('data-url')
      const title = this.attributes.getNamedItem('data-title')
      const interpolated = html.replaceAll('{{ url }}', url?.value).replaceAll('{{ title }}', title?.value)
      const template = htmlToElement(interpolated)
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
    }
  }
)
