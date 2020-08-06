import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export default function useMouseMove () {
	const [mouseData, setMouseData] = useState({ posX: 0, poxY: 0, deltaX: 0, deltaY: 0 })

	const handleMouseMove = e => {
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
}
