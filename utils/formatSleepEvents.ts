import { FetchedEvents, FetchedEventsObj, SleepChartData } from '@/types/commonType'
import { firstAndLastDayOfMonth } from './firstAndLastDayOfMonth'
import { dateToDay } from './formatDates'

export const formatSleepEvents = (events: FetchedEvents[]) => {
	const goal = 8 // wake up at 8am

	let sleepData: SleepChartData = [['date', 'block1', 'block2', 'block3', 'total', 'goal', 'weekend']]

	// ~ ~ ~ ~ ~ ~ ~ ~ populate sleepData with empty values for every day of current month ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
	const {firstDayOfMonth, firstDayOfNextMonth} = firstAndLastDayOfMonth()

	// Iterate through each day of the current month
	for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
		const date = dateToDay(day)

		// One series is just to mark the weekend. Create a mark at 0 on the X axis.
		const weekendMark = isWeekend(day) ? 0 : null
		sleepData.push([date, null, null, null, null, 8, weekendMark])
	}
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

	if (events && events.length > 0) {
		for (const event of events) {
			if (event.subject.toLowerCase() !== '#sleep') continue

			// Adjust time for local time zone of the event. The Graph data is at UTC 0. Need to shift according to event location and time (summer and winter can have different timezones).
			const date = new Date(event.start.dateTime)
			const timezoneOffset = (date.getTimezoneOffset() / 60) * -1
			
			const startTime = dateTimeToHour(event.start.dateTime) + timezoneOffset
			const endTime = dateTimeToHour(event.end.dateTime) + timezoneOffset
			

			let block1 = null
			let block2 = null
			let block3 = null
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
