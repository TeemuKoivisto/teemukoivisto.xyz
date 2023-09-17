<script lang="ts">
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<footer class="py-8 font-mono flex items-center justify-between">
  <div class="flex items-center">
    <a href="/" class="hover:underline">teemukoivisto.xyz</a>
    <div class="divider">|</div>
    <a href="/blog" class="text-white hover:underline">Blog</a>
  </div>
  <IconLinks />
</footer>

<style lang="scss">
  .divider {
    @apply mx-4;
  }
</style>
