import React, { useEffect, useRef } from 'react'

interface CalendarProps {
	data: Array<[Date, number]>
	options: google.visualization.CalendarOptions
}

const Calendar: React.FC<CalendarProps> = ({ data, options }) => {
	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (typeof window !== 'undefined' && window.google) {
			// Load the Google Charts library and the specific chart type
			window.google.charts.load('current', { packages: ['calendar'] })

			// When the library is loaded, draw the chart
			window.google.charts.setOnLoadCallback(drawChart)
		}
	}, [data, options])

	const drawChart = () => {
		if (!chartRef.current) return

		// Create a new DataTable and add columns and rows
		const dataTable = new window.google.visualization.DataTable()
		dataTable.addColumn({ type: 'date', id: 'Date' })
		dataTable.addColumn({ type: 'number', id: 'Won/Loss' })
		dataTable.addRows(data)

		// Create and draw the chart
		const chart = new window.google.visualization.Calendar(chartRef.current)
		chart.draw(dataTable, options)
	}

	return <div ref={chartRef}></div>
}

export default Calendar
