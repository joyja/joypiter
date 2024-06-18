import { it, expect, describe } from 'vitest'
import {
	calcTotalWeeks,
	calcTotalNonweeks,
	calcPercentages,
	calcTotal,
	calcSubtotals,
	convertToTable,
} from './estimate'

const rate = 200

type milestone = {
	milestone: string
	percentage?: number
	weeks?: number
	total?: number
}

const projectData: milestone[] = [
	{ milestone: 'Dilution Tunnel Data Collection', percentage: 0.3 },
	{ milestone: 'Dilution Tunnel Data Collection', percentage: 0.3 },
	{ milestone: 'Dilution Tunnel Control Logic', weeks: 1 },
	{ milestone: 'Dilution Tunnel User Interface', weeks: 2 },
	{ milestone: 'Dilution Tunnel Startup', weeks: 1 },
]

describe('calcTotalWeeks', () => {
	it('should return the sum of weeks for all rows with weeks', () => {
		expect(calcTotalWeeks(projectData)).toEqual(4)
	})
})

describe('calcTotalNonweeks', () => {
	it('should return the sum of percentage for all rows without weeks', () => {
		expect(calcTotalNonweeks(projectData)).toEqual(0.6)
	})
})

describe('calcPercentages', () => {
	it('should return each row with a percentage', () => {
		expect(calcPercentages(projectData)).toEqual([
			{ milestone: 'Dilution Tunnel Data Collection', percentage: 0.3 },
			{ milestone: 'Dilution Tunnel Data Collection', percentage: 0.3 },
			{ milestone: 'Dilution Tunnel Control Logic', weeks: 1, percentage: (0.4 * 1) / 4 },
			{ milestone: 'Dilution Tunnel User Interface', weeks: 2, percentage: (0.4 * 2) / 4 },
			{ milestone: 'Dilution Tunnel Startup', weeks: 1, percentage: (0.4 * 1) / 4 },
		])
	})
})

describe('calcTotal', () => {
	it('should return the sum of all rows that have weeks and therefore a total', () => {
		expect(calcTotal(rate, projectData)).toEqual(40 * rate * 4)
	})
})

describe('calcSubtotals', () => {
	it('should return each row with a total', () => {
		expect(calcSubtotals(rate, projectData)).toEqual([
			{ milestone: 'Dilution Tunnel Data Collection', percentage: 0.3, total: 32000 * 0.3 },
			{ milestone: 'Dilution Tunnel Data Collection', percentage: 0.3, total: 32000 * 0.3 },
			{
				milestone: 'Dilution Tunnel Control Logic',
				weeks: 1,
				percentage: (0.4 * 1) / 4,
				total: (32000 * (0.4 * 1)) / 4,
			},
			{
				milestone: 'Dilution Tunnel User Interface',
				weeks: 2,
				percentage: (0.4 * 2) / 4,
				total: (32000 * (0.4 * 2)) / 4,
			},
			{
				milestone: 'Dilution Tunnel Startup',
				weeks: 1,
				percentage: (0.4 * 1) / 4,
				total: (32000 * (0.4 * 1)) / 4,
			},
		])
	})
})

describe('convertToTable', () => {
	it('should convert an array of objects into a table', () => {
		expect(convertToTable(calcSubtotals(rate, projectData))).toEqual([
			['milestone', 'percentage', 'total', 'weeks'],
			[
				['Dilution Tunnel Data Collection', 0.3, 9600, undefined],
				['Dilution Tunnel Data Collection', 0.3, 9600, undefined],
				['Dilution Tunnel Control Logic', 0.1, 3200, 1],
				['Dilution Tunnel User Interface', 0.2, 6400, 2],
				['Dilution Tunnel Startup', 0.1, 3200, 1],
			],
		])
	})
})
