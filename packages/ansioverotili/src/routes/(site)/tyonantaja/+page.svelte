<script lang="ts">
  import { JsonLd, MetaTags } from 'svelte-meta-tags'

  import {
    actions,
    salary,
    salaryBrutto,
    employee,
    payments,
    HEALTH_INSURANCE,
    TYEL,
    UNEMPLOYMENT_INSURANCE,
  } from '$stores/state'
  import PaymentsTable from '$components/PaymentsTable.svelte'

  import Card from '$components/Card.svelte'
  import { Button } from '$shadcn/ui/button/index.js'

  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  let { metatags, jsonld } = data
</script>

<MetaTags {...metatags} />
<JsonLd schema={jsonld} />

<Card title="Palkanmaksu">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col space-y-1.5">
      <div class="font-semibold leading-none tracking-tight text-2xl mb-2">Uusi suoritus</div>
      <p class="text-muted-foreground text-sm">
        Maksa palkka työntekijälle ilman erillisiä veromaksuja, suoraan ansiotuloverotilille.
      </p>
    </div>
    <div class="space-y-2">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <label
            for="receiver"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >Palkansaaja</label
          >
          <input class="input" id="receiver" bind:value={$employee.name} />
        </div>
        <div class="space-y-1">
          <label
            for="account"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >Ansiotuloverotili</label
          >
          <input class="input" id="account" bind:value={$employee.taxAccount} />
        </div>
      </div>
      <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 break-all">
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
            bind:value={$salary}
          />
        </div>
        <div class="space-y-1">
          <label
            for="salary-total"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            title="Sairausvakuutus">Sairausvakuutus</label
          >
          <input class="input" id="salary-total" disabled value={HEALTH_INSURANCE * 100} />
        </div>
        <div class="space-y-1">
          <label
            for="salary-total"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >TyEL</label
          >
          <input class="input" id="salary-total" disabled value={Math.round(TYEL * 10000) / 100} />
        </div>
        <div class="space-y-1 truncate">
          <label
            for="salary-total"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >Työttömyysvakuutus</label
          >
          <input class="input" id="salary-total" disabled value={UNEMPLOYMENT_INSURANCE * 100} />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="text-2xl font-bold">{$salaryBrutto}€</div>
      <div class="flex items-center justify-between">
        <div></div>
        <Button class="w-[160px] bg-blue-500 hover:bg-blue-500/90" onclick={actions.addPayment}
          >Maksa</Button
        >
      </div>
    </div>
    <hr class="bg-border shrink-0 h-[1px] w-full my-8" />
    <h2 class="font-semibold leading-none tracking-tight text-2xl">Maksut</h2>
    <PaymentsTable rows={$payments} deleteItem={actions.deletePayment} />
  </div>
</Card>

<style lang="postcss">
</style>
