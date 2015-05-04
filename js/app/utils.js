/**
 * A module which defines a set of utilities
 * @module app/utils
 */
define(["app/config", "jquery"], function(config, jQuery){
    var utils = {
        clone : function(obj) {
            return jQuery.extend(true, {}, obj);
        },

        cloneArray : function(arr) {
            return jQuery.extend(true, [], arr);
        },

        shakeScreen : function(game, duration){
            var i=0;
            var interval = setInterval(function(){
                if (i%2 == 0) {
                    game.camera.x -= 5;
                } else {
                    game.camera.x += 5;
                }
                ++i
            }, 50);
            setTimeout(function(){
                clearInterval(interval);
                game.camera.x = 0;
            }, duration);
            return interval;
        },

        makeBullet : function(game, size, color) {
            var bullet = game.add.bitmapData(size, size);
            bullet.context.beginPath();
            bullet.context.arc(size/2, size/2, size/3, 0, 2 * Math.PI, false);
            bullet.context.fillStyle = color;
            bullet.context.fill();
            bullet.context.lineWidth = 2;
            bullet.context.strokeStyle = '#999999';
            bullet.context.stroke();
            return bullet;
        }
    }

    return utils;
});
