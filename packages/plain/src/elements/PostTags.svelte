<script lang="ts">
  export let tags: string[]
</script>

<ul class="flex flex-wrap">
  {#each tags as tag}
    <li
      class="px-2 mb-1 mr-1 text-sm text-white bg-red-600 text-dark rounded-md leading-6 text-base:xsm mb-2:xsm mr-2:xsm"
    >
      {tag}
    </li>
  {/each}
</ul>
