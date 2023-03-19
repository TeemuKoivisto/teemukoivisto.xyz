<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import chevronLeft from '@iconify-icons/mdi/chevron-double-left.js'
  import chevronRight from '@iconify-icons/mdi/chevron-double-right.js'

  import BlogHeader from '$elements/BlogHeader.svelte'

  import type { BlogPost } from '$lib/render'

  export let data: any

  const post = data.post as BlogPost

  onMount(() => {
    console.log(data)
  })
</script>

<article class="px-8 rounded-3xl dark:bg-black">
  <BlogHeader {post} />
  <hr class="my-16 border-gray-300" />
  <div class="mx-8 mb-16 xl:text-xl blog-html dark:text-white">
    {@html post.html}
  </div>
  <hr />
  <div class="py-8 mx-8 flex items-center">
    <figure class="mr-8">
      <img
        class="rounded-full"
        src="/img/avatar-200.jpeg"
        alt="My beautiful face"
        width="200"
        height="200"
      />
    </figure>
    <p>
      Hi, I'm <strong class="font-bold">Teemu Koivisto</strong>. A software developer from Helsinki.
      When I'm not doing the boring stuff, I like practising music, lifting weights and getting high
      on heroin. One of those was a lie.
    </p>
  </div>
  <hr />
  <div class="pt-12 px-6 w-full flex flex-wrap-reverse items-center">
    {#if post.prevPost}
      <div>
        <a
          data-sveltekit-reload
          href="/blog/{post.prevPost.slug}"
          class="flex items-center mb-12 hover:underline"
        >
          <Icon icon={chevronLeft} width={24} />
          <div class="ml-6">
            <p class="font-bold">{post.prevPost.title}</p>
            <p>{post.prevPost.datePublished}</p>
          </div>
        </a>
      </div>
    {/if}
    {#if post.nextPost}
      <div class="ml-auto">
        <a
          data-sveltekit-reload
          href="/blog/{post.nextPost.slug}"
          class="flex items-center mb-12 hover:underline"
        >
          <div class="mr-6">
            <p class="font-bold">{post.nextPost.title}</p>
            <p>{post.nextPost.datePublished}</p>
          </div>
          <Icon icon={chevronRight} width={24} />
        </a>
      </div>
    {/if}
  </div>
  <!-- <ShareButtons url={url} title={title}/> -->
</article>

<style lang="scss" global>
  @media (prefers-color-scheme: dark) {
    .table-of-contents {
      // background: #222 !important;
    }
  }

  .table-of-contents {
    background: #111;
    border-color: brown;
    border: 0.75em solid;
    border-radius: 6px;
    border-style: inset;
    @apply p-8 my-8;

    h2 {
      font-size: 1.51572rem;
      margin-bottom: 1rem;
    }

    ol {
      counter-reset: list-item;
    }

    li {
      display: block;
      counter-increment: list-item;
    }

    li + li {
      margin-top: 0.5rem;
    }

    li:before {
      content: counters(list-item, '.') ' ';
      margin-right: 0.75rem;
    }
  }

  .blog-html {
    figcaption {
      @apply font-sans pt-4 text-center;
    }
    a {
      font-weight: 600;
      @apply text-red-600 underline;
    }
    hr {
      border-color: hsla(0, 0%, 0%, 0.2);
      border-top-width: 1px;
      margin-top: 3em;
      margin-bottom: 3em;
    }
    p {
      margin: 1.0125rem 0;
      line-height: 1.625;
    }
    & > h1 {
      margin-top: 2.225rem;
      margin-bottom: 0.975rem;
      font-size: 2.63902rem;
      line-height: 3.25rem;
      letter-spacing: -1px;
    }
    & > h2 {
      margin-top: 2.225rem;
      margin-bottom: 0.975rem;
      font-size: 1.51572rem;
      line-height: 1.1;
    }
    & > h3 {
      margin-top: 1.825rem;
      margin-bottom: 0.975rem;
      font-size: 1.31951rem;
      line-height: 1.1;
    }
    & > h4 {
      margin-top: 1.625rem;
      margin-bottom: 0.975rem;
      font-size: 1rem;
      line-height: 1.1;
    }
    & > h5 {
      margin-top: 1.625rem;
      margin-bottom: 0.975rem;
      font-size: 0.87055rem;
      line-height: 1.1;
    }
    & > h6 {
      margin-top: 1.625rem;
      margin-bottom: 0.975rem;
      font-size: 0.81225rem;
      line-height: 1.1;
      font-style: italic;
    }
  }
</style>
