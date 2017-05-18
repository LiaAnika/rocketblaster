var BasicGame = {};

BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
    //displays a loading screen
		this.preloaderText = this.add.text(this.world.centerX, this.world.centerY, 'loading....'
		{
			fontSize: '95px',
			fill: '#fff',
			align: 'center'
		});

		this.preloaderText.anchor.setTo(0.5,0.5);

		//preload images, sprite and audio assets into memory
		this.load.images('logo', 'assets/PhaserLogo.png');
		this.load.images('starfield', 'assets/starfield.png');
		this.load.images('startbutton', 'assets/startbutton.png');
		this.load.images('ship', 'assets/ship.png');
	},

	create: function () {

	},

	update: function () {
		this.game.state.start('MainMenu');
		
	}

};
