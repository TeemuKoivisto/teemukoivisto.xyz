<script lang="ts">
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<footer class="py-8 font-mono flex flex-col">
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <a href="/" class="text-white hover:underline">teemukoivisto.xyz</a>
      <div class="divider">|</div>
      <a href="/blog" class="text-white hover:underline">Blog</a>
    </div>
    <IconLinks class="hidden sm:block" />
  </div>
  <div class="mt-4 mb-[-1rem] text-center font-sm">
    <a
      class="text-xs text-white hover:underline"
      href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
    >
      This site's code is Open Source
    </a>
  </div>
</footer>

<style lang="scss">
  .divider {
    @apply mx-4 text-white;
  }
</style>
