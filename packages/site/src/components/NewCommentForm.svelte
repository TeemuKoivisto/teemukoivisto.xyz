<script lang="ts">
  import * as commentApi from '$lib/api/comments'

  let body = ''
  let error = ''
  let loading = false

  async function handleSubmit() {
    const resp = await commentApi.saveComment('hello-world', {
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
</section>

<style lang="scss">
</style>
