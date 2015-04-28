/**
 * An active powerup providing a temporary shield
 * @module app/powerups/shield
 */
define(["app/config", "app/player", "app/basicpowerup"],
function(config, player, Powerup){
   "use strict"

    var Shield = function(game){
        this.init(game, {
            iconKey : "shield"
        });

        this.timeout = 17;
        this.duration = 4;
        this.sprite = this.game.add.sprite(100, 100, 'shield_effect');
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.tint = 0x111111;
        this.sprite.scale.set(0.7, 0.7);
        this.sprite.update = this.update.bind(this);
        this.sprite.visible = false;

        this.available = true;
        this.elapsed = 0;
        this.cooldown = 0;
    };

    Shield.prototype = new Powerup(Shield);

    Shield.prototype.activate = function(player) {
        if (!this.available)
            return;
        this.available = false;
        this.sprite.visible = true;
        player.shielded = true;

        var activeInterval = setInterval(function(){
            this.elapsed += 0.1;
            if (this.elapsed > this.duration) {
                this.elapsed = 0;
                this.sprite.visible = false;
                player.shielded = false;
                clearInterval(activeInterval);

                var cooldownInterval = setInterval(function(){
                    this.cooldown += 0.1;
                    this.updateCooldown();
                    if (this.cooldown > this.timeout) {
                        this.clearCooldown();
                        clearInterval(cooldownInterval);
                        this.available = true;
                        this.cooldown = 0;
                    }
                }.bind(this), 100);
            }
        }.bind(this), 100);
    }

    Shield.prototype.update = function() {
        this.sprite.position = player.position;
    }

    return Shield;
});
