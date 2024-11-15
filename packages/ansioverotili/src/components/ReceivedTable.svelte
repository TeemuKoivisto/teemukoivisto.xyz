<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import trash from '@iconify-icons/lucide/trash'

  import * as Table from '$shadcn/ui/table'
  import type { Payment } from '$stores/state'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLTableElement> {
    rows: Payment[]
  }

  let { rows, ...rest }: Props = $props()
</script>

<Table.Root {...rest}>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Pvm</Table.Head>
      <Table.Head>Maksaja</Table.Head>
      <Table.Head class="text-right w-[100px]">Palkka €</Table.Head>
      <Table.Head class="text-right w-[100px]">Brutto €</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each rows as row}
      <Table.Row>
        <Table.Cell class="font-medium">{row.date?.toFormat('dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{row.from}</Table.Cell>
        <Table.Cell class="text-right">{row.salary}</Table.Cell>
        <Table.Cell class="text-right">{row.brutto}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
