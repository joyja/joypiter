import { it, expect, describe } from 'vitest'

import * as R from 'ramda'

const rate = 200

const taplog = (x: number | string | object | null | undefined ) => console.log(x)

type milestone = {
	milestone: string
	rate?: number
	weeks?: number
	total?: number
}

const projectData: milestone[] = [
	{ milestone: 'Dilution Tunnel Data Collection', rate: 0.3 },
	{ milestone: 'Dilution Tunnel Data Collection', rate: 0.3 },
	{ milestone: 'Dilution Tunnel Control Logic', weeks: 1 },
	{ milestone: 'Dilution Tunnel User Interface', weeks: 1 },
	{ milestone: 'Dilution Tunnel Startup', weeks: 1 }
]

const calcEffortRow = (milestone: milestone): milestone =>
	R.when(
		// Need the as to tell typescript that the input isn't unkown
		R.has('weeks') as (milestone: milestone) => boolean,
		R.assoc('total', R.pipe(R.multiply(40), R.multiply(rate))(milestone.weeks!)),
		milestone
	)

const calcEfforRows = (data: milestone[]) => R.map(calcEffortRow, data)

const calcSubtotal = R.pipe(
	R.map(calcEffortRow),
	R.filter(R.has('total') as (milestone: milestone) => boolean),
	R.pluck('total') as (milestones: milestone[]) => number[],
	R.sum
)

const calcRatePercentageTotal = R.pipe(
	R.filter(R.has('rate') as (milestone: milestone) => boolean),
	R.pluck('rate') as (milestones: milestone[]) => number[],
	R.sum
)

const calcTotal = R.converge(
	(subtotal: number, rate: number) => subtotal * rate,
	[calcSubtotal, calcRatePercentageTotal]
)

const calcRateRow = R.curry(
	(total: number, milestone: milestone): milestone =>
		R.when(
			// Need the as to tell typescript that the input isn't unkown
			R.has('rate') as (milestone: milestone) => boolean,
			R.assoc('total', R.pipe(R.multiply(total))(milestone.rate!)),
			milestone
		)
)

const calcRateRows = (data: milestone[]) => {
	const total = calcTotal(data)
	return R.map(calcRateRow(total), data)
}

const calcRows = R.pipe(calcEfforRows, calcRateRows)

describe('calcEffortRow', () => {
	it('should calc a total if weeks is defined', () => {
		expect(calcEffortRow({ milestone: 'Dilution Tunnel Startup', weeks: 1 })).toEqual({
			milestone: 'Dilution Tunnel Startup',
			weeks: 1,
			total: rate * 40
		})
	})
	it('should not calc a total if weeks is not defined', () => {
		expect(calcEffortRow({ milestone: 'Dilution Tunnel Startup' })).toEqual({
			milestone: 'Dilution Tunnel Startup',
			total: undefined
		})
	})
})

describe('subTotal', () => {
	it('should return the sum of all rows that have weeks and therefore a total', () => {
		expect(calcSubtotal(projectData)).toEqual(40 * rate * 3)
	})
})

describe('calcRatePercentageTotal', () => {
	it('should return the sum of all rows that have rate and therefore a total', () => {
		expect(calcRatePercentageTotal(projectData)).toEqual(0.6)
	})
})

describe('calcTotal', () => {
	it('should return the sum of all effort rows plus the appropriate percentage for rate rows', () => {
		expect(calcTotal(projectData)).toEqual(24000 / (1 - 0.6))
	})
})

describe('calcRateRows', () => {
	it('should return the sum of all rows that have weeks and therefore a total', () => {
		expect(calcRateRows(projectData)).toEqual([
			{ milestone: 'Dilution Tunnel Data Collection', rate: 0.3, total: 18000 },
			{ milestone: 'Dilution Tunnel Data Collection', rate: 0.3, total: 18000 },
			{ milestone: 'Dilution Tunnel Control Logic', weeks: 1 },
			{ milestone: 'Dilution Tunnel User Interface', weeks: 1 },
			{ milestone: 'Dilution Tunnel Startup', weeks: 1 }
		])
	})
})

describe('calcRows', () => {
	it('should return each row with a total', () => {
		expect(calcRows(projectData)).toEqual([])
	})
})
