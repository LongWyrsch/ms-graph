import React from 'react'
import { CalendarChartDataProps } from '@/types/commonType'
import { useCalendarColors } from '@/hooks/useCalendarColors'
import Calendar from './ChartCalendar'

const Bboy = ({ data }: CalendarChartDataProps) => {
	// Get colors common to all calendar charts
	const { calendarBackgroundColor, today } = useCalendarColors()

	const options: google.visualization.CalendarOptions = {
		title: 'Bboying',
		colorAxis: {
			colors: [today, calendarBackgroundColor, '#ff5050', '#ff5050'],
			values: [-1, 0, 1, 3],
		},
		// height: 350,
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default Bboy
