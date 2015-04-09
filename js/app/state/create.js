/**
 * A module returning a function which will be executed during the 'create'
 * phase of Phaser js startup
 * @module app/state/create
 */
define(["app/config", "app/background", "app/music", "app/player", "app/levels",
        "app/poweruplist"],
function(config, background, music, player, levels, poweruplist){
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

        // Disable pause on loss of focus
        game.stage.disableVisibilityChange = true;

        music.start(game);
        background.start(game);
        player.init(game, config.game.width/2, config.game.height-40);

        levels.init(game);
        levels.start();

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
