<script lang="ts">
  import NewCommentForm from './NewCommentForm.svelte'

  import type { Comment } from '@teemukoivisto.xyz/utils'

  export let comments: Comment[] = [],
    slug: string = ''
</script>

<section class={$$props.class}>
  <ul class="my-8">
    {#each comments as comment}
      <li class="flex">
        <figure class="mr-4">
          <img
            class="rounded-full"
            src={comment.avatar_url}
            alt="GitHub avatar"
            width="64"
            height="64"
          />
        </figure>
        <div class="relative comment w-full flex flex-col border border-gray-500 rounded">
          <div class="px-2 py-2 rounded bg-gray-300">
            {comment.author}
            [{comment.origin}]
          </div>
          <div class="px-8 py-4">
            {comment.body}
          </div>
        </div>
      </li>
    {/each}
  </ul>
  <NewCommentForm {slug} />
</section>

<style lang="scss">
  .comment {
    &::before {
      clip-path: polygon(0 50%, 100% 0, 100% 100%);
      content: ' ';
      display: block;
      top: 11px;
      right: 100%;
      left: -10px;
      width: 9px;
      height: 18px;
      pointer-events: none;
      position: absolute;
      @apply bg-gray-500;
    }
    &::after {
      clip-path: polygon(0 50%, 100% 0, 100% 100%);
      content: ' ';
      display: block;
      top: 11px;
      right: 100%;
      left: -8px;
      width: 8px;
      height: 18px;
      pointer-events: none;
      position: absolute;
      @apply bg-gray-300;
    }
  }

  li + li {
    @apply mt-2;
  }
</style>
