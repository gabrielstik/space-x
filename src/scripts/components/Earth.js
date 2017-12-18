/* global WE */

export default class Earth {

	constructor(id, zoom, position, atmosphere) {
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
}