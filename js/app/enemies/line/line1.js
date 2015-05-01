/**
 * A basic line enemy moving down and to the right/left
 * @module app/enemies/line/line1
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Line1 = function(game, x, y, left) {
        var width = 30;
        var height = 100;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "#000000";
        bmd.context.fillRect(0, 0, width, height);
        bmd.context.fillStyle = "#F3AA49";
        bmd.context.fillRect(3, 3, width-6, height-6);

        var bullet = utils.makeBullet(game, 14, 'orange');

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-line1');
        emitter.gravity = 0;
        emitter.setAlpha(0.95, 0.2, 600, Phaser.Easing.Exponential.In);
        emitter.setRotation(-720, 720);
        emitter.setScale(1.5, 1.0, 1.5, 1.0, 600);
        emitter.setYSpeed(-200, 200);
        emitter.setXSpeed(-200, 200);

        this.init(game, x, y, 55, 80, {
            movement : [
                {
                    options : {
                        x : (left) ? "-100" : "+100",
                        angle : "+180"
                    },
                    duration : 2000
                },
                {
                    options : {
                        y : "+50",
                        x : (left) ? "-70" : "+70",
                    },
                    duration : 1000
                }
            ],
            attackPattern : [
                {
                    angle : (left) ? 8 : -8,
                    speed : 3
                }
            ],
            health : 10,
            attackRate : 600,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.7
        });
    };

    Line1.prototype = new Unit();

    return Line1;
});
