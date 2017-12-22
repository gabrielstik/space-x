import Modernizr from './vendor/Modernizr'

import './sections/landing'
import Surrounding from './components/Surrounding'
import Slider from './components/Slider'
import Fire from './components/Fire'
import Gestures from './components/Gestures'


const coords = {
	x: 28.4583995,
	y: -80.5283588
}

const surrounding = new Surrounding(coords)
if (!Modernizr.touchevents) {
	surrounding.createEarth('earth', 2.5, coords, 'atmosphere')
}
surrounding.createStars('stars', '#111111', 400)


const slider = new Slider('.steps', surrounding, coords)
slider.touchmoves()
slider.dots()

// new Player()
new Fire()
new Gestures(slider)