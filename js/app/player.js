/**
 * A module which defines the player object
 * @module app/player
 */
define(["app/config"], function(config){
   "use strict"

    var Player = function() {}
    Player.prototype.init = function(game, x, y){
        var x = x || 0;
        var y = y || 0;

        this.game = game;
        this.sprite = this.game.add.sprite(x, y, "player-ship");
        this.sprite.scale.set(0.3, 0.3);
        this.sprite.anchor.set(0.5, 0.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.speed = config.player.defaultSpeed;

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 20; ++i) {
            var bullet = this.group.create(-100, -100, 'player-basic-bullet');
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.events.onOutOfBounds.add(this.killBullet, this);

            // base bullet damage
            bullet.attack = 5;
        }

        this.powerups = [];
        this.waiting = null;
    }

    Player.prototype.killBullet = function(bullet) {
        bullet.kill();
    }

    Player.prototype.pickup = function(powerup) {
        this.waiting = powerup;

        // TODO remove this
        this.powerups.push(powerup);
    }

    Player.prototype.attack = function() {
        var bullet = this.group.getFirstExists(false);
        bullet.reset(this.position.x, this.position.y-30);
        bullet.body.velocity.y = -500;

        this.powerups.map(function(powerup){
            if (powerup.attack) {
                powerup.attack(this);
            }
        }, this);
    }

    Object.defineProperty(Player.prototype, "position", {
        get : function() {
            return this.sprite.position;
        }
    });

    Object.defineProperty(Player.prototype, "velocity", {
        get : function() {
            return this.sprite.body.velocity;
        },
        set : function(value) {
            this.sprite.body.velocity = value;
        }
    });

    var player = new Player();

    return player;
});
