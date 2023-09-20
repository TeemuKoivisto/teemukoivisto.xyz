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
        <div class="w-full flex flex-col border border-black rounded">
          <div class="px-2 py-2 rounded bg-gray-300">
            {comment.author}
            [GitHub]
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
  .row {
    position: relative;
    border: 1px solid #222;
    border-radius: 6px;
    @apply flex flex-col;
  }
  li + li {
    @apply mt-2;
  }
</style>
