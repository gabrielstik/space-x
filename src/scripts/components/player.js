export default class Player {
	constructor() {
		const $music_ambiant = document.querySelector('audio')
		const $music_btn = document.querySelector('.music_btn')
        
		$music_btn.addEventListener('click', () => {
			if ($music_ambiant.pause() == true) {
				$music_ambiant.play()
				$music_btn.src = 'assets/images/src/sound-on.png'
			}
			else {
				$music_ambiant.pause()
				$music_btn.src = 'assets/images/src/sound-off.png'
        
			}
		})
	}
}