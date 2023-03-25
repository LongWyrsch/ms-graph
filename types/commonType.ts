export interface FetchedEvents {
    body: {
        contentType: string 
        content: string
    }
    end: {
        dateTime: string
        timeZone: string
    }
    id: string
    start: {
        dateTime: string
        timeZone: string
    }
    subject: string
}

export interface FetchedEventsObj {
    id: string
    status: number
    body: {
        value: FetchedEvents[]
    }
}

export type BatchResponse = FetchedEventsObj[]

export type CalendarChartDataProps = {
	data: CalendarChartData
}


export type SleepChartData  = Array<[string, number|string|null, number|string|null, number|string|null, number|string|null, number|string|null, number|string|null]>

export interface Task {
        status: string
        title: string
        dueDateTime: {
            dateTime: string
            timeZone: string
        }
}

export type CalendarChartData = Array<[Date, number]>


