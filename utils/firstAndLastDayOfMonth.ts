export const firstAndLastDayOfMonth = () => { 
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1) // Get the first day of the current month
    const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1) // Get the first day of the next month
    
    return {firstDayOfMonth, firstDayOfNextMonth}
 }