<script>
  import NavBarDropdown from './NavBarDropdown.svelte'
  import IconLinks from '$elements/IconLinks.svelte'
  import ThemeToggle from '$elements/ThemeToggle.svelte'
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
    <div />
  </div>
  <div class="flex items-center">
    <ThemeToggle class="hidden xs:visible xs:block" />
    <NavBarDropdown />
  </div>
</nav>

<style lang="scss">
</style>
