<script lang="ts">
</script>

<hr />

<h1
  class="pl-2 font-sans my-8 text-4xl tracking-tight xs:text-5xl xs:mb-8 xs:mt-14 md:mt-20 md:mb-16 md:text-7xl md:tracking-tighter"
>
  Hi there stranger!
</h1>

<section class="pl-6 mb-24 min-h-[55vh]">
  <div class="flex my-24">
    <!-- svelte-ignore a11y-distracting-elements -->
    <marquee class="w-2/3"><i>Stay a while, and listen 👴🏻...</i></marquee>
  </div>

  <h3 class="mt-12 mb-8 font-sans text-2xl">Epilogue</h3>

  <p>
    Once upon a time, the universe was born filled with trillions and trillions of stars. These
    stars exploded, generating all the heavier metals of the universe of which a miniscule portion
    ended up on a planet named Earth. In the primordial goo the metals combined with complex carbon
    molecules reacting in the most miraculous way to create <u>life</u>.
  </p>

  <p>
    After billions of years, by another miracle, this progress created humans - the most advanced
    creature ever to walk the planet. That ended up sitting in a weird, sloped position behind a
    computer screen writing long hours of inanimate abstract hieroglyphs named programming code,
    producing this delirious website filled with mundane knowledge.
  </p>

  <figure class="flex flex-col items-center">
    <img src="img/god-creating-the-world-james-tissot.jpeg" alt="God creating the universe" />
    <figcaption class="mt-4 flex flex-col items-center">
      How it all starts<br /><small>God Creating the World (James Tissot)</small>
    </figcaption>
  </figure>

  <p>
    Had I been born couple hundreds years prior, instead of this website you could be seeing a a
    rambling maniac in a tavern. Shouting over the other drunken noise about how to seed your fields
    with less manure. So you win some, lose some.
  </p>

  <p>
    Anyway uhh. About my blog then. Well. I guess it's the age-old tradition of programmers to one
    day cultivate their own virtual plot of land. As a mere snot-nosed child, I recall the quirky
    buzzing of modem haggardly pulling, 56 kilobytes at a time, the strands of the World Wide Web.
    Oh those wondrous days of yonder! The weird pages with blinking texts and marquees, full of
    crazy and bizarre things you at times wished had not seen.
  </p>
  <p>
    Sure, 90's web wasn't known for its aestheticness nor intuitiveness but there was something real
    and honest about it. Nowadays, the most important thing of a home page is to boost your job
    prospects and give your name stupid SEO visibility. But I beseech you, what's the point? Does it
    really enhance your life to be the second page result in tutorials how to setup a React app with
    TypeScript?
  </p>

  <figure class="flex flex-col items-center">
    <img src="img/old-man-yells-at-cloud.webp" alt="Old man yelling at a cloud" />
    <figcaption class="mt-4">How it eventually ends up being</figcaption>
  </figure>

  <h3 class="mt-12 mb-8 font-sans text-2xl">Moving on</h3>

  <p>
    Okay, help the old man off the soapbox. Bout of insanity, happens a lot when making your blog. A
    fun fact, this is the third iteration of this site. Third. "What, why?" - you ask. And I whisper
    in your ear: "Because I can".
  </p>

  <p>
    But long story short, I got a working version with Gatsby yet I disliked its bloated configs and
    the layers of abstraction. NextJS, while definitely cooler and faster, didn't just feel right
    for a blog with its corporate agenda. Why make a blog if it feels like a job assignment? Well,
    why take out the trash or wash yourself when you don't feel like it. Okay, my logic falls apart
    here - nevertheless I wasn't just happy with it.
  </p>

  <p>
    But Svelte and SvelteKit, oh boy. That's my <i>jam</i> right there 🤩! Pragmatic yet simple and devoid
    of overly ambitious abstractions that make you double-think everything. No over zealous linter or
    a crazy configuration file to debug. Just... simple. Makes it almost fun even.
  </p>

  <p>
    Well as a personal anecodote and a warning, I did go to the crazy end tried to use pure JS with
    WebComponents to encapsulate and reuse logic. Which ended up being a Vite plugin to render
    static HTML but, well... Let's just say that there is pain and then there is sticking your hand
    into a nest of bullet ants pain. Like Rich Harris explained in <a
      href="https://dev.to/richharris/why-i-don-t-use-web-components-2cia">a blog post</a
    >, the spec is sadly sorely lacking in ergonomics (web components are dynamic - goodbye static
    html, no templating etc.) and you don't really see much benefit on a site where you have full
    control anyway.
  </p>

  <p>Ahem.. 🤔</p>

  <p>So what I was going to write here in the first place?</p>

  <h3 class="mt-12 mb-8 font-sans text-2xl">In conclusion</h3>

  <p>
    Oh yeah; I like music, I like writing. I like going to gym while listening to Brothers of
    Karamazov and not understanding anything. Sometimes I code something worth publishing which you
    can find on GitHub, <a href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
      >like this blog for example!</a
    >
  </p>
</section>

<hr />

<style lang="scss">
  p {
    @apply my-8;
  }
  a {
    @apply underline;
  }
</style>
