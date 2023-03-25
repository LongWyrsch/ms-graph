/*
COMBO chart expected data
[
    ['Time blocks', 'Sleep before midnight', 'Awake after midnight', 'Sleep after midnight', { role: 'annotation' } ],
    ['22/03', 1, 0, 7, ''],
    ...
]

senarios
    1 ex: 11pm-6am
    2 ex: 0-7am 
    3 ex: 1am-8am
*/

import { FetchedEventsObj, SleepChartData } from '@/types/commonType'
import { dateToDay } from './formatDates'

export const formatSleepEvents = (fetchedObj: FetchedEventsObj) => {
	const events = fetchedObj.body.value
	const goal = 8 // wake up at 8am

	let sleepData: SleepChartData = [['date', 'block1', 'block2', 'block3', 'total', 'goal', 'weekend']]

	// populate sleepData with empty values for every day of current month
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
		const currentDate = new Date()
		const currentMonth = currentDate.getMonth()
		const currentYear = currentDate.getFullYear()
		const firstDayOfMonth = new Date(currentYear, currentMonth, 1) // Get the first day of the current month
		const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1) // Get the first day of the next month

		// Iterate through each day of the current month
		for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
			const date = dateToDay(day)
			const weekendMark = isWeekend(day) ? 0 : null
			sleepData.push([date, null, null, null, null, 8, weekendMark])
		}
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

	for (const event of events) {
		if (event.subject.toLowerCase() !== '#sleep') continue

		// Adjust time for my local time zone. The Graph data is at UTC 0. Need to shift according to my location.
		const timezoneOffset = (currentDate.getTimezoneOffset() / 60) * -1

		const startTime = dateTimeToHour(event.start.dateTime) + timezoneOffset
		const endTime = dateTimeToHour(event.end.dateTime) + timezoneOffset

		let block1 = 0
		let block2 = 0
		let block3 = 0
		let total = 0
		if (startTime > 18 && endTime < 12) {
			block1 = (24 - startTime) * -1
			block3 = endTime
			total = block1 + block3
		} else if (startTime >= 0 && startTime < 12 && endTime < 12) {
			block2 = startTime
			block3 = endTime - startTime
			total = block3
		}

		const sleepDate = dateTimeToDate(event.start.dateTime, startTime)

		const index = sleepData.findIndex((arr) => arr[0] == sleepDate)
		if (index !== -1) {
			// sleepData[index][0] = sleepDate
			sleepData[index][1] = block1
			sleepData[index][2] = block2
			sleepData[index][3] = block3
			sleepData[index][4] = total
		}
	}

	return sleepData
}

const dateTimeToHour = (dateTimeString: string) => {
	const dateTime = new Date(dateTimeString)
	const hours = dateTime.getHours()
	const minutes = dateTime.getMinutes()
	const seconds = dateTime.getSeconds()
	return hours + minutes / 60 + seconds / 3600
}

const dateTimeToDate = (dateTimeString: string, startTime: number) => {
	const dateTime = new Date(dateTimeString)

	if (startTime > 18) {
		// Adding one day to the date (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
		dateTime.setTime(dateTime.getTime() + 24 * 60 * 60 * 1000)
	}

	// Removing the time portion by setting hours, minutes, seconds, and milliseconds to zero
	// dateTime.setHours(0, 0, 0, 0)

	// Converting the modified Date object back to a string
	const dateString = dateToDay(dateTime)

	return dateString // "21"
}

const isWeekend = (date: Date) => {
	const dayOfWeek = date.getDay()
	return dayOfWeek === 0 || dayOfWeek === 6
}
