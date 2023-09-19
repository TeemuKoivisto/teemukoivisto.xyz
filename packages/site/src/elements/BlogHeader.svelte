<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import calendar from '@iconify-icons/mdi/calendar.js'
  import tag from '@iconify-icons/mdi/tag.js'

  import PostTags from '$elements/PostTags.svelte'
  import type { BlogPost } from '$lib/render'

  export let post: BlogPost
</script>

<header class={`${$$props.class || ''} flex flex-col`}>
  <h1 class="font-sans my-8 ml-6 mr-4 text-5xl md:text-7xl mt-20 mb-16 tracking-tight" id="h1">
    {post.title}
  </h1>
  <div class="pl-2 ml-6 mr-4 flex flex-col xs:items-center xs:flex-row">
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
  <h6 class="pl-2 mx-8 mt-16 italic">{post.description}</h6>
</header>

<style>
  time {
    background: rgb(1 1 254);
    /* border: 1px solid hsl(100deg 74.42% 33.73%);
    box-shadow: 0px 0px 2px hsl(100deg 74.42% 33.73%); */
  }
</style>
