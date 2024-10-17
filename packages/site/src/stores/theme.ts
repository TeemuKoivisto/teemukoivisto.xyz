import { get, derived, writable } from 'svelte/store'

export const theme = (() => {
  let thm: 'dark' | 'light' = 'light'
  try {
    if ('theme' in localStorage) {
      thm = localStorage.getItem('theme') as 'dark' | 'light'
    } else if (typeof window !== 'undefined') {
      thm = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  } catch (e) {}
  return writable<'dark' | 'light'>(thm)
})()
export const isDark = derived(theme, theme => theme === 'dark')

export const toggleTheme = () => {
  const oldTheme = get(theme)
  const newTheme = oldTheme === 'dark' ? 'light' : 'dark'
  document.querySelector('html')?.classList.remove(oldTheme)
  document.querySelector('html')?.classList.add(newTheme)
  localStorage.setItem('theme', newTheme)
  theme.set(newTheme)
}
