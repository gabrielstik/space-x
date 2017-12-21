export default class Player {
	constructor() {
		const $music_ambiant = document.querySelector('audio')
		let $music_btn = document.querySelector('.music_btn')
        
		$music_btn.addEventListener('click', () => {
			$music_ambiant.classList.toggle('no-active')
			if($music_ambiant.classList.contains('no-active'))
			{
				$music_ambiant.pause()
				img.src='assets/images/src/sound-off.png'
			}
			else
			{
				$music_ambiant.play()
				img.src='assets/images/src/sound-on.png'
			}
		})
	
	}
}