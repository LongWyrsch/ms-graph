import { NutritionChartData } from '@/types/commonType'
import { dateToDay } from '@/utils/formatDates'
import { transpose } from '@/utils/transpose'
import React, { useEffect, useRef } from 'react'

interface TableChartProps {
	data: NutritionChartData
	options: google.visualization.TableOptions
}

const TableChart: React.FC<TableChartProps> = ({ data, options }) => {
	const chartRef = useRef<HTMLDivElement>(null)

    // Usually, you set the column and add rows for each date, but I want to set the rows and add columns for each date
    // Remove the first row which contains the dates. 
    const transposedData = transpose(data)
    transposedData.shift()
	
	useEffect(() => {
		if (typeof window !== 'undefined' && window.google) {
			// Load the Google Charts library and the specific chart type
			window.google.charts.load('current', { packages: ['table'] })

			// When the library is loaded, draw the chart
			window.google.charts.setOnLoadCallback(drawChart)
		}
	}, [transposedData, options])

	const drawChart = () => {
		if (!chartRef.current) return

		// Create a new DataTable and add columns and rows
        var chartData = new google.visualization.DataTable();

        chartData.addColumn('string', 'Nutrition');
        // Add a column for each day of the month
	    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1) // Get the first day of the current month
            const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1) // Get the first day of the next month

            // Iterate through each day of the current month
            for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
                const date = dateToDay(day)
                chartData.addColumn('string', date);
            }
	    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        chartData.addRows(transposedData);

		// Create and draw the chart
		const chart = new window.google.visualization.Table(chartRef.current)
		chart.draw(chartData, options)
	}

	return <div ref={chartRef}></div>
}

export default TableChart
