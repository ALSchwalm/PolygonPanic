/**
 * A module which defines the player object
 * @module app/unit
 */
define(["app/config", "app/utils", "app/music", "app/player", "app/basicpowerup"],
function(config, utils, music, player, Powerup){
    var Unit = function() {}
    Unit.prototype.units = [];
    Unit.prototype.init = function(game, x, y, width, height, unitConfig){
        Unit.prototype.units.push(this);
        var x = x || 0;
        var y = y || 0;

        this.game = game;
        this.config = unitConfig;
        this.graphics = this.game.add.sprite(x, y, this.config.unitTexture);
        this.graphics.anchor.set(0.5, 0.5);

        this.collisionBody = game.add.sprite(0, 0, game.add.bitmapData(width, height));
        this.collisionBody.anchor.set(0.5, 0.5);
        this.graphics.addChild(this.collisionBody);
        this.game.physics.enable(this.collisionBody, Phaser.Physics.ARCADE);
        this.collisionBody.checkWorldBounds = true;

        this.graphics.events.onEnterBounds.add(function(){
            this.graphics.events.onOutOfBounds.add(function(){
                // When a unit goes out of view, destroy it after
                // enough time has passed for all of its bullets
                // to be out of view as well
                setTimeout(function(){
                    this.destroy(true);
                }.bind(this), 5000);
            }.bind(this));
        }.bind(this));

        this.graphics.scale.set(0.5, 0.5);
        this.graphics.anchor.set(0.5, 0.5);
        this.graphics.alpha = this.config.alpha || 1;
        this.speed = config.defaultSpeed;
        this.health = unitConfig.health;

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 60; ++i) {
            var bullet = this.group.create(-100, -100, this.config.attackTexture);
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.events.onOutOfBounds.add(this.killBullet, this);
        }

        // Pulse on beat
        music.onBeat.push(this.pulse.bind(this));

        // Being the movement animations
        this.constructTweenChain(this.config.movement);

        // Define and begin attacking
        this.attackIndex = 0;
        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(this.config.attackRate,
            this.attack.bind(this));
        this.bulletTimer.start();

        // Remove units which are below the bottom of the screen
        this.graphics.update = function(){
            this.game.physics.arcade.overlap(player.sprite,
                                             this.group,
                                             this.onUnitHitPlayer.bind(this),
                                             null, this);

            if (!this.graphics.visible) {
                return;
            }

            this.game.physics.arcade.overlap(player.group,
                                             this.collisionBody,
                                             this.onPlayerHitUnit.bind(this),
                                             null, this);

            player.powerups.map(function(powerup){
                this.game.physics.arcade.overlap(powerup.group,
                                                 this.collisionBody,
                                                 this.onPlayerHitUnit.bind(this),
                                                 null, this);
            }, this)

            if (this.position.y > config.game.height){
                this.destroy(true);
            }
        }.bind(this);

        this.emitter = this.config.emitter;

        if (!Unit.prototype.explode) {
            Unit.prototype.explode = this.game.add.audio("explode", 0.8);
        }
    }

    Unit.prototype.pulse = function(){
        var tween = this.game.add.tween(this.graphics);
        tween.to({alpha : 1}, 75).to({alpha: this.config.alpha || 1}, 100).start();

        var tweenScale = this.game.add.tween(this.graphics.scale);
        tweenScale.to({x: "+0.05", y:"+0.05"}, 75)
            .to({x: "-0.05", y:"-0.05"}, 100).start();
    }

    Unit.prototype.constructTweenChain = function(moveConfig) {
        var config = utils.cloneArray(moveConfig);
        var tween = this.game.add.tween(this.graphics);
        config.forEach(function(item){
            tween.to(item.options, item.duration, item.easing);
        });
        tween.onComplete.add(function(){
            if (this.graphics.visible) {
                this.constructTweenChain(moveConfig);
            }
        }.bind(this))
        tween.start();
    }

    Unit.prototype.destroy = function(offscreen, bomb) {
        if (this.destroyed) return;
        this.destroyed = true;

        var offscreen = offscreen || false;
        if (!offscreen || bomb){
            if (!bomb) {
                Unit.prototype.explode.play();
            }

            this.game.plugins.screenShake.shake(7);

            this.emitter.x = this.graphics.position.x;
            this.emitter.y = this.graphics.position.y;
            this.emitter.start(true, 600, null, 20);

            if (Math.random() < config.powerups.dropRate) {
                this.dropPowerup();
            }
        }

        this.graphics.visible = false;

        // Wait for bullets to be out of the screen before stopping update()
        setTimeout(function(){
            this.graphics.destroy();
            this.emitter.destroy();
            var index = Unit.prototype.units.indexOf(this);
            if (index >= 0)
                Unit.prototype.units.splice(index, 1);
        }.bind(this), 2000);

        setTimeout(function(){
            this.group.destroy();
        }.bind(this), 10000);
    }

    Unit.prototype.dropPowerup = function() {
        var PowerupType = this.game.rnd.pick(Powerup.prototype.powerups);
        var powerup = new PowerupType(this.game);
        powerup.drop(this.graphics.position.x, this.graphics.position.y);
    }

    Unit.prototype.onUnitHitPlayer = function(playerSprite, bullet) {
        bullet.kill();
        player.damage(1);
    }

    Unit.prototype.onPlayerHitUnit = function(unitSprite, bullet) {
        if (bullet.hasHit)
            return;
        bullet.hasHit = true;
        setTimeout(function(){
            bullet.kill();
            bullet.hasHit = false;
        }, 100);

        this.health -= bullet.attack;
        this.graphics.tint = 0xEE8820;

        var tweenScale = this.game.add.tween(this.graphics.scale);
        tweenScale.to({x: "-0.15", y:"-0.15"}, 50)
            .to({x: "+0.15", y:"+0.15"}, 75).start();

        setTimeout(function(){
            this.graphics.tint = 0xFFFFFF;
        }.bind(this), 20);
        if (this.health <= 0){
            this.destroy();
        }
    }

    Unit.prototype.killBullet = function(bullet) {
        bullet.kill();
    }

    Unit.prototype.attack = function() {
        if (!this.graphics.visible || !this.config.attackPattern) {
            this.bulletTimer.stop();
            return;
        } else if (!this.graphics.inCamera) {
            return;
        }

        var pattern = this.config.attackPattern;
        this.attackIndex = (this.attackIndex+1) % pattern.length;
        var config = this.config.attackPattern[this.attackIndex];
        var speed = config.speed;
        var bullet = this.group.getFirstExists(false);

        bullet.reset(this.position.x, this.position.y);
        if (config.angle == "player") {
            var rads = this.game.physics.arcade.angleBetween(bullet, player.sprite);
        } else {
            var rads = config.angle*Math.PI/180 + 0.5*Math.PI;
        }
        bullet.body.velocity.x = Math.cos(rads)*speed*100;
        bullet.body.velocity.y = Math.sin(rads)*speed*100;
    }

    Object.defineProperty(Unit.prototype, "position", {
        get : function() {
            return this.graphics.position;
        },
        set : function(value) {
            this.graphics.position = value;
        }
    });

    return Unit;
});
