/**
 * A basic line enemy moving down and to the right/left
 * @module app/enemies/line/line1
 */
define(["app/config", "app/unit"],
function(config, Unit){
    "use strict"

    var Line1 = function(game, x, y, left) {
        var width = 30;
        var height = 100;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "#000000";
        bmd.context.fillRect(0, 0, width, height);
        bmd.context.fillStyle = "#F3AA49";
        bmd.context.fillRect(3, 3, width-6, height-6);

        var bullet = game.add.bitmapData(14, 14);
        bullet.context.beginPath();
        bullet.context.arc(7, 7, 4, 0, 2 * Math.PI, false);
        bullet.context.fillStyle = 'orange';
        bullet.context.fill();
        bullet.context.lineWidth = 3;
        bullet.context.strokeStyle = '#003300';
        bullet.context.stroke();

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
                    angle : 0,
                    speed : 3
                }
            ],
            health : 10,
            attackRate : 600,
            unitTexture : bmd,
            attackTexture : bullet,
            alpha : 0.7
        });
    };

    Line1.prototype = new Unit();

    return Line1;
});
