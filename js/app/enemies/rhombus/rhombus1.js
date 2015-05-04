/**
 * A rhombus enemy which becomes two triangle units
 * @module app/enemies/rhombus/rhombus1
 */
define(["app/utils", "app/config", "app/unit"],
function(utils, config, Unit){
    "use strict"

    var Rhombus1 = function(game, x, y, left) {
        var width = 150;
        var height = 150;

        var bmd = game.add.bitmapData(width, height);
        bmd.context.fillStyle = "LightBlue";
        bmd.context.beginPath();

        bmd.context.moveTo(width/2 - 30, height/2);
        bmd.context.lineTo(width/2, height);
        bmd.context.lineTo(width/2 + 30, height/2);
        bmd.context.lineTo(width/2, 0);

        bmd.context.fill();
        bmd.context.lineWidth = 1;
        bmd.context.strokeStyle = '#003300';
        bmd.context.stroke();

        var bullet = utils.makeBullet(game, 14, 'LightBlue');

        var emitter = game.add.emitter(0, 0, 20);
        emitter.makeParticles('particle-rhombus1');
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
                        y : "+40",
                        angle : "+360"
                    },
                    duration : 1000
                },
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
            emitter: emitter,
            alpha : 0.7
        });

        this.onDestroy.push(function(unit){
            requirejs(["app/enemies"], function(enemies){
                var v1 = new enemies.triangle1(unit.game, unit.position.x,
                                               unit.position.y);
                v1.onScreen = true;
                var v2 = new enemies.triangle1(unit.game, unit.position.x,
                                               unit.position.y, true);
                v2.onScreen = true;
            });
        });
    };

    Rhombus1.prototype = new Unit();

    return Rhombus1;
});
