<script lang="ts">
  import SvelteSEOMetaTags from '../lib'

  const siteData = {
    url: 'https://google.com/about',
    title: 'This is a 70 character long title with a lot of padding to make it so!',
    datePublished: '2019-10-06T13:56:03.123Z',
    description:
      "This is a 200 character long description of this web page which is quite interesting and which describes its contents well with a lot of relevant keywords and isn't just general marketing mumbo-jumbo.",
    language: 'en-US',
    image: 'http://website.com/image.png',
    author: {
      email: 'person@gmail.com',
      name: 'John Smith',
      image: 'http://john.me/my-face.jpg',
    },
    site: {
      siteName: 'IMDb',
      searchUrl: 'https://www.google.com/search?q=',
    },
  }
</script>

<SvelteSEOMetaTags website={siteData} />
<div>
  <main>
    <h1>svelte-seo-meta-tags</h1>
  </main>
</div>
