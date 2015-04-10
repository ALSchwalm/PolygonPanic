/**
 * A module defining the first level of PolygonPanic
 * @module app/level/2
 */
define(["app/config", "app/level", "app/phase", "app/enemies"],
function(config, Level, Phase, enemies) {
    var redPhase1 = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.triangle1(this.game, -50, -50);
                new enemies.triangle1(this.game, Math.random()*config.game.width, -50, true);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 2000);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var level2 = new Level([redPhase1], "Dotwave");

    return level2;
});
