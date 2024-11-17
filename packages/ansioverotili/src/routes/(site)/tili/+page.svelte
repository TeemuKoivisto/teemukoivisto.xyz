<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import copy from '@iconify-icons/lucide/copy'
  import info from '@iconify-icons/lucide/info'
  import pen from '@iconify-icons/lucide/pen'

  import Card from '$components/Card.svelte'
  import Chart from '$components/Chart.svelte'
  import ReceivedTable from '$components/ReceivedTable.svelte'

  import { actions, employee, employeeYear, payments } from '$stores/state'
  import type { ApexOptions } from 'apexcharts'

  const options: ApexOptions = {
    series: [
      $employeeYear.salary,
      $employeeYear.pension,
      $employeeYear.taxes,
      $employeeYear.health,
      $employeeYear.unemploy,
      $employeeYear.yle,
    ],
    colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#ffd600', '#0099db'],
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

<Card title="Tiliote">
  <div class="mb-4 flex items-center justify-between">
    <div class="font-title text-3xl">Matti Meikäläinen</div>
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
    <!-- <div class="mr-8 border rounded-md w-44 h-44 flex items-center justify-center">Pie chart</div> -->
    <Chart {options} />
    <div class="w-full">
      <h2 class="leading-[0.65] font-title text-2xl mb-2">
        {new Date().getFullYear()}-{new Date().getFullYear() + 1}
      </h2>
      <div class="pl-[2px] grid grid-cols-[1fr_80px] w-full">
        <div>Brutto</div>
        <div>{$employeeYear.brutto}€</div>
        <div>Eläke</div>
        <div>{$employeeYear.pension}€</div>
        <div>Ansiotulovero</div>
        <div>{$employeeYear.taxes}€</div>
        <div>Sairausvakuutus</div>
        <div>{$employeeYear.health}€</div>
        <div>Työttömyysvakuutus</div>
        <div>{$employeeYear.unemploy}€</div>
        <div>YLE-vero</div>
        <div>{$employeeYear.yle}€</div>
        <hr class="my-4 border-t-2 col-span-2" />
        <div>Palkka</div>
        <div>{$employeeYear.salary}€</div>
        <div>Veroprosentti</div>
        <div>{$employeeYear.taxPc}%</div>
      </div>
    </div>
  </div>
  <h2 class="pb-2 font-semibold leading-none tracking-tight text-2xl">Maksut</h2>
  <ReceivedTable rows={$payments} />
</Card>

<style lang="postcss">
</style>
