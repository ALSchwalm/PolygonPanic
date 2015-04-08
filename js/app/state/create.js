/**
 * A module returning a function which will be executed during the 'create'
 * phase of Phaser js startup
 * @module app/state/create
 */
define(["app/config", "app/background", "app/music", "app/player", "app/level/1",
        "app/powerups/shield", "app/powerups/triple"],
function(config, background, music, player, level1, Shield, Triple){
    "use strict"

    /**
     * Function which will be executed by Phaser after 'preload' is finished
     * @alias module:app/state/create
     *
     * @param {Phaser.Game} game - The current game object
     */
    var create = function(game){
        // Enable physics for collison
        game.physics.startSystem(Phaser.Physics.ARCADE);

        music.start(game);
        background.start(game);
        player.init(game, config.game.width/2, config.game.height-40);

        level1.init(game);
        level1.start();

        player.powerups.push(new Triple(game));
        player.powerups.push(new Shield(game));

        game.load.audio('title', 'assets/sounds/title.mp3').onFileComplete.add(
            function(percent, name) {
                if (name == 'title') {
                    music.play('title');
                    music.loadBackgroundMusic();
                }
        });

        game.load.start();
    };
    return create;
});
