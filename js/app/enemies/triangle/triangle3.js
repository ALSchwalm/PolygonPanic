/**
 * A basic spinning triangle enemy
 * @module app/enemies/triangle/triangle3
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Triangle3 = function(game, x, y, left) {
        var width = 150;
        var height = 150;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "orange";
        bmd.context.beginPath();

        var a = 55; // width of each edge of the triangle
        var h = Math.sqrt(3)/2*a;
        bmd.context.moveTo(75-a/2, 75-h/3);
        bmd.context.lineTo(75+a/2, 75-h/3);
        bmd.context.lineTo(75, 75+ 2/3 * h);
        bmd.context.fill();
        bmd.context.lineWidth = 1;
        bmd.context.strokeStyle = '#003300';
        bmd.context.stroke();

        var bullet = utils.makeBullet(game, 14, 'orange');
        var attackspeed = 2;

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-triangle3');
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
                        y : "+20",
                    },
                    duration : 800
                },
            ],
            attackPattern : [
                { angle : -80, speed : attackspeed },
                { angle : -40, speed : attackspeed },
                { angle : 0, speed : attackspeed },
                { angle : 40, speed : attackspeed },
                { angle : 80, speed : attackspeed },
                { angle : 40, speed : attackspeed },
                { angle : 0, speed : attackspeed },
                { angle : -40, speed : attackspeed },
                { angle : -80, speed : attackspeed },
            ],
            health : 20,
            attackRate : 100,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.7
        });
    };

    Triangle3.prototype = new Unit();

    return Triangle3;
});
