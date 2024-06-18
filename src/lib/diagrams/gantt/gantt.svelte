<script lang="ts">
	import { createXAxis, createYAxis } from './gantt'
	import { addDays } from 'date-fns'
	import * as d3 from 'd3'
	import { onMount } from 'svelte'

	const startDate = new Date()

	export let id = 'default'
	export let tasks = [
		{
			id: 'Dilution Tunnel Data Collection',
			startDate: addDays(startDate, 7),
			endDate: addDays(startDate, 14),
		},
		{
			id: 'Dilution Tunnel Control Logic',
			startDate: addDays(startDate, 14),
			endDate: addDays(startDate, 21),
		},
		{
			id: 'Dilution Tunnel User Interface',
			startDate: addDays(startDate, 21),
			endDate: addDays(startDate, 28),
		},
		{
			id: 'Dilution Tunnel Startup',
			startDate: addDays(startDate, 28),
			endDate: addDays(startDate, 35),
		},
	]
	const x = createXAxis(900 - 152, tasks)
	const y = createYAxis(100, tasks)

	onMount(() => {
		const svg = d3.select(`#${id}`)
		const g = svg.append('g').attr('transform', `translate(150,20)`)

		g.append('g').attr('class', 'x axis').attr('transform', `translate(0,0)`).call(d3.axisTop(x))

		g.append('g').attr('class', 'y axis').call(d3.axisLeft(y))
	})
</script>

<svg {id} viewBox="0 0 900 200" width="100%"></svg>
