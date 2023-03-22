import React, { useEffect, useRef } from 'react'

interface BarChartProps {
	data: Array<[string, number]>
	options: google.visualization.BarChartOptions
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (typeof window !== 'undefined' && window.google) {
			// Load the Google Charts library and the specific chart type
			window.google.charts.load('current', { packages: ['corechart'] })

			// When the library is loaded, draw the chart
			window.google.charts.setOnLoadCallback(drawChart)
		}
	}, [data, options])

	const drawChart = () => {
		if (!chartRef.current) return

		// Create a new DataTable and add columns and rows
		const dataTable = new window.google.visualization.DataTable()
		dataTable.addColumn('string', 'Category')
		dataTable.addColumn('number', 'Value')
		dataTable.addRows(data)

		// Create and draw the chart
		const chart = new window.google.visualization.BarChart(chartRef.current)
		chart.draw(dataTable, options)
	}

	return <div ref={chartRef}></div>
}

export default BarChart
