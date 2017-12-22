/* global Modernizr */

export default class Gestures {

	constructor(slider) {
		const $steps = document.querySelector('.steps')
		const $landing = document.querySelector('.landing')
		let view = slider.constructor.currentView
		let scrolling = false
		let isLanding = true

		const nextScroll = () => {
			if (isLanding == false) {
				scrolling = true
				setTimeout(() => {
					scrolling = false
				}, 2000)
				next()
			}
			else {
				setTimeout(() => { isLanding = false }, 2000)
				$steps.classList.add('active')
				$landing.classList.add('hidden')
			}
		}

		const precScroll = () => {
			scrolling = true
			setTimeout(() => {
				scrolling = false
			}, 2000)
			prec()
		}

		const next = () => {
			view < 9 ? view++ : false
			slider.callMove(view)
		}

		const prec = () => {
			view > 0 ? view-- : false
			slider.callMove(view)
		}

		if (!Modernizr.touchevents) {
			document.addEventListener('mousewheel', (event) => {
				if (scrolling == false) {
					event.deltaY > 0 ? nextScroll() : false
					event.deltaY < 0 ? precScroll() : false
				}
			})
		}

		document.addEventListener('keydown', (event) => {
			event.keyCode == 37 ? prec() : false
			event.keyCode == 38 ? prec() : false
			event.keyCode == 39 ? next() : false
			event.keyCode == 40 ? next() : false
		})

		if (!Modernizr.touchevents) {
			document.addEventListener('mousewheel', (event) => {
				event.preventDefault()
			})
		}
	}
}