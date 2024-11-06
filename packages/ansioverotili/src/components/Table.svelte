<script lang="ts">
  import * as Table from '$shadcn/ui/table'
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Pvm</Table.Head>
      <Table.Head>Saaja</Table.Head>
      <Table.Head>Ansiotulotili</Table.Head>
      <Table.Head class="text-right">Määrä</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell class="font-medium">1.1.2025</Table.Cell>
      <Table.Cell>Matti Meikäläinen</Table.Cell>
      <Table.Cell>FI10 2000 3000 4000 50</Table.Cell>
      <Table.Cell class="text-right">3200€</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
