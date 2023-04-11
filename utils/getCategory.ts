
export const getCategory = (string: string): string | null => {
	const regex = /(?<=>)#\S+(?=<br>)/
	const category = string.match(regex)
	return category ? category[0] : null
}
