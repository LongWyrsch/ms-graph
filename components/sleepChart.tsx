import React from 'react'
import ComboChart from './ComboChart'
import { SleepChartData } from '@/types/commonType'

type SleepChartDataProps = {
	data: SleepChartData
}

const SleepChart = ({ data }: SleepChartDataProps) => {
	const options: google.visualization.ComboChartOptions = {
		title: 'My Sleep Chart',
		vAxis: { title: 'hours' },
		hAxis: {
			title: 'day',
			textStyle: {
				fontSize: 8,
			},
		},
		seriesType: 'bars',
		isStacked: true,
		series: {
			0: { color: '#3d66ad' },
			1: { color: 'transparent', fillOpacity: 0 },
			2: { color: '#3d66ad' },
			3: { type: 'line', color: '#00996e' },
			4: { type: 'line' },
			5: {
				type: 'line',
				lineWidth: 0,
				pointsVisible: true,
				pointSize: 5,
				color: 'black',
			},
		},
		curveType: 'function',
		legend: { position: 'none' },

		// width: 600,
		// height: 400,
		// legend: { position: 'none' },
	}

	return (
		<div>
			<ComboChart data={data} options={options} />
		</div>
	)
}

export default SleepChart
