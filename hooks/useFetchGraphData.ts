import { loginRequest } from '@/authConfig/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/authConfig/graphQuery'
import { GroupedResponses, Task } from '@/types/commonType'
import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'

export const useFetchGraphData = () => {
	const { instance, accounts } = useMsal()
	// const [loadingData, setLoadingData] = useState(false)
	const [fetchedEvents, setfetchedEvents] = useState<GroupedResponses | null>(null)
	const [tasks, setTasks] = useState<Task[] | null>(null)

	const request = {
		...loginRequest,
		account: accounts[0],
	}

	useEffect(() => {
		const fetchData = async () => {
			// set data to loading
			// setLoadingData(true)

			// Fetch events and tasks
			const fetchDataWithToken = async (accessToken: string) => {
				
				// current year
				const d = new Date();
				let year = d.getFullYear();
				
				// get events  
				const sleepCalendarID = `https://graph.microsoft.com/v1.0/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pxwAAAA==/events?$select=id,subject,body,start,end&$filter=start/dateTime ge '${year}-01-01T00:00:00Z' and end/dateTime le '${year}-12-31T23:59:59Z'&$top=999`
				const bboyCalendarID = `https://graph.microsoft.com/v1.0/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pxQAAAA==/events?$select=id,subject,body,start,end&$filter=start/dateTime ge '${year}-01-01T00:00:00Z' and end/dateTime le '${year}-12-31T23:59:59Z'&$top=999`
				const healthCalendarID = `https://graph.microsoft.com/v1.0/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pxgAAAA==/events?$select=id,subject,body,start,end&$filter=start/dateTime ge '${year}-01-01T00:00:00Z' and end/dateTime le '${year}-12-31T23:59:59Z'&$top=999`
				const studyCalendarID = `https://graph.microsoft.com/v1.0/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pyAAAAA==/events?$select=id,subject,body,start,end&$filter=start/dateTime ge '${year}-01-01T00:00:00Z' and end/dateTime le '${year}-12-31T23:59:59Z'&$top=999`

				const groupedResponses = {
					sleepEvents: [],
					bboyEvents: [],
					healthEvents: [],
					studyEvents: [],
				}

				const sleepResponse = await callMsGraph(sleepCalendarID, accessToken)
				groupedResponses.sleepEvents = sleepResponse.value
				const bboyResponse = await callMsGraph(bboyCalendarID, accessToken)
				groupedResponses.bboyEvents = bboyResponse.value
				const healthResponse = await callMsGraph(healthCalendarID, accessToken)
				groupedResponses.healthEvents = healthResponse.value
				const studyResponse = await callMsGraph(studyCalendarID, accessToken)
				groupedResponses.studyEvents = studyResponse.value

				setfetchedEvents(groupedResponses)

				callMsGraph(
					'https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgAuAAAD6KEmf4NA006sAzSRFCKcLQEABbbzqMwVoEedSATsfRywKwAGDs4OAwAAAA==/tasks',
					accessToken
				).then((response) => {
					setTasks(response.value)
					// setLoadingData(false)
				})

			}

			// Silently acquires an access token which is then attached to a request for Microsoft Graph data
			instance
				.acquireTokenSilent(request)
				// access token still valid
				.then((response) => {
					const accessToken = response.accessToken
					fetchDataWithToken(accessToken)
				})
				// access token invalid, request new using refresh token
				.catch((e) => {
					instance.acquireTokenPopup(request).then((response) => {
						const accessToken = response.accessToken
						fetchDataWithToken(accessToken)
					})
				})
		}

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Uncomment for development. Uses mock data localy stored to avoid spaming Graph and getting throtteled.
		// setfetchedEvents(mockBathEvents)
		// setTasks(mockTasks)
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~
		
		
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Uncomment to fetch actual data from Graph
		fetchData()
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~
	}, [])

	return { fetchedEvents, tasks }
}
