import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import * as CANNON from 'cannon'

export const cannonContext = createContext()

export function CannonProvider ({ children, gravity = 1000 }) {
	const world = useMemo(() => new CANNON.World())

	useEffect(() => {
		world.broadphase = new CANNON.NaiveBroadphase()
		world.solver.iterations = 10
		world.gravity.set(0, gravity, 0)
	}, [])

	// useFrame(() => world.step(1 / 60))

	return (
		<cannonContext.Provider value={world}>
			{children}
		</cannonContext.Provider>)
}

export function useCannon ({ ...props }, initFn, updateFn, deps = []) {
	const ref = useRef()
	const world = useContext(cannonContext)
	const body = useMemo(() => new CANNON.Body(props), [])

	useEffect(() => {
		initFn(body)
		world.addBody(body)
		return () => world.removeBody(body)
	}, deps)

	useFrame(() => {
		if (ref.current) {
			ref.current.position.copy(body.position)
			ref.current.quaternion.copy(body.quaternion)
		}
	})

	return ref
}
