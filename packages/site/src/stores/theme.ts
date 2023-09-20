import { get, derived, writable } from 'svelte/store'

export const theme = (() => {
  let thm
  try {
    if ('theme' in localStorage) {
      thm = localStorage.getItem('theme') as 'dark' | 'light'
    } else {
      thm = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  } catch (e) {}
  return writable<'dark' | 'light'>(thm)
})()
export const isDark = derived(theme, theme => theme === 'dark')

export const toggleTheme = () => {
  let thm = get(theme)
  if (thm === 'dark') {
    thm = 'light'
    localStorage.setItem('theme', thm)
    document.querySelector('html')?.classList.remove('dark')
    document.querySelector('html')?.classList.add('light')
  } else {
    thm = 'dark'
    localStorage.setItem('theme', thm)
    document.querySelector('html')?.classList.remove('light')
    document.querySelector('html')?.classList.add('dark')
  }
  theme.set(thm)
}
