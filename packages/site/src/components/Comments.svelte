<script lang="ts">
  import { onMount } from 'svelte'
  import NewCommentForm from './NewCommentForm.svelte'

  import * as commentApi from '$lib/api/comments'

  let comments = []

  onMount(async () => {
    const resp = await commentApi.listComments('hello-world')
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
