import React from 'react'
import ComboChart from './ComboChart'
import { SleepChartData } from '@/types/commonType'

type SleepChartDataProps = {
	data: SleepChartData
}

const SleepChart = ({ data }: SleepChartDataProps) => {
	const today = new Date()
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const currentMonthName = monthNames[today.getMonth()]
	const options: google.visualization.ComboChartOptions = {
		title: 'Sleep',
		animation: {
			duration: 1000,
			easing: 'inAndOut',
			startup: true
		},
		vAxis: { 
			title: 'hours', 
			gridlines: {
			// 	color: 'transparent',
			},
			// ticks: [1,2,3,4,5,6,7,8,9,10,11]
		},
		hAxis: {
			title: currentMonthName,
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
			4: {
				type: 'line'
			},
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
		tooltip: {trigger: 'selection'},
		// width: 300,
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
