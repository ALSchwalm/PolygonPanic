/**
 * A module defining the last level of PolygonPanic
 * @module app/level/3
 */
define(["app/config", "app/level", "app/phase", "app/enemies"],
function(config, Level, Phase, enemies) {
    var bluePhase = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.rhombus1(this.game, -50, -50);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 2000);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var level3 = new Level([bluePhase], "CheckerWave", "level3");
    return level3;
});
