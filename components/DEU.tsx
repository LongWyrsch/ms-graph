import { themeContext } from '@/pages'
import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import { useCalendarColors } from '@/hooks/useCalendarColors'
import React, { useContext } from 'react'
import Calendar from './ChartCalendar'

const DEU = ({ data }: CalendarChartDataProps) => {

	// Get colors common to all calendar charts
	const { calendarBackgroundColor, today } = useCalendarColors()

	const options: google.visualization.CalendarOptions = {
		title: 'DEU (1hr to 3hrs)',
		colorAxis: {
			colors: [today, calendarBackgroundColor, '#99ff99', '#009933'],
			values: [-1, 0, 1, 3],
		},
		// height: 150,
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default DEU
