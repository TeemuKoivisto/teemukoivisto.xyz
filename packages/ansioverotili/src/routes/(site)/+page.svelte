<script lang="ts">
  import { JsonLd, MetaTags } from 'svelte-meta-tags'

  import { actions } from '$stores/state'

  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  let { metatags, jsonld } = data
</script>

<MetaTags {...metatags} />
<JsonLd schema={jsonld} />

<div class="my-16">
  <nav class="my-4">
    <a href="/about" class="px-2 py-0.5 font-bold text-xl rounded underline hover:bg-black/10"
      >Mikä tämä on?</a
    >
  </nav>
</div>
<div class="mt-24 h-full w-full flex items-center flex-col">
  <h1 class="font-title mb-12 text-5xl">Ansiotuloverotili</h1>
  <section
    class="w-full max-w-[32rem] p-12 xs:p-16 !pt-0 mx-auto bg-white inline-block text-container xs:rounded-2xl"
  >
    <h2 class="my-12 font-title text-center text-3xl leading-9 tracking-tight text-gray-900">
      Kirjaudu sisään
    </h2>
    <div class="flex flex-col gap-4">
      <a class="btn slide" href="/tiliote">
        <div class="mx-auto flex items-center justify-center">
          <img class="mr-3 h-[44px]" src="man-avatar.svg" alt="Man avatar" />
          <div class="mr-3 text-xl font-semibold">Matti</div>
        </div>
      </a>
      <a class="btn slide2" href="/tyonantaja">
        <div class="mx-auto flex items-center justify-center">
          <img class="mx-3 h-[44px]" src="woman-avatar.svg" alt="Woman avatar" />
          <div class="mr-3 text-xl font-semibold">Minna</div>
        </div>
      </a>
    </div>
  </section>
</div>

<section class="px-4 flex flex-col">
  <hr class="my-8" />
</section>

<style lang="postcss">
  .btn {
    background: none;
    @apply px-5 py-3 flex text-lg uppercase tracking-wider text-black rounded-full border-gray-400 border-2 w-full transition duration-300 ease-in-out transform;
    &:hover,
    &:focus {
      color: #fff;
    }
    * {
      color: inherit;
    }
  }
  .slide:hover,
  .slide:focus {
    color: #fff;
    border-color: #0cf;
    box-shadow: inset 380px 0 0 0 #0cf;
  }
  .slide2:hover,
  .slide2:focus {
    color: #fff;
    border-color: #4a89ff;
    box-shadow: inset 380px 0 0 0 #4a89ff;
  }
</style>
