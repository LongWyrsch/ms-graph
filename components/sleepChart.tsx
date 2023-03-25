import React from 'react'
import ComboChart from './ComboChart'
import { SleepChartData } from '@/types/commonType'

type SleepChartDataProps = {
	data: SleepChartData
}

const SleepChart = ({data}: SleepChartDataProps) => {

	const options: google.visualization.ComboChartOptions = {
		title: 'My Sleep Chart',
		vAxis: {title: 'hours'},
		hAxis: {title: 'day'},
		seriesType: 'bars',
		isStacked: true,
		series: {3: {type: 'line'}},
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
