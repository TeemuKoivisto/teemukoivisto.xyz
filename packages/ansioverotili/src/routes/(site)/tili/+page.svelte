<script lang="ts">
  import Chart from '$components/Chart.svelte'

  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import arrowLeft from '@iconify-icons/lucide/arrow-left'
  import info from '@iconify-icons/lucide/info'

  import { actions } from '$stores/state'
  import type { ApexOptions } from 'apexcharts'

  const options: ApexOptions = {
    series: [8000, 2000, 1000, 200, 100],
    colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#ffd600'],
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
              label: 'Maksut yhteensä',
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
    labels: ['Palkka', 'Eläkemaksut', 'Ansiotulovero', 'Sairausvakuutus', 'Yle-vero'],
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

<h1 class="mt-12 mb-12 font-title text-5xl flex items-center justify-between w-full">
  <a href="/" class="p-4 hover:bg-blue-100/30 transition-colors rounded-full"
    ><Icon icon={arrowLeft} /></a
  ><span>Tiliote</span>
  <button class="p-4 bg-blue-100 rounded-full invisible"><Icon icon={arrowLeft} /></button>
</h1>

<div class=" h-full w-full flex items-center">
  <section
    class="h-[720px] w-[720px] p-16 pt-0 mx-auto bg-white text-container rounded-2xl flex flex-col shadow-xl"
  >
    <div class="pt-8 flex items-center justify-between">
      <div class="font-title text-3xl">Matti Meikäläinen</div>
      <button class="p-2 hover:bg-gray-200 transition-colors rounded-full">
        <Icon class="w-5 h-5" icon={info} />
      </button>
    </div>
    <div class="mt-4 flex justify-between">
      <div>Ansiotuloverotili</div>
      <div>
        <span>FI10 2000 3000 4000 50</span>
        <button class="bg-gray-300 rounded text-sm px-2">Kopioi</button>
      </div>
    </div>
    <div class="mt-1 mb-8 flex justify-between">
      <div>Maksutili</div>
      <div class="flex w-[250px]">
        <input class="w-full" value="FI10 2000 3000 4000 50" />
        <button class="ml-2 bg-gray-300 rounded text-sm px-2">Vaihda</button>
      </div>
    </div>
    <div class="flex">
      <!-- <div class="mr-8 border rounded-md w-44 h-44 flex items-center justify-center">Pie chart</div> -->
      <Chart {options} />
      <div>
        <h2 class="leading-[0.65] font-title text-2xl mb-2">2024-2025</h2>
        <div class="pl-[2px]">
          <p>Maksuja yhteensä: 12500€</p>
          <p>Työeläkemaksu: 2000€</p>
          <p>Ansiotulovero: 1000€</p>
          <p>Sairausvakuutusmaksu: 200€</p>
          <p>Yle-vero: 100€</p>
          <hr class="my-4 border-t-2" />
          <p>Palkka: 8000€</p>
          <p>12.2% veroprosentti</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style lang="postcss">
</style>
