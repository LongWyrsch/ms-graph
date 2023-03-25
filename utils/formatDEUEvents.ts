import { CalendarChartData, FetchedEventsObj } from '@/types/commonType'
import { getDurationHours } from './getDurationHours'

export const formatDEUEvents = (fetchedObj: FetchedEventsObj) => {
	const events = fetchedObj.body.value

	let DEUData: CalendarChartData = []

	for (const event of events) {
		const startDate = new Date(event.start.dateTime)
		const endDate = new Date(event.end.dateTime)
		const durationHours = getDurationHours(startDate, endDate)
		const date = startDate
		date.setHours(0, 0, 0, 0)

		const grammatikHrs = event.subject.includes('#grammatik') ? durationHours : 0
		const ubungenHrs = event.subject.includes('#übungen') ? durationHours : 0
		const schreibenHrs = event.subject.includes('#schreiben') ? durationHours : 0
		const lesenHrs = event.subject.includes('#lesen') ? durationHours : 0

		// Goal of 20mn is set by min value in the calendar chart options
		if (grammatikHrs || ubungenHrs || schreibenHrs || lesenHrs) {
			const index = DEUData.findIndex((row) => {
				row[0] == date
			})
			if (index > -1) {
				DEUData[index][1] += grammatikHrs + ubungenHrs + schreibenHrs + lesenHrs
			} else {
				DEUData.push([date, grammatikHrs + ubungenHrs + schreibenHrs + lesenHrs])
			}
		}

		DEUData.push([startDate, durationHours])
	}

	return DEUData
}
