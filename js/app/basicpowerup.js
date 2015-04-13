/**
 * A module defining some common properties for powerups
 * @module app/basicpowerup
 */
define(["app/config", "app/unit", "app/player"],
function(config, Unit, player){
    "use strict"

    var Powerup = function(Derived) {
        this.powerups.push(Derived);
    }

    Powerup.prototype.powerups = [];

    Powerup.prototype.init = function(game, config) {
        this.game = game;
        this.config = config;
    }

    Powerup.prototype.drop = function(x, y) {
        this.dropsprite =
            this.game.add.sprite(x, y, this.config.iconKey);
        this.game.physics.enable(this.dropsprite, Phaser.Physics.ARCADE);
        this.dropsprite.checkWorldBounds = true;

        this.dropsprite.events.onOutOfBounds.add(function(){
            setTimeout(function(){
                this.dropsprite.destroy();
            }.bind(this), 1000);
        }.bind(this));

        this.dropsprite.body.velocity.y = 200;

        this.dropsprite.update = function() {
            this.game.physics.arcade.overlap(player.sprite,
                                             this.dropsprite,
                                             this.onPlayerPickup.bind(this),
                                             null, this);
        }.bind(this)
    }

    Powerup.prototype.createSprite = function() {
        // For now, just use the same key as for the drop
        if (!this.displaysprite){
            this.displaysprite =
                this.game.add.sprite(0, 0, this.config.iconKey);
            this.displaysprite.anchor.set(0.5, 0.5);
            this.displaysprite.scale.set(0.5, 0.5);
            this.displaysprite.alpha = 0.4;
        }
        return this.displaysprite;
    }

    Powerup.prototype.onPlayerPickup = function() {
        player.pickup(this);
        this.dropsprite.destroy();
    }

    Powerup.prototype.basicDestroy = function() {
        if (this.displaysprite)
            this.displaysprite.destroy();
    }

    Powerup.prototype.destroy = function() {
        this.basicDestroy();
    }

    return Powerup;
});
