import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useFetchGraphData } from '@/hooks/useFetchGraphData'
import { BboyChartData, FetchedEventsObj, SleepChartData } from '@/types/commonType'
import { formatBboyEvents } from '@/utils/formatBboyEvents'
import { formatSleepEvents } from '@/utils/formatSleepEvents'

import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import BboyChart from './BboyChart'
import SleepChart from './SleepChart'

const CalEvents = () => {
	const { events, tasks } = useFetchGraphData()

	let sleepEvents: SleepChartData | null = null
	let bboyEvents: BboyChartData | null = null
	// let healthEvents = null
	// let studyEvents = null
	// let codeEvents = null
	// let tasks = null
	if (events) {
		sleepEvents = formatSleepEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '1')[0])
		bboyEvents = formatBboyEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '2')[0])
		//      healthEvents = formatHealthEvents(events.find(query=query.id == 3))
		//      studyEvents = formatStudyEvents(events.find(query=query.id == 4))
		//      codeEvents = formatCodeEvents(events.find(query=query.id == 5))
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
		</div>
	)
}

export default CalEvents
