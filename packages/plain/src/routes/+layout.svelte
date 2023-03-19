<script>
  import NavBar from '$elements/NavBar.svelte'
  import Footer from '$elements/Footer.svelte'

  import '../tailwind.css'
</script>

<div
  class="bg-main dark:bg-dark flex-col items-center justify-center font-mono text-gray-900 dark:text-white"
>
  <main class="flex-col items-center justify-center h-full min-h-screen max-w-[800px] mx-[auto]">
    <NavBar />
    <slot />
    <Footer />
  </main>
</div>
