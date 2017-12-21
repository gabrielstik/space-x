export default class Fire {

	constructor() {

		if (!Modernizr.touchevents) {
			// HOW TO USE
			// max (max lifetime of a particle), size, and speed needs to have a value
			// fireCoords is mudulable, fire will follow theses vallue to generate
			// All functions are needed to make it work, except loop wich can be easily replaced

			const $canvas = document.querySelector('.fire')
			const context = $canvas.getContext('2d') // TOUJOURS AVOIR UN CONTEXT

			// Fire coordinates
			const fireCoord = { x: 50, y: 0 }
			const fireParticlesArray = []
			// Particle proprety
			const max = 50
			const speed = 2
			const size = 10
			// Particle storage
			// Coordinates, horizontal and vertical speed
			// And particle duration
			const fireParticles = (x, y, xs, ys) => {
				this.x = x
				this.y = y
				this.xs = xs
				this.ys = ys
				this.lifetime = 1
			}

			// Particle creation
			// Coordinates, horizontal and vertical speed
			// And particle duration
			const fireCreate = () => {
				const fireParticles = {}
				fireParticles.x = fireCoord.x
				fireParticles.y = fireCoord.y
				fireParticles.xs = (Math.random() * 2 * speed - speed) / 2
				fireParticles.ys = 0 - Math.random() * 2 * speed
				fireParticles.lifetime = 0

				fireParticlesArray.push(fireParticles)
			}

			const fireUpdate = () => {
				context.globalCompositeOperation = 'lighter'
				// Add 10 particule per frame
				for (var i = 0; i < 10; i++) {
					fireCreate()
				}

				// Cycle to draw particle
				for (var i = 0; i < fireParticlesArray.length; i++) {
					context.fillStyle = 'rgba(' + (260 - (fireParticlesArray[i].lifetime * 2)) + ',' + ((fireParticlesArray[i].lifetime * 2) + 50) + ',' + (fireParticlesArray[i].lifetime * 2) + ',' + (((max - fireParticlesArray[i].lifetime) / max) * 0.4) + ')'

					context.beginPath()
					// Draw particle as circle that gets smaller as lifetime is higher
					context.arc(fireParticlesArray[i].x, fireParticlesArray[i].y, (max - fireParticlesArray[i].lifetime) / max * (size / 2) + (size / 2), 0, 2 * Math.PI)
					context.fill()

					//Move the particle based on its horizontal and vertical speeds
					fireParticlesArray[i].x += fireParticlesArray[i].xs
					fireParticlesArray[i].y -= fireParticlesArray[i].ys
					fireParticlesArray[i].lifetime++

					//If the particle has lived longer than Max, cut it from the array
					if (fireParticlesArray[i].lifetime >= max) {
						fireParticlesArray.splice(i, 1)
						i--
					}
				}
			}

			// TEST COORDS, DO NOT INQUIERE
			// fireCoord.x = 100
			// fireCoord.y = 100

			const loop = () => {
				window.requestAnimationFrame(loop)
				context.clearRect(0, 0, $canvas.width, $canvas.height)
				fireUpdate()
			}

			loop()
		}
	}
}