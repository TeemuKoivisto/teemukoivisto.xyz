<script lang="ts">
  import Navbar from '$components/Navbar.svelte'

  let { children } = $props()
</script>

<div class="flex-col items-center justify-center">
  <Navbar />
  <main
    class="flex flex-col items-center justify-center h-full min-h-[calc(100vh-64px)] max-w-[860px] mx-[auto]"
  >
    {@render children()}
  </main>
</div>
