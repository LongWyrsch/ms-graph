import { loginRequest } from '@/authConfig/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/authConfig/graphQuery'
import { BatchResponse, Task } from '@/types/commonType'
import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'

export const useFetchGraphData = () => {
	const { instance, accounts } = useMsal()
	// const [loadingData, setLoadingData] = useState(false)
	const [fetchedEvents, setfetchedEvents] = useState<BatchResponse | null>(null)
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
			const fetchDataWithToken = (accessToken: string) => {
				
				callMsGraphBatch(accessToken).then((response) => {
					setfetchedEvents(response.responses)
					// Once events are fetched, get tasks
					callMsGraph(
						'https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgAuAAAD6KEmf4NA006sAzSRFCKcLQEABbbzqMwVoEedSATsfRywKwAGDs4OAwAAAA==/tasks',
						accessToken
					).then((response) => {
						setTasks(response.value)
						// setLoadingData(false)
					})
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
