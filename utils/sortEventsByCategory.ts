// import { FetchedEvents } from '@/types/commonType'
// import { getCategory } from './getCategory'

// export const sortEventsByCategory = (events: FetchedEvents[]) => {
// 	let sleepEvents: FetchedEvents[] = []
// 	let bboyEvents: FetchedEvents[] = []
// 	let healthEvents: FetchedEvents[] = []
// 	let studyEvents: FetchedEvents[] = []
// 	let codeEvents: FetchedEvents[] = []

// 	events.forEach((event) => {
// 		if (event.categories[0]) {
// 			switch (event.categories[0].toLowerCase()) {
// 				case '#sleep':
// 					sleepEvents.push(event)
// 					break
// 				case '#bboy':
// 					bboyEvents.push(event)
// 					break
// 				case '#health':
// 					healthEvents.push(event)
// 					break
// 				case '#study':
// 					studyEvents.push(event)
// 					break
// 				case '#code':
// 					codeEvents.push(event)
// 					break
// 			}
// 		}
// 	})
// 	return { sleepEvents, bboyEvents, healthEvents, studyEvents, codeEvents }
// }
