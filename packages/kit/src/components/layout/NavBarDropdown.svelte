<script>
  import IconLinks from '$elements/IconLinks.svelte'
</script>

<div class="relative">
  <input id="dropdown-icons" type="checkbox" class="hidden" />
  <button
    id="toggle-btn"
    class="absolute top-4 right-4 z-10 block text-white xs:hidden cursor-pointer"
  >
    <label for="dropdown-icons" class="cursor-pointer">
      <img data-type="svg" src="/svg/menu.svg" class="menu-icon" style="filter: invert(1)" />
      <img
        data-type="svg"
        src="/svg/close.svg"
        class="hidden close-icon"
        style="filter: invert(1)"
      />
    </label>
  </button>
  <div class="dropdown fixed inset-0 h-full w-full block hidden bg-black opacity-90 cursor-default">
    <nav class="absolute w-full pt-[95px] z-11">
      <ul>
        <li class="text-left cursor-pointer hover:underline hover:bg-opacity-5 hover:bg-gray-400">
          <a href="/" class="block w-full h-full px-8 py-4 text-white">FRONTPAGE</a>
        </li>
        <li class="text-left cursor-pointer hover:underline hover:bg-opacity-5 hover:bg-gray-400">
          <a href="/blog" class="block w-full h-full px-8 py-4 text-white">BLOG</a>
        </li>
        <li class="px-8 py-4">
          <IconLinks class="items-center xs:items-start" />
        </li>
      </ul>
    </nav>
  </div>
</div>

<style>
  #dropdown-icons:checked ~ * .menu-icon {
    display: none;
    visibility: hidden;
  }
  #dropdown-icons:checked ~ * .close-icon {
    display: block;
    visibility: visible;
  }
  #dropdown-icons:checked ~ .dropdown {
    display: block;
    visibility: visible;
  }
</style>
