<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import arrowLeft from '@iconify-icons/lucide/arrow-left'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet<[]>
    title: string
  }

  let { children, title }: Props = $props()
</script>

<h1 class="mt-12 mb-12 font-title text-4xl xs:text-5xl flex items-center justify-between w-full">
  <a href="/" class="mx-2 p-4 hover:bg-blue-100/30 transition-colors rounded-full"
    ><Icon icon={arrowLeft} /></a
  ><span>{title}</span>
  <button class="mx-2 p-4 bg-blue-100 rounded-full invisible"><Icon icon={arrowLeft} /></button>
</h1>

<div class=" h-full w-full flex items-center">
  <section
    class="w-[720px] p-4 sm:p-8 !pt-6 mb-8 mx-auto bg-white text-container sm:rounded-2xl flex flex-col shadow-xl"
  >
    {@render children()}
  </section>
</div>

<style lang="postcss">
</style>
