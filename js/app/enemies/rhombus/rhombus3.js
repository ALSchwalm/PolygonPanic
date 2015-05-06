/**
 * A rhombus enemy which becomes two triangle units
 * @module app/enemies/rhombus/rhombus3
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Rhombus3 = function(game, x, y, percent) {
        var width = 80;
        var height = 170;

        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "gold";
        bmd.context.beginPath();

        bmd.context.moveTo(width/2 - 30, height/2);
        bmd.context.lineTo(width/2, height);
        bmd.context.lineTo(width/2 + 30, height/2);
        bmd.context.lineTo(width/2, 0);

        bmd.context.fill();
        bmd.context.lineWidth = 1;
        bmd.context.strokeStyle = '#003300';
        bmd.context.stroke();

        var bullet = utils.makeBullet(game, 14, 'DarkBlue');

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-rhombus3');
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
                        x : config.game.width * percent,
                        y : "200",
                        angle : "+180"
                    },
                    duration : 1700
                },
                {
                    options : {
                        y : config.game.height + 10,
                        angle : "+360"
                    },
                    duration : 2000
                },
            ],
            attackPattern : [
                {
                    angle : "player",
                    speed : 3
                }
            ],
            health : 50,
            attackRate : 600,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.7
        });
    };

    Rhombus3.prototype = new Unit();

    return Rhombus3;
});
