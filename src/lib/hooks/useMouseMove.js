import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

export default function useMouseMove () {
	// this is causing re-renders when done with state, doesnt work with ref, how can this get fixed?

	// const mouseData = useRef({ posX: 0, poxY: 0, deltaX: 0, deltaY: 0 })
	const [mouseData, setMouseData] = useState({ posX: 0, poxY: 0, deltaX: 0, deltaY: 0 })

	const handleMouseMove = e => {
		// mouseData.current = {
		// 	posX: e.pageX,
		// 	posY: e.pageY,
		// 	deltaX: e.movementX,
		// 	deltaY: e.movementY,
		// }
		setMouseData({
			posX: e.pageX,
			posY: e.pageY,
			deltaX: e.movementX,
			deltaY: e.movementY,
		})
	}
	const debouncedMove = useCallback(debounce(handleMouseMove, 10))

	useEffect(() => {
		const isClient = typeof window !== 'undefined'
		if (!isClient) return false

		window.addEventListener('mousemove', debouncedMove)
		return () => window.removeEventListener('mousemove', debouncedMove)
	}, [])

	return mouseData
	// return mouseData.current
}
