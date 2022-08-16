export function htmlToElement(html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim() // Never return a text node of whitespace as the result
  return template.content
}
