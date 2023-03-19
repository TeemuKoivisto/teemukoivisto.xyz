<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import calendar from '@iconify-icons/mdi/calendar.js'
  import tag from '@iconify-icons/mdi/tag.js'

  import PostTags from '$elements/PostTags.svelte'
  import type { BlogPost } from '$lib/render'

  export let post: BlogPost
</script>

<header class={`${$$props.class || ''} flex flex-col`}>
  <h1
    class="font-sans my-8 ml-7 mr-8 text-4xl tracking-tight xs:text-5xl xs:mb-8 xs:mt-14 md:mt-20 md:mb-16 md:text-7xl md:tracking-tighter"
    id="h1"
  >
    {post.title}
  </h1>
  <div class="pl-2 mx-8 flex flex-col xs:items-center xs:flex-row">
    <div class="flex items-center mr-4">
      <div class="mr-2">
        <Icon icon={tag} width={24} />
      </div>
      <time datetime={post.datePublished} class="px-1 text-white rounded-md min-w-max leading-7"
        >{post.datePublished}</time
      >
    </div>
    <div class="flex items-center mt-4 xs:mt-0">
      <div class="mr-2">
        <Icon icon={calendar} width={24} />
      </div>
      <PostTags tags={post.tags} />
    </div>
  </div>
  <h6 class="pl-2 mx-8 mt-4 italic">{post.description}</h6>
</header>

<style>
  time {
    background: rgb(96, 124, 255);
  }
</style>
