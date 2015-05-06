/**
 * An active powerup which heals the player by 1
 * @module app/powerups/heal
 */
define(["app/config", "app/basicpowerup", "app/player"],
function(config, Powerup, Player){
   "use strict"

    var Heal = function(game){
        this.init(game, {
            iconKey : "heal"
        });

        this.timeout = 30;
        this.available = true;
        this.cooldown = 0;
    };

    Heal.prototype = new Powerup(Heal);

    Heal.prototype.activate = function(player) {
        if (!this.available)
            return;
        this.available = false;

        var sound = this.game.add.audio("healSound", 0.6);
        sound.play();

        if(player.health < 4)
            player.heal();

        var cooldownInterval = setInterval(function(){
            this.cooldown += 0.1;
            this.updateCooldown();
            if (this.cooldown > this.timeout || !this.displaysprite.exists) {
                this.clearCooldown();
                clearInterval(cooldownInterval);
                this.available = true;
                this.cooldown = 0;
            }
        }.bind(this), 100);
    }

    return Heal;
});
