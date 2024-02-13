<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import location from '@iconify-icons/mdi/location'

  import { CV_EMAIL, CV_PHONE } from '$config'

  const phone = CV_PHONE || ''
  const email = CV_EMAIL || 'teemukoivisto.xyz@gmail.com'
</script>

<div class="page px-4">
  <div class="flex py-2 border-b-2 justify-between">
    <a href="https://teemukoivisto.xyz/cv">https://teemukoivisto.xyz/cv</a>
    <div>
      <span class="font-bold"> {phone} </span>
      <a href={`mailto:${email}`} aria-label="Send an email">
        {email}
      </a>
    </div>
  </div>
  <div>
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
        <h1 class="ml-[-16px] mt-4 text-5xl font-sans tracking-tight">Teemu Koivisto — CV</h1>
        <div class="my-2 flex">
          <div class="mr-4 flex items-center">
            <Icon icon={location} width={24} />
            <span class="ml-1">Helsinki</span>
          </div>
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
          Data scientist by degree but craftsman by blood. I rather full-ass than half-ass but have
          learnt that sometimes good is just not good but good enough. Enjoys all parts of the stack
          from writing infra to frontend widgets although rich-text is my jam. Loves good team
          effort, dislikes ego-driven programming (or anything). Always seeking new interesting
          challenges.
        </blockquote>
      </div>
    </header>
    <!-- <fieldset class="flex flex-col rounded border-2 px-4 py-2 pb-4 my-4">
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
          <small>[*] Probably still within Dunning-Kruger effect</small>
        </li>
      </ul>
    </fieldset> -->
    <h2 class="cool-h2 green mb-2 mt-6 text-lg">Skills</h2>
    <ul class="ml-6">
      <li>
        <span>Finnish — <span class="font-bold">Native</span></span>
        <span class="ml-2">English — <span class="font-bold">Fluent</span></span>
      </li>
      <li><h3 class=" text-xl font-sans">Expert</h3></li>
      <li>
        <p>TS/JS, NodeJS, ProseMirror, Svelte, React, HTML/CSS, Tailwind</p>
      </li>
      <li><h3 class="text-xl font-sans">Proficient</h3></li>
      <li>
        <p>
          AWS, Terraform, Ansible, Cloudflare, Vue, SQL, Python, data engineering, Jupyter, Rust*
        </p>
        <small>[*] Probably still within Dunning-Kruger effect</small>
      </li>
    </ul>
    <h2 class="cool-h2 blue mb-2 mt-6 text-lg">Experience</h2>
    <ul>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year"> 2023 </span>
          <a href="https://focal.inc/">Focal Oy — Full-stack developer</a>
        </h3>
        <p class="ml-32">
          I was contacted by Tuomo, CEO of Focal, as they had seen my ProseMirror contributions. I
          then joined as rich-text expert to work on their Notion-type product for marketing
          pipelines although I ended up doing mostly regular Vue/NodeJS work. Really cool team and
          product but sadly things just didn't align. JS/TS, ProseMirror, Vue, NodeJS, Yjs,
          Postgres, GCP.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2022</span>
          <a href="https://skiff.com/">Skiff Inc — Frontend developer (contract)</a>
        </h3>
        <p class="ml-32">
          After Atypon, I sought another ProseMirror gig and saw Skiff was hiring contractors. While
          I did some interesting work with their rich-text editor, it wasn't necessarily the best
          match with me alone in Finland and the majority of the team in Silicon Valley. TS,
          ProseMirror, React.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2020 - 2022</span>
          <a href="https://www.atypon.com/">Atypon Ltd — Frontend developer (contract)</a>
        </h3>
        <p class="ml-32">
          For my first job after graduation I really wanted to dive deep into rich-text editing with
          ProseMirror. I then became part of Atypon's Manuscripts team with special task of
          enhancing the rich-text editor and its integrations. After the start, I started rewriting
          the previous track-changes functionality on my own which I succeeded after a lot of pain
          and trouble. TS, ProseMirror, React, NodeJS, Yjs.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2020</span>
          <a href="https://www.aalto.fi/">Aalto University — Thesis worker</a>
        </h3>
        <p class="ml-32">
          For my thesis, I asked my old lecturer (Arto Hellas) for a project and was paid by his
          research group <a href="https://research.cs.aalto.fi/LeTech/">(LeTech)</a> to work on it.
          The project was this prototype app
          <a href="https://github.com/Aalto-LeTech/CodeClusters">(CodeClusters)</a>
          to cluster program code by their ASTs to help teachers/TAs to analyze/grade them faster. TS,
          Python, clustering, information retrieval, Solr, React, NodeJS, Postgres.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2017 - 2020</span>
          <a href="https://www.webscale.fi/">Webscale Oy — Full-stack developer</a>
        </h3>
        <p class="ml-32">
          In my first proper programming job I learnt the mindset of what it takes to be a good
          developer. This involved getting very familiar with AWS, TypeScript, NodeJS as well as
          React and learning how to build as a team services such as Yle's and KSML's Election
          Machines. JS/TS, AWS, NodeJS, React, Vue, Python, Cloudformation.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2016</span>
          <a href="https://www.feedbackly.com/">Feedbackly Oy — Junior developer</a>
        </h3>
        <p class="ml-32">
          I was hired to work as part-time duo with another student but since he quit, the thing
          fell apart and I went to continue my studies full-time. JS, NodeJS, Vue, AngularJS,
          MongoDB.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2016</span>
          <a href="https://www.helsinki.fi/en">University of Helsinki — Junior developer</a>
        </h3>
        <p class="ml-32">
          I was hired to continue working on thesis management software (Grappa) which we built as
          part of software production course project. JS, React, NodeJS, Postgres, SemanticUI.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2016-2017</span>
          <a href="https://www.helsinki.fi/en">University of Helsinki — Course instructor</a>
        </h3>
        <p class="ml-32">
          I was a course instructor for University of Helsinki's database project course a couple of
          times.
        </p>
      </li>
    </ul>
    <h2 class="cool-h2 red mb-2 mt-6 text-lg">Academia</h2>
    <ul>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year"> 2022 </span>
          <span class="text-base"
            >Evaluating CodeClusters for Effectively Providing Feedback on Code Submissions</span
          >
        </h3>
        <p class="ml-32">
          Paper based on my thesis project that was published in IEEE Frontiers in Education
          Conference.
          <a href="https://ieeexplore.ieee.org/document/9962751">
            https://ieeexplore.ieee.org/document/9962751
          </a>
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2018-2021</span>
          <span>MSc. of Data Science, University of Helsinki </span>
        </h3>
        <p class="ml-32">
          Learned a sufficient amount to know the limits of my knowledge about DS. Wrote my thesis
          on clustering and information retrieval.
          <a href="https://helda.helsinki.fi/handle/10138/325709"
            >https://helda.helsinki.fi/handle/10138/325709</a
          >
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2014-2018</span>
          <span>BSc. of Computer Science, University of Helsinki </span>
        </h3>
        <p class="ml-32">
          Minor in statistics. I wrote my thesis about containers and container management systems.
          <a href="https://github.com/teemukoivisto/kandi">https://github.com/teemukoivisto/kandi</a
          >
        </p>
      </li>
    </ul>
    <h2 class="cool-h2 orange mb-2 mt-6 text-lg">Projects</h2>
    <ul class="ml-6">
      <li>
        <h3 class="text-xl font-sans flex">
          <span>prosemirror-dev-toolkit</span>
        </h3>
        <p>
          Google Chrome extension and npm library I authored to help me and everyone else who works
          with ProseMirror. <a href="https://github.com/TeemuKoivisto/prosemirror-dev-toolkit"
            >https://github.com/TeemuKoivisto/prosemirror-dev-toolkit</a
          >
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span>teemukoivisto.xyz</span>
        </h3>
        <p>
          My blog I made with SvelteKit, Tailwind and Cloudflare <a
            href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
          >
            https://github.com/TeemuKoivisto/teemukoivisto.xyz
          </a>
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span>(untitled)</span>
        </h3>
        <p>
          I've worked on this Rust synchronization server for one of my other projects but since
          it's still WIP with rather hacky code, I've kept putting off publishing it. Rust, tokio
          and setting up infra at Hetzner has been really interesting (and painful) to learn.
        </p>
      </li>
    </ul>
    <h2 class="cool-h2 purple mb-2 mt-6 text-lg">Hobbies</h2>
    <ul class="ml-6">
      <li>
        <p>Gym, music, books, writing, cooking and programming</p>
      </li>
    </ul>
  </div>
</div>

<style lang="scss">
  @page {
    size: A4;
  }
  .page {
    height: 29.7cm; // A4 is 210 x 297 mm
    width: 21cm;

    @apply font-mono text-xs;
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
  .cool-h2 {
    @apply flex uppercase font-sans;
    &::before {
      border: 4px solid;
      content: ' ';
      display: block;
      font-size: 2rem;
      margin: auto 0;
      @apply mr-2 w-4;
    }
    &::after {
      border: 4px solid;
      content: ' ';
      display: block;
      font-size: 2rem;
      margin: auto 0;
      width: 100%;
      @apply ml-2;
    }
    &.green {
      &::before {
        @apply border-green-600;
      }
      &::after {
        @apply border-green-600;
      }
    }
    &.blue {
      &::before {
        @apply border-blue-600;
      }
      &::after {
        @apply border-blue-600;
      }
    }
    &.red {
      &::before {
        @apply border-red-600;
      }
      &::after {
        @apply border-red-600;
      }
    }
    &.orange {
      &::before {
        border-color: orange;
      }
      &::after {
        border-color: orange;
      }
    }
    &.purple {
      &::before {
        @apply border-purple-600;
      }
      &::after {
        @apply border-purple-600;
      }
    }
  }
  a:not(a[class='anchor']) {
    // @apply break-all;
    &:hover {
      @apply underline;
    }
  }
</style>
