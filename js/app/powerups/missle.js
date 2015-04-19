/**
 * Passive powerup which sometimes fires missles
 * @module app/powerups/missle
 */
define(["app/config", "app/basicpowerup", "app/unit"],
function(config, Powerup, Unit){
   "use strict"

    var Missle = function(game){
        this.init(game, {
            iconKey : "missle_icon"
        });

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 40; ++i) {
            var bullet = this.group.create(-100, -100, 'missle');
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.events.onOutOfBounds.add(this.killBullet, this);

            // base bullet damage
            bullet.attack = 10;
        }

        this.frequency = 10;
        this.last = 0;
        this.speed = 5;
    };

    Missle.prototype = new Powerup(Missle);

    Missle.prototype.killBullet = function(bullet) {
        bullet.kill();
    }

    Missle.prototype.findTarget = function(bullet) {
        var self = this;
        var target = null;
        var targetDistance = 0;
        Unit.prototype.units.forEach(function(unit){
            if (!unit.graphics.visible)
                return;
            var distance = self.game.physics.arcade.distanceBetween(bullet, unit.graphics);
            if (!target || distance < targetDistance) {
                target = unit;
                targetDistance = distance;
            }
        });
        return target;
    }

    Missle.prototype.defaultMove = function(bullet) {
        var self = this;
        var rads = -Math.PI/2;
        bullet.rotation = rads + Math.PI/2;
        bullet.body.velocity.x = Math.cos(rads)*self.speed*100;
        bullet.body.velocity.y = Math.sin(rads)*self.speed*100;
    }

    Missle.prototype.attack = function(player) {
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

        var target = this.findTarget(bullet);
        if (!target) {
            this.defaultMove(bullet);
        }

        bullet.update = function(){
            if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
                self.defaultMove(this);
            }

            if (!target || !target.graphics.visible) {
                return;
            }

            var rads = -Math.PI/2;
            if (target) {
                rads = self.game.physics.arcade.angleBetween(this, target.graphics);
            }
            this.rotation = rads + Math.PI/2;
            this.body.velocity.x = Math.cos(rads)*self.speed*100;
            this.body.velocity.y = Math.sin(rads)*self.speed*100;
        }
    }

    return Missle;
});
