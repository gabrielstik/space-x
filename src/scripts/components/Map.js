/* global google */

export default class Map {

	constructor(coords) {
		let zoom = 18

		const map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: coords.x, lng: coords.y},
			zoom: zoom,
			mapTypeId: 'satellite',
			disableDefaultUI: true
		})
	}
}