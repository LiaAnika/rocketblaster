var BasicGame = {};

BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
    //displays a loading screen
		this.preloaderText = this.add.text(this.world.centerX, this.world.centerY, 'loading....',
		{
			fontSize: '96px',
			fill: '#fff',
			align: 'center'
		});

		this.preloaderText.anchor.setTo(0.5, 0.5);

		//preload images, sprite and audio assets into memory
		this.load.image('logo', 'assets/PhaserLogo.png');
		this.load.image('starfield', 'assets/starfield.png');
		this.load.image('startButton', 'assets/startButton.png');
		this.load.image('ship', 'assets/ship.png');
		this.load.image('ufo', 'assets/ufo.png');
		this.load.image('life', 'assets/lives.png');
		this.load.image('bullet', 'assets/bullet.png');
	},

	create: function () {

	},

	update: function () {
		this.game.state.start('MainMenu');

	}

};
