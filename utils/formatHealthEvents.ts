
import { CalendarChartData, FetchedEvents, FetchedEventsObj } from '@/types/commonType'
import { getDurationHours } from './getDurationHours'

export const formatHealthEvents = (events: FetchedEvents[]) => {

    // Create data array and add a row for today, so that the calendar shows today's cell
	let strengthData: CalendarChartData = [[new Date(), -1]]
	let VO2Data: CalendarChartData = [[new Date(), -1]]
	let wristsData: CalendarChartData = [[new Date(), -1]]
	let lowerBodyData: CalendarChartData = [[new Date(), -1]]
	let shoulderData: CalendarChartData = [[new Date(), -1]]
	let rollData: CalendarChartData = [[new Date(), -1]]
	let neckData: CalendarChartData = [[new Date(), -1]]
	let flossData: CalendarChartData = [[new Date(), -1]]

	if (events && events.length > 0) {
        for (const event of events) {
            const startDate = new Date(event.start.dateTime)
            const endDate = new Date(event.end.dateTime)
            const durationHours = getDurationHours(startDate, endDate)
            const date = startDate
            date.setHours(0, 0, 0, 0)
            
            const body = event.body.content.replaceAll(/&nbsp;/g, ' ')

            // ~~~~~~~~~~~~~~~~~~~~~~~~~~ STRENGTH ~~~~~~~~~~~~~~~~~~~~~~~~~~
            if (event.subject.includes('#push')) {
                const dipsSets = Number(body.match(/(?<=`dips`\s*\[sets::)\d+(?=\])/))
                const pushUpsSets = Number(body.match(/(?<=`push-ups`\s*\[sets::)\d+(?=\])/))
                if (dipsSets >= 3 && pushUpsSets >= 3) {
                    strengthData.push([date, dipsSets + pushUpsSets])
                }
            } else if (event.subject.includes('#pull')) {
                const pullUpsSets = Number(body.match(/(?<=`pull-ups`\s*\[sets::)\d+(?=\])/))
                const bicepCurlsSets = Number(body.match(/(?<=`bicep curls`\s*\[sets::)\d+(?=\])/))
                const invertedRowsSets = Number(body.match(/(?<=`inverted rows`\s*\[sets::)\d+(?=\])/))
                if (pullUpsSets >= 3 && bicepCurlsSets >= 2 && invertedRowsSets >= 3) {
                    strengthData.push([date, pullUpsSets + bicepCurlsSets + invertedRowsSets])
                }
            } else if (event.subject.includes('#stabilization')) {
                const deadliftsSets = Number(body.match(/(?<=`deadlifts`\s*\[sets::)\d+(?=\])/))
                const handstandTrapsSets = Number(body.match(/(?<=`handstand traps`\s*\[sets::)\d+(?=\])/))
                const backPressesYSets = Number(body.match(/(?<=`back presses Y`\s*\[sets::)\d+(?=\])/))
                const facePullsSets = Number(body.match(/(?<=`face pulls`\s*\[sets::)\d+(?=\])/))
                if (deadliftsSets >= 3 && handstandTrapsSets >= 3 && backPressesYSets >= 3 && facePullsSets >= 3) {
                    strengthData.push([date, deadliftsSets + handstandTrapsSets + backPressesYSets + facePullsSets])
                }
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~ VO2 ~~~~~~~~~~~~~~~~~~~~~~~~~~
            } else if (event.subject.includes('#run') || event.subject.includes('#bike') || event.subject.includes('#swim')) {
                const durationHours = getDurationHours(startDate, endDate)
                
                // Goal of 20mn is set by min value in the calendar chart options
                const index = VO2Data.findIndex(row => {row[0]==date})
                if (index > -1) {
                    VO2Data[index][1] += durationHours
                } else {
                    VO2Data.push([date, durationHours])
                }
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~ MOBILITY ~~~~~~~~~~~~~~~~~~~~~~~~~~
            } else if (event.subject.includes('#mobility')) {
                const wristsClockWalks: number = body.match(/\[x\] `wrists clock walks`/i) ? 1 : 0
                const fingerCurls: number = body.match(/\[x\] `finger curls`/i) ? 1 : 0
                const wristPushUps: number = body.match(/\[x\] `wrist push-ups`/i) ? 1 : 0
                const fistKnucklePushUps: number = body.match(/\[x\] `fist knuckle push-ups`/i) ? 1 : 0
                const adductors: number = body.match(/\[x\] `adductors`/i) ? 1 : 0
                const hamstrings: number = body.match(/\[x\] `hamstrings`/i) ? 1 : 0
                const powermoveStretch: number = body.match(/\[x\] `powermove stretch`/i) ? 1 : 0
                const quads: number = body.match(/\[x\] `quads`/i) ? 1 : 0
                const hipFlexors: number = body.match(/\[x\] `hip flexors`/i) ? 1 : 0
                const pigeon: number = body.match(/\[x\] `pigeon`/i) ? 1 : 0
                const butterfly: number = body.match(/\[x\] `butterfly`/i) ? 1 : 0
                const glutes: number = body.match(/\[x\] `glutes`/i) ? 1 : 0
                const sideHipStretch: number = body.match(/\[x\] `side hip stretch`/i) ? 1 : 0
                const shoulderFlexionChair: number = body.match(/\[x\] `shoulder flexion: elbows on chair`/i) ? 1 : 0
                const shoulderFlexionHang: number = body.match(/\[x\] `shoulder flexion: 1 arm pronated hang`/i) ? 1 : 0
                const shoulderExtRotation: number = body.match(/\[x\] `shoulder ext rotation: 360 with band`/i) ? 1 : 0
                const shoulderIntRotation: number = body.match(/\[x\] `shoulder int rotation`/i) ? 1 : 0
                const shouldersExtension: number = body.match(/\[x\] `shoulders extension`/i) ? 1 : 0
                const quadsRoll: number = body.match(/\[x\] `quads roll`/i) ? 1 : 0
                const ITBandRoll: number = body.match(/\[x\] `IT band roll`/i) ? 1 : 0
                const calvesRoll: number = body.match(/\[x\] `calves roll`/i) ? 1 : 0
                const hamstringsRoll: number = body.match(/\[x\] `hamstrings roll`/i) ? 1 : 0
                const glutesRoll: number = body.match(/\[x\] `glutes roll`/i) ? 1 : 0
                const trapsRoll: number = body.match(/\[x\] `traps roll`/i) ? 1 : 0
                const neckStrengthening: number = body.match(/\[x\] `neck strengthening`/i) ? 1 : 0
                const neckStretchSides: number = body.match(/\[x\] `neck stretch: sides`/i) ? 1 : 0
                const neckStretchDoor: number = body.match(/\[x\] `neck stretch: door frame`/i) ? 1 : 0
                const hamstringsFloss: number = body.match(/\[x\] `hamstrings floss`/i) ? 1 : 0
                const radialNerve: number = body.match(/\[x\] `radial nerve`/i) ? 1 : 0
                const medianNerve: number = body.match(/\[x\] `median nerve`/i) ? 1 : 0
                const ulnarNerve: number = body.match(/\[x\] `ulnar nerve`/i) ? 1 : 0
                if (wristsClockWalks || fingerCurls || wristPushUps || fistKnucklePushUps) {
                    // WRISTS => do all daily
                    wristsData.push([date, wristsClockWalks + fingerCurls + wristPushUps + fistKnucklePushUps])
                } else if (adductors || hamstrings || powermoveStretch || quads || hipFlexors || pigeon || butterfly || glutes || sideHipStretch) {
                    // LOWER BODY => do all daily
                    lowerBodyData.push([date, adductors + hamstrings + powermoveStretch + quads + hipFlexors + pigeon + butterfly + glutes + sideHipStretch])
                } else if ( shoulderFlexionChair || shoulderFlexionHang || shoulderExtRotation || shoulderIntRotation || shouldersExtension) {
                    // SHOULDERS => do all daily
                    shoulderData.push([date, shoulderFlexionChair + shoulderFlexionHang + shoulderExtRotation + shoulderIntRotation + shouldersExtension])
                } else if ( quadsRoll || ITBandRoll || calvesRoll || hamstringsRoll || glutesRoll || trapsRoll) {
                    // ROLL => 30mn daily
                    rollData.push([date, durationHours])
                } else if ( neckStrengthening || neckStretchSides || neckStretchDoor) {
                    // NECK => every 3 days
                    neckData.push([date, neckStrengthening + neckStretchSides + neckStretchDoor])
                } else if ( hamstringsFloss ||radialNerve || medianNerve || ulnarNerve ) {
                    // FLOSS => do all daily
                    flossData.push([date, hamstringsFloss + radialNerve + medianNerve + ulnarNerve ])
                }
            }
        }
    }

	return [strengthData, VO2Data, wristsData, lowerBodyData, shoulderData, rollData, neckData, flossData]
}
