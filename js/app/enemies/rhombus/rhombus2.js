/**
 * A rhombus enemy which becomes two triangle units
 * @module app/enemies/rhombus/rhombus2
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Rhombus2 = function(game, x, y, left) {
        var width = 180;
        var height = 175;

        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "LightCoral";
        bmd.context.beginPath();

        bmd.context.moveTo(width/2 - 30, height/2);
        bmd.context.lineTo(width/2, height);
        bmd.context.lineTo(width/2 + 30, height/2);
        bmd.context.lineTo(width/2, 0);

        bmd.context.fill();
        bmd.context.lineWidth = 1;
        bmd.context.strokeStyle = '#003300';
        bmd.context.stroke();

        var bullet = utils.makeBullet(game, 14, 'LightGreen');

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-rhombus2');
        emitter.gravity = 0;
        emitter.setAlpha(0.95, 0.2, 600, Phaser.Easing.Exponential.In);
        emitter.setRotation(-720, 720);
        emitter.setScale(1.5, 1.0, 1.5, 1.0, 600);
        emitter.setYSpeed(-200, 200);
        emitter.setXSpeed(-200, 200);

        var attackspeed = 2.5;
        this.init(game, x, y, 55, 80, {
            movement : [
                {
                    options : {
                        x : config.game.width/2,
                        y : "200",
                        angle : "+360"
                    },
                    duration : 4000
                },
                {
                    options : {
                        y : config.game.height + 10,
                        angle : "+360"
                    },
                    duration : 4000
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
            health : 30,
            attackRate : 100,
            unitTexture : bmd,
            attackTexture : bullet,
            emitter: emitter,
            alpha : 0.7
        });

        this.onDestroy.push(function(unit){
            requirejs(["app/enemies"], function(enemies){
                var v1 = new enemies.line3(unit.game, unit.position.x,
                                           unit.position.y);
                v1.onScreen = true;
                var v2 = new enemies.line3(unit.game, unit.position.x,
                                           unit.position.y, true);
                v2.onScreen = true;
            });
        });
    };

    Rhombus2.prototype = new Unit();

    return Rhombus2;
});
