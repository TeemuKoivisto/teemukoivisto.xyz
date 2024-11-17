<script lang="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn } from 'svelte/easing'

  let { children, data } = $props()

  let windowWidth = $derived(typeof window !== 'undefined' ? window.innerWidth : 1200)
  let FLY_LEFT = $derived({ x: -windowWidth, duration: 400, easing: cubicIn, opacity: 0.25 })
  let FLY_RIGHT = $derived({ x: windowWidth, duration: 350, easing: cubicIn, opacity: 0.25 })
  let flyIn = $state(FLY_LEFT)
  let flyOut = $state(FLY_RIGHT)

  $effect(() => {
    flyIn = data.url === '/' ? FLY_LEFT : FLY_RIGHT
    flyOut = data.url === '/' ? FLY_RIGHT : FLY_LEFT
  })
</script>

<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>

{#key data.url}
  <main
    class="flex flex-col items-center min-h-screen max-w-[860px] mx-[auto]"
    in:fly={flyIn}
    out:fly={flyOut}
  >
    {@render children()}
  </main>
{/key}
