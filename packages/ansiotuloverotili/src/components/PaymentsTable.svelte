<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import trash from '@iconify-icons/lucide/trash'

  import * as Table from '$shadcn/ui/table'
  import type { Payment } from '$stores/state'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLTableElement> {
    rows: Payment[]
    deleteItem: (n: number) => void
  }

  let { rows, deleteItem, ...rest }: Props = $props()
</script>

<Table.Root {...rest}>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Pvm</Table.Head>
      <Table.Head>Saaja</Table.Head>
      <Table.Head>Atvtili</Table.Head>
      <Table.Head class="text-right">€</Table.Head>
      <Table.Head class="text-right"></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each rows as row, idx}
      <Table.Row>
        <Table.Cell class="break-all font-medium">{row.date?.toFormat('dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{row.to}</Table.Cell>
        <Table.Cell>{row.taxAccount}</Table.Cell>
        <Table.Cell class="text-right">{row.brutto}</Table.Cell>
        <Table.Cell class="p-0">
          <button class="icon-btn" onclick={() => deleteItem(idx)}>
            <Icon class="w-4 h-4" icon={trash} />
          </button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
