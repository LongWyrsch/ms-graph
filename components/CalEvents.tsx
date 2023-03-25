import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useFetchGraphData } from '@/hooks/useFetchGraphData'
import { CalendarChartData, FetchedEventsObj, SleepChartData } from '@/types/commonType'
import { formatBboyEvents } from '@/utils/formatBboyEvents'
import { formatStrengthEvents } from '@/utils/formatHealthEvents'
import { formatSleepEvents } from '@/utils/formatSleepEvents'

import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import BboyChart from './BboyChart'
import SleepChart from './SleepChart'
import StrengthChart from './StrengthChart'

const CalEvents = () => {
	const { events, tasks } = useFetchGraphData()

	let sleepEvents: SleepChartData | null = null
	let bboyEvents: CalendarChartData | null = null
	let strengthEvents: CalendarChartData | null = null
	// let studyEvents = null
	// let codeEvents = null
	// let tasks = null
	if (events) {
		sleepEvents = formatSleepEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '1')[0])
		bboyEvents = formatBboyEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '2')[0])
		strengthEvents = formatStrengthEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '3')[0])
		//      studyEvents = formatStudyEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '4')[0])
		//      codeEvents = formatCodeEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '5')[0])
		//      tasks = formatTasks(tasks)
	}

	console.log('events: ', events)
	console.log('tasks: ', tasks)

	return (
		<div>
			{/* {loadingData && <div>Loading</div>} */}
			{/* {graphData?.map((event, i)=> (
                    <div key={i}>
                        <div>{event.subject}</div>
                        <div>{event.start.dateTime}</div>
                        <br/>
                    </div>
            )
            )} */}
			{sleepEvents && <SleepChart data={sleepEvents} />}
			{bboyEvents && <BboyChart data={bboyEvents} />}
			{strengthEvents && <StrengthChart data={strengthEvents} />}
		</div>
	)
}

export default CalEvents
