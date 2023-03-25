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

import { FetchedEventsObj, SleepChartData } from "@/types/commonType"

export const formatSleepEvents = (fetchedObj: FetchedEventsObj) => {
	const events = fetchedObj.body.value
	const goal = 8 // wake up at 8am

	let sleepData: SleepChartData = [['date', 'block1', 'block2', 'block3', '8 hours']]
	for (const event of events) {
		if (event.subject.toLowerCase() !== '#sleep') continue

        
        // Adjust time for my local time zone. The Graph data is at UTC 0. Need to shift according to my location.
        const date = new Date();
        const timezoneOffsetMinutes = date.getTimezoneOffset();
        const timezoneOffset = timezoneOffsetMinutes / 60 * -1;
        
		const startTime = dateTimeToHour(event.start.dateTime) + timezoneOffset
		const endTime = dateTimeToHour(event.end.dateTime) + timezoneOffset

		let block1 = 0
		let block2 = 0
		let block3 = 0
		if (startTime > 18 && endTime < 12) {
			block1 = (24 - startTime) * - 1
			block3 = endTime
		} else if (startTime >= 0 && startTime < 12 && endTime < 12) {
			block2 = startTime
			block3 = endTime - startTime
		}

		const sleepDate = dateTimeToDate(event.start.dateTime, startTime)

		sleepData.push([sleepDate, block1, block2, block3, goal])
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
	const dateString = dateTime.toISOString().split('T')[0]

	return dateString // "2023-03-21"
}
