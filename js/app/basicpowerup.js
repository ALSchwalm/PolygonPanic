/**
 * A module defining some common properties for powerups
 * @module app/basicpowerup
 */
define(["app/config", "app/unit", "app/player"],
function(config, Unit, player){
    "use strict"

    var Powerup = function(Derived) {
        this.powerups.push(Derived);
        this.dropsprite = null;
        this.displaysprite = null;
    }

    Powerup.prototype.powerups = [];

    Powerup.prototype.init = function(game, config) {
        this.game = game;
        this.config = config;
        this.cooldownGraphic = this.game.add.graphics();

        this.cooldownGraphic.update = function() {
            if (this.displaysprite){
                this.cooldownGraphic.position = this.displaysprite.position;
            }
        }.bind(this);
    }

    Powerup.prototype.drop = function(x, y) {
        this.dropsprite =
            this.game.add.sprite(x, y, this.config.iconKey);
        this.game.physics.enable(this.dropsprite, Phaser.Physics.ARCADE);
        this.dropsprite.checkWorldBounds = true;

        this.dropsprite.events.onEnterBounds.add(function(){
            this.dropsprite.events.onOutOfBounds.add(function(){
                setTimeout(function(){
                    this.dropsprite.destroy();
                }.bind(this), 1000);
            }.bind(this));
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
            this.displaysprite.alpha = 0.6;
        }
        return this.displaysprite;
    }

    Powerup.prototype.onPlayerPickup = function() {
        player.pickup(this);
        this.dropsprite.destroy();
    }

    Powerup.prototype.basicDestroy = function() {
        if (this.displaysprite) {
            this.displaysprite.destroy();
            this.cooldownGraphic.clear();
        }
    }

    Powerup.prototype.destroy = function() {
        this.basicDestroy();
    }

    Powerup.prototype.clearCooldown = function() {
        this.cooldownGraphic.clear();
    }

    Powerup.prototype.updateCooldown = function() {
        var percent = this.cooldown / this.timeout;
        var width = 20;
        this.cooldownGraphic.lineStyle();
        this.cooldownGraphic.beginFill(0x888888, 0.8);
        this.cooldownGraphic.drawRect(-10, 10, width, 3);
        this.cooldownGraphic.endFill();

        this.cooldownGraphic.beginFill(0xEEEEEE, 0.7);
        this.cooldownGraphic.drawRect(-10, 10, percent*width, 3);
        this.cooldownGraphic.endFill();
    }

    return Powerup;
});
