/**
 * A simple line enemy moving straight down
 * @module app/enemies/line/line2
 */
define(["app/config", "app/unit"],
function(config, Unit){
    "use strict"

    var Line2 = function(game, x, y) {
        var width = 20;
        var height = 120;
        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "#000000";
        bmd.context.fillRect(0, 0, width, height);
        bmd.context.fillStyle = "green";
        bmd.context.fillRect(3, 3, width-6, height-6);

        var bullet = game.add.bitmapData(14, 14);
        bullet.context.beginPath();
        bullet.context.arc(5, 5, 5, 0, 2 * Math.PI, false);
        bullet.context.fillStyle = 'orange';
        bullet.context.fill();
        bullet.context.lineWidth = 1;
        bullet.context.strokeStyle = '#003300';
        bullet.context.stroke();

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
                    speed : 7
                }
            ],
            health : 15,
            attackRate : 500,
            unitTexture : bmd,
            attackTexture : bullet,
            alpha : 0.8
        });
    };

    Line2.prototype = new Unit();

    return Line2;
});
