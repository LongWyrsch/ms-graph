import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'

export const useFetchGraphData = () => {
	const { instance, accounts } = useMsal()
	// const [loadingData, setLoadingData] = useState(false)
	const [events, setEvents] = useState(null)
	const [tasks, setTasks] = useState(null)

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
				// get events
				callMsGraphBatch(accessToken).then((response) => {
					setEvents(response.responses)

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

		fetchData()
	}, [])

	return [events, tasks]
}
