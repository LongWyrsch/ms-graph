import { loginRequest } from '@/config/authConfig'
import { callMsGraph } from '@/config/graph'
import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'

interface event {
    id: String
    subject: String
    start: {
        dateTime: String
    }
}

type GraphData = event[]|null

const CalEvents = () => {
	const { instance, accounts } = useMsal()
	const [graphData, setGraphData] = useState<GraphData>(null)

	const request = {
		...loginRequest,
		account: accounts[0],
	}

	// Silently acquires an access token which is then attached to a request for Microsoft Graph data
	useEffect(() => {
		instance
			.acquireTokenSilent(request)
            // access token still valid
			.then((response) => {
				callMsGraph(response.accessToken).then((response) => setGraphData(response.value))
			})
            // access token invalid, request new using refresh token 
			.catch((e) => {
				instance.acquireTokenPopup(request).then((response) => {
					callMsGraph(response.accessToken).then((response) => setGraphData(response.value))
				})
			})
	}, [])

    console.log(graphData)

	return (
        <div>
            {graphData?.map((event, i)=> (
                    <div key={i}>
                        <div>{event.subject}</div>
                        <div>{event.start.dateTime}</div>
                        <br/>
                    </div>
            )
            )}
        </div>
    )
}

export default CalEvents
