<script lang="ts">
  import GitHubLogin from './GitHubLogin.svelte'

  import * as commentApi from '$lib/api/comments'
  import { githubUser } from '$stores/auth'

  export let slug: string

  let body = ''
  let error = ''
  let loading = false

  async function handleSubmit() {
    const resp = await commentApi.saveComment(slug, {
      author: $githubUser.login,
      body,
    })
    body = ''
    console.log(resp)
  }
  function handleCancel() {
    body = ''
  }
</script>

<section class={$$props.class}>
  <div>
    {#if $githubUser}
      <form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
        <div class="flex">
          <figure class="mr-8">
            <img
              class="rounded-full"
              src={$githubUser.avatar_url}
              alt="GitHub avatar"
              width="200"
              height="200"
            />
          </figure>
          <div class="w-full h-full flex items-center">
            <textarea
              class="w-full h-full h-36 py-2 px-2 text-dark rounded"
              placeholder="Reply..."
              required
              bind:value={body}
            />
            <!-- <small>{error}</small> -->
          </div>
        </div>
        <div class="flex justify-end my-4">
          <button class="px-4 rounded bg-gray-500 hover:bg-gray-600" type="submit" disabled={loading}> Comment </button>
          <button class="ml-4 hover:underline" type="button" disabled={loading} on:click={handleCancel}>
            Reset
          </button>
        </div>
      </form>
    {:else}
      <GitHubLogin />
    {/if}
  </div>
</section>

<style lang="scss">
</style>
