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

    var bossPhase = new Phase({
        onStart : function() {
            var deathCount = 0;
            this.one = new RhombusBoss(this.game, "one");
            this.two = new RhombusBoss(this.game, "two");
            this.three = new RhombusBoss(this.game, "three");
            this.four = new RhombusBoss(this.game, "four");
            var allDestroyed = function(){
                ++deathCount;
                if (deathCount == 4){
                    setTimeout(function(){
                        this.nextPhase();
                    }.bind(this), 4000);
                }
            }.bind(this);
            this.one.onDestroy.push(allDestroyed);
            this.one.onDestroy.push(function(){
                this.two.oneDestroyed = true;
                this.three.oneDestroyed = true;
                this.four.oneDestroyed = true;
            }.bind(this));
            this.two.onDestroy.push(allDestroyed);
            this.two.onDestroy.push(function(){
                this.one.twoDestroyed = true;
                this.three.twoDestroyed = true;
                this.four.twoDestroyed = true;
            }.bind(this));
            this.three.onDestroy.push(allDestroyed);
            this.three.onDestroy.push(function(){
                this.one.threeDestroyed = true;
                this.two.threeDestroyed = true;
                this.four.threeDestroyed = true;
            }.bind(this));
            this.four.onDestroy.push(allDestroyed);
            this.four.onDestroy.push(function(){
                this.one.fourDestroyed = true;
                this.two.fourDestroyed = true;
                this.three.fourDestroyed = true;
            }.bind(this));
        },
        onStop : function(){}
    });

    var level3 = new Level([bossPhase, bluePhase, pinkPhase, goldPhase], "CheckerWave", "level3");
    return level3;
});
