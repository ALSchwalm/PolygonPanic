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

        game.load.script('CheckerWave', 'js/lib/filters/CheckerWave.js');
        game.load.script('Dotwave', 'js/lib/filters/Dotwave.js');
        game.load.script('Lightwave', 'js/lib/filters/Lightwave.js');
        game.load.script('Gray', 'js/lib/filters/Gray.js');
        game.load.script('Plasma', 'js/lib/filters/Plasma.js');
        game.load.script('Plane', 'js/lib/filters/Plane.js');
        game.load.image('player-ship', 'assets/images/playership.png');
        game.load.image('player-basic-bullet', 'assets/images/basic_player_bullet.png');
        game.load.spritesheet('shield_effect', 'assets/images/shield1.png');
        game.load.image('particle-line1', 'assets/images/particles/particle-line1.png');
        game.load.image('particle-line2', 'assets/images/particles/particle-line2.png');
        game.load.image('particle-line3', 'assets/images/particles/particle-line3.png');
        game.load.image('particle-triangle1', 'assets/images/particles/particle-triangle1.png');
        game.load.image('particle-triangle2', 'assets/images/particles/particle-triangle2.png');
        game.load.image('particle-triangle3', 'assets/images/particles/particle-triangle3.png');
        game.load.image('particle-rhombus1', 'assets/images/particles/particle-rhombus1.png');
        game.load.image('particle-rhombus2', 'assets/images/particles/particle-rhombus2.png');
        game.load.image('particle-rhombus3', 'assets/images/particles/particle-rhombus3.png');
        game.load.image('particle-boss1', 'assets/images/particles/particle-boss1.png');
        game.load.image('particle-boss2', 'assets/images/particles/particle-boss2.png');
        game.load.image('particle-boss3', 'assets/images/particles/particle-boss3.png');
        game.load.image('cyberglow', 'assets/images/cyberglow.png');
        game.load.spritesheet('explosion', 'assets/images/explode.png', 128, 128);
        game.load.spritesheet('lineboss', 'assets/images/lineboss.png', 450, 100);
        game.load.spritesheet('triangleboss', 'assets/images/triangle_boss.png', 300, 265);
        game.load.spritesheet('rhombusboss', 'assets/images/rhombus_boss.png', 234, 119);
        game.load.audio('title', 'assets/sounds/title.mp3');
        game.load.audio('level1', 'assets/sounds/level1.mp3');
        game.load.audio('level2', 'assets/sounds/level2.mp3');
        game.load.audio('level3', 'assets/sounds/level3.mp3');
        game.load.audio('explode', 'assets/sounds/explosion.wav');
        game.load.audio('powerup', 'assets/sounds/powerup.wav');
        game.load.audio('basic-laser', 'assets/sounds/laser.wav');
        game.load.audio('shield', 'assets/sounds/shield.mp3');
        game.load.audio('beam', 'assets/sounds/beam.wav');
        game.load.audio('missle', 'assets/sounds/missle.wav');
        game.load.audio('healSound', 'assets/sounds/heal.wav');

        game.load.image('shield', 'assets/images/powerups/shield.png');
        game.load.image('bomb', 'assets/images/powerups/bomb.png');
        game.load.image('beam', 'assets/images/powerups/beam.png');
        game.load.image('beam_icon', 'assets/images/powerups/beam_icon.png');
        game.load.image('triple', 'assets/images/powerups/numeral3.png');
        game.load.image('missle', 'assets/images/powerups/missle.png');
        game.load.image('missle_icon', 'assets/images/powerups/missle_icon.png');
        game.load.image('spread_icon', 'assets/images/powerups/spread.png');
        game.load.image('heal', 'assets/images/powerups/heal.png');

        game.load.image("red_oval", "assets/images/bullets/red_oval_small.png");
        game.load.image("blue_oval", "assets/images/bullets/blue_oval_small.png");
        game.load.image("green_oval", "assets/images/bullets/green_oval_small.png");
        game.load.image("spread", "assets/images/bullets/spread.png");
    };

    return preload;
});
