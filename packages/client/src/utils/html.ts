export function htmlToElement(html: string) {
  var template = document.createElement('template')
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  const content = template.content.firstChild
  if (!content) {
    throw Error('No content provided for html element: ' + html)
  }
  return content as HTMLTemplateElement
}
