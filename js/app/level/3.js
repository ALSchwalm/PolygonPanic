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
                if (count%2==0) {
                    new enemies.rhombus1(this.game, -50,
                                         Math.random()*config.game.height/4);
                } else {
                    new enemies.rhombus1(this.game, config.game.width+50,
                                         Math.random()*config.game.height/4, true);
                }
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 1700);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var pinkPhase = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.rhombus2(this.game, -50,
                                     Math.random()*config.game.height/7);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 2000);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var goldPhase = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.rhombus3(this.game, -50, -50, count/20);
                ++count;
                if (count == 20) { this.nextPhase(); }
            }.bind(this), 600);
        },
        onStop : function(){ clearInterval(this.interval); },
    })

    var level3 = new Level([bluePhase, pinkPhase, goldPhase], "CheckerWave", "level3");
    return level3;
});
