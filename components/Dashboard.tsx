import React from 'react'
import { useFetchGraphData } from '@/hooks/useFetchGraphData'
import { CalendarChartData, FetchedEvents, FetchedEventsObj, NutritionChartData, SleepChartData } from '@/types/commonType'
import { formatBboyEvents } from '@/utils/formatBboyEvents'
import { formatDEUEvents } from '@/utils/formatDEUEvents'
import { formatHealthEvents } from '@/utils/formatHealthEvents'
import { formatNutrition } from '@/utils/formatNutrition'
import { formatSleepEvents } from '@/utils/formatSleepEvents'

import Bboy from './Bboy'
import DEU from './DEU'
import Mobility from './Mobility'
import Nutrition from './Nutrition'
import Sleep from './Sleep'
import Strength from './Strength'
import VO2 from './VO2'
import { hideCalendarColorLegend, hideTextElements } from '@/utils/hideElements'
import Message from './Message'

const Dashboard = () => {
	const { fetchedEvents, tasks } = useFetchGraphData()

	// Set data to null to conditionally render their component
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

	// Format the data received from the Graph
	if (fetchedEvents) {
		console.log(fetchedEvents)
		sleepData = formatSleepEvents(fetchedEvents.sleepEvents)
		bboyData = formatBboyEvents(fetchedEvents.bboyEvents)
		
		const [strength, VO2, wrists, lowerBody, shoulder, roll, neck, floss] = formatHealthEvents(fetchedEvents.healthEvents)
		strengthData = strength
		VO2Data = VO2
		wristsData = wrists
		lowerBodyData = lowerBody
		shoulderData = shoulder
		rollData = roll
		neckData = neck
		flossData = floss

		DEUData = formatDEUEvents(fetchedEvents.studyEvents)

		setTimeout(() => {
			hideTextElements()
			hideCalendarColorLegend()
		}, 2000)
	}

	// Format the data received from the Graph
	if (tasks) {
		nutritionData = formatNutrition(tasks)
	}

	// ** Uncomment for debuging **
	// console.log('events: ', events)
	// console.log('tasks: ', tasks)

	return (
		<div className="chartContainer">
			{!fetchedEvents && <Message message="Loading..." />}
			{sleepData && <Sleep data={sleepData} />}
			{nutritionData && <Nutrition data={nutritionData} />}
			{DEUData && <DEU data={DEUData} />}
			{bboyData && <Bboy data={bboyData} />}
			{strengthData && <Strength data={strengthData} />}
			{VO2Data && <VO2 data={VO2Data} />}
			{wristsData && <Mobility data={wristsData} title="Wrists (do all 4)" lBound={4} uBound={4} />}
			{lowerBodyData && <Mobility data={lowerBodyData} title="Lower Body (min 6/9 positions)" lBound={6} uBound={9} />}
			{shoulderData && <Mobility data={shoulderData} title="Shoulder (min 3/4 positions)" lBound={3} uBound={4} />}
			{rollData && <Mobility data={rollData} title="Roll (min 30mn)" lBound={0.5} uBound={1} />}
			{neckData && <Mobility data={neckData} title="Neck (every 3 days)" lBound={0} uBound={3} />}
			{flossData && <Mobility data={flossData} title="Floss (do all 4)" lBound={4} uBound={4} />}
		</div>
	)
}

export default Dashboard
