import { htmlToElement } from '$utils/html'

import '$components/nav-bar-dropdown'
import '$components/icon-links'

import html from './template.html?raw'

customElements.define(
  'nav-bar',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' })
      this.render(template)
    }

    render(template: HTMLTemplateElement) {
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
)
