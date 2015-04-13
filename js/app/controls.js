define(["app/config", "Phaser", "app/player", "app/music"],
function(config, Phaser, player, music){
    "use strict"

    /**
     * A module which defines controls for the game
     * @exports app/controls
     */
    var controls = {
        selecting : false,
        recentSelect : false,
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
                press : function(game) {
                    keyObj.callback(game);
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
            if (player.health <= 0)
                return;
            for (var i=0; i < controls.keys.length; ++i) {
                if (game.input.keyboard.isDown(controls.keys[i].key)) {
                    if (!controls.keys[i].active) {
                        controls.keys[i].press(game);
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

    var activatePowerup = function(i) {
        return function(){
            if (controls.selecting) {
                controls.selecting = false;
                controls.recentSelect = true;

                setTimeout(function(){
                    controls.recentSelect = false;
                }, 100);

                player.finishedSelection();
                if (player.powerups[i])
                    player.powerups[i].destroy();
                player.powerups[i] = player.waiting;
                player.waiting = null;
                player.updatePowerupImages();

            } else if (!controls.recentSelect){
                var powerup = player.powerups[i];
                if (powerup && powerup.activate) {
                    powerup.activate();
                }
            }
        }
    }

    controls.registerControl(Phaser.Keyboard.A, activatePowerup(0), this, 100);
    controls.registerControl(Phaser.Keyboard.S, activatePowerup(1), this, 100);
    controls.registerControl(Phaser.Keyboard.D, activatePowerup(2), this, 100);
    controls.registerControl(Phaser.Keyboard.F, activatePowerup(3), this, 100);
    controls.registerControl(Phaser.Keyboard.G, function(){
        if (player.waiting) {
            if (controls.selecting) {
                for (var i=0; i < 4; ++i){
                    if (!player.powerups[i])
                        break;
                }
                if (i == 4)
                    return;
                player.finishedSelection();
                player.powerups[i] = player.waiting;
                player.waiting = null;
                player.updatePowerupImages();
                controls.selecting = false;
            } else {
                controls.selecting = true;
                player.makingSelection();
            }
        }
    }, this, 100);

    var speedup = function(game, gray){
        music.fade("in", 1500);
        var count = 0;
        var interval = setInterval(function(){
            ++count;
            game.time.slowMotion -= 0.1;
            gray.gray -= 1/15;
            if (count >= 15) {
                game.world.filters = null;
                clearInterval(interval);
            }
        }, 200);
    }

    controls.registerControl(Phaser.Keyboard.T, function(game){
        var gray = game.add.filter('Gray');
        gray.gray = 0;
        game.world.filters = [gray];

        music.fade("out", 1500);

        var count = 0;
        var interval = setInterval(function(){
            ++count;
            game.time.slowMotion += 0.1;
            gray.gray += 1/15;
            if (count >= 15) {
                clearInterval(interval);
                setTimeout(function(){
                    speedup(game, gray);
                }, config.time.slowdownDuration);
            }
        }, 200);
    }, this, 200);

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
