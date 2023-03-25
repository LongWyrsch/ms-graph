// Using toISOString() may return unexpected results because it may change the date based on the machine's time zone.
// This function doesn't change the date. It just converts the type to a string.
export const dateToDay = (date: Date) => {
	// const year = date.getFullYear()
	// const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed, so add 1
	const day = String(date.getDate()).padStart(2, '0')

	return `${day}`
}
