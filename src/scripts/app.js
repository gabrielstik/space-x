import Surrounding from './components/Surrounding'
// import Map from './components/Map'

const coords = {
	x: 28.4583995,
	y: -80.5283588
}

const surrounding = new Surrounding(coords)
surrounding.createEarth('earth', 5, coords, 'atmosphere')
surrounding.createStars('stars', '#111111', 400)
// surrounding.createMap('map', coords)

// new Map(coords)