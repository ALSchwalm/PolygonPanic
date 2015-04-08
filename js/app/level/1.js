/**
 * A module defining the first level of PolygonPanic
 * @module app/level/1
 */
define(["app/config", "app/level", "app/phase", "app/enemies"],
function(config, Level, Phase, enemies) {
    var orangePhase1 = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.line2(this.game, Math.random()*config.game.width, -50);
                new enemies.line1(this.game, -50, -50);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 2000);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var orangePhase2 = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.line2(this.game, Math.random()*config.game.width, -50);
                new enemies.line1(this.game, config.game.width+50, -50, true);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 2000);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var level1 = new Level([orangePhase1,
                            orangePhase2]);

    return level1;
});
