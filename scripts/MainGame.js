BasicGame.Game = function (game) {};

// Graphical objects
var ship;
var usfos;
var lives

var bullets;
var fireRate = 100;
var nextFire = 0;

// misc variables
var cursors; // =keyboard

BasicGame.Game.prototype = {

	create: function () {
       //specify the physics of the game to ARCADE
			 this.physics.startSystem(Phaser.Physics.ARCADE);
			 //add the starfield and logo on screen
			 this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
			 //add the ship onto the screen, set physics and the boundaries
			 ship = this.add.sprite((this.world.width / 2), this.world.height - 50, 'ship');
			 ship.anchor.setTo(0.5, 0);
			 this.physics.enable(ship, Phaser.Physics.ARCADE);
			 ship.body.collideWorldBounds = true;

			 //creating group
			 //create the usfos group
			 usfos = this.add.group();
			 this.physics.enable(ufos, Phaser.Physics.ARCADE);

			 usfos.setAll('outOfBoundsKill', true);
			 usfos.setAll('checkWorldBounds', true);
			 usfos.setAll('anchor.x', 0.5);
			 usfos.setAll('anchor.y', 0.5);

			 //the different lives
			 lives = this.add.group();
			 this.physics.enable(lives, Phaser.Physics.ARCADE);

			lives.setAll('outOfBoundsKill', true);
 			lives.setAll('checkWorldBounds', true);
 			lives.setAll('anchor.x', 0.5);
 			lives.setAll('anchor.y', 0.5);

			//create bullets
			bullets = this.add.group();
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
			bullets.createMultiple(30, 'bullet', 0, false);
			bullets.setAll('outOfBoundsKill', true);
			bullets.setAll('checkWorldBounds', true);
			bullets.setAll('anchor.x', 0.5);
			bullets.setAll('anchor.y', 0.5);

			// setting the keyboard to accpect LEFT RIGHT SPACE input
			this.input.keyboard.addKeyCapture([Phaser.keyboard.LEFT, Phaser.keyboard.RIGHT, Phaser.keyboard.SPACEBAR]);
			cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		//execute 'createUfo','createLife','moveShip','collisionDetection' function

	}

};
