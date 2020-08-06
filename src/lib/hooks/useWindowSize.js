import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export default function useWindowSize () {
	const isClient = typeof window !== 'undefined'

	const getSize = () => {
		return {
			width: isClient ? window.innerWidth : 0,
			height: isClient ? window.innerHeight : 0,
		}
	}

	const [windowSize, setWindowSize] = useState(getSize)

	const handleResize = () => setWindowSize(getSize())
	const debouncedResize = useCallback(debounce(handleResize, 200))

	useEffect(() => {
		debouncedResize()
		if (!isClient) return false

		window.addEventListener('resize', debouncedResize)

		return () => window.removeEventListener('resize', debouncedResize)
	}, [])

	return windowSize
}
