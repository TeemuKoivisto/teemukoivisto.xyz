<script lang="ts">
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<footer class="py-8 font-mono flex flex-col">
  <div class="links flex items-center justify-between flex-col sm:flex-row">
    <div class="flex items-center mb-4 sm:mb-0 flex-col sm:flex-row">
      <a href="/" class="font-title text-lg text-white hover:underline">teemukoivisto.xyz</a>
      <div class="mx-4 text-white hidden sm:block">|</div>
      <a href="/blog" class="text-white hover:underline mt-4 sm:mt-0">Blog</a>
    </div>
    <IconLinks class="mb-4 sm:mb-0" />
  </div>
  <div class="mt-4 mb-[-1rem] text-center font-sm">
    <a
      class="github-link text-xs text-white hover:underline"
      href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
    >
      This site's code is Open Source
    </a>
  </div>
</footer>

<style lang="scss">
  .github-link {
    text-shadow: rgb(43, 39, 79) 2px 2px;
  }
</style>
