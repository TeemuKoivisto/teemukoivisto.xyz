<script lang="ts">
  export let tags: string[]
</script>

<ul class="mt-1 flex flex-wrap">
  {#each tags as tag}
    <li
      class="px-2 mb-1 mr-2 text-sm text-white rounded-md leading-6 text-base:xsm mb-2:xsm mr-2:xsm"
    >
      {tag}
    </li>
  {/each}
</ul>

<style>
  li {
    background-color: #1d0f0f;
    border: 1px solid #963916;
    box-shadow: 0px 0px 2px #ff4500;
  }
</style>
