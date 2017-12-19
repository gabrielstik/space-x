/* global THREE */

export default class Rocket {

	constructor() {
		var renderer,
			scene,
			camera,
			myCanvas = document.getElementById('myCanvas')
		//RENDERER
		renderer = new THREE.WebGLRenderer({
			canvas: myCanvas, 
			antialias: true,
			alpha: true
		})
		renderer.setClearColor(0x000000, 0)
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)
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
			// var material = new THREE.MultiMaterial(materials);
			// mesh = new THREE.Mesh(geometry, material);
			// scene.add(mesh);
			// mesh.position.z = -10;
			//ANIMATION MESH
			var material = new THREE.MeshLambertMaterial({morphTargets: true})
			mesh = new THREE.Mesh(geometry, material)
			scene.add(mesh)
			mesh.position.z = -200
			mesh.position.y = -10
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
}