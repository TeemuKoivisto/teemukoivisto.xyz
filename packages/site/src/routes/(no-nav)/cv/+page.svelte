<script lang="ts">
  import { CV_EMAIL, CV_PHONE } from '$config'
</script>

<div class="page px-4">
  <div class="flex py-2 border-b-2 justify-between">
    <a href="https://teemukoivisto.xyz">https://teemukoivisto.xyz</a>
    <div>
      <span class="font-bold"> {CV_PHONE} </span>
      <a href={`mailto:${CV_EMAIL}`} aria-label="Send an email">
        {CV_EMAIL}
      </a>
    </div>
  </div>
  <div class="mt-6">
    <header>
      <figure class="avatar flex items-center justify-center">
        <img
          class="rounded-full"
          src="/img/avatar-200.avif"
          alt="My beautiful face"
          width="150"
          height="150"
        />
      </figure>
      <div class="ml-1 flex flex-col">
        <h1 class="text-5xl font-sans tracking-tight">Teemu Koivisto — CV</h1>
        <div class="my-2 ml-1 flex">
          <a
            class="flex mr-2 cursor-pointer"
            href="https://github.com/teemukoivisto"
            aria-label="My Github profile"
          >
            <img src="/svg/github.svg" alt="GitHub" width="24" height="24" />
          </a>
          <a
            class="flex mr-2 cursor-pointer"
            href="https://www.linkedin.com/in/teemu-koivisto-75304b114"
            aria-label="My Linkedin profile"
          >
            <img src="/svg/linkedin.svg" alt="LinkedIn" width="24" height="24" />
          </a>
        </div>
        <blockquote class="ml-1 italic">
          Data scientist by degree but craftsman by blood. I rather full-ass than half-ass but also
          know when good is not only good but good enough. Enjoys all parts of the stack from
          writing infra to frontend widgets although rich-text is where I really shine. Loves good
          team effort, dislikes ego-driven programming (or anything). Always seeking new interesting
          challenges.
        </blockquote>
      </div>
    </header>
    <fieldset class="flex flex-col rounded border-2 px-4 py-2 pb-4 my-4 text-sm">
      <legend class="text-base px-1"> Skills </legend>
      <ul>
        <li>
          <span>Finnish — <span class="font-bold">Native</span></span>
          <span class="ml-2">English — <span class="font-bold">Fluent</span></span>
        </li>
        <li><h3 class="text-xl font-sans">Expert</h3></li>
        <li>
          <p class="ml-1">TS/JS, NodeJS, ProseMirror, Svelte, React, HTML/CSS, Tailwind</p>
        </li>
        <li><h3 class="text-xl font-sans">Proficient</h3></li>
        <li>
          <p class="ml-1">
            AWS, Terraform, Ansible, Cloudflare, Vue, SQL, Python, data engineering, Jupyter, Rust*
          </p>
          <small class="ml-1">[*] Probably still within Dunning-Kruger effect</small>
        </li>
      </ul>
    </fieldset>
    <fieldset class="flex flex-col rounded border-2 px-4 py-2 pb-4 my-4 text-sm">
      <legend class="text-base px-1"> Experience </legend>
      <ul>
        <li>
          <h3 class="text-xl font-sans flex">
            <span class="year"> 2023 </span>
            <span> Focal Oy </span>
          </h3>
          <p>Things</p>
        </li>
        <li>
          <h3 class="text-xl font-sans flex">
            <span class="year">2022</span>
            <span>Skiff Inc</span>
          </h3>
          <p>Things</p>
        </li>
        <li>
          <h3 class="text-xl font-sans flex">
            <span class="year">2020 - 2022</span>
            <span>Atypon Ltd</span>
          </h3>
          <p>Things</p>
        </li>
        <li>
          <h3 class="text-xl font-sans flex">
            <span class="year">2020</span>
            <span>Aalto University</span>
          </h3>
          <p>Things</p>
        </li>
        <li>
          <h3 class="text-xl font-sans flex">
            <span class="year">2017 - 2020</span>
            <span>Webscale Oy</span>
          </h3>
          <p>Things</p>
        </li>
      </ul>
    </fieldset>
    <fieldset class="flex flex-col rounded border-2 px-4 py-2 pb-4 my-4 text-sm">
      <legend class="text-base px-1"> Academia </legend>
      <ul>
        <li>
          <h3 class="text-base font-sans">
            Evaluating CodeClusters for Effectively Providing Feedback on Code Submissions 2022
          </h3>
          <p class="ml-1">
            Paper based on my thesis project that was published in IEEE Frontiers in Education
            Conference.
            <a href="https://ieeexplore.ieee.org/document/9962751">
              https://ieeexplore.ieee.org/document/9962751
            </a>
          </p>
        </li>
        <li>
          <h3 class="text-xl font-sans">MSc. of Data Science, University of Helsinki 2018-2021</h3>
          <p class="ml-1">
            Learned a sufficient amount to know the limits of my knowledge about DS.
            <a href="https://helda.helsinki.fi/handle/10138/325709"
              >https://helda.helsinki.fi/handle/10138/325709</a
            >
          </p>
        </li>
        <li>
          <h3 class="text-xl font-sans">
            BSc. of Computer Science, University of Helsinki 2014-2018
          </h3>
          <p class="ml-1">
            Minor in statistics. I wrote my thesis about containers and container management
            systems.
            <a href="https://github.com/teemukoivisto/kandi"
              >https://github.com/teemukoivisto/kandi</a
            >
          </p>
        </li>
      </ul>
    </fieldset>
    <fieldset class="flex flex-col rounded border-2 px-4 py-2 pb-4 my-4 text-sm">
      <legend class="text-base px-1"> Projects </legend>
      <ul>
        <li>
          <h3 class="text-xl font-sans">prosemirror-dev-toolkit</h3>
          <p>
            Google Chrome extension and npm library I authored to help me and everyone else who
            works with ProseMirror. <a
              href="https://github.com/TeemuKoivisto/prosemirror-dev-toolkit"
              >https://github.com/TeemuKoivisto/prosemirror-dev-toolkit</a
            >
          </p>
        </li>
        <li>
          <h3 class="text-xl font-sans">teemukoivisto.xyz</h3>
          <p>
            My blog I made with SvelteKit, Tailwind and Cloudflare <a
              href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
            >
              https://github.com/TeemuKoivisto/teemukoivisto.xyz
            </a>
          </p>
        </li>
        <li>
          <h3 class="text-xl font-sans">(untitled)</h3>
          <p>
            I've worked on this Rust synchronization server for one of my other projects but since
            it's still WIP with rather hacky code, I've felt it's not ready to be published.
          </p>
        </li>
      </ul>
    </fieldset>
    <fieldset class="flex flex-col rounded border-2 px-4 py-2 pb-4 my-4 text-sm">
      <legend class="text-base px-1"> Hobbies </legend>
      <ul>
        <li>
          <p>Gym, music, books, writing and programming</p>
        </li>
      </ul>
    </fieldset>
  </div>
</div>

<style lang="scss">
  @page {
    size: A4;
  }
  .page {
    height: 29.7cm; // A4 is 210 x 297 mm
    width: 21cm;

    @apply font-mono text-sm;
  }
  header {
    display: grid;
    gap: 0.25rem;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    &.avatar {
      grid-row-end: span 2;
    }
  }
  li + li {
    @apply mt-2;
  }
  .year {
    @apply block w-32;
    // &::after {
    //   content: '—';
    //   @apply mx-2;
    // }
  }
  a:not(a[class='anchor']) {
    @apply break-all;
    &:hover {
      @apply underline;
    }
  }
</style>
