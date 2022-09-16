<script lang="ts">
  import { onMount } from 'svelte'
  import BlogHeader from '$components/blog/BlogHeader.svelte'

  import type { BlogPost } from '$lib/render'

  export let data: any

  const post = data.post as BlogPost

  onMount(() => {
    console.log(data.post)
  })
</script>

<section
  class="my-12 p-4 pt-0 xs:p-8 xs:pt-0 md:my-24 md:p-16 md:pt-0 xl:p-24 max-w-xl md:max-w-3xl xl:max-w-4xl bg-white mx-auto rounded-3xl"
>
  <article class="mb-8">
    <BlogHeader {post} />
    <!-- class="mx-auto blog-header"  -->
    <hr class="my-10 border-gray-300" />
    <div class="xl:text-xl blog-html">
      {@html post.html}
    </div>
    <div class="py-8 my-12 flex items-center border-t border-b border-gray-300">
      <figure class="mr-8">
        <img
          class="rounded-full"
          src="/img/avatar-200.jpeg"
          alt="Picture of my beautiful face"
          width="200"
          height="200"
        />
      </figure>
      <p>
        Hi, I'm <strong class="font-bold">Teemu Koivisto</strong>. A software developer from
        Helsinki. When I'm not doing the boring stuff, I like practising music, lifting weights and
        getting high on heroin. One of those was a lie.
      </p>
    </div>
    <div class="w-full flex flex-wrap-reverse items-center">
      {#if post.prevPost}
        <div>
          <a href="/blog/{post.prevPost.slug}" class="flex items-center mb-12 hover:underline">
            <img data-type="svg" src="/svg/chevron-left.svg" />
            <div class="ml-6">
              <p class="font-bold">{post.prevPost.title}</p>
              <p>{post.prevPost.datePublished}</p>
            </div>
          </a>
        </div>
      {/if}
      {#if post.nextPost}
        <div class="ml-auto">
          <a href="/blog/{post.nextPost.slug}" class="flex items-center mb-12 hover:underline">
            <div class="mr-6">
              <p class="font-bold">{post.nextPost.title}</p>
              <p>{post.nextPost.datePublished}</p>
            </div>
            <img data-type="svg" src="/svg/chevron-right.svg" />
          </a>
        </div>
      {/if}
    </div>
    <!-- <ShareButtons url={url} title={title}/> -->
  </article>
</section>

<style lang="scss" global>
  body {
    scroll-behavior: smooth;
  }

  .table-of-contents {
    box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
    background: #f4f9ff;
    border-radius: 6px;
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

  time {
    background: rgb(96, 124, 255);
  }

  .blog-html {
    color: hsla(0, 0%, 0%, 0.9);
  }

  .blog-html figcaption {
    color: rgba(0, 0, 0, 0.7);
    font-family: Rubik, sans-serif;
    padding-top: 6px;
    text-align: center;
  }

  .blog-html a {
    color: #0d0dff;
    font-weight: 600;
  }

  .blog-html hr {
    border-color: hsla(0, 0%, 0%, 0.2);
    border-top-width: 1px;
    margin-top: 3em;
    margin-bottom: 3em;
  }

  .blog-html p {
    margin: 1.0125rem 0;
    line-height: 1.625;
  }

  .blog-html > h1 {
    margin-top: 2.225rem;
    margin-bottom: 0.975rem;
    font-size: 2.63902rem;
    line-height: 3.25rem;
    letter-spacing: -1px;
  }

  .blog-html > h2 {
    margin-top: 2.225rem;
    margin-bottom: 0.975rem;
    font-size: 1.51572rem;
    line-height: 1.1;
  }

  .blog-html > h3 {
    margin-top: 1.825rem;
    margin-bottom: 0.975rem;
    font-size: 1.31951rem;
    line-height: 1.1;
  }

  .blog-html > h4 {
    margin-top: 1.625rem;
    margin-bottom: 0.975rem;
    font-size: 1rem;
    line-height: 1.1;
  }

  .blog-html > h5 {
    margin-top: 1.625rem;
    margin-bottom: 0.975rem;
    font-size: 0.87055rem;
    line-height: 1.1;
  }

  .blog-html > h6 {
    margin-top: 1.625rem;
    margin-bottom: 0.975rem;
    font-size: 0.81225rem;
    line-height: 1.1;
    font-style: italic;
  }
</style>
