import { themeContext } from "@/pages"
import { useContext } from "react"


export const useCalendarColors = () => { 
	const theme = useContext(themeContext)
    const calendarBackgroundColor = theme==='light' ? '#f7f7f7' : '#3a3a3b'
    const today = theme==='light' ? '#d1d1c7' : '#080800'

    return {calendarBackgroundColor, today}
 }