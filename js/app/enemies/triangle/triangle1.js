/**
 * A basic spinning triangle enemy
 * @module app/enemies/triangle/triangle1
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Triangle1 = function(game, x, y, left, boss) {
        var width = 150;
        var height = 150;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "red";
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

        var bullet = utils.makeBullet(game, 14, 'red')
        var attackspeed = 2;

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-triangle1');
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
                        y : ((boss) ? "+200" : "+40"),
                        angle : "+360"
                    },
                    duration : 1000
                },
            ],
            attackPattern : [
                { angle : 0, speed : attackspeed },
                { angle : 40, speed : attackspeed },
                { angle : 80, speed : attackspeed },
                { angle : 120, speed : attackspeed },
                { angle : 160, speed : attackspeed },
                { angle : 200, speed : attackspeed },
                { angle : 240, speed : attackspeed },
                { angle : 280, speed : attackspeed },
                { angle : 320, speed : attackspeed }
            ],
            health : 20,
            attackRate : 100,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.7
        });
    };

    Triangle1.prototype = new Unit();

    return Triangle1;
});
