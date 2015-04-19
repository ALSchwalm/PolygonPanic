/**
 * A module returning a function which will be executed to load game assets
 * @module app/state/preload
 */
define(function(){
    "use strict"

    /**
     * Function which will be executed by Phaser at start
     * @alias module:app/state/preload
     *
     * @param {Phaser.Game} game - The current game object
     */
    var preload = function(game){
        game.load.onFileComplete.add(function(p){
            $("#loading-screen .loading-text").html("Loading: " + p + "%");
            $("#loading-screen .progress-bar").css('width', p+'%')
                .attr('aria-valuenow', p);
            if (p == 100) {
                $("#loading-screen").hide();
                $("#main-menu-container").show();
                $("#game-container").show();
            }
        });

        game.load.script('CheckerWave', 'js/lib/CheckerWave.js');
        game.load.script('Dotwave', 'js/lib/Dotwave.js');
        game.load.script('Lightwave', 'js/lib/Lightwave.js');
        game.load.script('Gray', 'js/lib/filters/Gray.js');
        game.load.image('player-ship', 'assets/images/playership.png');
        game.load.image('player-basic-bullet', 'assets/images/basic_player_bullet.png');
        game.load.spritesheet('shield_effect', 'assets/images/shield1.png');
        game.load.spritesheet('explosion', 'assets/images/explode.png', 128, 128);
        game.load.audio('title', 'assets/sounds/title.mp3');
        game.load.audio('level1', 'assets/sounds/level1.mp3');
        game.load.audio('level2', 'assets/sounds/level2.mp3');
        game.load.audio('explode', 'assets/sounds/explosion.wav');
        game.load.audio('basic-laser', 'assets/sounds/laser.wav');

        game.load.image('shield', 'assets/images/powerups/shield.png');
        game.load.image('bomb', 'assets/images/powerups/bomb.png');
        game.load.image('triple', 'assets/images/powerups/numeral3.png');
        game.load.image('missle', 'assets/images/powerups/missle.png');
        game.load.image('missle_icon', 'assets/images/powerups/missle_icon.png');
    };

    return preload;
});
