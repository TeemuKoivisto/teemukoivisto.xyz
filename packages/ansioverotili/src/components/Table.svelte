<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import trash from '@iconify-icons/lucide/trash'

  import * as Table from '$shadcn/ui/table'
  import type { Payment } from '$stores/state'

  let { rows, deleteItem }: { rows: Payment[]; deleteItem: (n: number) => void } = $props()
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Pvm</Table.Head>
      <Table.Head>Saaja</Table.Head>
      <Table.Head>Ansiotulotili</Table.Head>
      <Table.Head class="text-right">€</Table.Head>
      <Table.Head class="text-right"></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each rows as row, idx}
      <Table.Row>
        <Table.Cell class="font-medium">{row.date?.toFormat('dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.taxAccount}</Table.Cell>
        <Table.Cell class="text-right">{row.paid}</Table.Cell>
        <Table.Cell>
          <button onclick={() => deleteItem(idx)}>
            <Icon class="w-4 h-4" icon={trash} />
          </button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
