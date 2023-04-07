import React, { useRef } from 'react'
import { SleepChartData } from '@/types/commonType'
import { useLoadChart } from '@/hooks/useLoadChart'

interface ComboChartProps {
	data: SleepChartData
	options: google.visualization.ComboChartOptions
}

const ChartCombo: React.FC<ComboChartProps> = ({ data, options }) => {
	const chartRef = useRef<HTMLDivElement>(null)

	const drawChart = () => {
		if (!chartRef.current) return

		// Create a new DataTable and add columns and rows
		var chartData = google.visualization.arrayToDataTable(data)


		// Create and draw the chart
		const chart = new window.google.visualization.ComboChart(chartRef.current)
		chart.draw(chartData, options)
	}

	useLoadChart(drawChart, data, options, 'corechart')

	return <div ref={chartRef} className='comboChart'></div>
}

export default ChartCombo
