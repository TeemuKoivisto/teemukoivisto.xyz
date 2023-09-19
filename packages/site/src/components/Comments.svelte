<script lang="ts">
  import { onMount } from 'svelte'
  import NewCommentForm from './NewCommentForm.svelte'

  import { COMMENT_API_URL } from '$config'
  import { wrappedFetch } from '$lib/wrappedFetch'

  let comments = []

  onMount(async () => {
    const resp = await wrappedFetch<{ comments: any[] } | null>(`${COMMENT_API_URL}/hello-world`, {
      method: 'GET',
    })
    if ('data' in resp && resp.data.comments) {
      comments = resp.data.comments
    }
    console.log(resp)
  })
</script>

<section class={$$props.class}>
  <ul>
    {#each comments as comment}
      <li class="flex">
        <div>
          {comment.name}
        </div>
        :
        <div>
          {comment.body}
        </div>
      </li>
    {/each}
  </ul>
  <NewCommentForm />
</section>

<style lang="scss">
  li + li {
    @apply mt-2;
  }
</style>
