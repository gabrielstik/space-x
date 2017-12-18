/* global WE */

export default class Example {

	constructor(id, zoom, position, atmosphere) {
		const config = {
			zoom: zoom,
			position: position,
			atmosphere: atmosphere == 'atmosphere' ? true : false
		}
		const earth = new WE.map('earth', config)

		const layer = WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
			attribution: 'NASA',
		})
		layer.addTo(earth)
	}
}