import SimpleBarChart from '@carbon/charts-react/bar-chart-simple'
import { BarChartOptions } from '@carbon/charts/interfaces'
import '@carbon/charts/styles.css'
import '@carbon/styles/css/styles.css'
import { Data, Results } from 'common/util/results.interface'

interface ChartProps {
	data: Results
	algorithm: string
	time?: number
}

const Chart = ({ data, algorithm, time }: ChartProps) => {
	const processedData = Object.values(data).flatMap((x: Data[], i) => {
		return x.flatMap(y => {
			return {
				group: `P${i}`,
				value: y,
			}
		})
	})
	const defaultOptions: BarChartOptions = {
		title: `Results for ${algorithm}`,
		axes: {
			left: {
				mapsTo: 'group',
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore-next-line
				scaleType: 'labels',
			},
			bottom: {
				mapsTo: 'value',
				includeZero: false,
			},
		},
		bars: {
			width: 50,
			spacingFactor: 0.9,
		},
		grid: {
			x: {
				numberOfTicks: time,
			},
		},
		toolbar: {
			enabled: false,
		},
		height: '50vh',
		width: '90vw',
	}
	return (
		<div>
			<SimpleBarChart data={processedData} options={defaultOptions} />
		</div>
	)
}

export default Chart
