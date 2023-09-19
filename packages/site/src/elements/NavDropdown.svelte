<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import menu from '@iconify-icons/mdi/menu.js'
  import close from '@iconify-icons/mdi/close.js'

  import IconLinks from '$elements/IconLinks.svelte'
  import ThemeToggle from '$elements/ThemeToggle.svelte'

  let open = true

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
  <div class={`${$$props.class} closed-icon`}>
    <button class="svg-wrapper" on:click={toggleOpen}>
      <Icon icon={close} width={32} />
    </button>
  </div>
{:else}
  <button class={`${$$props.class} svg-wrapper`} on:click={toggleOpen}>
    <Icon icon={menu} width={32} />
  </button>
{/if}
<nav class="mobile-nav" class:visible={open}>
  <div class="flex flex-col ml-4">
    <a class="title-text invisible text-white hover:underline" href="/">
      <div class="text-2xl leading-6">Teemu</div>
      <div class="ml-2 text-2xl">Koivisto</div>
    </a>
    <ul>
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

<style lang="scss">
  .title-text {
    text-shadow: rgb(43 39 79) 2px 2px;
    @apply font-cursive text-2xl leading-6;
  }
  .svg-wrapper {
    color: #fff;
    // margin-right: 10px;
    @apply flex text-white;
  }
  .closed-icon {
    z-index: 501;
    @apply fixed right-5 top-11 text-white;
  }
  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    min-height: 100%;
    z-index: 500;
    @apply py-8 hidden inset-0 fixed text-white;
    &.visible {
      @apply block;
    }
  }
  ul {
    @apply my-16;
  }
  li {
    // align-items: flex-start;
    // cursor: pointer;
    // display: flex;
    // justify-content: left;
    // margin: 0;
    // text-transform: uppercase;
    @apply flex mb-2 pr-4;
    // &.icon-links {
    //   cursor: default;
    // }
    // &:not(.icon-links):hover {
    //   background-color: rgba(100, 100, 100, 0.1);
    // }
    > a {
      &:hover {
        background-color: rgba(100, 100, 100, 0.2);
        @apply underline;
      }
      @apply text-white h-full w-full py-4 px-8 bg-opacity-20;
    }
  }
</style>
