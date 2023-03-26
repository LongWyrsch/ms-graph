import { themeContext } from '@/pages'
import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import { useCalendarColors } from '@/hooks/useCalendarColors'
import React, { useContext } from 'react'
import Calendar from './ChartCalendar'

const VO2 = ({ data }: CalendarChartDataProps) => {
	// Get colors common to all calendar charts
	const { calendarBackgroundColor, today } = useCalendarColors()

	const options: google.visualization.CalendarOptions = {
		title: 'VO2',
		colorAxis: {
			colors: [today, calendarBackgroundColor, '#ff9933', '#cc6600'],
			values: [-1, 0, 0.3, 1],
		},
		// height: 350,
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default VO2
