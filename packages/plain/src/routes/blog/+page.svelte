<script lang="ts">
  import PostTags from '$elements/PostTags.svelte'

  export let data: any

  $: blogPosts = data.posts
</script>

<h1
  class="pl-2 font-sans my-8 text-4xl tracking-tight xs:text-5xl xs:mb-8 xs:mt-14 md:mt-20 md:mb-16 md:text-7xl md:tracking-tighter"
  id="h1"
>
  My blog posts
</h1>

<ul class="pl-6 space-y-4 min-h-[55vh]">
  {#each blogPosts as post}
    <li>
      <a href="/blog/{post.slug}" class="flex hover:underline">
        <time datetime={post.datePublished} class="mr-4">{post.datePublished}</time>
        <div>{post.title}</div>
      </a>
      <PostTags tags={post.tags} />
    </li>
  {/each}
</ul>

<style lang="scss">
  .space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }
</style>
