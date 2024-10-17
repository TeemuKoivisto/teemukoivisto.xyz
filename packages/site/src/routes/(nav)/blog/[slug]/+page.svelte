<script lang="ts">
  import { onMount } from 'svelte'
  import { JsonLd, MetaTags } from 'svelte-meta-tags'
  // import SvelteSEOMetaTags from 'svelte-seo-meta-tags'
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import chevronLeft from '@iconify-icons/mdi/chevron-double-left'
  import chevronRight from '@iconify-icons/mdi/chevron-double-right'

  import BlogHeader from '$elements/BlogHeader.svelte'
  import Comments from '$components/Comments.svelte'

  import { commentActions, commentsMap } from '$stores/comments'
  import { SITE_METADATA } from '$config'

  import type { BlogPostProps, FacebookProps } from 'svelte-seo-meta-tags'
  import type { PageData } from './+page.server'

  import '../../../../blog.scss'

  export let data: PageData

  const post = data.post

  const seoPost = {
    ...post,
    image: post.coverImage?.url,
    imageAlt: post.coverImage?.alt,
  }
  const facebook = {
    description: post.description,
    image: post.coverImage,
    title: post.title,
  }

  onMount(() => {
    commentActions.list(data.slug)
  })
</script>

<MetaTags
  title={seoPost.title}
  description={seoPost.description}
  canonical={seoPost.url}
  keywords={seoPost.tags}
  openGraph={{
    type: 'article',
    url: seoPost.url,
    title: seoPost.title,
    description: seoPost.description,
    images: facebook.image ? [facebook.image] : [],
  }}
  twitter={{
    title: seoPost.title,
    description: seoPost.description,
  }}
/>
<JsonLd
  schema={[
    {
      '@type': 'WebPage',
      headline: seoPost.title,
      datePublished: seoPost.datePublished,
      dateModified: seoPost.dateModified,
      description: seoPost.description,
      keywords: seoPost.tags,
      url: seoPost.url,
      image: facebook.image?.url,
      author: {
        '@type': 'Person',
        name: SITE_METADATA.author.name,
      },
    },
    {
      '@type': 'BlogPosting',
      headline: seoPost.title,
      datePublished: seoPost.datePublished,
      dateModified: seoPost.dateModified,
      description: seoPost.description,
      keywords: seoPost.tags,
      image: facebook.image?.url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seoPost.url,
      },
    },
  ]}
/>
<!-- <SvelteSEOMetaTags type="blog-post" page={seoPost} {facebook} {twitter} /> -->

<hr />
<article class="rounded-3xl bg-transparent text-white">
  <BlogHeader {post} />
  <hr class="mx-4 my-16 border-white dark:border-gray-300" />
  <div class="ml-2 mr-4 mb-16 md:text-lg blog-html text-white dark:text-white">
    {@html post.html}
  </div>
  <h2 id="comments" class="font-sans mt-12 mb-8 text-3xl tracking-tight">Comments</h2>
  <Comments class="mb-12" comments={$commentsMap.get(data.slug) || []} slug={data.slug} />
  <div class="footer-bio p-8">
    <figure class="mr-8">
      <img
        class="rounded-full"
        src="/img/avatar-200.avif"
        alt="My beautiful face"
        width="200"
        height="200"
      />
    </figure>
    <p>
      Hi, I'm <strong class="font-bold">Teemu Koivisto</strong>. A software developer from Helsinki.
      When I'm not doing the boring stuff, I like practising music, lifting weights and listening to
      audiobooks.
    </p>
  </div>
  <div class="pt-12 px-6 w-full flex flex-wrap-reverse items-center">
    {#if post.prevPost}
      <div>
        <a
          data-sveltekit-reload
          href="/blog/{post.prevPost.slug}"
          class="flex items-center mb-12 pager-link hover:underline"
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
          class="flex items-center mb-12 pager-link hover:underline"
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

<hr />

<style lang="scss" global>
  .pager-link {
    @apply font-mono break-all;
  }
  .footer-bio {
    border: 0.75em solid;
    border-radius: 6px;
    border-style: outset;
    border-color: #5085e5; // #2f6eee
    display: grid;
    grid-template-columns: 7rem auto;
    grid-template-rows: auto;
    align-items: center;
  }
  html.dark {
    .footer-bio {
      border-color: #373737; // hsl(215 14% 77% / 1);
    }
  }
</style>
