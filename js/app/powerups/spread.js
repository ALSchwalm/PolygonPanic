/**
 * Passive powerup which sometimes fires missles
 * @module app/powerups/spread
 */
define(["app/config", "app/basicpowerup", "app/unit"],
function(config, Powerup, Unit){
   "use strict"

    var Spread = function(game){
        this.init(game, {
            iconKey : "spread_icon"
        });

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 40; ++i) {
            var bullet = this.group.create(-100, -100, 'spread');
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.anchor.set(0.5, 0.5);
            bullet.events.onOutOfBounds.add(this.killBullet, this);

            // base bullet damage
            bullet.attack = 20;
            bullet.noDieOnHit = true;
        }

        this.frequency = 10;
        this.last = 0;
        this.speed = 5;
    };

    Spread.prototype = new Powerup(Spread);

    // Spread bullet don't die unless out of range
    Spread.prototype.killBullet = function(bullet) {
        bullet.kill();
        bullet.update = function(){};
    }

    Spread.prototype.attack = function(player) {
        var self = this;
        ++this.last;
        if (this.last < this.frequency) {
            return;
        } else {
            this.last = 0;
        }

        var bullet = this.group.getFirstExists(false);
        if (!bullet)
            return;
        bullet.reset(player.position.x, player.position.y-30);
        bullet.scale.y = 1;
        bullet.scale.x = 1;
        bullet.update = function(){
            this.body.setSize(this.width*2, this.height);
            this.scale.y += 0.1;
            this.scale.x += 0.01;
        }
        bullet.rotation = -Math.PI/2;
        bullet.body.velocity.y = -200;
    }

    return Spread;
});
