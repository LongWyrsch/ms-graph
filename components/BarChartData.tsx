import React from 'react'
import BarChart from './BarChart'

const BarChartData: React.FC = () => {
	const data: Array<[string, number]> = [
		['Category 1', 10],
		['Category 2', 20],
		['Category 3', 30],
	]

	const options: google.visualization.BarChartOptions = {
		title: 'My Bar Chart',
		width: 600,
		height: 400,
		legend: { position: 'none' },
	}

	return (
		<div>
			<BarChart data={data} options={options} />
		</div>
	)
}

export default BarChartData
