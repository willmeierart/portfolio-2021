import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export default function useDeviceMotion () {
	const [deviceMotionData, setDeviceMotionData] = useState({
		acceleration: {
			x: 0,
			y: 0,
			z: 0,
		},
		accelerationIncludingGravity: {
			x: 0,
			y: 0,
			z: 0,
		},
		interval: 0,
		rotationRate: {
			alpha: 0,
			beta: 0,
			gamma: 0,
		},
	})

	const handleDeviceMotion = e => {
		const {
			acceleration,
			accelerationIncludingGravity,
			interval,
			rotationRate,
		} = e

		console.log(typeof DeviceOrientationEvent['requestPermission'])

		console.log(e)

		setDeviceMotionData({
			acceleration,
			accelerationIncludingGravity,
			interval,
			rotationRate,
		})
	}

	const debouncedMove = useCallback(debounce(handleDeviceMotion, 10))

	useEffect(() => {
		const dontUse = typeof window === 'undefined' || typeof window.orientation === 'undefined'
		if (dontUse) return () => {}
		DeviceOrientationEvent.requestPermission().then(() => {

			window.addEventListener('devicemotion', debouncedMove)
		})
		return () => window.removeEventListener('devicemotion', debouncedMove)
	}, [])

	return deviceMotionData
}
