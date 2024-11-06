<script lang="ts">
</script>

<h1 class="mt-12 mb-12 font-title text-5xl">Ansioverotili</h1>

<div class=" h-full w-full flex items-center">
  <section class="w-[32rem] p-16 pt-0 mx-auto bg-white inline-block text-container rounded-2xl">
    <h2 class="mb-8 font-title text-center text-2xl leading-9 tracking-tight text-gray-900">
      Kirjaudu sisään
    </h2>
    <div class="flex flex-col gap-4">
      <button
        class="py-2 px-4 rounded-full bg-blue-300 hover:bg-blue-300/70 transition-colors w-full flex items-center"
      >
        <div class="mx-auto flex items-center">
          <img class="mr-3 h-[52px]" src="man-avatar.svg" alt="Man avatar" />
          <div class="mr-3 text-2xl font-semibold">Matti</div>
        </div>
      </button>
      <button class="btn-white border-gray-400 border-2 hover:bg-black/50 w-full">
        <img class="mx-3 h-[52px]" src="woman-avatar.svg" alt="Woman avatar" />
        <div>Minna</div>
      </button>
    </div>
  </section>
</div>

<section class="px-4 flex flex-col">
  <hr class="my-8" />
</section>

<style lang="postcss">
  .btn-white {
    @apply px-5 py-3 flex text-lg justify-center items-center bg-white text-black rounded shadow text-center transition duration-500 ease-in-out transform;
  }
  .btn-white * {
    @apply text-black;
  }
</style>
