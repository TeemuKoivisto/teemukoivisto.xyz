<script>
  import SvelteSEOMetaTags from 'svelte-seo-meta-tags'

  import NavBar from '$components/layout/NavBar.svelte'
  import Footer from '$components/layout/Footer.svelte'

  import { SITE_DATA } from '$lib/render/site'

  import '../tailwind.css'
</script>

<SvelteSEOMetaTags website={SITE_DATA} facebook={{ facebookAppId: SITE_DATA.facebookAppId }} />
<div class="bg-main dark:bg-dark">
  <NavBar />
  <main class="h-full min-h-screen text-gray-900 dark:text-white">
    <slot />
  </main>
  <Footer />
</div>
