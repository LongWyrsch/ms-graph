/*

create an array by filtering events with subject #push, #pull, #stabilization with following condtions
    if push, check body. 
        use    /(?<=`dips`\s*\[sets::)\d+(?=\])/    to find number of dips
            must be equal or greater than 3
        use    /(?<=`push-ups`\s*\[sets::)\d+(?=\])/    to find number of pushups
            must be equal or greater than 3
    if pull, check body. 
        use    /(?<=`pull-ups`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 3
        use    /(?<=`bicep curls`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 2
        use    /(?<=`inverted rows`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 3
    if stabilization, check body. 
        use    /(?<=`deadlifts`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 3
        use    /(?<=`handstand traps`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 3
        use    /(?<=`back presses Y`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 3
        use    /(?<=`face pulls`\s*\[sets::)\d+(?=\])/    
            must be equal or greater than 3

*/

import { CalendarChartData, FetchedEventsObj } from '@/types/commonType'


export const formatStrengthEvents = (fetchedObj: FetchedEventsObj) => {
	const events = fetchedObj.body.value

	let strengthData: CalendarChartData = []

	for (const event of events) {
        const date = new Date(event.start.dateTime)
        const body = event.body.content.replaceAll(/&nbsp;/g, ' ')
        if (event.subject === '#push') {
            const dipsSets = Number(body.match(/(?<=`dips`\s*\[sets::)\d+(?=\])/))
            const pushUpsSets = Number(body.match(/(?<=`push-ups`\s*\[sets::)\d+(?=\])/))
            console.log('dipsSets: ', dipsSets)
            console.log('pushUpsSets: ', pushUpsSets)
            if (dipsSets >= 3 && pushUpsSets >= 3) {
                strengthData.push([date, dipsSets+pushUpsSets])
            }
        } else if (event.subject === '#pull') {
            const pullUpsSets = Number(body.match(/(?<=`pull-ups`\s*\[sets::)\d+(?=\])/))
            const bicepCurlsSets = Number(body.match(/(?<=`bicep curls`\s*\[sets::)\d+(?=\])/))
            const invertedRowsSets = Number(body.match(/(?<=`inverted rows`\s*\[sets::)\d+(?=\])/))
            if (pullUpsSets >= 3 && bicepCurlsSets >= 2 && invertedRowsSets >= 3) {
                strengthData.push([date, pullUpsSets+bicepCurlsSets+invertedRowsSets])
            }
        } else if (event.subject === '#stabilization') {
            const deadliftsSets = Number(body.match(/(?<=`deadlifts`\s*\[sets::)\d+(?=\])/))
            const handstandTrapsSets = Number(body.match(/(?<=`handstand traps`\s*\[sets::)\d+(?=\])/))
            const backPressesYSets = Number(body.match(/(?<=`back presses Y`\s*\[sets::)\d+(?=\])/))
            const facePullsSets = Number(body.match(/(?<=`face pulls`\s*\[sets::)\d+(?=\])/))
            if (deadliftsSets >= 3 && handstandTrapsSets >= 3 && backPressesYSets >= 3 && facePullsSets >= 3) {
                strengthData.push([date, deadliftsSets+handstandTrapsSets+backPressesYSets+facePullsSets])
            }
        }
    }

    return strengthData
    
 }