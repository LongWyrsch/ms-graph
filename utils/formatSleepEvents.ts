import { FetchedEvents, FetchedEventsObj, SleepChartData } from '@/types/commonType'
import { firstAndLastDayOfMonth } from './firstAndLastDayOfMonth'
import { dateTimeToDay } from '@/utils/formatDate'

export const formatSleepEvents = (events: FetchedEvents[]) => {
	const goal = 8 // wake up at 8am

	// let sleepData: SleepChartData = [['date', 'block1', 'block2', 'block3', 'total', 'goal', 'weekend']]
	let sleepData: SleepChartData = [
		[
			{ label: 'date', type: 'string' },
			{ label: 'block1', type: 'number' },
			{ label: 'block2', type: 'number' },
			{ label: 'block3', type: 'number' },
			{ label: 'total', type: 'number' },
			{ label: 'goal', type: 'number' },
			{ label: 'weekend', type: 'number' },
		],
	]

	// ~ ~ ~ ~ ~ ~ ~ ~ populate sleepData with empty values for every day of current month ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
	const { firstDayOfMonth, firstDayOfNextMonth } = firstAndLastDayOfMonth()

	// Iterate through each day of the current month
	for (let day = firstDayOfMonth; day < firstDayOfNextMonth; day.setDate(day.getDate() + 1)) {
		// One series is just to mark the weekend. Create a mark at 0 on the X axis.
		const weekendMark = isWeekend(day) ? 0 : null

		const date = dateTimeToDay(day)
		sleepData.push([date, null, null, null, null, 8, weekendMark])
	}
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

	if (events && events.length > 0) {
		for (const event of events) {
			// If for some reason, the event is not a sleep event, skip
			if (event.subject.toLowerCase() !== '#sleep') continue

			// Adjust time for local time zone of the event. The Graph data is at UTC 0. Need to shift according to event location and time (summer and winter can have different timezones).
			const adjustedStartDateTime = adjustForTimeZone(event.start.dateTime)
			const adjustedEndDateTime = adjustForTimeZone(event.end.dateTime)

			const startTime = dateTimeToHour(adjustedStartDateTime) // ex: 23:30:00 => 23.5
			const endTime = dateTimeToHour(adjustedEndDateTime)

			// Even if you go to bed at 11pm, I still consider that event belonging to the next day. 
			// adjustedEventDate() will return the adjusted date, with time set to 00:00:00
			const adjustedEventDate = adjustEventDate(adjustedStartDateTime, startTime)

			// I am only tracking sleep for the current month
			if (!isCurrentMonth(adjustedEventDate)) continue

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

			// const sleepDate = dateTimeToDay(adjustedDateTime)

			const index = sleepData.findIndex((arr) => arr[0] == dateTimeToDay(adjustedEventDate))
			if (index !== -1) {
				// sleepData[index][0] = sleepDate
				sleepData[index][1] = block1
				sleepData[index][2] = block2
				sleepData[index][3] = block3
				sleepData[index][4] = total
			}
		}
	}
	// console.log(sleepData)
	return sleepData
}

const isWeekend = (date: Date) => {
	const dayOfWeek = date.getDay()
	return dayOfWeek === 0 || dayOfWeek === 6
}

const adjustForTimeZone = (dateTimeString: string) => {
	const dateTime = new Date(dateTimeString)
	const timezoneOffset = (dateTime.getTimezoneOffset() / 60) * -1

	dateTime.setTime(dateTime.getTime() + timezoneOffset * 60 * 60 * 1000)

	return dateTime
}

const dateTimeToHour = (dateTime: Date) => {
	const hours = dateTime.getHours()
	const minutes = dateTime.getMinutes()
	const seconds = dateTime.getSeconds()
	return hours + minutes / 60 + seconds / 3600
}

const adjustEventDate = (dateTime: Date, startTime: number) => {
	let adjustedDate = new Date()
	if (startTime > 18) {
		// Adding one day to the date (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
		adjustedDate.setTime(dateTime.getTime() + 24 * 60 * 60 * 1000)
	} else {
		adjustedDate.setTime(dateTime.getTime())
	}
	adjustedDate.setHours(0, 0, 0, 0)

	return adjustedDate
}

const isCurrentMonth = (date: Date) => {
	const eventMonth = date.getMonth() // Months are 0-indexed

	// Get current month
	const today = new Date()
	const currentMonth = today.getMonth()

	return eventMonth == currentMonth
}

// const dateTimeToDate = (dateTime: Date) => {

// 	if (startTime > 18) {
// 		// Adding one day to the date (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
// 		dateTime.setTime(dateTime.getTime() + 24 * 60 * 60 * 1000)
// 	}

// 	// Removing the time portion by setting hours, minutes, seconds, and milliseconds to zero
// 	// dateTime.setHours(0, 0, 0, 0)

// 	// Converting the modified Date object back to a string
// 	const dateString = dateTimeToDay(dateTime)

// 	return dateString // "21"
// }
