<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import github from '@iconify-icons/mdi/github.js'

  import * as commentApi from '$lib/api/comments'
  import { githubActions, githubUser } from '$stores/auth'

  export let slug: string

  let body = ''
  let error = ''
  let loading = false

  async function handleSubmit() {
    error = ''
    loading = true
    const resp = await commentApi.saveComment(slug, {
      id: $githubUser.id.toString(),
      avatar_url: $githubUser.avatar_url,
      author: $githubUser.login,
      origin: 'github',
      body,
    })
    loading = false
    if ('err' in resp) {
      error = resp.err
    } else {
      body = ''
    }
    console.log(resp)
  }
  function handleCancel() {
    error = ''
    body = ''
  }
</script>

<section class={$$props.class}>
  {#if $githubUser}
    <form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
      <div class="flex">
        <figure class="mr-8">
          <img
            class="rounded-full"
            src={$githubUser.avatar_url}
            alt="GitHub avatar"
            width="128"
            height="128"
          />
        </figure>
        <div class="w-full h-full flex items-center">
          <textarea
            class="w-full h-36 py-2 px-2 text-dark border border-gray-400 rounded"
            placeholder="Reply..."
            required
            bind:value={body}
          />
          <small>{error}</small>
        </div>
      </div>
      <div class="flex justify-end my-4">
        <button
          class="px-4 rounded text-white bg-gray-400 hover:bg-gray-500"
          type="submit"
          disabled={loading}
        >
          Comment
        </button>
        <button
          class="ml-4 hover:underline"
          type="button"
          disabled={loading}
          on:click={handleCancel}
        >
          Reset
        </button>
        <button
          class="ml-4 hover:underline"
          type="button"
          disabled={loading}
          on:click={githubActions.logout}
        >
          Logout
        </button>
      </div>
    </form>
  {:else}
    <div class="flex flex-col items-center ml-8 mb-12">
      <div>Login to comment</div>
      <div class="w-52 mt-4">
        <button
          class="flex w-full py-1 px-2 rounded bg-gray-300 hover:bg-gray-400"
          on:click|preventDefault={githubActions.login}
        >
          <Icon class="ml-10 mr-4" icon={github} width={24} />
          GitHub
        </button>
      </div>
    </div>
  {/if}
</section>

<style lang="scss">
</style>
