const { BASE_URL } = import.meta.env

export function htmlToElement(html: string) {
  // trim() -> Never return a text node of whitespace as the result
  const formatted = html
    .trim()
    .replaceAll('src="/', `src="${BASE_URL}`)
    .replaceAll("@import url('/", `@import url('${BASE_URL}`)
    .replaceAll('href="/', `href="${BASE_URL}`)
  const template = document.createElement('template')
  template.innerHTML = formatted
  return template.content
}
