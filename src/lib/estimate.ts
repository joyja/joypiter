import * as R from 'ramda'

export const taplog = (x: number | string | object | null | undefined) => console.log(x)

export type milestone = {
	milestone: string
	percentage?: number
	weeks?: number
	total?: number
}

export const calcTotalWeeks: (data: milestone[]) => number = R.pipe(
	R.filter(R.has('weeks')),
	//@ts-expect-error see line below
	//TODO: Investigate Ramda ts error
	R.pluck('weeks'),
	R.sum,
)

export const calcTotalNonweeks: (data: milestone[]) => number = R.pipe(
	//@ts-expect-error see line below
	//TODO: Investigate Ramda ts error
	R.filter(R.complement(R.has('weeks') as (milestone: milestone) => boolean)),
	R.pluck('percentage'),
	R.sum,
)

export const calcPercentages = (data: milestone[]) => {
	const totalWeeks = calcTotalWeeks(data)
	const totalNonWeeks = calcTotalNonweeks(data)
	return R.map(
		R.when(R.has('weeks'), (milestone: milestone) =>
			R.assoc('percentage', ((1 - totalNonWeeks) * milestone.weeks!) / totalWeeks, milestone),
		),
		data,
	)
}

export const calcTotal = R.curry((rate: number, data: milestone[]) =>
	R.pipe(calcTotalWeeks, R.multiply(40), R.multiply(rate))(data),
)

export const calcSubtotals = (rate: number, data: milestone[]) => {
	const total = calcTotal(rate, data)
	return R.pipe(
		calcPercentages,
		R.map((milestone: milestone) => R.assoc('total', milestone.percentage! * total, milestone)),
	)(data)
}

export const convertToTable = (
	arrayOfObjects: { [key: string]: string | number | object | null | undefined }[],
) => {
	const headers = R.pipe(
		R.map(
			R.keys as (object: {
				[key: string]: string | number | object | null | undefined
			}) => string[],
		),
		R.flatten,
		R.uniq,
	)(arrayOfObjects) as string[]
	return {
		headers,
		rows: R.map(R.props(headers), arrayOfObjects),
	}
}
