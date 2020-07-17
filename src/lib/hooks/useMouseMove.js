import { useEffect, useState } from 'react'

export default function useMouseMove () {
	const isClient = typeof window !== 'undefined'

	const [mouseData, setMouseData] = useState({ posX: 0, poxY: 0, deltaX: 0, deltaY: 0 })

	useEffect(() => {
		if (!isClient) return false

		const handleMouseMove = e => {
			setMouseData({
				posX: e.pageX,
				posY: e.pageY,
				deltaX: e.movementX,
				deltaY: e.movementY,
			})
		}

		window.addEventListener('mousemove', handleMouseMove)

		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return mouseData
}
