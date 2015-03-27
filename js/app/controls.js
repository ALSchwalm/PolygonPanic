define(["app/config", "Phaser", "app/player"],
function(config, Phaser, player){
    "use strict"

    /**
     * A module which defines controls for the game
     * @exports app/controls
     */
    var controls = {
        rotating : false,
        shifting : false,
        postMove : function() {},
        keys : [],

        /**
         * Register a key to be used by the game
         *
         * @param {number} key - The keycode to watch
         * @param {function} func - Callback to execute when the key is pressed
         * @param {object} context - Context for the callback
         * @param {number} delayBetween - Time (in ms) between callback executions
         */
        registerControl : function(key, func, context, delayBetween) {
            var delayBetween = delayBetween || 0;
            var func = func.bind(context);
            var keyObj = {
                key: key,
                callback : func,
                delay: delayBetween,
                active: false,
                press : function() {
                    keyObj.callback();
                    keyObj.active = true;
                    setTimeout(function(){
                        keyObj.active = false;
                    }, keyObj.delay);
                    controls.postMove();
                }
            };
            controls.keys.push(keyObj);
        },

        update : function(game) {
            for (var i=0; i < controls.keys.length; ++i) {
                if (game.input.keyboard.isDown(controls.keys[i].key)) {
                    if (!controls.keys[i].active) {
                        controls.keys[i].press();
                    }
                } else {
                    controls.keys[i].active = false;
                }
            }
        }
    };

    controls.registerControl(Phaser.Keyboard.LEFT, function(){
        if (player.position.x > player.speed)
            player.position.x -= player.speed;
    }, this);

    controls.registerControl(Phaser.Keyboard.RIGHT, function(){
        if (player.position.x < config.game.width)
            player.position.x += player.speed;
    }, this);

    controls.registerControl(Phaser.Keyboard.UP, function(){
        if (player.position.y > player.speed)
            player.position.y -= player.speed;
    }, this);

    controls.registerControl(Phaser.Keyboard.DOWN, function(){
        if (player.position.y < config.game.height)
            player.position.y += player.speed;
    }, this);

    controls.registerControl(Phaser.Keyboard.SPACEBAR, function(){
        player.attack();
    }, this, config.player.defaultAttackRate);

    // Prevent the browser from taking the normal action (scrolling, etc)
    window.addEventListener("keydown", function(e) {
        var codes = [];
        controls.keys.map(function(keyObj){
            codes.push(keyObj.key);
        })

        if(codes.indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    return controls;
});
