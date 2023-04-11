
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(url: RequestInfo | URL, accessToken: string) {
	const headers = new Headers()
	const bearer = `Bearer ${accessToken}`

	headers.append('Authorization', bearer)

	const options = {
		method: 'GET',
		headers: headers,
	}

	return fetch(url, options)
		.then((response) => response.json())
		.catch((error) => console.log(error))
}

export async function callMsGraphBatch(accessToken: string) {
	const headers = new Headers()
	const bearer = `Bearer ${accessToken}`

	headers.append('Authorization', bearer)
	headers.append('Content-Type', 'application/json')

	return fetch('https://graph.microsoft.com/v1.0/$batch', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(batchQuery),
	})
		.then((response) => response.json())
		.catch((error) => console.log(error))
}

const batchQuery = {
	requests: [
		{
			id: '1',  // sleep
			method: 'GET',
			url: "/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pxwAAAA==/events?$select=subject,body,start,end&$filter=start/dateTime ge '2023-01-01T00:00:00Z' and end/dateTime le '2023-12-31T23:59:59Z'",
		},
		{
			id: '2',  // bboy
			method: 'GET',
			url: "/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pxQAAAA==/events?$select=subject,body,start,end&$filter=start/dateTime ge '2023-01-01T00:00:00Z' and end/dateTime le '2023-12-31T23:59:59Z'",
		},
		{
			id: '3',  // health
			method: 'GET',
			url: "/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pxgAAAA==/events?$select=subject,body,start,end&$filter=start/dateTime ge '2023-01-01T00:00:00Z' and end/dateTime le '2023-12-31T23:59:59Z'",
		},
		{
			id: '4',  // study
			method: 'GET',
			url: "/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pyAAAAA==/events?$select=subject,body,start,end&$filter=start/dateTime ge '2023-01-01T00:00:00Z' and end/dateTime le '2023-12-31T23:59:59Z'",
		},
		{
			id: '5',  // code
			method: 'GET',
			url: "/me/calendars/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgBGAAAD6KEmf4NA006sAzSRFCKcLQcABbbzqMwVoEedSATsfRywKwAAAgEGAAAABbbzqMwVoEedSATsfRywKwAGGT9pyQAAAA==/events?$select=subject,body,start,end&$filter=start/dateTime ge '2023-01-01T00:00:00Z' and end/dateTime le '2023-12-31T23:59:59Z'",
		},
		// {
		// 	id: '6',  // nutrition tasks. CANNOT FILTER TASKS! Will have to filter after query
		// 	method: 'GET',
		// 	url: "/me/todo/lists/AQMkADAwATNiZmYAZC1jZDUwLTFmOWItMDACLTAwCgAuAAAD6KEmf4NA006sAzSRFCKcLQEABbbzqMwVoEedSATsfRywKwAGDs4OAwAAAA==/tasks",
		// },
	],
}


// For some reason, I got a lot of throttleing when addind the tasks to the batch request. So I am making a second request just for the tasks.
// Need to double check if it really improves the throtteling situation.