import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

customElements.define(
  'nav-bar-dropdown',
  class extends HTMLElement {
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
    }

    connectedCallback() {
      this.shadowRoot?.querySelector('#toggle-btn')!.addEventListener('click', function () {
        const html = document.querySelector('html')
        if (html?.classList.contains('scroll-lock')) {
          html.classList.remove('scroll-lock')
        } else {
          html?.classList.add('scroll-lock')
        }
      })
    }
  }
)
