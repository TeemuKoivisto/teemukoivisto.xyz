<script lang="ts">
  import { JsonLd, MetaTags } from 'svelte-meta-tags'

  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  let { metatags, jsonld } = data
</script>

<MetaTags {...metatags} />
<JsonLd schema={jsonld} />

<div class="bg-white w-full h-full flex flex-col items-center justify-center">
  <img src="/palkanlaskija-2025-1.png" alt="Palkanlaskija 2025" />
  <img src="/palkanlaskija-2025-2.png" alt="Palkanlaskija 2025" />
  <img src="/palkanlaskija-2025-3.png" alt="Palkanlaskija 2025" />
</div>

<style lang="postcss">
</style>
