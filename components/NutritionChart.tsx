import { CalendarChartData, CalendarChartDataProps, NutritionChartData } from '@/types/commonType'
import React from 'react'
import Calendar from './Calendar'
import TableChart from './TableChart'

type NutritionChartDataProps = {
	data: NutritionChartData
}

const NutritionChart = ({ data }: NutritionChartDataProps) => {
	const options: google.visualization.TableOptions = {
		height: 130,
        cssClassNames: {
            tableCell: 'nutritionCells',
            headerCell: 'nutritionHeaders'
        },
        // alternatingRowStyle: false
	}

	return (
		<div>
			<TableChart data={data} options={options} />
		</div>
	)
}

export default NutritionChart
