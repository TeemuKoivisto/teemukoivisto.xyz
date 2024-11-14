<script lang="ts">
  import * as Table from '$shadcn/ui/table'

  let { rows } = $props<{ rows: any[] }>()
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
        <Table.Cell class="font-medium">1.1.2025</Table.Cell>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.taxAccount}</Table.Cell>
        <Table.Cell class="text-right">{row.paid}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
