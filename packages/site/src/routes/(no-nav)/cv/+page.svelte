<script lang="ts">
  import SvelteSEOMetaTags from 'svelte-seo-meta-tags'

  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import location from '@iconify-icons/mdi/location'

  import { CV_EMAIL, CV_PHONE, SITE_METADATA } from '$config'

  const phone = CV_PHONE || ''
  const email = CV_EMAIL || 'teemukoivisto.xyz@gmail.com'
  const title = `TeemuKoivisto_CV_${new Date().toISOString().slice(0, 10).replaceAll('-', '_')}`
</script>

<SvelteSEOMetaTags
  page={{
    ...SITE_METADATA,
    title,
  }}
/>

<div class="page">
  <div class="w-full break-all flex py-2 border-b-2 justify-between">
    <a href="https://teemukoivisto.xyz/cv">https://teemukoivisto.xyz/cv</a>
    <div>
      <span class="font-bold"> {phone} </span>
      <a class="italic" href={`mailto:${email}`} aria-label="Send an email">
        {email}
      </a>
    </div>
  </div>
  <div>
    <header class="flex flex-col">
      <h1 class="mt-6 text-5xl font-sans">Teemu Koivisto — CV</h1>
      <div class="mt-6 ml-32 mb-2 flex">
        <div class="flex">
          <a
            class="flex items-center mr-2 cursor-pointer"
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
          <div class="flex items-center">
            <Icon icon={location} width={24} />
            <span class="ml-1">Helsinki</span>
          </div>
        </div>
      </div>
      <div class="blurb">
        <figure class="avatar">
          <img
            class="rounded-full"
            src="/img/avatar-200.avif"
            alt="My beautiful face"
            width="100"
            height="100"
          />
        </figure>
        <blockquote class="italic">
          Data scientist by degree but craftsman by nature. Developer of 6 years, experienced in
          various areas such as full-stack, devops, infra and data science. Expert in rich-text on
          top of strong JS/TS full-stack skills. Good at deep problem-solving. Have through
          experience learned to balance completeness and velocity. Loves good team effort, dislikes
          ego-driven programming (or anything). Always seeking new interesting challenges.
        </blockquote>
      </div>
    </header>
    <h2 class="cool-h2 green mb-2 mt-6 text-lg">Skills</h2>
    <ul class="ml-6">
      <li>
        <span>Finnish — <span class="font-bold">Native</span></span>
        <span class="ml-2">English — <span class="font-bold">Fluent</span></span>
      </li>
      <li><h3 class="text-xl font-sans">Expert</h3></li>
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
          <span class="year">2023</span>
          <a href="https://focal.inc/">Focal Oy — Full-stack developer</a>
        </h3>
        <p class="ml-6 sm:ml-32 text-[11px]">
          Contacted by Tuomo Riekki (CEO) to join as a rich-text expert to work on their Notion-type
          product for marketing pipelines. Ended up doing mostly Vue/NodeJS work, created the Google
          Drive integration among other things. Wonderful people and product but start-up life can
          be rough. JS/TS, ProseMirror, Vue, NodeJS, Yjs, Postgres, GCP.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2022</span>
          <a href="https://skiff.com/">Skiff Inc — Frontend developer (contract)</a>
        </h3>
        <p class="ml-6 sm:ml-32 text-[11px]">
          After Atypon, I sought another ProseMirror gig and saw Skiff was hiring contractors. I
          then assumed responsibility for enhancing their rich-text editors, mostly fixing
          complicated ProseMirror bugs. TS, ProseMirror, React.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2021-2022</span>
          <a href="https://www.atypon.com/">Atypon Ltd — Frontend developer (contract)</a>
        </h3>
        <p class="ml-6 sm:ml-32 text-[11px]">
          After graduation I really wanted to dive deep into rich-text with ProseMirror. I then
          became part of Atypon's Manuscripts team with special task of enhancing their rich-text
          editor as well as fixing React UI. Designed and engineered track-changes functionality by
          myself to highlight edits and deletes (as in Word) as a npm package + NodeJS API. TS,
          ProseMirror, React, NodeJS, Yjs.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2020</span>
          <a href="https://www.aalto.fi/">Aalto University — Thesis worker</a>
        </h3>
        <p class="ml-6 sm:ml-32 text-[11px]">
          Was given a project by my old lecturer (Arto Hellas) to analyze and cluster programmning
          exercise submissions, work funded by <a
            class="font-bold"
            href="https://research.cs.aalto.fi/LeTech/">LeTech</a
          >
          research group. In addition to the thesis, wrote
          <a class="font-bold" href="https://github.com/Aalto-LeTech/CodeClusters">CodeClusters</a>
          to search and cluster code to help teachers/TAs to analyze/grade them faster. TS, Python, clustering,
          information retrieval, Solr, React, NodeJS, Postgres.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2017-2020</span>
          <a href="https://www.webscale.fi/">Webscale Oy — Full-stack developer</a>
        </h3>
        <p class="ml-6 sm:ml-32 text-[11px]">
          Learned AWS in-depth with the help of great mentors, was part of team building KSML/Yle
          election machine. Partnered with other developer to build election result service, wrote
          its UI in React, Mobx, styled-components. Worked as on-site consultant for Aller, writing
          React UI from Figma designs. Created custom analytics library (similar to GA) with
          Firehose, S3. Worked part-time during studies. JS/TS, AWS, NodeJS, React, Mobx, Vue,
          Python, Cloudformation.
        </p>
      </li>
    </ul>
  </div>
</div>

<div class="page">
  <div class="w-full break-all flex py-2 border-b-2 justify-between">
    <a href="https://teemukoivisto.xyz/cv">https://teemukoivisto.xyz/cv</a>
    <div>
      <span class="font-bold"> {phone} </span>
      <a class="italic" href={`mailto:${email}`} aria-label="Send an email">
        {email}
      </a>
    </div>
  </div>
  <div class="my-6">
    <ul>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2016</span>
          <a href="https://www.feedbackly.com/">Feedbackly Oy — Junior developer</a>
        </h3>
        <p class="ml-6 sm:ml-32">
          I was hired to work as part-time duo with another student but since he quit, the thing
          fell apart and I went to continue my studies full-time. JS, NodeJS, AngularJS, MongoDB.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2016</span>
          <a href="https://www.helsinki.fi/en">University of Helsinki — Junior developer</a>
        </h3>
        <p class="ml-6 sm:ml-32">
          I was hired to continue working on thesis management software <a
            class="font-bold"
            href="https://github.com/UniversityOfHelsinkiCS/grappa-frontend">Grappa</a
          >
          which we built as part of software production course project. JS, React, Redux, NodeJS, Postgres,
          SemanticUI.
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2016-2017</span>
          <a href="https://www.helsinki.fi/en">University of Helsinki — Course instructor</a>
        </h3>
        <p class="ml-6 sm:ml-32">
          I was a course instructor a couple of times for University of Helsinki's database project
          course and once for Angular+NodeJS full-stack course.
        </p>
      </li>
    </ul>
    <h2 class="cool-h2 red mb-2 mt-6 text-lg">Education</h2>
    <ul>
      <li>
        <h3 class="text-xl font-sans flex break-normal">
          <span class="year"> 2022 </span>
          <span class="leading-none mb-1 w-[calc(100%-8rem)]"
            >Evaluating CodeClusters for Effectively Providing Feedback on Code Submissions</span
          >
        </h3>
        <p class="ml-6 sm:ml-32">
          Paper based on my thesis project that was published in 2022 IEEE Frontiers in Education
          Conference.
          <a href="https://ieeexplore.ieee.org/document/9962751">
            https://ieeexplore.ieee.org/document/9962751
          </a>
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2018-2021</span>
          <span class="ml-[-1px]">MSc. of Data Science, University of Helsinki </span>
        </h3>
        <p class="ml-6 sm:ml-32">
          Learned a sufficient amount to know the limits of my knowledge about DS. Wrote my thesis
          on clustering and information retrieval with full marks.
          <a href="https://helda.helsinki.fi/handle/10138/325709"
            >https://helda.helsinki.fi/handle/10138/325709</a
          >
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year"> 2018 </span>
          <span class="mb-1">AWS Certified Solutions Architect — Associate</span>
        </h3>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <span class="year">2014-2018</span>
          <span class="ml-[-2px]">BSc. of Computer Science, University of Helsinki </span>
        </h3>
        <p class="ml-6 sm:ml-32">
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
          <a href="https://teemukoivisto.github.io/prosemirror-dev-toolkit/"
            >prosemirror-dev-toolkit</a
          >
        </h3>
        <p>
          Google Chrome extension and npm library I authored to help me and everyone else who works
          with ProseMirror <a href="https://github.com/TeemuKoivisto/prosemirror-dev-toolkit"
            >https://github.com/TeemuKoivisto/prosemirror-dev-toolkit</a
          >
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <a href="https://teemukoivisto.xyz">teemukoivisto.xyz</a>
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
          <a href="https://tictac5.teemukoivisto.xyz/">tic-tac-5-rust</a>
        </h3>
        <p>
          Example multiplayer game I made with Rust, tokio, Svelte, protobuf and experimented with
          some WASM
          <a href="https://github.com/TeemuKoivisto/tic-tac-5-rust">
            https://github.com/TeemuKoivisto/tic-tac-5-rust
          </a>
        </p>
      </li>
      <li>
        <h3 class="text-xl font-sans flex">
          <a href="https://midi-note-trainer.teemukoivisto.xyz">midi-note-trainer</a>
        </h3>
        <p>
          App I created to help me learn music notes using Web MIDI
          <a href="https://github.com/TeemuKoivisto/midi-note-trainer">
            https://github.com/TeemuKoivisto/midi-note-trainer
          </a>
        </p>
      </li>
    </ul>
    <h2 class="cool-h2 purple mb-2 mt-6 text-lg">Hobbies</h2>
    <ul class="ml-6">
      <li>
        <p>Gym, guitar, singing, piano, books, writing, cooking and programming</p>
      </li>
    </ul>
  </div>
</div>

<style lang="postcss">
  @page {
    size: A4;
  }
  @media print {
    .page {
      height: 29.7cm;
      width: 21cm;
    }
  }
  .page {
    @apply px-4 md:px-16 mx-[auto] max-w-[800px] min-h-[29.7cm] flex flex-col items-center font-mono text-xs;
  }
  .blurb {
    display: grid;
    grid-template-columns: 128px auto;
    grid-template-rows: auto;
    align-items: center;
  }
  li + li {
    @apply mt-2;
  }
  .year {
    @apply block mr-2 sm:mr-0 sm:w-32;
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
    /* @apply break-all; */
    &:hover {
      @apply underline;
    }
  }
</style>
