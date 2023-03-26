import { useTheme } from '@/hooks/useTheme'
import { themeContext } from '@/pages'
import React, { useContext, useEffect, useRef } from 'react'

interface CalendarProps {
	data: Array<[Date, number]>
	options: google.visualization.CalendarOptions
}

const Calendar: React.FC<CalendarProps> = ({ data, options }) => {
	const chartRef = useRef<HTMLDivElement>(null)
	const theme = useContext(themeContext)

	useEffect(() => {
		if (typeof window !== 'undefined' && window.google) {
			// Load the Google Charts library and the specific chart type
			window.google.charts.load('current', { packages: ['calendar'] })

			// When the library is loaded, draw the chart
			window.google.charts.setOnLoadCallback(drawChart)
		}


	}, [data, options])

	console.log('theme: ', theme)
	const emptyCellBackgroundColor = theme === 'light' ? '#f7f7f7' : '#3a3a3b'
	const cellBorder = theme === 'light' ? '#ffffff' : '#000000'
	const cellBorderWidth = theme === 'light' ? 1 : 0.3
	const monthSeparator = theme === 'light' ? '#e8e8e8' : '#000000'

	const drawChart = () => {
		if (!chartRef.current) return

		// Create a new DataTable and add columns and rows
		const dataTable = new window.google.visualization.DataTable()
		dataTable.addColumn({ type: 'date', id: 'Date' })
		dataTable.addColumn({ type: 'number', id: 'Won/Loss' })
		dataTable.addRows(data)

		const globalOptions = {
			calendar: {
				cellSize: 13,
				monthOutlineColor: { stroke: monthSeparator, strokeOpacity: 1, strokeWidth: 1 },
				unusedMonthOutlineColor: { stroke: monthSeparator, strokeOpacity: 0.8, strokeWidth: 2 },
				cellColor: {
					stroke: cellBorder, // Color the border of the squares.
					// strokeOpacity: 0.5, // Make the borders half transparent.
					strokeWidth: cellBorderWidth, // ...and two pixels thick.
				},
			},
			height: 150,
			noDataPattern: {
				backgroundColor: emptyCellBackgroundColor,
				color: emptyCellBackgroundColor,
			},
			...options,
		}

		// Create and draw the chart
		const chart = new window.google.visualization.Calendar(chartRef.current)
		chart.draw(dataTable, globalOptions)
	}

	return <div ref={chartRef}></div>
}

export default Calendar
