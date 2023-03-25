export interface FetchedEvents {
    body: {
        contentType: string 
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

export type SleepChartData  = Array<[string, number|string, number|string, number|string, number|string]>

export interface Task {
        status: string
        title: string
        dueDateTime: {
            dateTime: string
            timeZone: string
        }
}




