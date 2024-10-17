<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import menu from '@iconify-icons/mdi/menu'
  import close from '@iconify-icons/mdi/close'

  import IconLinks from '$elements/IconLinks.svelte'
  import ThemeToggle from '$elements/ThemeToggle.svelte'

  let open = false

  function toggleOpen() {
    open = !open
    if (open) {
      document.querySelector('html')?.classList.add('scroll-lock')
    } else {
      document.querySelector('html')?.classList.remove('scroll-lock')
    }
  }

  function handleKeyDown(ev: KeyboardEvent) {
    if (open && ev.key === 'Escape') {
      toggleOpen()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
{#if open}
  <div class={`closed-icon`}>
    <button class="flex text-white" aria-label="Close mobile navbar menu" on:click={toggleOpen}>
      <Icon icon={close} width={32} />
    </button>
  </div>
{:else}
  <button
    class={`${$$props.class} flex text-white`}
    aria-label="Open mobile navbar menu"
    on:click={toggleOpen}
  >
    <Icon icon={menu} width={32} />
  </button>
{/if}
<nav class="mobile-nav" class:hidden={!open}>
  <div class="flex flex-col ml-4">
    <a class="font-title text-2xl invisible text-white hover:underline" href="/">
      <div>Teemu</div>
      <div class="ml-2">Koivisto</div>
    </a>
    <ul class="my-16">
      <li>
        <a href="/" on:click={toggleOpen}>Home</a>
      </li>
      <li>
        <a href="/blog" on:click={toggleOpen}>Blog</a>
      </li>
      <li class="py-4 px-8 flex justify-between">
        <IconLinks />
        <ThemeToggle />
      </li>
    </ul>
  </div>
</nav>

<style lang="postcss">
  .closed-icon {
    @apply fixed right-5 top-11 text-white z-30;
  }
  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    @apply text-white py-8 w-full min-h-full inset-0 fixed z-20;
  }
  li {
    @apply flex mb-2 pr-4;
    > a {
      &:hover {
        background-color: rgba(100, 100, 100, 0.2);
        @apply underline;
      }
      @apply text-white h-full w-full py-4 px-8 bg-opacity-20;
    }
  }
</style>
