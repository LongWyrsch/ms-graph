import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import React from 'react'
import Calendar from './Calendar'

const DEUChart = ({ data }: CalendarChartDataProps) => {
	const options: google.visualization.CalendarOptions = {
		title: 'DEU',
		height: 350,
        colorAxis: {
            minValue: 1,
            // maxValue: 2
        }
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default DEUChart
