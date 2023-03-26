import { themeContext } from '@/pages'
import { CalendarChartData, CalendarChartDataProps, NutritionChartData } from '@/types/commonType'
import { changeTableCellColor } from '@/utils/changeTableCellColor'
import React, { useContext, useEffect } from 'react'
import Calendar from './Calendar'
import TableChart from './TableChart'

type NutritionChartDataProps = {
	data: NutritionChartData
}

const NutritionChart = ({ data }: NutritionChartDataProps) => {

	const theme = useContext(themeContext)

	const options: google.visualization.TableOptions = {
		height: 130,
		cssClassNames: {
			headerCell: 'nutritionHeaders',
			tableRow: 'nutritionEvenRows',
			oddTableRow: 'nutritionOddRows',
            tableCell: 'nutritionCells'
		},
		// alternatingRowStyle: true
	}

	useEffect(() => {
        const headersColor = theme === 'light' ? '#e6f7ff' : '#004466' 
        const evenRowsColor = theme === 'light' ? '#FAFAFA' : '#333333'
        const oddRowsColor = theme === 'light' ? 'white' : '#262626'
        const cellsBorder = theme === 'light' ? '#eee' : '#404040'
        const fontColor = theme === 'light' ? 'black' : 'white'

        setTimeout(() => {
            changeTableCellColor(headersColor, evenRowsColor, oddRowsColor, cellsBorder, fontColor)
        }, 200)
	}, [theme])

	return (
		<div>
			<TableChart data={data} options={options} />
		</div>
	)
}

export default NutritionChart
