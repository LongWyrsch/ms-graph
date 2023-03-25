import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import React from 'react'
import Calendar from './Calendar'


const VO2Chart = ({ data }: CalendarChartDataProps) => {
	const options: google.visualization.CalendarOptions = {
		title: 'VO2',
		height: 350,
        colorAxis: {
            minValue: 0.3,
        }
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default VO2Chart
