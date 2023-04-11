import { themeContext } from '@/pages'
import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import { useCalendarColors } from '@/hooks/useCalendarColors'
import React, { useContext } from 'react'
import Calendar from './ChartCalendar'

const Strength = ({ data }: CalendarChartDataProps) => {
	// Get colors common to all calendar charts
	const { calendarBackgroundColor, today } = useCalendarColors()

	const options: google.visualization.CalendarOptions = {
		title: 'Strength (min 3 sets of each)',
		colorAxis: {
			colors: [today, calendarBackgroundColor, '#ff9933', '#cc6600'],
			values: [-1, 0, 6, 12],
		},
		// height: 350,
	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default Strength
