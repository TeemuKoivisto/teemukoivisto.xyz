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
    class="mb-16 w-[720px] p-8 pt-8 mx-auto bg-white text-container rounded-2xl flex flex-col shadow-xl"
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
        <div class="grid grid-cols-2 gap-4">
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
              value="2500"
            />
          </div>
          <div class="space-y-1">
            <label
              for="salary-total"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >Tosiasiallinen määrä</label
            >
            <input class="input" id="salary-total" disabled value="3200" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="text-2xl font-bold">3200€</div>
        <div class="flex items-center justify-between">
          <div></div>
          <Button class="w-[160px] bg-blue-500 hover:bg-blue-500/90">Maksa</Button>
        </div>
      </div>
      <hr class="bg-border shrink-0 h-[1px] w-full my-8" />
      <h2 class="font-semibold leading-none tracking-tight text-2xl">Maksut</h2>
      <Table />
    </div>
  </section>
</div>

<style lang="postcss">
</style>
