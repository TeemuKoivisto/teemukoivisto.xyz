<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import pencil from '@iconify-icons/mdi/pencil.js'
  import trash from '@iconify-icons/mdi/delete.js'
  import NewCommentForm from './NewCommentForm.svelte'

  import * as commentApi from '$lib/api/comments'
  import { githubActions, githubUser } from '$stores/auth'
  import type { Comment } from '@teemukoivisto.xyz/utils'

  export let comments: Comment[] = [],
    slug: string = ''

  let loading = false
  let editedId = ''
  let editedText = ''
  let error = ''

  const formatOrigin = (val: string) =>
    val === 'github' ? 'GitHub' : val === 'google' ? 'Google' : 'Anonymous'
  const isEditable = (c: Comment) => c.profile_id && c.profile_id === $githubUser?.id.toString()
  console.log(comments)
  function handleEdit(c: Comment) {
    if (editedId && c.id === editedId) {
      editedId = ''
    } else {
      editedId = c.id
      editedText = c.body
    }
  }

  function handleEnter(ev: KeyboardEvent) {
    if (editedId && ev.key === 'Enter') {
      handleSubmit()
    }
  }

  async function handleSubmit() {
    error = ''
    loading = true
    const resp = await commentApi.updateComment(slug, editedId, {
      body: editedText,
    })
    loading = false
    if ('err' in resp) {
      error = resp.err
    } else {
      editedId = ''
      editedText = ''
    }
    console.log(resp)
  }

  function handleCancel() {
    editedId = ''
    error = ''
    editedText = ''
  }
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
        <form class="w-full" on:submit|preventDefault={handleSubmit}>
          <div
            class="relative comment flex flex-col rounded border border-gray-500 dark:border-gray-700"
          >
            <div class="flex justify-between px-2 py-2 rounded bg-gray-300 dark:bg-gray-600">
              <span class="ml-2">
                <strong>{comment.author}</strong>
                [{formatOrigin(comment.origin)}]
              </span>
              {#if isEditable(comment)}
                <button
                  type="button"
                  on:click={() => handleEdit(comment)}
                  class="rounded hover:bg-gray-400 dark:hover:bg-gray-700"
                >
                  {#if editedId === comment.id}
                    <Icon icon={trash} width={24} />
                  {:else}
                    <Icon icon={pencil} width={24} />
                  {/if}
                </button>
              {/if}
            </div>
            {#if editedId === comment.id}
              <textarea
                class="p-4 h-36 text-dark rounded dark:text-white dark:bg-gray-900"
                placeholder="Reply..."
                required
                bind:value={editedText}
                on:keydown={handleEnter}
              />
            {:else}
              <div class="p-4">
                {comment.body}
              </div>
            {/if}
          </div>
          {#if editedId === comment.id && error}
            <div class="text-red-500">{error}</div>
          {/if}
          {#if editedId === comment.id}
            <div class="flex justify-end" class:my-4={editedId === comment.id && !error}>
              <button
                class="px-4 rounded text-white bg-gray-400 hover:bg-gray-500"
                type="submit"
                disabled={loading}
              >
                Edit
              </button>
              <button
                class="ml-4 hover:underline"
                type="button"
                disabled={loading}
                on:click={handleCancel}
              >
                Cancel
              </button>
            </div>
          {/if}
        </form>
      </li>
    {/each}
  </ul>
  <NewCommentForm {slug} />
</section>

<style lang="scss">
  li + li {
    @apply mt-8;
  }
  .comment {
    &::before {
      clip-path: polygon(0 50%, 100% 0, 100% 100%);
      content: ' ';
      display: block;
      top: 11px;
      right: 100%;
      left: -9px;
      width: 9px;
      height: 18px;
      pointer-events: none;
      position: absolute;
      @apply bg-gray-500 dark:bg-gray-800;
    }
    &::after {
      clip-path: polygon(0 50%, 100% 0, 100% 100%);
      content: ' ';
      display: block;
      top: 11px;
      right: 100%;
      left: -7px;
      width: 8px;
      height: 18px;
      pointer-events: none;
      position: absolute;
      @apply bg-gray-300 dark:bg-gray-600;
    }
  }
</style>
