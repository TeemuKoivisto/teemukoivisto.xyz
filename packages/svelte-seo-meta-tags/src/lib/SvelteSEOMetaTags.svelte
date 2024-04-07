<script lang="ts">
  import WebPage from './WebPage.svelte'
  import type {
    WebPageProps,
    BreadcrumbList,
    OrganizationProps,
    BlogPostProps,
    FacebookProps,
    TwitterProps,
  } from './types'

  import {
    generateWebsite,
    generateBreadcrumbList,
    generateBlogPosting,
    generateOrganization,
  } from './SchemaOrg'

  export let type: 'page' | 'blog-post' = 'page',
    page: WebPageProps | BlogPostProps,
    breadcrumb: BreadcrumbList | undefined = undefined,
    organization: OrganizationProps | undefined = undefined,
    facebook: FacebookProps | undefined = undefined,
    twitter: TwitterProps | undefined = undefined

  const jsonLd =
    type === 'blog-post'
      ? JSON.stringify(
          [
            generateWebsite(page),
            breadcrumb && generateBreadcrumbList(breadcrumb),
            generateBlogPosting(page),
            organization && generateOrganization(organization),
          ].filter(obj => obj !== undefined && obj !== null)
        )
      : ''
</script>

<svelte:head>
  <WebPage {page} />
  {#if type === 'page'}
    <meta property="og:type" content="website" />
  {:else if type === 'blog-post'}
    <meta property="og:type" content="article" />
    {#if page.datePublished}
      <meta property="article:published_time" content={page.datePublished} />
    {/if}
    {#if page.dateModified}
      <meta property="article:modified_time" content={page.dateModified} />
    {/if}
    {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {/if}
  {#if facebook}
    {#if page?.url}
      <meta property="og:url" content={page.url} /> <!-- Important -->
    {/if}
    <meta property="og:locale" content={facebook.language} />
    <meta property="og:title" content={facebook.title} />
    <!-- Important -->
    {#if facebook.description}
      <meta property="og:description" content={facebook.description} /> <!-- Somewhat Important -->
    {/if}
    {#if facebook.image}
      <!-- Facebook recommends 1200x630 size, ratio of 1.91:1 but 1200x1200 is also fine -->
      <meta property="og:image" content={facebook.image.url} />
      <!-- Important -->
      {#if facebook.image.alt}
        <meta property="og:image:alt" content={facebook.image.alt} />
      {/if}
      {#if facebook.image.width}
        <meta property="og:image:width" content={facebook.image.width.toString()} />
      {/if}
      {#if facebook.image.height}
        <meta property="og:image:heigth" content={facebook.image.height.toString()} />
      {/if}
    {/if}
    {#if facebook.video}
      <meta property="og:video" content={facebook.video} />
    {/if}
    {#if facebook.audio}
      <meta property="og:audio" content={facebook.audio} />
    {/if}
    {#if page?.site?.siteName}
      <meta property="og:site_name" content={page.site.siteName} /> <!-- Cant hurt? -->
    {/if}
    {#if facebook.facebookAppId}
      <meta property="fb:app_id" content={facebook.facebookAppId} />
    {/if}
  {/if}
  {#if twitter}
    <meta name="twitter:card" content={twitter.cardType || 'summary_large_image'} />
    {#if twitter.twitterUser}
      <meta name="twitter:creator" content={twitter.twitterUser} />
    {/if}
    {#if twitter.twitterSite}
      <meta name="twitter:site" content={twitter.twitterSite} />
    {/if}
    {#if twitter.title}
      <meta name="twitter:title" content={twitter.title} />
    {/if}
    {#if twitter.description}
      <meta name="twitter:description" content={twitter.description} />
    {/if}
    {#if twitter.image}
      <meta property="twitter:image" content={twitter.image.url} />
      <!-- Important -->
      {#if twitter.image.alt}
        <meta property="twitter:image:alt" content={twitter.image.alt} />
      {/if}
      {#if twitter.image.width}
        <meta property="twitter:image:width" content={twitter.image.width.toString()} />
      {/if}
      {#if twitter.image.height}
        <meta property="twitter:image:heigth" content={twitter.image.height.toString()} />
      {/if}
    {/if}
    {#if twitter.imageAlt}
      <meta name="twitter:image:alt" content={twitter.imageAlt} />
    {/if}
  {/if}
</svelte:head>
