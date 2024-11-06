<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import login from '@iconify-icons/lucide/arrow-left'

  import { actions } from '$stores/state'
  import Table from '$components/Table.svelte'
  import { Button } from '$shadcn/ui/button/index.js'
  // import { Input } from "$shadcn/ui/input/index.js";
  // import { Label } from "$shadcn/ui/label/index.js";
</script>

<h1 class="mt-12 mb-12 font-title text-5xl flex items-center justify-between w-full">
  <a href="/" class="p-4 hover:bg-blue-100/30 transition-colors rounded-full"
    ><Icon icon={login} /></a
  ><span>Palkanmaksu</span>
  <button class="p-4 bg-blue-100 rounded-full invisible"><Icon icon={login} /></button>
</h1>

<div class=" h-full w-full flex items-center">
  <section
    class="mb-16 w-[720px] p-16 pt-12 mx-auto bg-white text-container rounded-2xl flex flex-col shadow-xl"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col space-y-1.5 p-0 pb-0">
        <div class="font-semibold leading-none tracking-tight text-2xl mb-2">Uusi suoritus</div>
        <p class="text-muted-foreground text-sm">
          Maksa palkka työntekijälle ilman erillisiä veromaksuja, suoraan ansiotuloverotilille.
        </p>
      </div>
      <div class="space-y-2">
        <div class="space-y-1">
          <label
            for="receiver"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >Palkansaaja</label
          >
          <input class="input" id="receiver" value="Matti Meikäläinen FI10 2000 3000 4000 50" />
        </div>
        <div class="space-y-1">
          <label
            for="salary"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >Palkkasuoritus</label
          >
          <input
            class="input"
            id="salary"
            placeholder="Palkka ilman työeläkemaksuja"
            value="3200"
          />
        </div>
      </div>
      <div class="flex items-center pt-0">
        <Button class="bg-blue-500 hover:bg-blue-500/90">Maksa</Button>
      </div>
      <h2 class="font-title text-2xl">Matti Meikäläinen</h2>
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
  .input {
    @apply placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50;
  }
</style>
