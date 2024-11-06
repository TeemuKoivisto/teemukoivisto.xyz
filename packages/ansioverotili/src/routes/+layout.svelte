<script lang="ts">
  import '../app.pcss'

  let { children } = $props()
</script>

<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>
{@render children()}
