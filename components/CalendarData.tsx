import React from 'react'
import Calendar from './Calendar'

const CalendarData: React.FC = () => {
	const data: Array<[Date, number]> = [
        [ new Date(2012, 3, 13), 37032 ],
        [ new Date(2012, 3, 14), 38024 ],
        [ new Date(2012, 3, 15), 38024 ],
        [ new Date(2012, 3, 16), 38108 ],
        [ new Date(2012, 3, 17), 38229 ],
        // Many rows omitted for brevity.
        [ new Date(2013, 9, 4), 38177 ],
        [ new Date(2013, 9, 5), 38705 ],
        [ new Date(2013, 9, 12), 38210 ],
        [ new Date(2013, 9, 13), 38029 ],
        [ new Date(2013, 9, 19), 38823 ],
        [ new Date(2013, 9, 23), 38345 ],
        [ new Date(2013, 9, 24), 38436 ],
        [ new Date(2013, 9, 30), 38447 ]
	]

	const options: google.visualization.CalendarOptions = {
        title: "Red Sox Attendance",
        height: 350,

	}

	return (
		<div>
			<Calendar data={data} options={options} />
		</div>
	)
}

export default CalendarData
