<script lang="ts">
  import GitHubLogin from './GitHubLogin.svelte'

  import * as commentApi from '$lib/api/comments'

  export let slug: string

  let body = ''
  let error = ''
  let loading = false

  async function handleSubmit() {
    const resp = await commentApi.saveComment(slug, {
      author: 'Anonymous',
      body,
    })
    console.log(resp)
  }
  function handleCancel() {
    body = ''
  }
</script>

<section class={$$props.class}>
  <div>
    <div>
      <div class="bg-red-500">Anon</div>
    </div>
    <form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
      <textarea
        class="py-2 px-2 text-dark rounded"
        placeholder="Reply..."
        bind:value={body}
        required
      />
      <small>{error}</small>
      <div class="my-4">
        <button class="px-4 rounded bg-gray-500" type="submit" disabled={loading}> Send </button>
        <button class="ml-4" type="button" disabled={loading} on:click={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
  <GitHubLogin />
</section>

<style lang="scss">
</style>
