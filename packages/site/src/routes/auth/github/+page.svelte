<script lang="ts">
  import { onMount } from 'svelte'

  import { githubActions } from '$stores/auth'

  onMount(async () => {
    const resp = await githubActions.callback()
    if ('err' in resp) {
      console.error(resp)
    } else if (resp.data) {
      window.location.replace(resp.data)
    } else {
      window.location.replace('/')
    }
  })
</script>
