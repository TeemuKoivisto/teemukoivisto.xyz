<script>
  import IconLinks from '$elements/IconLinks.svelte'
  import ThemeToggle from '$elements/ThemeToggle.svelte'
</script>

<nav class="flex justify-between px-8 py-6 dark:bg-dark-lighter b-shadow">
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
    <!--  <NavBarDropdown /> -->
  </div>
</nav>

<style lang="scss">
  .b-shadow {
    box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
  }
  .nav-divider-bar {
    content: ' ';
    width: 1px;
    @apply h-4 mx-5 my-1;
  }
  .title-text {
    font-family: 'Permanent Marker', cursive;
    text-shadow: rgb(43 39 79) 2px 2px;
  }
</style>
