/**
 * A shotgun style spread
 * @module app/powerups/triple
 */
define(["app/config", "app/basicpowerup"], function(config, Powerup){
   "use strict"

    var Triple = function(game){
        this.init(game, {
            iconKey : "triple"
        });

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 40; ++i) {
            var bullet = this.group.create(-100, -100, 'player-basic-bullet');
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.events.onOutOfBounds.add(this.killBullet, this);

            // base bullet damage
            bullet.attack = 5;
        }
    };

    Triple.prototype = new Powerup(Triple);

    Triple.prototype.killBullet = function(bullet) {
        bullet.kill();
    }

    Triple.prototype.attack = function(unit) {
        var bullet = this.group.getFirstExists(false);
        bullet.rotation = -Math.PI/8;
        if (!bullet)
            return;
        bullet.reset(unit.position.x-30, unit.position.y-30);
        bullet.body.velocity.x = Math.sin(bullet.rotation)*500;
        bullet.body.velocity.y = Math.cos(bullet.rotation)*-500;

        var otherBullet = this.group.getFirstExists(false);
        if (!otherBullet)
            return;
        otherBullet.reset(unit.position.x+30, unit.position.y-30);
        otherBullet.rotation = Math.PI/8;
        otherBullet.body.velocity.x = Math.sin(otherBullet.rotation)*500;
        otherBullet.body.velocity.y = Math.cos(otherBullet.rotation)*-500;
    }

    return Triple;
});
