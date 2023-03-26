import { CalendarChartData, NutritionChartData, SleepChartData } from "@/types/commonType"
import { useEffect } from "react"

type data = SleepChartData | NutritionChartData | CalendarChartData
type options = google.visualization.TableOptions | google.visualization.ComboChartOptions | google.visualization.CalendarOptions

export const useLoadChart = (drawChart: ()=>void, data: data, options: options, chartType: string) => { 
    useEffect(() => {
		if (typeof window !== 'undefined' && window.google) {
			// Load the Google Charts library and the specific chart type
			window.google.charts.load('current', { packages: [chartType] })

			// When the library is loaded, draw the chart
			window.google.charts.setOnLoadCallback(drawChart)
		}
	}, [data, options])
 }