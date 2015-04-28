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

    var greenPhase = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.triangle2(this.game, -50, Math.random()*config.game.height/5);
                new enemies.triangle2(this.game, config.game.width+50,
                                      Math.random()*config.game.height/5, true);
                ++count;
                if (count == 7) { this.nextPhase(); }
            }.bind(this), 5500);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var level2 = new Level([redPhase1, greenPhase], "Dotwave", "level2");

    return level2;
});
