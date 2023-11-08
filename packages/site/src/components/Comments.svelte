<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import close from '@iconify-icons/mdi/close.js'
  import pencil from '@iconify-icons/mdi/pencil.js'
  import trash from '@iconify-icons/mdi/delete.js'
  import NewCommentForm from './NewCommentForm.svelte'

  import { githubUser, credentials } from '$stores/auth'
  import { commentActions } from '$stores/comments'
  import type { Comment } from '@teemukoivisto.xyz/utils'

  export let comments: Comment[] = [],
    slug: string = ''

  let loading = false
  let editedId = ''
  let editedText = ''
  let error = ''

  const formatOrigin = (val: string) =>
    val === 'github' ? 'GitHub' : val === 'google' ? 'Google' : 'Anonymous'

  $: editables = comments.map(
    c => (c.profile_id && c.profile_id === $githubUser?.id.toString()) || $credentials?.sudo
  )

  function handleEdit(c: Comment) {
    if (editedId && c.id === editedId) {
      editedId = ''
    } else {
      editedId = c.id
      editedText = c.body
    }
  }

  async function handleSubmit() {
    error = ''
    loading = true
    const resp = await commentActions.update(slug, editedId, editedText)
    loading = false
    if ('err' in resp) {
      error = resp.err
    } else {
      editedId = ''
      editedText = ''
    }
  }

  function handleCancel(c?: Comment) {
    if (!c || (editedId && c.id === editedId)) {
      editedId = ''
      error = ''
      editedText = ''
    } else {
      editedId = c.id
      editedText = c.body
    }
  }

  async function handleDelete(c: Comment) {
    if (editedId && c.id === editedId) {
      const resp = await commentActions.delete(slug, c.id)
      if ('err' in resp) {
        error = resp.err
      } else {
        editedId = ''
        error = ''
        editedText = ''
      }
    }
  }
</script>

<section class={$$props.class}>
  <ul class="my-8">
    {#each comments as comment, idx}
      <li class="flex">
        <figure class="mr-4">
          <img class="rounded-full" src={comment.avatar_url} alt="Avatar" width="64" height="64" />
        </figure>
        <form class="w-full" on:submit|preventDefault={handleSubmit}>
          <div
            class="relative comment flex flex-col rounded border border-gray-500 dark:border-gray-700"
          >
            <div class="flex justify-between px-4 py-2 rounded-t bg-[#3e4553] dark:bg-gray-600">
              <div>
                <span>
                  <strong>{comment.author}</strong>
                  [{formatOrigin(comment.origin)}]
                </span>
                <div>
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
              <div class="flex">
                {#if editables[idx]}
                  {#if editedId === comment.id}
                    <button
                      type="button"
                      on:click={() => handleCancel(comment)}
                      class="rounded mr-2 hover:opacity-60"
                    >
                      <Icon icon={close} width={24} />
                    </button>
                    <button
                      type="button"
                      on:click={() => handleDelete(comment)}
                      class="rounded hover:opacity-60"
                    >
                      <Icon icon={trash} width={24} />
                    </button>
                  {:else}
                    <button
                      type="button"
                      on:click={() => handleEdit(comment)}
                      class="rounded hover:opacity-60"
                    >
                      <Icon icon={pencil} width={24} />
                    </button>
                  {/if}
                {/if}
              </div>
            </div>
            {#if editedId === comment.id}
              <textarea
                class="p-4 h-36 text-dark rounded text-black dark:text-white dark:bg-gray-900"
                placeholder="Reply..."
                required
                bind:value={editedText}
              />
            {:else}
              <div
                class="p-4 whitespace-pre-line rounded-b bg-[#eef4ff] text-black dark:bg-[#202020]"
              >
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
                class="px-4 rounded text-white bg-[#3e4553] hover:bg-[#24292f] dark:bg-gray-600 dark:hover:bg-gray-700"
                type="submit"
                disabled={loading}
              >
                Update
              </button>
              <button
                class="ml-4 hover:underline"
                type="button"
                disabled={loading}
                on:click={() => handleCancel()}
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
      @apply bg-[#3e4553] dark:bg-gray-600;
    }
  }
</style>
