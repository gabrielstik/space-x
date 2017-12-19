const $button = document.querySelector('.landing button')
const $landing = document.querySelector('.landing')

let draggable = false
let mouse = {}
let mouseClick = {}
let mouseDiff = {}

const end = () => {
	$landing.classList.add('transition')
	$landing.style.transform = 'translateX(100vw)'
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
})