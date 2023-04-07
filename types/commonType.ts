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
    value: FetchedEvents[]
}

export type BatchResponse = FetchedEventsObj[]

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