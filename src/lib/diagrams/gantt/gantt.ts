import * as d3 from 'd3'
import * as R from 'ramda'

type Task = {
	id: string
	startDate: Date
	endDate: Date
}

export const createXAxis: (width: number, tasks: Task[]) => d3.ScaleTime<number, number> = R.curry(
	(width, tasks) =>
		R.pipe(
			R.filter(
				R.both(
					R.pipe(R.prop('startDate'), R.isNotNil) as (task: Task) => boolean,
					R.pipe(R.prop('endDate'), R.isNotNil) as (task: Task) => boolean,
				),
			),
			(tasks: Task[]) =>
				d3
					.scaleTime()
					.domain([
						d3.min(tasks, (d: Task) => d.startDate)!,
						d3.max(tasks, (d: Task) => d.endDate)!,
					])
					.range([0, width]),
		)(tasks),
)

export const createYAxis: (height: number, tasks: Task[]) => d3.ScaleBand<string> = R.curry(
	(height, tasks) =>
		R.pipe(R.filter(R.pipe(R.prop('id'), R.isNotNil) as (task: Task) => boolean), (tasks: Task[]) =>
			d3
				.scaleBand()
				.domain(tasks.map((d) => d.id))
				.range([0, height])
				.padding(0.1),
		)(tasks),
)
