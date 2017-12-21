import './sections/landing.js'
import Surrounding from './components/Surrounding'
import Rocket from './components/Rocket'
import Slider from './components/Slider'
import Player from './components/Player'

const coords = {
	x: 28.4583995,
	y: -80.5283588
}

const surrounding = new Surrounding(coords)
surrounding.createEarth('earth', 2.5, coords, 'atmosphere')
surrounding.createStars('stars', '#111111', 400)

const littleRocket = new Rocket('littleRocket')

const slider = new Slider('.steps', surrounding, coords)
slider.touchmoves()
slider.dots()

const player = new Player()