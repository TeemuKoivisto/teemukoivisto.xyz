<script>
  import NavBar from '$components/layout/NavBar.svelte'
  import Footer from '$components/layout/Footer.svelte'
  import '../tailwind.css'
</script>

<div class="main-bg">
  <NavBar />
  <main class="h-full min-h-screen text-gray-900">
    <slot />
  </main>
  <Footer />
</div>
