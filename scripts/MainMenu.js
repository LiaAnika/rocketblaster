BasicGame.MainMenu = function (game) { };

var startButton;
var starfield;
var logo;

BasicGame.MainMenu.prototype = {

	create: function () {
// we've already load the assets so we'll move straight into the MainMenu
//here we are add music
// I need to modify the MainMenu

//Output sky, ship, score, live, total and start time to the screen
//the scrollinf starfield background
starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
logo = this.add.sprite((this.world.width / 2), (this.world.height / 2) - 150, 'logo');
logo.anchor.setTo(0.5,0.5);
startButton = this.add.button((this.world.width / 2 ), (this.world.height / 2) + 50, 'startButton', this.startGame);
startButton.anchor.setTo(0.5,0.5);
	},

	update: function () {
		//	Do some nice funky main menu effect here
	},

	startGame: function () {
		//add start the actual game
		this.game.state.start('Game');
	}

};
