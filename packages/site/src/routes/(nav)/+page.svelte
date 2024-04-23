<script lang="ts">
  import SvelteSEOMetaTags from 'svelte-seo-meta-tags'
  import { SITE_METADATA } from '$config'

  import type { BlogPost } from '$lib/render'

  import '../../blog.scss'

  export let data: {
    posts: BlogPost[]
  }

  $: blogPosts = data.posts
</script>

<SvelteSEOMetaTags page={SITE_METADATA} />

<hr />

<h1
  class="md:pl-2 ml-1 mr-0 mb-16 md:mb-16 mt-16 md:mt-20 text-5xl md:text-7xl font-sans text-white tracking-tight"
>
  Hi there stranger!
</h1>

<article class="md:pl-6 mb-24 min-h-[55vh] md:text-lg blog-html">
  <div class="flex my-24">
    <!-- svelte-ignore a11y-distracting-elements -->
    <marquee class="w-2/3"><i>Stay a while, and listen 👴🏻...</i></marquee>
  </div>

  <h2>Epilogue</h2>
  <blockquote>
    <p>
      Once upon a time, the universe was born and stars exploded generating trillions of heavy metal
      atoms that somehow ended up on a planet named Earth. These metals then, along with complex
      carbon molecules, ended up composing a biological being - human - the most advanced creature
      to ever walk on the planet. That, after thousands of years of harrowing struggle, ended up
      sitting in a weird, sloped position behind a computer screen writing long days inanimate
      abstract hieroglyphs named programming code. That produced this delirious website filled with
      mundane knowledge.
    </p>
  </blockquote>

  <!-- <p>
    Once upon a time, the universe was born filled with trillions and trillions of stars. These
    stars exploded, generating all the heavier metals of the universe of which a miniscule portion
    ended up on a planet named Earth. In the primordial goo the metals combined with complex carbon
    molecules, reacting in the most miraculous way creating <strong>life</strong>.
  </p>

  <p>
    After billions of years, another miracle happened. Through evolution <strong>humans</strong> came
    to existence - the most advanced species ever to walk the planet. And after thousands of years of
    survival and hardship it ended up sitting in a weird, sloped position behind a computer screen. Writing
    long hours of inanimate abstract hieroglyphs named programming code, producing this delirious website
    filled with mundane knowledge.
  </p> -->

  <figure class="flex flex-col items-center">
    <img
      src="img/god-creating-the-world-james-tissot.avif"
      alt="God creating the universe"
      width="900"
      height="607"
    />
    <figcaption class="flex flex-col items-center">
      <div>How it all starts</div>
      <div class="text-xs mt-2">God Creating the World (James Tissot)</div>
    </figcaption>
  </figure>

  <hr class="my-16 border-gray-300" />

  <p>
    Had I been born a couple hundred years prior, instead you could be facing a rambling maniac in a
    tavern shouting over other drunken noise about how to seed your fields with less manure. So you
    win some, lose some.
  </p>

  <p>
    Anyway uhh. About my blog then. Well. I guess it's the age-old tradition of programmers to one
    day cultivate their own virtual plot of land. As a mere snot-nosed child, I recall the quirky
    buzzing of the modem as it pulled haggardly, 56 kilobytes per second, the strands of World Wide
    Web. Oh those wondrous days of yonder! The weird pages with blinking texts and marquees, full of
    crazy and bizarre things that filled your mind with wonder and perplexion.
  </p>
  <p>
    Sure, 90s web wasn't known for its aestheticness nor intuitiveness <strong>but</strong> there was
    something real and honest about it. Nowadays, the most important thing of a home page is to boost
    your job prospects and give your name stupid SEO visibility. But I beseech you, what's the point?
    Does it really enhance your life to be the second page result in tutorials how to setup a React app
    with TypeScript?
  </p>

  <figure class="flex flex-col items-center">
    <img
      src="img/old-man-yells-at-cloud.avif"
      alt="Old man yelling at a cloud"
      width="680"
      height="383"
    />
    <figcaption class="flex flex-col items-center">
      <div>How it eventually ends up being</div>
      <div class="text-xs mt-2">Simpsons (Episode 13 Season 13)</div>
    </figcaption>
  </figure>

  <h2>Moving on</h2>

  <p>
    Okay, okay — I'll get off the soabox. A lapse of insanity. Tends to happen when creating a blog.
    A fun fact, this is the third iteration of this site. Third. "What, why?" — you ask. And I
    whisper in your ear: "Because I can".
  </p>

  <p>
    You can read it all about it here <a
      href="/blog/hello-world-writing-blog-with-gatsby-nextjs-sveltekit">Hello World</a
    >
    but the gist of it is, sometimes it's just fun to build things. And that over-abstraction sucks as
    well as cumbersome tools such as Google Analytics or AWS Edge Lambdas. And I like Svelte. So much
    that this site is in written Svelte - you can take a peek here
    <a href="https://github.com/TeemuKoivisto/teemukoivisto.xyz">GitHub</a>.
  </p>

  <p>So.</p>

  <p>Ahem.. 🤔</p>

  <p>What I was going to write here in the first place?</p>

  <h2>Summary</h2>

  <p>
    I do programming; mostly TS/NodeJS with Svelte, Tailwind, React and so on. But I also dabble in
    Rust not because I am systems programmer but because I just needed to learn it. And I've come to
    like parts of it. Just not ready to do life-times yet (if ever). And been learning Godot as
    well.
  </p>

  <p>
    Oh and rich-text editing has been a major focus of mine for some time. First with Draft.js, then
    Slate and lastly with ProseMirror. One particular interest of mine has been to combine Svelte
    with ProseMirror views <a href="https://github.com/TeemuKoivisto/svelte-prosemirror"
      >svelte-prosemirror</a
    >. Works but not enough time to commit to it.
  </p>

  <p>
    And then there's collaboration systems, mainly Yjs, due to the needs of rich-text editing. And
    AWS, Cloudflare, Terraform and so on. And oh yeah, I've completed a master's degree in data
    science, here's
    <a href="https://github.com/TeemuKoivisto/msc-thesis">my thesis</a>. The biggest thing I learnt
    from those years was that I like programming more than data science 😅.
  </p>

  <p>
    Outside of this boring tech stuff I like expanding my vistas with art mostly. Music and books —
    I picked up audiobooks during Covid. Once you learn how to get into them (and have good books) I
    highly recommend them for gym or running sessions. Board games are also close to my heart.
  </p>

  <div class="recent-posts">
    <h3>Posts</h3>
    <ul>
      {#each blogPosts as post}
        <li><a href="/blog/{post.slug}">{post.title}</a></li>
      {/each}
    </ul>
  </div>
</article>

<hr />

<style lang="scss">
  article {
    @apply text-white;
  }
  p {
    @apply pl-1 my-8;
  }
  a {
    font-weight: 600;
    color: #fcfe00;
    @apply underline;
  }
  h2 {
    @apply font-sans mt-16 mb-8 text-4xl tracking-tight;
  }
  .recent-posts {
    background: #111;
    border: 0.75em solid;
    border-radius: 6px;
    border-style: inset;
    @apply my-16 p-8;
    h3 {
      @apply text-white mb-6 font-mono text-2xl tracking-tight;
    }
    li {
      @apply pl-1;
    }
    li + li {
      @apply my-2;
    }
  }
</style>
