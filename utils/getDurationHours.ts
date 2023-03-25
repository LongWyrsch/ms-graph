
export const getDurationHours = (startDate: Date, endDate: Date) => { 
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
 }
