import './sections/landing.js'
import Surrounding from './components/Surrounding'
import Rocket from './components/Rocket'
import Slider from './components/Slider'
import player from './components/player'

const coords = {
	x: 28.4583995,
	y: -80.5283588
}

const surrounding = new Surrounding(coords)
surrounding.createEarth('earth', 5, coords, 'atmosphere')
surrounding.createStars('stars', '#111111', 400)

const littleRocket = new Rocket('littleRocket')

const slider = new Slider('.steps', surrounding)
slider.touchmoves()
slider.dots()

const player = new player()