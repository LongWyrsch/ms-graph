
/*
The function takes an array of object. Each object is a tasks. 
The tasks are nutrion type, so they are daily, and therefore have a "dueDateTime.dateTime" field.
There is also a "status" filed that can be "completed" and the "title" field.

So if a task has status = "completed", extract title and dueDateTime and add "true" in the google chart accordingly
    title = "fish oil"
    "dueDateTime.dateTime" = "2023-03-21T23:00:00.0000000"

*/

import { CalendarChartData, FetchedTasksObj, NutritionChartData } from '@/types/commonType'
import { getDurationHours } from './getDurationHours'

export const formatNutrition = (tasks: FetchedTasksObj) => {

	let nutritionData: NutritionChartData = [[ new Date('2000-01-01T00:00:00.0000000'),'pill', 'yogurt', 'probiotics', 'greens', 'protein']]

	// Add a row for each day of the month
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
	const currentDate = new Date()
	const currentMonth = currentDate.getMonth()
	const currentYear = currentDate.getFullYear()
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1) // Get the first day of the current month
	const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1) // Get the first day of the next month

	// Iterate through each day of the current month
	for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
		// const date = dateToDay(day)
		nutritionData.push([structuredClone(day), '', '', '', '', '']);		
	}
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
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

	return nutritionData
}


