import { addDays } from 'date-fns'
import { describe, expect, it } from 'vitest'
import { createXAxis, createYAxis } from './gantt'
import * as d3 from 'd3'

const startDate = new Date()
const width = 100
const height = 100

const tasks = [
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

describe('createXAxis', () => {
	it('should', () => {
		const scale = createXAxis(width, tasks)
		expect(typeof scale).toBe('function')
		expect(typeof scale.domain).toBe('function')
		expect(typeof scale.range).toBe('function')
	})
})

describe('createYAxis', () => {
	it('should', () => {
		const scale = createYAxis(height, tasks)
		expect(typeof scale).toBe('function')
		expect(typeof scale.domain).toBe('function')
		expect(typeof scale.range).toBe('function')
	})
})
