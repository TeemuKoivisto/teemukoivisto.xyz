<script lang="ts">
  import type { WebsiteProps } from './types'

  export let website: WebsiteProps
</script>

<svelte:head>
  <title>{website.title}</title>
  {#if website.description}
    <meta name="description" content={website.description} />
  {/if}
  {#if website.image}
    <meta name="image" content={website.image} />
  {/if}
  <meta property="og:type" content="website" />
</svelte:head>
