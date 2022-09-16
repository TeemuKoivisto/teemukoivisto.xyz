<script lang="ts">
  import { onMount } from "svelte";

  export let data: any

  $: blogPosts = data.posts

</script>

<section
  class="my-12 p-4 pt-0 xs:p-8 xs:pt-0 md:my-24 md:p-16 md:pt-0 xl:p-24 max-w-xl md:max-w-3xl xl:max-w-4xl bg-white mx-auto rounded-3xl"
>
  <article class="mb-8 inline-block">
    <h1
      class="my-8 text-4xl tracking-tight xs:text-5xl xs:mb-8 xs:mt-14 md:mt-16 md:mb-12 xl:mb-24 xl:mt-10 md:text-7xl md:tracking-tighter"
    >
      My blog posts
    </h1>
    <ul class="space-y-4">
      {#each blogPosts as post}
        <li>
          <a href="/blog/{post.slug}" class="flex hover:underline">
            <time datetime={post.datePublished} class="mr-4">{post.datePublished}</time>
            <div>{post.title}</div>
          </a>
          <!-- <post-tags data-post-tags="{post.tags}"></post-tags> -->
        </li>
      {/each}
    </ul>
  </article>
</section>