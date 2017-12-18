/* global WE, google */

export default class Surrounding {

	createStars(id, bgColor, nb) {
		const $canvas = document.getElementById(id)
		const context = $canvas.getContext('2d')

		$canvas.width = window.innerWidth
		$canvas.height = window.innerHeight

		const clear = () => {
			context.fillStyle = bgColor
			context.fillRect(0, 0, $canvas.width, $canvas.height)
		}

		const draw = () => {
			for (let i = 0; i < nb; i++) {
				const star = {
					x: Math.random() * $canvas.width,
					y: Math.random() * $canvas.height,
					r: Math.random() * 1
				}
				context.beginPath()
				context.arc(star.x, star.y, star.r, 0, Math.PI * 2)
				context.shadowColor = 'white'
				context.shadowBlur = 10
				context.fillStyle = 'white'
				context.fill()
			}
		}

		const resize = () => {
			$canvas.width = window.innerWidth
			$canvas.height = window.innerHeight
			clear()
			draw()
		}
		resize()
		draw()
		window.addEventListener('resize', () => {
			resize()
		})
	}

	createEarth(id, zoom, position, atmosphere) {
		const offset = {
			x: -30,
			y: -10
		}

		const config = {
			zoom: zoom,
			position: [position.x + offset.x , position.y],
			atmosphere: atmosphere == 'atmosphere' ? true : false
		}
		const earth = new WE.map('earth', config)
		earth.setTilt(40)

		const layer = WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
			attribution: 'NASA',
		})
		layer.addTo(earth)
	}

	createMap(id, position) {
		let zoom = 18

		const map = new google.maps.Map(document.getElementById(id), {
			center: {lat: position.x, lng: position.y},
			zoom: zoom,
			mapTypeId: 'satellite',
			disableDefaultUI: true
		})
		map.setTilt(45)
	}
}