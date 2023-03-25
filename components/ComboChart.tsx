import { SleepChartData } from '@/types/commonType'
import React, { useEffect, useRef } from 'react'

interface ComboChartProps {
	data: SleepChartData
	options: google.visualization.ComboChartOptions
}

const ComboChart: React.FC<ComboChartProps> = ({ data, options }) => {
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
		var chartData = google.visualization.arrayToDataTable(data)


		// Create and draw the chart
		const chart = new window.google.visualization.ComboChart(chartRef.current)
		chart.draw(chartData, options)
	}

	return <div ref={chartRef}></div>
}

export default ComboChart
