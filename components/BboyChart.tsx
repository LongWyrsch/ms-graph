import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import React from 'react'
import Calendar from './Calendar'



const BboyChart = ({ data }: CalendarChartDataProps) => {
	const options: google.visualization.CalendarOptions = {
		title: 'Bboying',
		// height: 350,
        colorAxis: {
            minValue: 0,
            maxValue: 2
        }
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default BboyChart
