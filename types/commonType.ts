export interface FetchedEvents {
    id: string
    subject: string
    body: {
        contentType: string 
        content: string
    }
    end: {
        dateTime: string
        timeZone: string
    },
    start: {
        dateTime: string
        timeZone: string
    }
}

export interface FetchedEventsObj {
    id: string
    status: number
    body: {
        value: FetchedEvents[]
    }
}

export type BatchResponse = FetchedEventsObj[]

export type GroupedResponses = {
    sleepEvents: FetchedEvents[]
    bboyEvents: FetchedEvents[]
    healthEvents: FetchedEvents[]
    studyEvents: FetchedEvents[]
}

export type CalendarChartDataProps = {
	data: CalendarChartData
}

type comboChartHeader = {label: string, type: string}
export type SleepChartData  = Array<[string|comboChartHeader, number|null|comboChartHeader, number|null|comboChartHeader, number|null|comboChartHeader, number|null|comboChartHeader, number|null|comboChartHeader, number|null|comboChartHeader]>

export type CalendarChartData = Array<[Date, number]>

export interface Task {
        status: string
        title: string
        dueDateTime: {
            dateTime: string
            timeZone: string
        }
}

export type FetchedTasksObj = Task[]


export type NutritionChartData = Array<[Date, string, string, string, string, string]>