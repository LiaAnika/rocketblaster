BasicGame.Game = function (game) {};

// Graphical objects
var ship;
var usfos;
var lives;

var bullets;
var fireRate = 100;
var nextFire = 0;

//score & Lives
var score;
var lifeTotal;
var scoreText;
var lifeTotalText;

//audio
var music;
var bulletAudio;
var explosionAudio;

//timer 
var seconds;
var timer;
var timerText;

// misc variables
var cursors; // =keyboard
var gameOverText;
var restartButton;
var gameOver;

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
		
			scoreText = this.add.text(16, 16, 'Score: 0', {
				font: '32px arial', 
				fill: '#fff'
			});
			
			score = 0;
			scoreText.text = "Score: " + score; 
		
			lifeTotalText = this.add.text(this.world.width - 150, 16, 'Live: 3', {
				font: '32px arial',
				fill: '#ff'
			});
		
			lifeTotal = 3;
			lifeTotalText.text = 'Lives:' + lifeTotal;
			timerText = this.add.text(350, 16, 'Time: 0', {
				font: '32px arial', 
				fill: '#fff'
	});
		
			//setup timer
			timer = this.time.create(false);	
			seconds = 0;
			timerText.text = 'Time: ' + seconds;
			gameOverText = this.add.text(this.world.centerX, this.world.center Y-50, 'Game Over', {
				font: '96px arial',
				fill: '#fff',
				align: 'center'
});
			
			gameOverText.anchor.set(0.5);

			//hides the gameState text
			gameOverText.visible = false;
			gameOver = false;

			//Create a restart button and hide on screen
			restartButton = this.add.button((this.world.width / 2),
			(this.world.height / 2)+50, 'startButton', this.restartGame);
			restartButton.anchor.set(0.5);
			restartButton.visible = false;

			//Setting the keyboard to accept LEFT, RIGHT and SPACE input
			this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
			cursors = this.input.keyboard.createCursorKeys();

			//Load the audio into memory, starting music
			bulletAudio = this.add.audio('bullet');
			explosionAudio = this.add.audio('explosion');
			music = this.add.audio('music', 1, true);
			music.play('', 0, 1, true);

			//Set a TimerEvent to occur every second and start the timer
			timer.loop(1000, this.updateTimer, this);
			timer.start();
},

	update: function () {
		// background
		this.starfield.tilePosition.y += 2;
		//if lifeTotal is less than 1 
		if (lifeTotal < 1 || seconds == 60 || gameOver===true) {
			this.gameOver();
		}
		
		//execute 'createUfo','createLife','moveShip','collisionDetection' function
		else {
		this.createUfo();
		this.createLife();
		this.moveShip();
		this.collisionDetection();
		}
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
						bulletAudio.play();
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
					explosionAudio.play();
					ufo.kill();
					var animation = this.add.sprite(ufo.body.x, ufo.body.y, 'kaboom');
					animation.animations.add('explode');
					animation.animations.play('explode', 30, false, true);
					lifeTotal--;
					lifeTotalText.text = 'Lives: ' + lifeTotal;
					//
					gameOver=True;
				},
					destroyUfo: function (bullet, ufo) {
						explosionAudio.play();
						ufo.kill();
						bullet.kill();
						var animation = this.add.sprite(ufo.body.x, ufo.body.y, 'kaboom');
						animation.animations.add('explode');
						animation.animations.play('explode', 30, false, true);
						score += 100;
						scoreText.text = 'Score: ' + score;
					}, 
					
						//collision between player and life
				collectLife: function (ship, life){
					life.kill();
					lifeTotal++;
					lifeTotalText.text = 'Lives: ' + lifeTotal;
					var animation = this.add.sprite(life.body.x, life.body.y, 'lifeAnimation');
					animation.animations.add('lifeAnimation');
					animation.animations.play('lifeAnimation', 30, false, true);
				},
					
				  udateTimer: function () {
					  seconds++;
					  timerText.text= 'Time: ' + seconds;
				  },
					  
					  gameOver: function () {
						  ship.body.velocity.x = 0;
						  ship.body.x = (this.world.width/2)-(ship.body.width/2);
						  ufos.callAll('kill');
						  lives.callAll('kill');
						  bullets.callAll('kill');
						  music.stop();
						  gameOverText.visible = true;
						  restartButton.visible = true;
						  timer.stop();
		
				},
					restartGame: function () {
						this.game.state.start('Game');
					}
			};
