/**
 * A basic spinning triangle enemy
 * @module app/enemies/triangle/triangle1
 */
define(["app/config", "app/unit"],
function(config, Unit){
    "use strict"

    var Triangle1 = function(game, x, y, left) {
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

        var bullet = game.add.bitmapData(14, 14);
        bullet.context.beginPath();
        bullet.context.arc(5, 5, 5, 0, 2 * Math.PI, false);
        bullet.context.fillStyle = 'red';
        bullet.context.fill();
        bullet.context.lineWidth = 1;
        bullet.context.strokeStyle = '#003300';
        bullet.context.stroke();

        this.init(game, x, y, 55, 80, {
            movement : [
                {
                    options : {
                        x : (left) ? "-100" : "+100",
                        y : "+40",
                        angle : "+360"
                    },
                    duration : 2000
                },
            ],
            attackPattern : [
                { angle : 0, speed : 7 },
                { angle : 40, speed : 5 },
                { angle : 80, speed : 5 },
                { angle : 120, speed : 5 },
                { angle : 160, speed : 5 },
                { angle : 200, speed : 5 },
                { angle : 240, speed : 5 },
                { angle : 280, speed : 5 },
                { angle : 320, speed : 5 }
            ],
            health : 10,
            attackRate : 300,
            unitTexture : bmd,
            attackTexture : bullet,
            alpha : 0.7
        });
    };

    Triangle1.prototype = new Unit();

    return Triangle1;
});
