<script lang="ts">
  import * as Table from '$shadcn/ui/table'
  import type { Payment } from '$stores/state'

  let { rows }: { rows: Payment[] } = $props()
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Pvm</Table.Head>
      <Table.Head>Saaja</Table.Head>
      <Table.Head>Ansiotulotili</Table.Head>
      <Table.Head class="text-right">€</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each rows as row}
      <Table.Row>
        <Table.Cell class="font-medium">{row.date?.toFormat('dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.taxAccount}</Table.Cell>
        <Table.Cell class="text-right">{row.paid}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
