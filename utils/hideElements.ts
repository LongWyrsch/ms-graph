export const hideTextElements = () => {
	const currentYear = new Date().getFullYear().toString()
	const textElements = document.getElementsByTagName('text')
	console.log(textElements.length)
	for (let i = 0; i < textElements.length; i++) {
		const element = textElements[i]
		if (element.textContent === currentYear) {
			element.style.display = 'none'
		}
	}
}

export const hideCalendarColorLegend = () => {
	const pathElements = document.getElementsByTagName('path')
	const selectedElements: SVGPathElement[] = []

	for (let i = 0; i < pathElements.length; i++) {
		const element = pathElements[i]
		const bbox = element.getBBox()

		if (Math.round(bbox.width) === 120 && Math.round(bbox.height) === 12) {
			pathElements[i].style.display = 'none'
		}
	}
}
