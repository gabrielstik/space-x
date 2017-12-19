/* global THREE */

export default class Rocket {

	constructor(rocket) {
		var renderer,
			scene,
			camera,
			myCanvas = document.getElementById(rocket)
		//RENDERER
		renderer = new THREE.WebGLRenderer({
			canvas: myCanvas, 
			antialias: true,
			alpha: true
		})
		renderer.setClearColor(0x000000, 0)
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth / 2, window.innerHeight)
		//CAMERA
		camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000 )
		//SCENE
		scene = new THREE.Scene()
		//LIGHTS
		var light = new THREE.AmbientLight(0xffffff, 0.5)
		scene.add(light)
		var light2 = new THREE.PointLight(0xffffff, 0.5)
		scene.add(light2)
  
    
		var loader = new THREE.JSONLoader()
		// loader.load('monkey.json', handle_load);
		loader.load('./assets/models/falcon9.json', handle_load)
		var mesh
		var mixer
		function handle_load(geometry, materials) {
			//BASIC MESH
			var material = new THREE.MultiMaterial(materials)
			mesh = new THREE.Mesh(geometry, material)
			scene.add(mesh)
			mesh.position.z = -10
			//ANIMATION MESH
			var material = new THREE.MeshLambertMaterial({morphTargets: true})
			mesh = new THREE.Mesh(geometry, material)
			scene.add(mesh)
			mesh.position.z = -100
			mesh.position.y = -50
			mesh.position.x = 30
			//MIXER
			mixer = new THREE.AnimationMixer(mesh)
			var clip = THREE.AnimationClip.CreateFromMorphTargetSequence('talk', geometry.morphTargets, 30)
			mixer.clipAction(clip).setDuration(1).play()
		}
		//RENDER LOOP
		render()
		var delta = 0
		var prevTime = Date.now()
		function render() {
			delta += 0.1
			if (mesh) {
        
				mesh.rotation.y += 0.01
				//animation mesh
				// mesh.morphTargetInfluences[ 0 ] = Math.sin(delta) * 20.0;
			}
			if (mixer) {
				var time = Date.now()
				mixer.update((time - prevTime) * 0.001)
				prevTime = time
			}
			renderer.render(scene, camera)
			requestAnimationFrame(render)
		}

	}

	initFire() {
		// HOW TO USE
		// max (max lifetime of a particle), size, and speed needs to have a value
		// fireCoords is mudulable, fire will follow theses vallue to generate
		// All functions are needed to make it work, except loop wich can be easily replaced

		const $canvas = document.querySelector('.fire')
		const context = $canvas.getContext('2d') // TOUJOURS AVOIR UN CONTEXT

		// Fire coordinates
		const fireCoord = {x: 0, y: 0}
		const fireParticlesArray = []
		// Particle proprety
		const max = 60
		const speed = 2
		const size = 20
		// Particle storage
		// Coordinates, horizontal and vertical speed
		// And particle duration
		const fireParticles = (x, y, xs ,ys) =>
		{
			this.x=x
			this.y=y
			this.xs= xs
			this.ys= ys
			this.lifetime=1
		}

		// Particle creation
		// Coordinates, horizontal and vertical speed
		// And particle duration
		const fireCreate = () =>
		{
			const fireParticles = {}
			fireParticles.x = fireCoord.x
			fireParticles.y = fireCoord.y
			fireParticles.xs = (Math.random()*2*speed-speed)/2
			fireParticles.ys = 0-Math.random()*2*speed
			fireParticles.lifetime = 0

			fireParticlesArray.push(fireParticles)
		}

		const fireUpdate = () =>
		{
			context.globalCompositeOperation='lighter'
			// Add 10 particule per frame
			for(var i=0; i<10; i++)
			{
				fireCreate()
			}

			// Cycle to draw particle
			for(var i=0; i<fireParticlesArray.length; i++)
			{
				context.fillStyle = 'rgba('+(260-(fireParticlesArray[i].lifetime*2))+','+((fireParticlesArray[i].lifetime*2)+50)+','+(fireParticlesArray[i].lifetime*2)+','+(((max-fireParticlesArray[i].lifetime)/max)*0.4)+')'

				context.beginPath()
				// Draw particle as circle that gets smaller as lifetime is higher
				context.arc(fireParticlesArray[i].x,fireParticlesArray[i].y,(max-fireParticlesArray[i].lifetime)/max*(size/2)+(size/2),0,2*Math.PI)
				context.fill()

				//Move the particle based on its horizontal and vertical speeds
				fireParticlesArray[i].x+= fireParticlesArray[i].xs
				fireParticlesArray[i].y-= fireParticlesArray[i].ys
				fireParticlesArray[i].lifetime++

				//If the particle has lived longer than Max, cut it from the array
				if (fireParticlesArray[i].lifetime >= max)
				{
					fireParticlesArray.splice(i, 1)
					i--
				}
			}
		}

		// TEST COORDS, DO NOT INQUIERE
		// fireCoord.x = 100
		// fireCoord.y = 100

		const loop = () =>
		{
			window.requestAnimationFrame(loop)
			context.clearRect(0, 0, $canvas.width, $canvas.height)
			fireUpdate()
		}

		loop()
	}
}