import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import React from 'react'
import Calendar from './Calendar'


const StrengthChart = ({ data }: CalendarChartDataProps) => {
	const options: google.visualization.CalendarOptions = {
		title: 'Strength',
		height: 350,
        colorAxis: {
            minValue: 6,
        }
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default StrengthChart