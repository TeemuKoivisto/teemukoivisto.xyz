<script lang="ts">
  import Navbar from '$components/Navbar.svelte'

  let { children } = $props()
</script>

<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>
<!-- <Navbar /> -->
<main class="flex flex-col items-center min-h-screen max-w-[860px] mx-[auto]">
  {@render children()}
</main>
