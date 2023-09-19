<script lang="ts">
  import IconLinks from '$elements/IconLinks.svelte'
  import ThemeToggle from '$elements/ThemeToggle.svelte'
  import NavDropdown from './NavDropdown.svelte'
</script>

<nav class={$$props.class}>
  <div class="py-8 px-2 flex justify-between items-center">
    <div class="flex items-center">
      <a class="title-text text-white hover:underline" href="/">
        <div class="text-2xl leading-6">Teemu</div>
        <div class="ml-2 text-2xl">Koivisto</div>
      </a>
      <div class="divider hidden sm:block" />
      <a href="/blog" class="text-white hover:underline hidden sm:block">Blog</a>
      <div class="divider hidden sm:block">|</div>
      <IconLinks class="hidden sm:block" />
    </div>
    <div>
      <NavDropdown class="sm:hidden" />
      <ThemeToggle class="hidden sm:block" />
    </div>
  </div>
</nav>

<style lang="scss">
  .divider {
    @apply mx-4 text-white;
  }
  .title-text {
    text-shadow: rgb(43 39 79) 2px 2px;
    @apply font-cursive text-2xl leading-6;
  }
</style>
