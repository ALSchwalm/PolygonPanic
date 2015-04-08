/**
 * A module defining the first level of PolygonPanic
 * @module app/level/2
 */
define(["app/config", "app/level", "app/phase", "app/enemies"],
function(config, Level, Phase, enemies) {
    var greenPhase1 = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.line2(this.game, Math.random()*config.game.width, -50);
                new enemies.line2(this.game, Math.random()*config.game.width, -50);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 2000);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var level2 = new Level([greenPhase1]);

    return level2;
});
