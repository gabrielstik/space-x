class Landing {
	
	constructor() {
	
		const $button = document.querySelector('.landing button')
		const $landing = document.querySelector('.landing')
		const $earth = document.querySelector('.earth')
		const $steps = document.querySelector('.steps')

		let draggable = false
		let mouse = {}
		let mouseClick = {}
		let mouseDiff = {}

		const reset = () => {
			$landing.classList.add('transition')
			$landing.style.transform = 'translateX(0)'
			setTimeout(() => {
				$landing.classList.remove('transition')
			}, 500)
		}

		const end = () => {
			$landing.classList.add('transition')
			$landing.style.transform = 'translateX(100vw)'
			setTimeout(() => {
				$landing.classList.remove('transition')
			},1000)
			$earth.classList.add('active')
			$earth.classList.add('transition')
			setTimeout(() => {
				$earth.classList.remove('transition')
			},1000)
			$steps.classList.add('active')
			$steps.classList.add('transition')
			setTimeout(() => {
				$steps.classList.remove('transition')
			}, 1500)
		}

		$button.addEventListener('mousedown', (e) => {
			draggable = true
			mouseClick = {
				x: e.clientX,
				y: e.clientY
			}
		})

		document.addEventListener('mousemove', (e) => {
			if (draggable) {
				mouse = {
					x: e.clientX,
					y: e.clientY
				}
				mouseDiff = {
					x: mouse.x - mouseClick.x,
					y: mouse.y - mouseClick.y
				}
				mouseDiff.x < 0 ? mouseDiff.x = 0 : false
				$landing.style.transform = `
					translateX(${mouseDiff.x}px)
				`
				mouseDiff.x > window.innerWidth * .5 ? end() : false
			}
		})

		document.addEventListener('mouseup', () => {
			draggable = false
			mouseDiff.x < window.innerWidth * .5 ? reset() : false
		})
	}
}

new Landing()