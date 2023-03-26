import { CalendarChartData, FetchedEventsObj } from '@/types/commonType'
import { getDurationHours } from './getDurationHours'

export const formatBboyEvents = (fetchedObj: FetchedEventsObj) => {
	const events = fetchedObj.body.value

    // Create data array and add a row for today, so that the calendar shows today's cell
	let bboyData: CalendarChartData = [[new Date(), -1]]

	if (events && events.length > 0) {
        for (const event of events) {
            const startDate = new Date(event.start.dateTime)
            const endDate = new Date(event.end.dateTime)
            const durationHours = getDurationHours(startDate, endDate)
            const date = startDate
            date.setHours(0, 0, 0, 0)

            const index = bboyData.findIndex(row => {row[0]==date})
            if (index > -1) {
                bboyData[index][1] += durationHours
            } else {
                bboyData.push([date, durationHours])
            }
        }
    }

    return bboyData
}
