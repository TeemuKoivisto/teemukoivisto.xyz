<script lang="ts">
  import PostTags from '$elements/PostTags.svelte'
  import type { BlogPost } from '$lib/render'

  export let post: BlogPost
</script>

<header class={`${$$props.class || ''} flex flex-col`}>
  <h1
    class="my-8 text-4xl tracking-tight xs:text-5xl xs:mb-8 xs:mt-14 md:mt-16 md:mb-12 xl:mb-24 xl:mt-10 md:text-7xl md:tracking-tighter"
  >
    {post.title}
  </h1>
  <div class="flex flex-col xs:items-center xs:flex-row">
    <div class="flex items-center mr-4">
      <div class="mr-2">
        <img data-type="svg" src="/svg/tag.svg" />
      </div>
      <time datetime={post.datePublished} class="px-1 text-white rounded-md min-w-max leading-7"
        >{post.datePublished}</time
      >
    </div>
    <div class="flex items-center mt-4 xs:mt-0">
      <div class="mr-2">
        <img data-type="svg" src="/svg/calendar.svg" />
      </div>
      <PostTags tags={post.tags} />
    </div>
  </div>
  <h6 class="mt-4 italic">{post.description}</h6>
</header>

<style>
  time {
    background: rgb(96, 124, 255);
  }
</style>
