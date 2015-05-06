/**
 * A module defining the second level of PolygonPanic
 * @module app/level/2
 */
define(["app/config", "app/level", "app/phase", "app/enemies", "app/bosses/triangleboss"],
function(config, Level, Phase, enemies, TriangleBoss) {
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
                if (count > 4) {
                    new enemies.triangle2(this.game, config.game.width+50,
                                          Math.random()*config.game.height/5, true);
                }
                ++count;
                if (count == 6) { this.nextPhase(); }
            }.bind(this), 5500);
        },
        onStop : function(){ clearInterval(this.interval); },
    });

    var orangePhase = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.triangle1(this.game, -50, -50);
                new enemies.triangle3(this.game, -50, Math.random()*config.game.height/5 + 100);
                new enemies.triangle3(this.game, config.game.width+50,
                                      Math.random()*config.game.height/5 + 100, true);
                ++count;
                if (count == 7) {
                    clearInterval(this.interval);
                    setTimeout(function(){
                        this.nextPhase();
                    }.bind(this), 7000);
                }
            }.bind(this), 5500);
        },
        onStop : function(){
            clearInterval(this.interval);
        },
    });

    var bossPhase = new Phase({
        onStart : function() {
            var count = 0;
            this.left = new TriangleBoss(this.game, true);
            this.right = new TriangleBoss(this.game, false);
            var allDestroyed = function(){
                ++count;
                if (count == 2){
                    setTimeout(function(){
                        this.nextPhase();
                    }.bind(this), 4000);
                }
            }.bind(this);
            this.left.onDestroy.push(allDestroyed);
            this.left.onDestroy.push(function(){
                this.right.otherDestroyed = true;
            }.bind(this));
            this.right.onDestroy.push(allDestroyed);
            this.right.onDestroy.push(function(){
                this.left.otherDestroyed = true;
            }.bind(this));
        },
        onStop : function(){}
    });

    var level2 = new Level([redPhase1,
                            greenPhase,
                            orangePhase,
                            bossPhase], "Plane", "level2");

    return level2;
});
