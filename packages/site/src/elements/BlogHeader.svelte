<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import calendar from '@iconify-icons/mdi/calendar.js'
  import tag from '@iconify-icons/mdi/tag.js'

  import PostTags from '$elements/PostTags.svelte'
  import type { BlogPost } from '$lib/render'

  export let post: BlogPost
</script>

<header class={`${$$props.class || ''} flex flex-col`}>
  <h1 class="ml-1 mr-0 mb-16 md:mb-16 mt-16 md:mt-20 text-5xl md:text-7xl font-sans tracking-tight">
    {post.title}
  </h1>
  <div class="pl-2 ml-6 mr-4 flex flex-col xs:items-center xs:flex-row">
    <div class="flex items-center mr-4">
      <div class="mr-2">
        <Icon icon={tag} width={24} />
      </div>
      <time
        datetime={post.datePublished}
        class="px-1 text-white rounded-md min-w-max leading-7 bg-red-500 dark:bg-[#0101fe]"
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
  <blockquote class="pl-2 mx-8 text-lg mt-16 italic">{post.description}</blockquote>
</header>

<style lang="scss">
</style>
