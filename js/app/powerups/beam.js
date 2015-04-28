/**
 * An active powerup which fires a beam weapon
 * @module app/powerups/beam
 */
define(["app/config", "app/basicpowerup"],
function(config, Powerup){
   "use strict"

    var Beam = function(game){
        this.init(game, {
            iconKey : "beam_icon"
        });

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 40; ++i) {
            var bullet = this.group.create(-100, -100, 'beam');
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.noDieOnHit = true;
            bullet.alpha = 0.6;

            // base bullet damage
            bullet.attack = 10;
        }

        this.timeout = 10;
        this.available = true;
        this.cooldown = 0;
    };

    Beam.prototype = new Powerup(Beam);

    Beam.prototype.activate = function(player) {
        if (!this.available)
            return;
        this.available = false;

        for (var i=1; i < 20; ++i) {
            var bullet = this.group.getFirstExists(false);
            if (!bullet)
                return;
            bullet.reset(player.position.x - bullet.width/2,
                         player.position.y-bullet.height*i);

            var update = function(i) {
                return function() {
                    this.position.x = player.position.x - bullet.width/2;
                    this.position.y = player.position.y-bullet.height*i;
                }
            }(i);

            bullet.update = update;
        }

        setTimeout(function(){
            this.group.callAll("kill");
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
        }.bind(this), 2000);
    }

    return Beam;
});
