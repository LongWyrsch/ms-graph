import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useFetchGraphData } from '@/hooks/useFetchGraphData'

import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'

const CalEvents = () => {
	const [events, tasks] = useFetchGraphData()

    // if (events) {
    //     const sleepEvents = formatSleepEvents(events.find(query=query.id == 1))
    //     const bboyEvents = formatBboyEvents(events.find(query=query.id == 2))
    //     const healthEvents = formatHealthEvents(events.find(query=query.id == 3))
    //     const studyEvents = formatStudyEvents(events.find(query=query.id == 4))
    //     const codeEvents = formatCodeEvents(events.find(query=query.id == 5))
    //     const tasks = formatTasks(tasks)
    // }

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
		</div>
	)
}

export default CalEvents
