<script>
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<footer
  class="items-center xs:items-start pt-2 pb-4 bg-gradient-to-t from-main-footer-top to-main-footer-bot dark:from-dark-footer-top dark:to-dark-footer-bot"
>
  <nav class="flex flex-col items-center justify-center mt-4 xs:flex-row xs:items-start">
    <a href="/" class="title-text text-white hover:underline"> Teemu Koivisto </a>
    <div aria-hidden class="bg-transparent xs:bg-white nav-divider-bar" />
    <a href="/blog" class="text-white hover:underline">Blog</a>
    <div aria-hidden class="bg-transparent xs:bg-white nav-divider-bar" />
    <IconLinks class="items-center xs:items-start" />
  </nav>
  <div class="flex flex-col items-center mt-8">
    <a
      class="text-xs text-blue-900 hover:underline"
      href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
    >
      This site&apos;s code is Open Source
    </a>
  </div>
</footer>
