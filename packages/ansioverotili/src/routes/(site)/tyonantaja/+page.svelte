<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import login from '@iconify-icons/lucide/arrow-left'

  import { actions } from '$stores/state'
  import Table from '$components/Table.svelte'
</script>

<h1 class="mt-12 mb-12 font-title text-5xl flex items-center justify-between w-full">
  <a href="/" class="p-4 hover:bg-blue-100/30 transition-colors rounded-full"
    ><Icon icon={login} /></a
  ><span>Palkanmaksu</span>
  <button class="p-4 bg-blue-100 rounded-full invisible"><Icon icon={login} /></button>
</h1>

<div class=" h-full w-full flex items-center">
  <section
    class="h-[720px] w-[720px] p-16 pt-8 mx-auto bg-white text-container rounded-2xl flex flex-col shadow-xl"
  >
    <div class="flex flex-col gap-4">
      <div class="font-title text-2xl">Matti Meikäläinen</div>
      <div>FI10 2000 3000 4000 50</div>
      <input
        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="Palkka ennen kuluja"
      />
      <div>xxxx: tosiasiallinen määrä</div>
    </div>
    <button
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 shrink-0"
      >Maksa</button
    >
    <h2 class="font-semibold tracking-tight mt-8 mb-2 text-2xl">Maksut</h2>
    <Table />
  </section>
</div>

<style lang="postcss">
</style>
