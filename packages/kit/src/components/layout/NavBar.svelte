<script>
  import NavBarDropdown from './NavBarDropdown.svelte'
  import IconLinks from '$elements/IconLinks.svelte'

  function handleDarkModeToggle() {
    try {
      if (!('theme' in localStorage)) {
        localStorage.setItem(
          'theme',
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        )
      }
      let theme = localStorage.getItem('theme')
      if (theme === 'dark') {
        theme = 'light'
        document.querySelector('html').classList.remove('dark')
      } else {
        theme = 'dark'
        document.querySelector('html').classList.add('dark')
      }
      localStorage.setItem('theme', theme)
    } catch (e) {
      console.error(e)
    }
  }
</script>

<nav
  class="flex justify-between px-8 py-6 bg-gradient-to-b from-main-nav-top to-main-nav-bot dark:from-dark-nav-top dark:to-dark-nav-bot b-shadow"
>
  <div class="flex items-center">
    <a href="/" class="mr-8 leading-4 title-text text-white hover:underline">
      <div class="text-2xl leading-6">Teemu</div>
      <div class="ml-2 text-2xl">Koivisto</div>
    </a>
    <div class="items-center hidden xs:visible xs:flex">
      <a href="/blog" class="text-white hover:underline">Blog</a>
      <div class="bg-transparent xs:bg-white nav-divider-bar" />
      <IconLinks />
    </div>
    <div>
      <button class="bg-white" on:click={handleDarkModeToggle}>Dark</button>
    </div>
  </div>
  <NavBarDropdown />
</nav>

<style lang="scss">
</style>
