var BasicGame = {};

BasicGame.Preloader = function (game) {
    this.ready = false;
};

BasicGame.Preloader.prototype = {
    preload: function () {
        
        this.perloaderText = this.add.text(this.world.centerX, this.world.centerY, 'Loading...',{
            fontSize: '96px',
            fill: '#fff',
            align: 'center'
        });
        this.perloaderText.anchor.setTo(0.5,0.5);
        
        this.load.image('logo', 'assets/PhaserLogo.png');
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('startButton', 'assets/startButton.png');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('ufo', 'assets/ufo.png');
        this.load.image('life', 'assets/lives.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128, 16);
        this.load.spritesheet('lifeAnimation', 'assets/lifeAnimation.png', 100, 100, 4);
        this.load.audio('music', ['assets/music.m4a', 'assets/music.mp3']);
        this.load.audio('bullet', ['assets/laser_human.mp3']);
        this.load.audio('explosion', ['assets/explosion.mp3']);
        
    },
    
    create: function () {
        
    },
    
    update: function (){
        if (this.cache.isSoundDecoded('music') && this.ready == false) {
            this.ready = true;
            this.game.state('MainMenu');
        }
    }
}; 
