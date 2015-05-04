/**
 * A module defining the first level of PolygonPanic
 * @module app/level/1
 */
define(["app/config", "app/level", "app/phase", "app/enemies", "app/bosses/lineboss"],
function(config, Level, Phase, enemies, LineBoss) {
    var orangePhase1 = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                new enemies.line2(this.game, Math.random()*config.game.width, -50);
                new enemies.line1(this.game, -50, -50);
                ++count;
                if (count == 25) { this.nextPhase(); }
            }.bind(this), 1500);
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
                if (count == 25) {
                    clearInterval(this.interval);
                    this.nextPhase();
                }
            }.bind(this), 1500);
        },
        onStop : function(){},
    });

    var attackPhase = new Phase({
        onStart : function(){
            var count = 0;
            this.interval = setInterval(function(){
                if (count % 2 == 0) {
                    new enemies.line3(this.game, -50, Math.random()*config.game.height/4);
                } else {
                    new enemies.line3(this.game, config.game.width+50,
                                      Math.random()*config.game.height/4, true);
                }
                ++count;
                if (count == 8) {
                    clearInterval(this.interval);
                    setTimeout(function(){
                        this.nextPhase();
                    }.bind(this), 7500);
                }
            }.bind(this), 2700);
        },
        onStop : function(){},
    });

    var bossPhase = new Phase({
        onStart : function() {
            this.boss = new LineBoss(this.game);
            this.boss.onDestroy.push(function(){
                setTimeout(function(){
                    this.nextPhase();
                }.bind(this), 7500);
            }.bind(this));
        },
        onStop : function(){
        }
    })

    var level1 = new Level([orangePhase1,
                            orangePhase2,
                            attackPhase,
                            bossPhase], "Lightwave", "level1");

    return level1;
});
