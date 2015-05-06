/**
 * A simple line enemy moving straight down
 * @module app/enemies/line/line2
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Line2 = function(game, x, y) {
        var width = 20;
        var height = 120;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "#000000";
        bmd.context.fillRect(0, 0, width, height);
        bmd.context.fillStyle = "green";
        bmd.context.fillRect(3, 3, width-6, height-6);

        var bullet = utils.makeBullet(game, 14, 'darkgreen');

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-line2');
        emitter.gravity = 0;
        emitter.setAlpha(0.95, 0.2, 600, Phaser.Easing.Exponential.In);
        emitter.setRotation(-720, 720);
        emitter.setScale(1.5, 1.0, 1.5, 1.0, 600);
        emitter.setYSpeed(-200, 200);
        emitter.setXSpeed(-200, 200);

        this.init(game, x, y, 60, 100, {
            movement : [
                {
                    options : {
                        y : "+150",
                        angle : "+180"
                    },
                    duration : 2000
                }
            ],
            attackPattern : [
                {
                    angle : 0,
                    speed : 4
                }
            ],
            health : 10,
            attackRate : 700,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.8
        });
    };

    Line2.prototype = new Unit();

    return Line2;
});
