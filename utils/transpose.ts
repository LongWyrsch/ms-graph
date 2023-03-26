// Transpose a 2 dimensionnal array (an array of array).
export function transpose(matrix:[Date, boolean|string, boolean|string, boolean|string, boolean|string, boolean|string][]) {
	return matrix[0].map((col, i) => matrix.map((row) => row[i]))
}
