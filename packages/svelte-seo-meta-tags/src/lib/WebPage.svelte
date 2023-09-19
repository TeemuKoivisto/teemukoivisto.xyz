<script lang="ts">
  import type { WebPageProps } from './types'

  export let page: WebPageProps
</script>

<svelte:head>
  <title>{page.title}</title>
  {#if page.description}
    <meta name="description" content={page.description} />
  {/if}
  {#if page.image}
    <meta name="image" content={page.image} />
  {/if}
  {#if page.keywords}
    <meta name="keywords" content={page.keywords.join(', ')} />
  {/if}
</svelte:head>
