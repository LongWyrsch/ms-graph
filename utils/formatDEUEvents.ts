import { CalendarChartData, FetchedEvents, FetchedEventsObj } from '@/types/commonType'
import { getDurationHours } from './getDurationHours'
import { adjustForTimeZone } from './formatDate'

export const formatDEUEvents = (events: FetchedEvents[]) => {

    // Create data array and add a row for today, so that the calendar shows today's cell
	let DEUData: CalendarChartData = [[new Date(), -1]]

	if (events && events.length > 0) {
        for (const event of events) {
            const startDate = adjustForTimeZone(event.start.dateTime)
            const endDate = adjustForTimeZone(event.end.dateTime)
            const durationHours = getDurationHours(startDate, endDate)
            const date = startDate
            date.setHours(0, 0, 0, 0)
            
            const grammatikHrs = event.subject.includes('#grammatik') ? durationHours : 0
            const ubungenHrs = event.subject.includes('#übungen') ? durationHours : 0
            const schreibenHrs = event.subject.includes('#schreiben') ? durationHours : 0
            const lesenHrs = event.subject.includes('#lesen') ? durationHours : 0
            
            // Goal is 1h per day.
            // Need to add duration of above event types.
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
    }
        
	return DEUData
}
