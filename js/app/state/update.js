/**
 * A module returning a function which will be executed during each frame
 * @module app/state/update
 */
define(["app/controls", "app/background", "app/music", "app/player", "app/interface"],
function(controls, background, music, player, ui){
    "use strict"

    /**
     * Function which will be executed by Phaser during each frame
     * @alias module:app/state/update
     *
     * @param {Phaser.Game} game - The current game object
     */
    var update = function(game) {
        music.update();
        controls.update(game);
        background.update();
        ui.update();
        player.updateTimeText();
    }

    return update;
});
