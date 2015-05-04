/**
 * A dynamic triangle enemy
 * @module app/enemies/triangle/triangle2
 */
define(["app/config", "app/unit"],
function(config, Unit){
    "use strict"

    var Triangle2 = function(game, x, y, left) {
        var width = 150;
        var height = 150;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "LightGreen";
        bmd.context.beginPath();

        var a = 100; // width of each edge of the triangle
        var h = Math.sqrt(3)/2*a;
        bmd.context.moveTo(75-a/2, 75-h/3);
        bmd.context.lineTo(75+a/2, 75-h/3);
        bmd.context.lineTo(75, 75+ 2/3 * h);
        bmd.context.fill();
        bmd.context.lineWidth = 1;
        bmd.context.strokeStyle = '#003300';
        bmd.context.stroke();

        var bullet = game.add.bitmapData(14, 14);
        bullet.context.beginPath();
        bullet.context.arc(5, 5, 5, 0, 2 * Math.PI, false);
        bullet.context.fillStyle = 'LightGreen';
        bullet.context.fill();
        bullet.context.lineWidth = 1;
        bullet.context.strokeStyle = '#003300';
        bullet.context.stroke();
        var attackspeed = 2;

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-triangle2');
        emitter.gravity = 0;
        emitter.setAlpha(0.95, 0.2, 600, Phaser.Easing.Exponential.In);
        emitter.setRotation(-720, 720);
        emitter.setScale(2.0, 1.0, 2.0, 1.0, 600);
        emitter.setYSpeed(-200, 200);
        emitter.setXSpeed(-200, 200);

        this.init(game, x, y, 55, 80, {
            movement : [
                {
                    options : {
                        x : (left) ? "-200" : "+200",
                        y : "+100",
                        angle : "+45"
                    },
                    duration : 1600
                },
                {
                    options : {
                        x : (left) ? "-50" : "+50",
                        y : "+50",
                        angle : "+65"
                    },
                    duration : 1000
                }
            ],
            attackPattern : [
                { angle : 0, speed : 4 },   { angle : 20, speed : 4 },
                { angle : 40, speed : 4 },  { angle : 60, speed : 4 },
                { angle : 80, speed : 4 },  { angle : 100, speed : 4 },
                { angle : 120, speed : 4 }, { angle : 140, speed : 4 },
                { angle : 160, speed : 4 }, { angle : 180, speed : 4 },
                { angle : 200, speed : 4 }, { angle : 220, speed : 4 },
                { angle : 240, speed : 4 }, { angle : 260, speed : 4 },
                { angle : 280, speed : 4 }, { angle : 300, speed : 4 },
                { angle : 320, speed : 4 }, { angle : 340, speed : 4 },

                { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
            ],
            health : 30,
            attackRate : 130,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.7
        });
    };

    Triangle2.prototype = new Unit();

    return Triangle2;
});
