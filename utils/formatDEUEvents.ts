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
            
            // It doesn't matter the type of activity. As long as it's one of the below 4, it sums up the duration.
            let studiedGerman = false
            if (event.subject.includes('#grammatik') || event.subject.includes('#übungen') || event.subject.includes('#schreiben') || event.subject.includes('#lesen')) {
                studiedGerman = true
            }
            
            // Goal is 1h per day.
            if (studiedGerman) {
                // Check if I already studied German that day. If so, add to the duration.
                const index = DEUData.findIndex((row) => {
                    row[0] == date
                })
                if (index > -1) {
                    DEUData[index][1] += durationHours
                } else {
                    DEUData.push([date, durationHours])
                }
            }
            
            DEUData.push([startDate, durationHours])
        }
    }
        
	return DEUData
}
