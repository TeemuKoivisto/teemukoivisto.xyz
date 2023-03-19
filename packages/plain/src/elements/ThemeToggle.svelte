<script lang="ts">
  import { onMount } from 'svelte'

  let theme = 'dark',
    isDark = true
  $: {
    isDark = theme === 'dark'
    try {
      localStorage.setItem('theme', theme)
    } catch (err) {}
  }

  onMount(() => {
    try {
      if (!('theme' in localStorage)) {
        localStorage.setItem(
          'theme',
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        )
      }
      theme = localStorage.getItem('theme') as 'dark' | 'light'
    } catch (e) {
      console.error(e)
    }
  })

  function handleToggle() {
    if (theme === 'dark') {
      theme = 'light'
      document.querySelector('html')?.classList.remove('dark')
    } else {
      theme = 'dark'
      document.querySelector('html')?.classList.add('dark')
    }
    console.log('theme is ', theme)
  }
</script>

<label class={`${$$props.class || ''} toggle`}>
  <input type="checkbox" checked={isDark} on:change={handleToggle} />
  <div class="slider">
    {#if isDark}
      <span class="icon">
        <svg
          stroke="currentColor"
          fill="#fbfb6f"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          ><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
        >
      </span>
    {:else}
      <span class="icon right">
        <svg
          stroke="currentColor"
          fill="#f9d71c"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          ><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
            x1="12"
            y1="21"
            x2="12"
            y2="23"
          /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
          /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
          /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg
        >
      </span>
    {/if}
  </div>
</label>

<style lang="scss">
  label {
    height: 25px;
    width: 25px;
    position: relative;
    position: relative;
    // display: inline-block;
    width: 48px;
    height: 26px;
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + .slider {
      background-color: rgb(73, 73, 73);
      &:before {
        transform: translateX(110%);
      }
    }
    &:focus + .slider {
      box-shadow: 0 0 1px #f6f6f6;
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #8de1ff;
    border-radius: 34px;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: '';
      border-radius: 50%;
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    color: #222;
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    animation: fadeIn 0.5s;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
    visibility: hidden;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
        visibility: visible;
      }
    }
    &.right {
      transform: translateX(110%);
    }
  }
</style>
