import { htmlToElement } from '$utils/html'

import html from './template.html?raw'

customElements.define(
  'post-tags',
  class extends HTMLElement {
    postTags: string[] = []

    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
    }

    connectedCallback() {
      setTimeout(() => {
        const attrs = this.attributes.getNamedItem('data-post-tags')
        attrs?.value.split(',').forEach(tag => {
          this.postTags.push(tag)
        })
        this.render()
      })
    }

    render() {
      const childComponent = this.shadowRoot?.querySelector('ul')
      if (childComponent) {
        childComponent.innerHTML = this.postTags.reduce(
          (s, f) =>
            (s += `<li class="px-2 mb-1 mr-1 text-sm text-white bg-red-400 rounded-md leading-6 text-base:xsm mb-2:xsm mr-2:xsm">${f}</li>`),
          ''
        )
      }
    }
  }
)
