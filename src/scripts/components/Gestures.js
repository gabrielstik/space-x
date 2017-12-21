/* global Modernizr */

export default class Gestures {

	constructor(slider) {
		let view = slider.constructor.currentView
		let scrolling = false

		const nextScroll = () => {
			scrolling = true
			setTimeout(() => {
				scrolling = false
			}, 2000)
			next()
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
	}
}