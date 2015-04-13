/**
 * A basic line enemy moving down and to the right/left
 * @module app/enemies/line/line3
 */
define(["app/config", "app/unit"],
function(config, Unit){
    "use strict"

    var Line3 = function(game, x, y, left) {
        var width = 30;
        var height = 100;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "#000000";
        bmd.context.fillRect(0, 0, width, height);
        bmd.context.fillStyle = "blue";
        bmd.context.fillRect(3, 3, width-6, height-6);

        var bullet = game.add.bitmapData(14, 14);
        bullet.context.beginPath();
        bullet.context.arc(7, 7, 4, 0, 2 * Math.PI, false);
        bullet.context.fillStyle = 'yellow';
        bullet.context.fill();
        bullet.context.lineWidth = 3;
        bullet.context.strokeStyle = '#003300';
        bullet.context.stroke();

        this.init(game, x, y, 55, 80, {
            movement : [
                {
                    options : {
                        x : (left) ? "-200" : "+200",
                        y : "+100",
                        angle : "+45"
                    },
                    duration : 1200
                },
                {
                    options : {
                        x : (left) ? "-50" : "+50",
                        y : "+50",
                        angle : "+65"
                    },
                    duration : 800
                }
            ],
            attackPattern : [
                {
                    angle : "player",
                    speed : 4
                }
            ],
            health : 10,
            attackRate : 300,
            unitTexture : bmd,
            attackTexture : bullet,
            alpha : 0.7
        });
    };

    Line3.prototype = new Unit();

    return Line3;
});
