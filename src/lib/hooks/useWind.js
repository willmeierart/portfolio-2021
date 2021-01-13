import SimplexNoise from 'simplex-noise'
import { Clock, Vector3 } from 'three'
import { arrayLen, dimUnits } from 'lib/helpers'

const clock = new Clock()
const noise = new SimplexNoise()
const direction = new Vector3(0.5, 0, -1)
const baseForce = 2000
const off = 0.05

export default function wind () {
	return {
		update: (figureRef, flowField) => {
			const t = clock.getElapsedTime()
			const { position } = figureRef.geometry.attributes
			const size = figureRef.geometry.parameters.widthSegments
			const force = baseForce / flowField.current.count

			arrayLen(position.count).forEach((a, i) => {
				const { col, row } = dimUnits(size, i)

				const appliedNoise = noise.noise3D(row * off, col * off, t)
				const appliedForce = (appliedNoise * 0.5 + 0.5) * force

				flowField.current[i] = direction.clone().multiplyScalar(appliedForce)
			})
		}
	}
}
