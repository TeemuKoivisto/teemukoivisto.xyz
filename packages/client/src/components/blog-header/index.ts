import { htmlToElement } from '$utils/html'

import '$components/post-tags'

import html from './template.html?raw'

customElements.define(
  'blog-header',
  class extends HTMLElement {
    postTags: string[] = []
    constructor() {
      super()
      const template = htmlToElement(html)
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
    }
    connectedCallback() {
      const attrs = this.attributes.getNamedItem('data-post-tags')
      attrs?.value.split(',').forEach((tag) => {
        this.postTags.push(tag)
      })
      const childComponent = this.shadowRoot?.querySelector('post-tags')
      if (childComponent) {
        childComponent.setAttribute('data-post-tags', this.postTags.toString())
      }
    }
  }
)
