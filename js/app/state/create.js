/**
 * A module returning a function which will be executed during the 'create'
 * phase of Phaser js startup
 * @module app/state/create
 */
define(["app/config", "app/background", "app/music", "app/player",
        "app/levels", "app/poweruplist", "app/unit"],
function(config, background, music, player, levels, poweruplist, Unit){
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

        requirejs(["shakescreen"], function(Shake){
            game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
        });

        music.start(game, 'title');
        background.start(game);

        $("#play-btn").click(function(e) {
            // Prevent the game from being 'started' multiple times
            $("#play-btn").unbind();

            $("#main-menu-container").animate({
                height: '-=200px',
                width: '1000px',
                marginLeft : "-500px",
                left : "50%",
                opacity: 0
            }, 1000, function(){
                $("#main-menu-container").remove();
            });

            player.init(game, config.game.width/2, config.game.height-40);

            levels.init(game);
            levels.start();
        });

        $('#tutorial-btn').click(function(){
            $("#tutorial").fadeIn();
        });

        $('#tutorial img').click(function(e){
            $(this).hide();
            if (this == $("#tutorial img:last").get(0)) {
                $("#tutorial").fadeOut(function(){
                    $(this).siblings().show();
                }.bind(this));
            } else {
                $(this).siblings().show();
            }
        });

        $("#continue").click(function(){
            player.health = 4;
            player.scoreText.text = 'Score: ' + 0;
            player.score = 0;
            player.drawHealthBar();
            player.sprite.visible = true
            player.powerups.forEach(function(powerup){
                if (powerup)
                    powerup.displaysprite.visible = true;
            });
            Unit.prototype.units.map(function(unit){
                unit.destroy(false, true, true);
            });
            player.explosion.visible = false;
            levels.currentLevel.currentPhase.stop();
            $("#game-over").fadeOut(2000, function(){
                levels.currentLevel.currentPhase.start(
                    levels.currentLevel,
                    game
                );
            });
        });
    };
    return create;
});
