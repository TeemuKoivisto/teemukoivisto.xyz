import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

customElements.define(
  'nav-bar-dropdown',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' })
      this.render(template)
    }

    connectedCallback() {
      this.shadowRoot?.querySelector('#toggle-btn')!.addEventListener('click', function () {
        console.log('Button clicked')
      })
    }

    render(template: HTMLTemplateElement) {
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
)
