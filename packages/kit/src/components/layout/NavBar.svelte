<script>
  import NavBarDropdown from './NavBarDropdown.svelte'
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<nav class="flex justify-between px-8 py-6 nav-bg b-shadow">
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
  </div>
  <NavBarDropdown />
</nav>

<style lang="scss">
</style>
