<script lang="ts">
  import { onMount } from 'svelte'
  import { isDark } from '$stores/theme'

  export let tags: string[]

  let degrees: number[] = tags.map((_, i) => i * 60)
  let int: ReturnType<typeof setInterval>

  onMount(() => {
    if ($isDark) {
      int = setInterval(() => {
        degrees = degrees.map(n => (n + 10) % 360)
      }, 200)
    } else {
      clearInterval(int)
    }
    return () => {
      clearInterval(int)
    }
  })
</script>

<ul class="mt-1 flex flex-wrap">
  {#each tags as tag, i}
    <li
      class="px-2 mb-1 mr-2 text-sm text-white rounded-md leading-6 text-base:xsm mb-2:xsm mr-2:xsm"
      class:dark={$isDark}
      style={$isDark ? `border: 1px solid hsl(${degrees[i]}deg 74.42% 33.73%);` : 'border: 0;'}
    >
      {tag}
    </li>
  {/each}
</ul>

<style lang="postcss">
  li {
    background-color: #1d0f0f;
    &.dark {
      box-shadow: 0px 0px 2px #ff4500;
      transition: border-color ease 100ms;
    }
  }
</style>
