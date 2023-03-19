<script>
  import IconLinks from '$elements/IconLinks.svelte'
  import ThemeToggle from '$elements/ThemeToggle.svelte'
</script>

<nav>
  <div class="py-8 flex justify-between items-center">
    <div class="flex items-center">
      <a class="title-text hover:underline" href="/">
        <div class="text-2xl leading-6">Teemu</div>
        <div class="ml-2 text-2xl">Koivisto</div>
      </a>
      <div class="divider" />
      <a href="/blog" class="text-white hover:underline">Blog</a>
      <div class="divider">|</div>
      <IconLinks />
    </div>
    <ThemeToggle class="hidden xs:visible xs:block" />
  </div>
</nav>

<hr />

<style lang="scss">
  .divider {
    @apply mx-4;
  }
  .title-text {
    text-shadow: rgb(43 39 79) 2px 2px;
    @apply font-cursive text-2xl leading-6;
  }
</style>
