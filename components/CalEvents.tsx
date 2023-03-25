import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useFetchGraphData } from '@/hooks/useFetchGraphData'
import { CalendarChartData, FetchedEventsObj, SleepChartData } from '@/types/commonType'
import { formatBboyEvents } from '@/utils/formatBboyEvents'
import { formatDEUEvents } from '@/utils/formatDEUEvents'
import { formatHealthEvents } from '@/utils/formatHealthEvents'
import { formatSleepEvents } from '@/utils/formatSleepEvents'

import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import BboyChart from './BboyChart'
import DEUChart from './DEUChart'
import MobilityChart from './Mobility'
import SleepChart from './SleepChart'
import StrengthChart from './StrengthChart'
import VO2Chart from './VO2Chart'

const CalEvents = () => {
	const { events, tasks } = useFetchGraphData()

	let sleepData: SleepChartData | null = null
	let bboyData: CalendarChartData | null = null
	let strengthData: CalendarChartData | null = null
	let VO2Data: CalendarChartData | null = null
	let wristsData: CalendarChartData | null = null
	let lowerBodyData: CalendarChartData | null = null
	let shoulderData: CalendarChartData | null = null
	let rollData: CalendarChartData | null = null
	let neckData: CalendarChartData | null = null
	let flossData: CalendarChartData | null = null
	let DEUData: CalendarChartData | null = null
	// let codeData = null
	// let tasks = null
	if (events) {
		sleepData = formatSleepEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '1')[0])
		bboyData = formatBboyEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '2')[0])
		
		const [strength, VO2, wrists, lowerBody, shoulder, roll, neck, floss] = formatHealthEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '3')[0])
		strengthData = strength
		VO2Data = VO2
		wristsData = wrists
		lowerBodyData = lowerBody
		shoulderData = shoulder
		rollData = roll
		neckData = neck
		flossData = floss
		
		DEUData = formatDEUEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '4')[0])
		//      codeData = formatCodeEvents(events.filter((calendar: FetchedEventsObj) => calendar.id === '5')[0])
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
			{sleepData && <SleepChart data={sleepData} />}
			{bboyData && <BboyChart data={bboyData} />}
			{strengthData && <StrengthChart data={strengthData} />}
			{VO2Data && <VO2Chart data={VO2Data} />}
			{wristsData && <MobilityChart data={wristsData} title='Wrists'/>}
			{lowerBodyData && <MobilityChart data={lowerBodyData} title='Lower Body'/>}
			{shoulderData && <MobilityChart data={shoulderData} title='Shoulder'/>}
			{rollData && <MobilityChart data={rollData} title='Roll'/>}
			{neckData && <MobilityChart data={neckData} title='Neck'/>}
			{flossData && <MobilityChart data={flossData} title='Floss'/>}
			{DEUData && <DEUChart data={DEUData} />}
		</div>
	)
}

export default CalEvents
