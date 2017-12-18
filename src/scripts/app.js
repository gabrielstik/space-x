import Earth from './components/Earth'
import Map from './components/Map'

const coords = {
	x: 28.4583995,
	y: -80.5283588
}

new Earth('earth', 5, coords, 'atmosphere')
// new Map(coords)