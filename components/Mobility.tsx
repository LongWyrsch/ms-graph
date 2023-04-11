import { themeContext } from '@/pages'
import { CalendarChartData, CalendarChartDataProps } from '@/types/commonType'
import { useCalendarColors } from '@/hooks/useCalendarColors'
import React, { useContext } from 'react'
import Calendar from './ChartCalendar'

type MobilityChartDataProps = CalendarChartDataProps & { title: string, lBound: number, uBound: number }

const MobilityChart = ({ data, title, lBound, uBound }: MobilityChartDataProps) => {
	// Get colors common to all calendar charts
	const { calendarBackgroundColor, today } = useCalendarColors()

	const options: google.visualization.CalendarOptions = {
		title: title,
		colorAxis: {
			colors: [today, calendarBackgroundColor, '#ff9933', '#cc6600'],
			values: [-1, 0, lBound, uBound],
		},
		// height: 350,
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
