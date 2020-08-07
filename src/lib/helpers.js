export const arrayLen = num => Array.from('x'.repeat(num))

export const dimUnits = (size, i) => ({
	col: i % (size + 1),
	row: Math.floor(i / (size + 1)),
})
