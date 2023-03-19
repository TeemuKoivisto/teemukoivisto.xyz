<script lang="ts">
  import Description from '$elements/Description.svelte'
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<h1
  class="pl-2 font-sans my-8 text-4xl tracking-tight xs:text-5xl xs:mb-8 xs:mt-14 md:mt-20 md:mb-16 md:text-7xl md:tracking-tighter"
  id="h1"
>
  Hi there stranger!
</h1>

<section class="pl-6 mb-12 min-h-[55vh]">
  <Description />
</section>

<footer class="py-8 border-t font-mono flex items-center justify-between">
  <span> teemukoivisto.xyz </span>
  <IconLinks />
</footer>

<style lang="scss">
</style>
