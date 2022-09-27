<script lang="ts">
  import Website from './Website.svelte'
  import BlogPost from './BlogPost.svelte'
  import type {
    WebsiteProps,
    BreadcrumbList,
    OrganizationProps,
    BlogPostProps,
    FacebookProps,
    TwitterProps,
  } from './types'

  export let website: WebsiteProps | undefined = undefined,
    breadcrumb: BreadcrumbList | undefined = undefined,
    organization: OrganizationProps | undefined = undefined,
    blogPost: BlogPostProps | undefined = undefined,
    facebook: FacebookProps | undefined = undefined,
    twitter: TwitterProps | undefined = undefined
</script>

<svelte:head>
  {#if blogPost}
    <BlogPost {blogPost} {breadcrumb} {organization} />
  {:else if website}
    <Website {website} />
  {/if}
  {#if facebook}
    {#if website?.url}
      <meta property="og:url" content={website.url} /> <!-- Important -->
    {/if}
    <meta property="og:locale" content={facebook.language} />
    <meta property="og:title" content={facebook.title} />
    <!-- Important -->
    {#if facebook.description}
      <meta property="og:description" content={facebook.description} /> <!-- Somewhat Important -->
    {/if}
    {#if facebook.image}
      <!-- Facebook recommends 1200x630 size, ratio of 1.91:1 but 1200x1200 is also fine -->
      <meta property="og:image" content={facebook.image} />
      <!-- Important -->
    {/if}
    {#if facebook.imageAlt}
      <meta property="og:image:alt" content={facebook.imageAlt} />
    {/if}
    {#if facebook.video}
      <meta property="og:video" content={facebook.video} />
    {/if}
    {#if facebook.audio}
      <meta property="og:audio" content={facebook.audio} />
    {/if}
    {#if website?.site?.siteName}
      <meta property="og:site_name" content={website.site.siteName} /> <!-- Cant hurt? -->
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
      <meta name="twitter:image" content={twitter.image} />
    {/if}
    {#if twitter.imageAlt}
      <meta name="twitter:image:alt" content={twitter.imageAlt} />
    {/if}
  {/if}
</svelte:head>
