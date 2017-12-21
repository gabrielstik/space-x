export default class Gestures {

	constructor(slider) {
		let view = slider.constructor.currentView
		let scrolling = false

		const nextScroll = () => {
			scrolling = true
			view++
			setTimeout(() => {
				scrolling = false
			}, 2000)
			slider.callMove(view)
		}

		const precScroll = () => {
			scrolling = true
			view--
			setTimeout(() => {
				scrolling = false
			}, 2000)
			slider.callMove(view)
		}

		const next = () => {
			view++
			slider.callMove(view)
		}

		const prec = () => {
			view--
			slider.callMove(view)
		}

		document.addEventListener('mousewheel', (event) => {
			if (scrolling == false) {
				event.deltaY > 0 ? nextScroll() : false
				event.deltaY < 0 ? precScroll() : false
			}
		})

		document.addEventListener('keydown', (event) => {
			event.keyCode == 37 ? prec() : false
			event.keyCode == 38 ? prec() : false
			event.keyCode == 39 ? next() : false
			event.keyCode == 40 ? next() : false
		})
	}
}