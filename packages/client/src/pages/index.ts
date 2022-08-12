import '../index.css'

import myParagraph from './my-paragraph.html?raw'

function htmlToElement(html: string) {
  var template = document.createElement('template')
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  const content = template.content.firstChild
  if (!content) {
    throw Error('No content provided for html element: ', html)
  }
  return content as HTMLTemplateElement
}

class MyFirstCustomElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML += `
      <style>
        h1 {
          color: var(--font-color, black);
        }
      </style>
      <h1>Hello world!</h1>
    `
    this.render(template)
  }

  render(template: HTMLTemplateElement) {
    this.shadowRoot?.appendChild(template.content.cloneNode(true))
  }
}

class MyParagraph extends HTMLElement {
  constructor() {
    super()
    const template = htmlToElement(myParagraph)
    this.attachShadow({ mode: 'open' })
    this.render(template)
  }

  render(template: HTMLTemplateElement) {
    this.shadowRoot?.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('my-first-custom-element', MyFirstCustomElement)
customElements.define('my-paragraph', MyParagraph)
