import React, { useRef } from 'react'
import { NutritionChartData } from '@/types/commonType'
import { useLoadChart } from '@/hooks/useLoadChart'
import { firstAndLastDayOfMonth } from '@/utils/firstAndLastDayOfMonth'
import { dateToDay } from '@/utils/formatDates'
import { transpose } from '@/utils/transpose'

interface TableChartProps {
	data: NutritionChartData
	options: google.visualization.TableOptions
}

const ChartTable: React.FC<TableChartProps> = ({ data, options }) => {
	const chartRef = useRef<HTMLDivElement>(null)

    // Usually, you set the column and add rows for each date, but I want to set the rows and add columns for each date.
    const transposedData = transpose(data)
    // Remove the first row which contains the dates. 
    transposedData.shift()

	const drawChart = () => {
		if (!chartRef.current) return

		// Create a new DataTable and add columns and rows
        var chartData = new google.visualization.DataTable();

        chartData.addColumn('string', 'Nutrition');
        
	    // ~ ~ ~ ~ ~ ~ ~ ~ ~ Add a column for each day of the month ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
		const {firstDayOfMonth, firstDayOfNextMonth} = firstAndLastDayOfMonth()

        for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
			// Iterate through each day of the current month
            const date = dateToDay(day)
            chartData.addColumn('string', date);
        }
	    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        chartData.addRows(transposedData);
        

		// Create and draw the chart
		const chart = new window.google.visualization.Table(chartRef.current)
		chart.draw(chartData, options)
	}

	useLoadChart(drawChart, data, options, 'table')

	return <div ref={chartRef}></div>
}

export default ChartTable
