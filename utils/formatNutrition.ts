import { FetchedTasksObj, NutritionChartData } from '@/types/commonType'

export const formatNutrition = (tasks: FetchedTasksObj) => {

	let nutritionData: NutritionChartData = [[ new Date('2000-01-01T00:00:00.0000000'),'pill', 'yogurt', 'probiotics', 'greens', 'protein']]

	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Add a row for each day of the month ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
	// 
	const currentDate = new Date()
	const currentMonth = currentDate.getMonth()
	const currentYear = currentDate.getFullYear()
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1) // Get the first day of the current month
	const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1) // Get the first day of the next month

	// Iterate through each day of the current month
	for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
		nutritionData.push([structuredClone(day), '', '', '', '', '']);		
	}
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
	
	if (tasks && tasks.length > 0) {
		for (const task of tasks) {		
			const name = task.title
			const date = new Date(task.dueDateTime.dateTime)
			const status = task.status
			let col = 0
			switch (name) {
				case 'pill': col = 1; break;
				case 'yogurt': col = 2; break;
				case 'probiotics': col = 3; break;
				case 'greens': col = 4; break;
				case 'protein': col = 5; break;
				default: 
			}
			
			if (status === "completed") {
				date.setHours(0, 0, 0, 0)			
				const index = nutritionData.findIndex((row) => {
					return row[0].getDate() == date.getDate() && row[0].getMonth() == date.getMonth()
				})			
				if (index > -1) {
					nutritionData[index][col] = '✓'				
				}
			}
			
		}
	}

	return nutritionData
}


