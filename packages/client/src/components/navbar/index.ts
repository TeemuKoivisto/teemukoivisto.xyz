import { htmlToElement } from '$utils/html'
import '$components/nav-bar-dropdown'

import html from './template.html?raw'

class NavBar extends HTMLElement {
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

customElements.define('nav-bar', NavBar)
