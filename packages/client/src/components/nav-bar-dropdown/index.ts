import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

class NavBarDropdown extends HTMLElement {
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

customElements.define('nav-bar-dropdown', NavBarDropdown)
