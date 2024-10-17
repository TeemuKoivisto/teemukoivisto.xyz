<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import calendar from '@iconify-icons/mdi/calendar'
  import tag from '@iconify-icons/mdi/tag'

  import PostTags from '$elements/PostTags.svelte'
  import type { BlogPost } from '$lib/render'

  export let post: BlogPost
</script>

<header class={`${$$props.class || ''} flex flex-col`}>
  <h1 class="ml-1 mr-0 mb-6 xs:mb-16 mt-16 md:mt-20 text-5xl md:text-7xl font-sans tracking-tight">
    {post.draft ? 'Draft: ' + post.title : post.title}
  </h1>
  <div class="pl-2 xs:ml-6 flex flex-col">
    <div class="flex items-center mb-4">
      <div class="mr-2">
        <Icon icon={calendar} width={24} />
      </div>
      <time datetime={post.datePublished} class="px-1 text-white rounded-md min-w-max leading-7"
        >{new Date(post.datePublished).toLocaleDateString()}</time
      >
    </div>
    <div class="flex items-center">
      <div class="mr-2">
        <Icon icon={tag} width={24} />
      </div>
      <PostTags tags={post.tags} />
    </div>
  </div>
  <blockquote class="pl-2 mx-8 text-lg mt-16 italic">{post.description}</blockquote>
</header>

<style lang="scss">
</style>
