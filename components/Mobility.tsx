import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import React from 'react'
import Calendar from './Calendar'

type MobilityChartDataProps = CalendarChartDataProps & { title: string }

const MobilityChart = ({ data, title }: MobilityChartDataProps) => {
	const options: google.visualization.CalendarOptions = {
		title: title,
		// height: 350,
		colorAxis: {
            colors: ['#ff9933', '#cc6600'],
		//     minValue: 6,
		},
		// noDataPattern: {
		// 	backgroundColor: 'lightGray',
		// 	color: 'lightGray',
		// },
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default MobilityChart
