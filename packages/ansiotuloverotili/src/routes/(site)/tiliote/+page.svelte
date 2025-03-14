<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import copy from '@iconify-icons/lucide/copy'
  import info from '@iconify-icons/lucide/info'
  import pen from '@iconify-icons/lucide/pen'
  import { JsonLd, MetaTags } from 'svelte-meta-tags'

  import Card from '$components/Card.svelte'
  import Chart from '$components/Chart.svelte'
  import ReceivedTable from '$components/ReceivedTable.svelte'

  import { actions, employee, employeeYear, payments } from '$stores/state'
  import type { ApexOptions } from 'apexcharts'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  let { metatags, jsonld } = data

  const options: ApexOptions = {
    series: [
      $employeeYear.salary,
      $employeeYear.pension,
      $employeeYear.taxes,
      $employeeYear.municipalityTax,
      $employeeYear.health,
      $employeeYear.unemploy,
      $employeeYear.yle,
    ],
    colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#0DBA8C', '#E74694', '#ffd600', '#0099db'],
    chart: {
      height: 300,
      width: '100%',
      type: 'donut' as const,
    },
    stroke: {
      colors: ['transparent'],
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: 'Tulot yhteensä',
              fontFamily: 'Inter, sans-serif',
              formatter: function (w: any) {
                const sum = w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b
                }, 0)
                return `${sum}€`
              },
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: -20,
              formatter: function (value: string) {
                return value + '€'
              },
            },
          },
          size: '80%',
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: [
      'Palkka',
      'Eläkemaksut',
      'Ansiotulovero',
      'Kunnallisvero',
      'Sairausvakuutus',
      'Työttömyysvakuutus',
      'Yle-vero',
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom' as const,
      fontFamily: 'Inter, sans-serif',
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return value + '€'
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value: string) {
          return value + '€'
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  }
</script>

<MetaTags {...metatags} />
<JsonLd schema={jsonld} />

<Card title="Tiliote">
  <div class="mb-4 flex items-center justify-between">
    <div class="font-bold text-3xl">Matti Meikäläinen</div>
    <button class="p-2 hover:bg-accent transition-colors rounded-full">
      <Icon class="w-4 h-4" icon={info} />
    </button>
  </div>
  <div class="grid grid-cols-[1fr_1fr_38px] items-center">
    <p class="text-sm leading-none">Ansiotuloverotili</p>
    <span class="px-3 py-1 text-sm">{$employee.taxAccount}</span>
    <button class="icon-btn"><Icon icon={copy} /></button>
    <p class="text-sm leading-none">Maksutili</p>
    <input class="input w-full" value={$employee.bankAccount} />
    <button class="icon-btn"><Icon icon={pen} /></button>
  </div>
  <div class="flex justify-center flex-wrap sm:flex-nowrap my-8 w-full">
    <Chart {options} />
    <div class="w-full">
      <h2 class="leading-[0.65] font-bold text-2xl my-2 sm:mb-2">
        {new Date().getFullYear()}-{new Date().getFullYear() + 1}
      </h2>
      <div class="pl-[2px] grid grid-cols-[1fr_80px_42px] w-full">
        <div>Brutto</div>
        <div>{$employeeYear.brutto}€</div>
        <div>100%</div>
        <div>Eläke</div>
        <div>{$employeeYear.pension}€</div>
        <div>{Math.round(($employeeYear.pension / $employeeYear.brutto) * 100)}%</div>
        <div>Ansiotulovero</div>
        <div>{$employeeYear.taxes}€</div>
        <div>{Math.round(($employeeYear.taxes / $employeeYear.brutto) * 100)}%</div>
        <div>Kunnallisvero (Helsinki)</div>
        <div>{$employeeYear.municipalityTax}€</div>
        <div>{Math.round(($employeeYear.municipalityTax / $employeeYear.brutto) * 100)}%</div>
        <div>Sairausvakuutus</div>
        <div>{$employeeYear.health}€</div>
        <div>{Math.round(($employeeYear.health / $employeeYear.brutto) * 100)}%</div>
        <div>Työttömyysvakuutus</div>
        <div>{$employeeYear.unemploy}€</div>
        <div>{Math.round(($employeeYear.unemploy / $employeeYear.brutto) * 1000) / 10}%</div>
        <div>YLE-vero</div>
        <div>{$employeeYear.yle}€</div>
        <div>{Math.round(($employeeYear.unemploy / $employeeYear.brutto) * 1000) / 10}%</div>
        <hr class="my-4 border-t-2 col-span-3" />
        <div>Palkka</div>
        <div class="col-span-2">{$employeeYear.salary}€</div>
        <div>Veroprosentti</div>
        <div class="col-span-2">{$employeeYear.taxPc}%</div>
      </div>
    </div>
  </div>
  <h2 class="pb-2 font-semibold leading-none tracking-tight text-2xl">Maksut</h2>
  <ReceivedTable rows={$payments} />
</Card>

<style lang="postcss">
</style>
