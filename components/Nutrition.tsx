import { themeContext } from '@/pages'
import { CalendarChartData, CalendarChartDataProps, NutritionChartData } from '@/types/commonType'
import { changeTableCellColor } from '@/utils/changeTableCellColor'
import React, { useContext, useEffect } from 'react'
import Calendar from './ChartCalendar'
import ChartTable from './ChartTable'

type NutritionChartDataProps = {
	data: NutritionChartData
}

const Nutrition = ({ data }: NutritionChartDataProps) => {
	const theme = useContext(themeContext)

	const options: google.visualization.TableOptions = {
		height: 150,
		cssClassNames: {
			headerCell: theme + 'NutritionHeaders',
			tableRow: theme + 'NutritionEvenRows',
			oddTableRow: theme + 'NutritionOddRows',
			tableCell: theme + 'NutritionCells',
		},
		// alternatingRowStyle: true
	}

	return (
		<div>
			<ChartTable data={data} options={options} />
		</div>
	)
}

export default Nutrition
