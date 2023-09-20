<script lang="ts">
  import SvelteSEOMetaTags, { type BlogPostProps } from 'svelte-seo-meta-tags'
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import chevronLeft from '@iconify-icons/mdi/chevron-double-left.js'
  import chevronRight from '@iconify-icons/mdi/chevron-double-right.js'

  import BlogHeader from '$elements/BlogHeader.svelte'
  import Comments from '$components/Comments.svelte'

  import type { PageData } from './+page.server'

  export let data: PageData

  const post = data.post

  const seoPost: BlogPostProps = {
    ...post,
    image: post.coverImage?.src,
    imageAlt: post.coverImage?.alt,
  }
</script>

<SvelteSEOMetaTags type="blog-post" page={seoPost} />
<article class="md:px-8 rounded-3xl dark:bg-dark-article bg-white">
  <BlogHeader {post} />
  <hr class="mx-4 my-16 border-gray-900 dark:border-gray-300" />
  <div class="ml-6 mr-4 mb-16 xl:text-lg blog-html dark:text-white">
    {@html post.html}
  </div>
  <h2 class="ml-6 mr-4 font-sans mt-12 mb-8 text-3xl tracking-tight">Comments</h2>
  <Comments class="ml-6 mr-4" comments={data.comments} slug={data.slug} />
  <hr class="mx-2 border-gray-900 dark:border-gray-300" />
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
  <hr class="mx-2 border-gray-900 dark:border-gray-300" />
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
</article>

<style lang="scss" global>
  @media (prefers-color-scheme: dark) {
    .table-of-contents {
      // background: #222 !important;
    }
  }

  .table-of-contents {
    background: #111;
    border: 0.75em solid;
    border-radius: 6px;
    border-style: inset;
    @apply p-8 my-8;

    h2 {
      font-size: 1.51572rem;
      margin-bottom: 1rem;
      @apply text-white;
    }

    ol {
      counter-reset: list-item;
      margin-top: 0.25rem;
      @apply text-white;
    }

    li {
      display: block;
      counter-increment: list-item;
      a {
        @apply text-[#fcfe00];
      }
    }

    li + li {
      margin-top: 0.25rem;
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
      @apply underline text-[#0000ff] break-all;
    }
    hr {
      @apply my-16 border-gray-900;
    }
    p {
      padding-left: 6px;
      @apply my-6;
    }
    & > h1 {
      @apply font-sans mt-16 mb-12 text-5xl tracking-tight;
    }
    & > h2 {
      padding-left: 2px;
      @apply font-sans mt-12 mb-8 text-3xl tracking-tight;
    }
    & > h3 {
      padding-left: 3px;
      @apply font-sans mt-12 mb-8 text-xl tracking-tight;
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

  html.dark {
    .blog-html {
      hr {
        @apply border-gray-300;
      }
      a {
        @apply text-[#fcfe00];
      }
    }
  }

  .language-text {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    border-radius: 6px;
    @apply bg-blue-200 dark:bg-gray-400;
  }
  html.dark {
    .language-text {
      @apply bg-[#3c434d];
    }
  }
</style>
