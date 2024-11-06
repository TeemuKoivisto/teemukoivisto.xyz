<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {}

  let { ...rest }: Props = $props()
</script>

<nav class="bg-gray-800" {...rest}>
  <a href="/">Home</a>
</nav>
