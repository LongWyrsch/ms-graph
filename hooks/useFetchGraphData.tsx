import { loginRequest } from '@/config/authConfig'
import { callMsGraph, callMsGraphBatch } from '@/config/graphQuery'
import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'

export const useFetchGraphData = () => {
	const { instance, accounts } = useMsal()
	// const [loadingData, setLoadingData] = useState(false)
	const [events, setEvents] = useState(null)
	// const [tasks, setTasks] = useState(null)

	const request = {
		...loginRequest,
		account: accounts[0],
	}

	useEffect(() => {
		const fetchData = async () => {
			// set data to loading
			// setLoadingData(true)

			const fetchDataWithToken = (response: { accessToken: string }) => {
				callMsGraphBatch(response.accessToken).then((response) => {
					setEvents(response.responses)
					// setLoadingData(false)
				})
				// callMsGraph("https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgAuAAAD6KEmf4NA006sAzSRFCKcLQEABbbzqMwVoEedSATsfRywKwAGDs4OAwAAAA==/tasks" ,response.accessToken).then((response) => {
				// 	setTasks(response)
				// 	// setLoadingData(false)
				// })
			}

			// Silently acquires an access token which is then attached to a request for Microsoft Graph data
			instance
				.acquireTokenSilent(request)
				// access token still valid
				.then((response) => {
					fetchDataWithToken(response)
				})
				// access token invalid, request new using refresh token
				.catch((e) => {
					instance.acquireTokenPopup(request).then((response) => {
						fetchDataWithToken(response)
					})
				})
		}

		fetchData()
	}, [])

	return [events]
}
