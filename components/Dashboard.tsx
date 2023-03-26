import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useFetchGraphData } from '@/hooks/useFetchGraphData'
import { CalendarChartData, FetchedEventsObj, NutritionChartData, SleepChartData } from '@/types/commonType'
import { formatBboyEvents } from '@/utils/formatBboyEvents'
import { formatDEUEvents } from '@/utils/formatDEUEvents'
import { formatHealthEvents } from '@/utils/formatHealthEvents'
import { formatNutrition } from '@/utils/formatNutrition'
import { formatSleepEvents } from '@/utils/formatSleepEvents'

import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import BboyChart from './BboyChart'
import DEUChart from './DEUChart'
import MobilityChart from './Mobility'
import NutritionChart from './NutritionChart'
import SleepChart from './SleepChart'
import StrengthChart from './StrengthChart'
import TableChart from './TableChart'
import VO2Chart from './VO2Chart'

const Dashboard = () => {
	const { events, tasks } = useFetchGraphData()

	let sleepData: SleepChartData | null = null
	let nutritionData: NutritionChartData | null = null
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
	}

	if (tasks) {
		nutritionData = formatNutrition(tasks)
	}

	console.log('events: ', events)
	console.log('tasks: ', tasks)

	return (
		<div className='chartContainer'>
			{sleepData && <SleepChart data={sleepData} />}
			{nutritionData && <NutritionChart data={nutritionData} />}
			{DEUData && <DEUChart data={DEUData} />}
			{bboyData && <BboyChart data={bboyData} />}
			{strengthData && <StrengthChart data={strengthData} />}
			{VO2Data && <VO2Chart data={VO2Data} />}
			{wristsData && <MobilityChart data={wristsData} title='Wrists'/>}
			{lowerBodyData && <MobilityChart data={lowerBodyData} title='Lower Body'/>}
			{shoulderData && <MobilityChart data={shoulderData} title='Shoulder'/>}
			{rollData && <MobilityChart data={rollData} title='Roll'/>}
			{neckData && <MobilityChart data={neckData} title='Neck'/>}
			{flossData && <MobilityChart data={flossData} title='Floss'/>}
		</div>
	)
}

export default Dashboard
