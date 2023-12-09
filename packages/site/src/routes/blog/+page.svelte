<script lang="ts">
  import SvelteSEOMetaTags from 'svelte-seo-meta-tags'
  import { SITE_DATA } from '$lib/render'

  import PostTags from '$elements/PostTags.svelte'

  import type { BlogPost } from '$lib/render'

  export let data: {
    posts: BlogPost[]
  }

  $: blogPosts = data.posts
</script>

<SvelteSEOMetaTags
  page={{
    ...SITE_DATA,
    title: 'Blog posts',
  }}
/>

<hr />

<h1
  class="md:pl-2 ml-1 mr-0 mb-16 md:mb-16 mt-16 md:mt-20 text-5xl md:text-7xl font-sans text-white tracking-tight"
>
  My blog posts
</h1>

<ul class="pl-6 space-y-4 min-h-[55vh] text-white md:text-lg">
  {#each blogPosts as post}
    <li class="flex">
      <time datetime={post.datePublished} class="mr-4"
        >{new Date(post.datePublished).toLocaleDateString()}</time
      >
      <div>
        <div class="hover:underline">
          <a href="/blog/{post.slug}" class="flex">
            {post.title}
          </a>
        </div>
        <PostTags tags={post.tags} />
      </div>
    </li>
  {/each}
</ul>

<hr />

<style lang="scss">
  .space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }
</style>
