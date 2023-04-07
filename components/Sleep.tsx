import React, { useContext } from 'react'
import ComboChart from './ChartCombo'
import { SleepChartData } from '@/types/commonType'
import { themeContext } from '@/pages'

type SleepChartDataProps = {
	data: SleepChartData
}

const Sleep = ({ data }: SleepChartDataProps) => {
	const theme = useContext(themeContext)

	// Get current month to display under X axis.
	const today = new Date()
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const currentMonthName = monthNames[today.getMonth()]
	
	// Set colors based on theme	
	const backgroundColor = theme==='light'? '#ffffff' : '#222222'
	const highContrast = theme==='light'? 'black' : 'white'

	// Define chart options
	const options: google.visualization.ComboChartOptions = {
		title: 'Sleep',
		chartArea: {width: '90%'},
		titleTextStyle: {
			color: highContrast,
			fontSize: 25
		},
		backgroundColor: backgroundColor,
		// chartArea: {backgroundColor: chartAreaBackgroundColor},
		animation: {
			duration: 1000,
			easing: 'inAndOut',
			startup: true
		},
		vAxis: { 
			// title: 'hours', 
			baselineColor: highContrast,
			gridlines: {
				color: '#808080',
			},
			// ticks: [1,2,3,4,5,6,7,8,9,10,11]
		},
		hAxis: {
			title: currentMonthName,
			textStyle: {
				fontSize: 8,
				color: highContrast
			},
			titleTextStyle: { color: highContrast},
		},
		seriesType: 'bars',
		isStacked: true,
		series: {
			0: { color: '#5380c9' },
			1: { color: 'transparent', fillOpacity: 0 },
			// 1: { color: '#fc03f4'},
			2: { color: '#5380c9' },
			3: { type: 'line', color: highContrast },
			4: { type: 'line', color: '#9933ff'},
			5: {
				type: 'line',
				lineWidth: 0,
				pointsVisible: true,
				pointSize: 5,
				color: highContrast,
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

export default Sleep
