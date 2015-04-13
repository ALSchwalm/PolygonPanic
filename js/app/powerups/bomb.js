/**
 * An active powerup which destroys all enemies on the screen
 * @module app/powerups/bomb
 */
define(["app/config", "app/basicpowerup", "app/unit"],
function(config, Powerup, Unit){
   "use strict"

    var Bomb = function(game){
        this.init(game, {
            iconKey : "bomb"
        });

        this.timeout = 40;
        this.available = true;
        this.cooldown = 0;
    };

    Bomb.prototype = new Powerup(Bomb);

    Bomb.prototype.activate = function() {
        if (!this.available)
            return;
        this.available = false;

        var sound = this.game.add.audio("explode", 0.8);
        sound.play();

        Unit.prototype.units.map(function(unit){
            unit.destroy(false, true);
        });

        var cooldownInterval = setInterval(function(){
            this.cooldown += 0.1;
            if (this.cooldown > this.timeout) {
                clearInterval(cooldownInterval);
                this.available = true;
                this.cooldown = 0;
            }
        }.bind(this), 100);
    }

    return Bomb;
});
