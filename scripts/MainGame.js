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
			bullets.setAll('anchor.x', 0.5);
			bullets.setAll('anchor.y', 0.5);
			bullets.setAll('outOfBoundsKill', true);
			bullets.setAll('checkWorldBounds', true);


			// setting the keyboard to accpect LEFT RIGHT SPACE input
			this.input.keyboard.addKeyCapture([Phaser.keyboard.LEFT, Phaser.keyboard.RIGHT, Phaser.keyboard.SPACEBAR]);
			cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		//execute 'createUfo','createLife','moveShip','collisionDetection' function
		this.createUfo();
		this.createLife();
		this.moveShip();
		this.collisionDetection();

	},

		moveShip: function (){
			if (cursors.left.isDown)
						ship.body.velocity.x = -200;
		}
	 		else if (cursors.right.isDown){
				ship.body.velocity.x = 200;
			}
			else {
				ship.body.velocity.x = 0;
			}

			if (this.input.keyboard.isDown(Phaser.keyboard.SPACEBAR)) {this.fireBullet();
			}
		},

			createUfo: function() {
			 //Generate random number between 0 and 20
				var random = this.rnd.integerInRange(0, 20);
				//if random number equals 0 then create a ufo in a random x position and random y velocity
				if (random === 0) {
					// generating random position
					var randomX = this.rnd.integerInRange(0, this.world.width - 150);

					//creating a ufos groups
					var ufo = ufos.create(randomX, -50, 'ufo');
					this.physics.enable(ufo, Phaser.Physics.ARCADE);
					//random velocity
					ufo.body.velocity.y = this.rnd.integerInRange(200, 300);
				}
	},
				createLife: function() {
					//random numbers between 0-500
					var random = this.rnd.integerInRange(0, 500);
					//if random number = 0 then create a life in a random x position
					if (random === 0) {
						var randomX = this.rnd.integerInRange(0, this.world.width - 150);
						//creating a ufo from the usfos
						var life = lives.create(randomX, -50, 'life');
						this.physics.enable(life, Phaser.physics.ARCADE);
						life.body.velocity.y = 150;
					}
				},
				//Generate bullets and position
				fireBullet: function() {
					if (this.time.now > nextFire && bullets.countDead() > 0) {
						nextFire = this.time.now + fireRate;
						var bullet = bullets.getFirstExists(false);
						bullet.reset(ship.x, ship.y);
						bullet.body.velocity.y = -400;
					}
				},
				//check for collisions
				collisionDetection: function(){
					this.physics.arcade.overlap(ship, ufos, this.collideUfo, null, this);
					this.physics.arcade.overlap(ship, lives, this.collectLife, null, this);
					this.physics.arcade.overlap(bullets, ufos, this.destroyUfo, nullm this);
				},

				//collisions between player and ufos
				collideUfo: function (ship, ufo){
					ufo.kill();
					bullet.kill();
				},

				//collision between player and life
				collectLife: function (ship, life){
					life.kill();
				}
};
