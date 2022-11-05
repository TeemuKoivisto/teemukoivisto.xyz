<script lang="ts">
  import {
    generateWebsite,
    generateBreadcrumbList,
    generateBlogPosting,
    generateOrganization,
  } from './SchemaOrg'

  import type { BreadcrumbList, OrganizationProps, BlogPostProps } from './types'

  export let blogPost: BlogPostProps,
    breadcrumb: BreadcrumbList | undefined,
    organization: OrganizationProps | undefined

  const jsonLd = JSON.stringify(
    [
      generateWebsite(blogPost),
      breadcrumb && generateBreadcrumbList(breadcrumb),
      generateBlogPosting(blogPost),
      organization && generateOrganization(organization),
    ].filter(obj => obj !== undefined && obj !== null)
  )
</script>

<svelte:head>
  <title>{blogPost.title}</title>
  {#if blogPost.description}
    <meta name="description" content={blogPost.description} />
  {/if}
  {#if blogPost.image}
    <meta name="image" content={blogPost.image} />
  {/if}
  <meta property="og:type" content="article" />
  {#if blogPost.datePublished}
    <meta property="article:published_time" content={blogPost.datePublished} />
  {/if}
  {#if blogPost.dateModified}
    <meta property="article:modified_time" content={blogPost.dateModified} />
  {/if}
  {@html `<script type="application/ld+json">${jsonLd}����'�r��z{</script>`}
</svelte:head>
j
