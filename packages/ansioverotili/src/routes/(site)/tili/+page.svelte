<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import login from '@iconify-icons/lucide/arrow-left'

  import { actions } from '$stores/state'
</script>

<h1 class="mt-12 mb-12 font-title text-5xl flex items-center justify-between w-full">
  <a href="/" class="p-4 hover:bg-blue-100/30 rounded-full"><Icon icon={login} /></a><span
    >Tiliote</span
  >
  <button class="p-4 bg-blue-100 rounded-full invisible"><Icon icon={login} /></button>
</h1>

<div class=" h-full w-full flex items-center">
  <section
    class="h-[720px] w-[720px] p-16 pt-0 mx-auto bg-white text-container rounded-2xl flex flex-col"
  >
    <div class="py-8 flex items-center justify-between">
      <div class="font-title text-2xl">Matti Meikäläinen</div>
      <div>
        <span>FI10 2000 3000 4000 50</span>
        <button class="bg-gray-300 rounded text-sm px-2">Kopioi</button>
      </div>
    </div>
    <div class="flex">
      <div class="mr-8 border rounded-md w-44 h-44 flex items-center justify-center">Pie chart</div>
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
        </div>
      </div>
    </div>
  </section>
</div>

<style lang="postcss">
</style>
