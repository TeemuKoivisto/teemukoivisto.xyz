<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import github from '@iconify-icons/mdi/github.js'

  import { githubActions, githubUser } from '$stores/auth'
  import { commentActions } from '$stores/comments'

  export let slug: string

  let body = ''
  let error = ''
  let loading = false

  async function handleSubmit() {
    error = ''
    loading = true
    const resp = await commentActions.create(slug, body)
    loading = false
    if ('err' in resp) {
      error = resp.err
    } else {
      body = ''
    }
  }
  function handleClear() {
    error = ''
    body = ''
  }
</script>

<section class={$$props.class}>
  {#if $githubUser}
    <form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
      <div class="flex">
        <figure class="mr-6">
          <img
            class="rounded-full"
            src={$githubUser?.avatar_url}
            alt="Avatar"
            width="128"
            height="128"
          />
        </figure>
        <div class="w-full h-full flex flex-col items-center">
          <textarea
            class="w-full h-36 py-2 px-2 text-dark rounded border border-gray-400 dark:text-white dark:border-gray-700 dark:bg-gray-900"
            placeholder="Say something..."
            required
            bind:value={body}
          />
          {#if error}
            <small class="mt-2 text-red-500">{error}</small>
          {/if}
        </div>
      </div>
      <div class="flex justify-end my-4">
        <button
          class="px-4 rounded text-white bg-[#3e4553] hover:bg-[#24292f] dark:bg-gray-600 dark:hover:bg-gray-700"
          type="submit"
          disabled={loading}
        >
          Comment
        </button>
        <button
          class="ml-4 hover:underline"
          type="button"
          disabled={loading}
          on:click={handleClear}
        >
          Clear
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
  {/if}
  {#if !$githubUser}
    <div class="flex flex-col items-center mb-12 sm:ml-8">
      <div>Login to comment</div>
      <div class="w-52 mt-4">
        <button
          class="flex w-full py-1 px-2 rounded bg-[#3e4553] hover:bg-[#24292f] dark:bg-gray-600 dark:hover:bg-gray-700"
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
