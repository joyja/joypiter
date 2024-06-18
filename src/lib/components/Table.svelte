<script lang="ts">
	export let config = {
		one: {
			decimals: 2
		}
	}
	export let contents = {
		headers: ['one', 'two', 'three'],
		rows: [['one', 'two', 'three']]
	}
</script>

<table>
	<thead>
		<tr>
			{#each contents.headers as header}
				<th>{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each contents.rows as row}
			<tr>
				{#each row as cell}
					<td>{cell ? cell : ''}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		text-transform: capitalize;
	}
</style>
