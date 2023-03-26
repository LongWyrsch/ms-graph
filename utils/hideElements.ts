export const hideTextElements = () => {
    // Used to hide the year on the left of calendar charts

	const currentYear = new Date().getFullYear().toString()
	const textElements = document.getElementsByTagName('text')
	for (let i = 0; i < textElements.length; i++) {
		const element = textElements[i]
		if (element.textContent === currentYear) {
			element.style.display = 'none'
		}
	}
}

export const hideCalendarColorLegend = () => {
    // Used to hide color gradian legend of calendar charts

	const pathElements = document.getElementsByTagName('path')

	for (let i = 0; i < pathElements.length; i++) {
		const element = pathElements[i]
		const bbox = element.getBBox()

        // Currently, I want to hide 2 paths: 40X12 & 120X12
        const condition1 = Math.round(bbox.width) === 40 && Math.round(bbox.height) === 12
        const condition2 = Math.round(bbox.width) === 120 && Math.round(bbox.height) === 12

		if (condition1 || condition2) {
			pathElements[i].style.display = 'none'
		}
	}
}
