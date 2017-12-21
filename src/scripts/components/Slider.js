export default class Slider {
  
	constructor($_slider, surrounding, coords) {
		this.constructor.coords = coords
		this.constructor.surrounding = surrounding
		this.constructor.$slider = document.querySelector($_slider)
		this.constructor.$viewContainer = this.constructor.$slider.querySelector('ul')
		this.constructor.$views = this.constructor.$slider.querySelectorAll('li')
		this.constructor.viewsNumber = this.constructor.$views.length
		this.constructor.$viewContainer.style.width = `${this.constructor.viewsNumber * 100}vw`
		this.constructor.currentView = 0
		this.constructor.$dots = null      
		this.constructor.isDots = false
	}
  
	/* DOTS */
  
	dots() {
		this.constructor.isDots = true

		const $dots = document.createElement('div')
		$dots.classList.add('dots')
    
		this.constructor.$slider.appendChild($dots)
  
		const $dotContainer = this.constructor.$slider.querySelector('.dots')
		for (let i = 0; i < this.constructor.viewsNumber; i++) {
			const $dot = document.createElement('div')
			$dot.classList.add('dot')
			if (i == this.constructor.currentView) {
				$dot.classList.add('current-dot')
			}
			$dot.dataset.view = i
			$dotContainer.appendChild($dot)
		}

		this.constructor.$dots = document.querySelectorAll('.dot')

		let i = 0
		this.constructor.$dots.forEach(dot => {
			const $title = document.createElement('div')
			$title.classList.add('title')
			dot.appendChild($title)
			$title.innerHTML = this.constructor.$views[i].dataset.name
			i++
			dot.addEventListener('click', () => {
				this.constructor.currentView = dot.dataset.view
				Slider.move(this.constructor.currentView )
				Slider.moveDots(this.constructor.currentView )
			})
		})
	}
   
	/* ARROWS */
	arrows(leftContent, rightContent) {
		const $leftArrow = document.createElement('div')
		$leftArrow.classList.add('arrow', 'arrow-left')
		$leftArrow.innerHTML = leftContent
		this.constructor.$slider.appendChild($leftArrow)
  
		const $rightArrow = document.createElement('div')
		$rightArrow.classList.add('arrow', 'arrow-right')
		$rightArrow.innerHTML = rightContent
		this.constructor.$slider.appendChild($rightArrow)
  
		$rightArrow.addEventListener('mousedown', () => {
			if (this.constructor.currentView < this.constructor.viewsNumber - 1) {
				this.constructor.currentView++
			}
			else {
				this.constructor.currentView = 0
			}
			Slider.move(this.constructor.currentView)
		})
  
		$leftArrow.addEventListener('mousedown', () => {
			if (this.constructor.currentView > 0) {
				this.constructor.currentView--
			}
			else {
				this.constructor.currentView = this.constructor.viewsNumber - 1
			}
			Slider.move(this.constructor.currentView)
		})
	}

	touchmoves() {
		let finger = { xStart: null, xMove: null, xEnd: null }

		this.constructor.$slider.addEventListener('touchstart', (e) => {
			finger.xStart = e.touches[0].clientX
			finger.xEnd = finger.xStart 
			this.constructor.$viewContainer.style.transition = 'transform 0s'

			this.constructor.$slider.addEventListener('touchmove', (e) => {
				finger.xMove = e.touches[0].clientX
				this.constructor.$viewContainer.style.transform = `translateX(calc(${this.constructor.currentView * -100}vw + ${+ finger.xMove - finger.xStart}px))`
				finger.xEnd = finger.xMove
			})
		})

		this.constructor.$slider.addEventListener('touchend', () => {
			this.constructor.$viewContainer.style.transition = 'transform .5s ease-in-out'
			if (finger.xEnd - finger.xStart >= 50) {
				if (this.constructor.currentView > 0) {
					this.constructor.currentView--
				}
			}
			else if (finger.xEnd - finger.xStart <= -50) {
				if (this.constructor.currentView < this.constructor.viewsNumber - 1) {
					this.constructor.currentView++
				}
			}
			Slider.move(this.constructor.currentView)
		})
	}
  
	/* MOVES */
  
	static move(currentView) {
		
		const $altimeter = document.querySelector('.altimeter')
		const $altimeterValue = $altimeter.querySelector('.value')
		const $earth = document.querySelector('#earth')
		const $rocket = document.querySelector('.rocket')
		const $fire = document.querySelector('.fire')
		const $image = document.querySelector('.rocket img')

		this.$viewContainer.style.transform = `translateX(${currentView * -100}vw)`
		this.currentView = currentView

		if (this.isDots) {
			Slider.moveDots(this.currentView)
		}

		const updateAlt = (alt) => {
			$altimeterValue.innerHTML = alt
			$altimeterValue.style.transform = `translateY(${$altimeter.offsetHeight / 210 * -alt}px)`
		}

		const updateEarth = (tilt, zoom, panX, panY) => {
			let coords = this.coords
			// coords.x += 45
			coords.y += 45
			// this.surrounding.earth.setTilt(tilt)
			// this.surrounding.earth.setZoom(zoom)
			this.surrounding.earth.panTo([coords.x,coords.y])
		}

		const updateRocket = (x, y, size, angle) => {
			$rocket.style.transform = `translateX(${x}) translateY(${y}) scale(${size}) rotate(${angle})`
			$fire.style.transform = `translateX(${x}) translateY(${y}) scale(${size}) rotate(${angle})`
		}
		updateRocket('0px', '-70vh', '.1', '5deg')

		if (this.currentView == 0) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			this.coords.x += 1
			updateAlt(0)
			updateEarth(45, 5)
			updateRocket('0px', '-70vh', '.1', '5deg')
			$image.src = 'assets/imageS/src/rocket.png'
		}

		if (this.currentView == 1) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			this.coords.x += 1
			updateAlt(14)
			updateEarth(45, 5)
			updateRocket('0px', '-70vh', '.1', '5deg')
			$image.src = 'assets/imageS/src/rocket.png'
		}

		if (this.currentView == 2) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(65)
			updateEarth(45, 5)
			updateRocket('5vw', '-68vh', '.2', '45deg')
			$image.src = 'assets/imageS/src/rocket.png'
		}

		if (this.currentView == 3) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(70)
			updateEarth(35, 5)
			updateRocket('12vw', '-62vh', '.3', '110deg')
			$image.src = 'assets/images/src/rocket-mid.png'
		}

		if (this.currentView == 4) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(80)
			updateEarth(35, 5)
			updateRocket('30vw', '-45vh', '.5', '350deg')
			$image.src = 'assets/images/src/rocket-mid.png'
		}

		if (this.currentView == 5) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(120)
			updateEarth(15, 4)
			updateRocket('20vw', '-10vh', '.4', '405deg')
			$image.src = 'assets/images/src/rocket-mid.png'
		}

		if (this.currentView == 6) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(204)
			updateEarth(15, 4)
			updateRocket('15vw', '0', '.2', '450deg')
			$image.src = 'assets/images/src/rocket-fins.png'
		}

		if (this.currentView == 7) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(80)
			updateEarth(15, 4)
			updateRocket('12vw', '0', '.2', '460deg')
			$image.src = 'assets/images/src/rocket-fins.png'
		}

		if (this.currentView == 8) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(204)
			updateEarth(4, 4)
			updateRocket('10vw', '0', '.1', '500deg')
			$image.src = 'assets/images/src/rocket-last.png'
		}

		if (this.currentView == 9) {
			setTimeout(() => {
				$earth.classList.remove('zoom')
			}, 1000)
			updateAlt(0)
			updateEarth(0, 1)
			updateRocket('10vw', '0', '.01', '500deg')
			$image.src = 'assets/images/src/rocket-last.png'
		}
	}
  
	static moveDots(currentView) {
		for (const $dot of this.$dots) {
			$dot.classList.remove('current-dot')
		}
		this.$dots[currentView].classList.add('current-dot')
	}
}