import { FetchedEvents } from '@/types/commonType'
import { getCategory } from './getCategory'

export const sortEventsByCategory = (events: FetchedEvents[]) => {
	let sleepEvents: FetchedEvents[] = []
	let bboyEvents: FetchedEvents[] = []
	let healthEvents: FetchedEvents[] = []
	let studyEvents: FetchedEvents[] = []
	let codeEvents: FetchedEvents[] = []

	events.forEach((event) => {
		if (event.subject.includes('#sleep')) {
			sleepEvents.push(event)
		} else {
			switch (getCategory(event.body.content)) {
				case '#bboy':
					bboyEvents.push(event)
					break
				case '#health':
					healthEvents.push(event)
					break
				case '#study':
					studyEvents.push(event)
					break
				case '#code':
					codeEvents.push(event)
					break
			}
		}
	})
	return { sleepEvents, bboyEvents, healthEvents, studyEvents, codeEvents }
}