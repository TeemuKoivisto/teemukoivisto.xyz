<script lang="ts">
  import { githubActions, githubUser } from '$stores/auth'

  async function handleLogin() {
    githubActions.login()
  }
</script>

<section class={$$props.class}>
  <button class="py-1 px-2 rounded bg-gray-500" on:click|preventDefault={handleLogin}
    >GitHub Login</button
  >
  {#if $githubUser}
    <p>
      Hello there, <span> {$githubUser?.login}</span>. (<a href=".">Logout</a>)
    </p>
  {/if}
</section>

<style lang="scss">
</style>
