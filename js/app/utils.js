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
            }, duration);
            return interval;
        }
    }

    return utils;
});
