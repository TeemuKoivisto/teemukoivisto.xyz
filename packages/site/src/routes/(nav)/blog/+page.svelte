<script lang="ts">
  import SvelteSEOMetaTags from 'svelte-seo-meta-tags'

  import PostTags from '$elements/PostTags.svelte'

  import { SITE_METADATA } from '$config'
  import { BLOG_POST } from '$lib/schemas'

  export let data: {
    posts: unknown[]
  }

  $: blogPosts = data.posts.map(p => BLOG_POST.omit({ html: true }).parse(p))
</script>

<SvelteSEOMetaTags
  page={{
    ...SITE_METADATA,
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
      <time datetime={post.datePublished.toISO()} class="mr-4"
        >{post.datePublished.toLocaleString()}</time
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

<style lang="postcss">
  .space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }
</style>
