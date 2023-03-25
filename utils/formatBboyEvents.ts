import { CalendarChartData, FetchedEventsObj } from '@/types/commonType'

export const formatBboyEvents = (fetchedObj: FetchedEventsObj) => {
	const events = fetchedObj.body.value
	/*
    create empty array
    loop through each event
    push a new array with the date and number of hours trained
    */

	let bboyData: CalendarChartData = []
	for (const event of events) {
		const startDate = new Date(event.start.dateTime)
		const endDate = new Date(event.end.dateTime)
		const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)

		bboyData.push([startDate, durationHours])
	}

    return bboyData
}
