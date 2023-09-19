<script lang="ts">
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<footer class="py-8 font-mono flex items-center justify-between">
  <div class="flex items-center">
    <a href="/" class="text-white hover:underline">teemukoivisto.xyz</a>
    <div class="divider hidden sm:block">|</div>
    <a href="/blog" class="hidden sm:block text-white hover:underline">Blog</a>
  </div>
  <IconLinks class="hidden sm:block" />
</footer>

<style lang="scss">
  .divider {
    @apply mx-4 text-white;
  }
</style>
