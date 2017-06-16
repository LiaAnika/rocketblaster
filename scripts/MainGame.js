BasicGame.Game = function(game) {};

//graphical Object 
var ship; 
var ufos;
var lives;

var bullets;
var fireRate = 100;
var nextFire = 0;

//misc variable
var cursors;
var gameOverText;
var restartButton;
var gameOver;

//timer
var seconds;
var timer;
var timerText;

//score and lives
var score;
var lifeTotal;
var scoreText;
var lifeTotalText;

//audio 
var music;
var bulletAudio;
var explosionAudio; 





BasicGame.Game.prototype = {
    
    create: function() {
        //specifying the physics game engine to ARCADE
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Adding the starfield, logo onto the screen 
        this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
        //adding the ship onto the screen, set the physics and the boundarys 
        ship = this.add.sprite((this.world.width / 2), this.world.height - 50, 'ship');
        ship.anchor.setTo(0.5, 0);
        this.physics.enable(ship, Phaser.Physics.ARCADE);
        ship.body.collideWorldBounds = true;
        
        //creating groups 
        //creating the ufos groups
        ufos = this.add.group();
        this.physics.enable(ufos, Phaser.Physics.ARCADE);
        
        ufos.setAll('outOfBoundsKill', true);
        ufos.setAll('checkWorldBounds', true);
        ufos.setAll('anchor.x', 0.5);
        ufos.setAll('anchor.y', 0.5);
        
        //creating the lives groups 
        lives = this.add.group();
        this.physics.enable(lives, Phaser.Physics.ARCADE);
        
        lives.setAll('outOfBoundsKill', true);
        lives.setAll('checkWorldBounds', true); 
        lives.setAll('anchor.x', 0.5); 
        lives.setAll('anchor.y', 0.5); 
        
        //creating the bullets group 
        bullets = this.add.group(); 
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE; 
        bullets.createMultiple(30, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5); 
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        
        //setting up & adding the score, life and timer to the screen 
        scoreText = this.add.text(16, 16, 'score:0', {
            font: '32px arial',
            fill: '#fff'
        });
        //set the score 
        score = 0;
        scoreText.text = "Score: " + score;
        
        lifeTotalText = this.add.text(this.world.width - 150, 16, 'Lives: 3', {
            font: '32px arial',
            fill: '#fill'          
    });
       //the lifetotal 
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
        
        gameOverText = this.add.text(this.world.centerX, this.world.centerY-50, 'Game Over',{
            font: '96px arial',
            fill: '#fff',
            align: 'center'
        });
        gameOverText.anchor.set(0.5);
        //hides the gameState text 
        gameOverText.visible = false;
        gameOver = false;
        
        //create a restart button and hide on screen
        restartButton = this.add.button((this.world.width / 2), (this.world.height / 2)+50, 'startButton', this.restartGame); 
        restartButton.anchor.set(0.5);
        restartButton.visible = false;
        
        //setting the keyboard to accept directions
        this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
        cursors = this.input.keyboard.createCursorKeys();
        
        //load the audio
        bulletAudio = this.add.audio('bullet');
        explosionAudio = this.add.audio('explosion');
        music = this.add.audio('music', 1, true);
        music.play('', 0, 1, true);
        
        //set a timerEvent to occur every second and start the timer 
        timer.loop(1000, this.updateTimer, this); 
        timer.start();
    },
        update: function (){
        //scroll the background
            this.starfield.tilePosition.y += 2;
            //if lifeTotal is less than 1 or seconds = 60 or gameOver variable = true then execute 'truegameOver' function
            if(lifeTotal <1 || seconds == 60 || gameOver===true){
                this.gameOver();
            }
            //else execute 'createUfo', 'createLife', moveship, collisionDetection function 
            else {
                this.createUfo();
                this.createLife();
                this.moveShip();
                this.collisionDetection();
            }
        },
            //moves ship and fires bullet from keyboard controls 
            moveShip: function (){
                //if left arrow key is down 
                if (cursors.left.isDown){
                    ship.body.velocity.x = -200;
                }
            // right arrow key is down 
               else if (cursors.right.isDown){
                    ship.body.velocity.x = 200;
                }
            //else stop ship 
                else {
                    ship.body.velocity.x = 0;
                }
            // if space bar is pressed 
                if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.fireBullet();
                }
            },
            
            //creating the UFO
                createUfo: function () {
            //Generate random number
                var random = this.rnd.integerInRange(0, 20);
            //if random number equals 0 then create Ufo
                if(random === 0) {
            //generating random position
                var randomX = this.rnd.integerInRange(0, this.world.width - 150);
            //creating ufo from group 
                var ufo = ufos.create(randomX, -50, 'ufo');
                this.physics.enable(ufo, Phaser.Physics.ARCADE);
            //generaring a random velocity 
                ufo.body.velocity.y = this.rnd.integerInRange(200, 300);
                }
            },
                
            //function executed during playing the game to create a life
                createLife: function () {
            //generate random number between 0 and 500 
                    var random = this.rnd.integerInRange(0, 500);
            //if random number equals 0 the create a life in a random x position
                    if (random === 0) {
            //generating random position in the x Axis 
                    var randomX = this.rnd.integerInRange(0, this.world.width - 150);
            //creating a ufo from the usfos group and setting the physics
                    var life = lives.create(randomX, -50, 'life');
                    this.physics.enable(life, Phaser.Physics.ARCADE);
                //generating a random velocity 
                    life.body.velocity.y = 150;
                    }
                },
            //generate bullet and position in the x axis, set the velocity and play the audio
                    fireBullet: function () {
                        if (this.time.now > nextFire && bullets.countDead() > 0) {
                            nextFire = this.time.now + fireRate;
                            var bullet = bullets.getFirstExists(false);
                            bullet.body.velocity.y = -400;
                            bulletAudio.play();
                            
                        }
                    }, 
    
            //function executed during playing the game to check for collisions 
                collisionDetection: function () {
                    this.physics.arcade.overlap(ship, ufos, this.collideUfo, null, this);
                    this.physics.arcade.overlap(ship, lives, this.collectLife, null, this);
                    this.physics.arcade.overlap(bullets, ufos, this.destroyUfo, null, this);
                    
                },
            //funcation executed if there is collision between player and ufo. Ufo is destroyed, animation &sound, reduce lifeTotal
                    collideUfo: function (ship,ufo) {
                        explosionAudio.play();
                        ufo.kill();
                        var animation = this.add.sprite(ufo.body.x, ufo.body.y, 'kaboom');
                        animation.animations.add('explode');
                        animation.animations.play('explode', 30, false, true);
                        lifeTotal--;
                        lifeTotalText.text = 'Lives' + lifeTotal;
                        
                        gameOver=true;
                    },
    
                //function executed if there is collision between ufo and bullet. UFO is destroyed, animation & sound, increase score
                    destroyUfo: function (bullet, ufo){
                       explosionAudio.play();
                        ufo.kill();
                        bullet.kill();
                    var animation = this.add.sprite(ufo.body.x, ufo.body.y, 'kaboom');
                        animation.animations.add('explode');
                        animation.animations.play('explode', 30, false, true);
                        score += 100;
                        scoreText.text = 'Score' + score;
                    },
                //function executed if there is collision between player and life. Life is destroyed, animation and sound, increase lifeTotal
                        collectLife: function (ship, life) {
                            life.kill();
                            lifeTotal++;
                            lifeTotalText.text ='Lives: ' + lifeTotal;
                            var animation = this.add.sprite(life.body.x, life.body.y, 'lifeAnimation');
                            animatio.animations.add('lifeAnimation');
                            animation.animations.play('lifeAnimation', 30, false, true);
                        },
                //Updates timer and outputs to the screen 
                            updateTimer: function() {
                                seconds++;
                                timerText.text = 'Time: ' + seconds;
                            },
                //function is executed when the game ends. Stops Ship, Kills all objects, stops timer, Display Restart Button
                        gameOver: function () {
                            ship.body.velocity.x = 0;
                            ship.body.x = (this.world.width/2)-(ship.body.width/2);
                            ufos.callAll('kill');
                            lives.callAll('kill');
                            bulets.callALL('kills');
                            music.stop();
                            gameOverText.visible = true;
                            restartButton.visible = true;
                            timer.stop();
                            
                        },
                //Restart function, executed when restart button is pressed
                            restartGame: function () {
                                this.game.state.start('Game');
                            },
                    render: function() {
                        //sprite debug info
                        this.game.debug.bodyInfo(ship, 32, 100);
                        this.game.debug.spriteBounds(ship);
                    }
}; 



