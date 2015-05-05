/**
 * A module defines the boss at the end of level 1
 * @module app/bosses/triangleboss
 */
define(["Phaser", "app/config", "app/utils", "app/music", "app/player", "app/unit",
        "app/enemies"],
function(Phaser, config, utils, music, player, Unit, enemies){
    var TriangleBoss = function(game, left) {
        this.game = game;
        Unit.prototype.units.push(this);

        this.left = left;
        this.graphics = this.game.add.sprite((left) ? 0 : config.game.width,
                                             -200, "triangleboss");
        this.collisionBody = this.graphics;
        this.game.physics.enable(this.collisionBody, Phaser.Physics.ARCADE);
        this.graphics.anchor.set(0.5, 0.5);
        this.animation = this.graphics.animations.add('face');
        this.animation.frame = (left) ? 0 : 1;
        this.otherDestroyed = false;

        this.maxHealth = 2500;
        this.health = this.maxHealth;
        this.invulnerable = true;
        this.healthGraphic = this.game.add.graphics(0, 0);

        this.emitter = game.add.emitter(0, 0, 120);
        this.emitter.makeParticles('particle-boss1');
        this.emitter.gravity = 0;
        this.emitter.setAlpha(0.95, 0.2, 1400, Phaser.Easing.Exponential.In);
        this.emitter.setRotation(-720, 720);
        this.emitter.setScale(2.0, 1.0, 2.0, 1.0, 1400);
        this.emitter.setYSpeed(-250, 250);
        this.emitter.setXSpeed(-400, 400);

        this.collisionGroup = game.add.group();
        this.collisionGroup.enableBody = true;
        this.collisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.onScreen = true;

        this.onDestroy = [];

        for (var i=0; i < 160; ++i) {
            var bmd = game.add.bitmapData(5, 10);
            var body = this.collisionGroup.create(-100, -100, bmd);
            body.anchor.set(0.5, 0.5);
            body.exists = false;
            body.visible = false;
            body.checkWorldBounds = true;
            body.events.onOutOfBounds.add(this.killBullet, this);

            var bullet = this.game.add.sprite(0, 0, "blue_oval");
            bullet.anchor.set(0.5, 0.5);
            body.addChild(bullet);
        }

        this.graphics.update = function(){
            this.updateHealth();
            Unit.prototype.update.bind(this)();
        }.bind(this);

        this.prohibitHitGraphic = false;

        var yOffset = 30;
        var patterns = [
            {
                pattern: [
                    { angle : "player", speed : 4, y: yOffset},
                    { angle : "player", speed : 4, y: yOffset },
                    { angle : "player", speed : 4, y: yOffset },
                    { angle : "player", speed : 4, y: yOffset },
                    { angle : "player", speed : 4, y: yOffset },
                    { angle : "player", speed : 4, y: yOffset },
                    { angle : "player", speed : 4, y: yOffset },
                    { angle : "player", speed : 4, y: yOffset },
                ],
                fireRate : 300
            },
            {
                pattern:[
                    { angle : 0, speed : 4, y: yOffset },   { angle : 20, speed : 4, y: yOffset},
                    { angle : 40, speed : 4, y: yOffset },  { angle : 60, speed : 4, y: yOffset },
                    { angle : 80, speed : 4, y: yOffset },  { angle : 100, speed : 4, y: yOffset },
                    { angle : 120, speed : 4, y: yOffset }, { angle : 140, speed : 4, y: yOffset },
                    { angle : 160, speed : 4, y: yOffset }, { angle : 180, speed : 4, y: yOffset },
                    { angle : 200, speed : 4, y: yOffset }, { angle : 220, speed : 4, y: yOffset },
                    { angle : 240, speed : 4, y: yOffset }, { angle : 260, speed : 4, y: yOffset },
                    { angle : 280, speed : 4, y: yOffset }, { angle : 300, speed : 4, y: yOffset },
                    { angle : 320, speed : 4, y: yOffset }, { angle : 340, speed : 4, y: yOffset },
                ],
                fireRate : 100
            }
        ]

        if (this.left) {
            patterns.reverse();
        }
        this.patterns = patterns;

        this.hurtPatterns = [
            {
                pattern: [
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                ],
                fireRate : 100
            },
            {
                pattern : [
                    { angle : 0, speed : 4, y: yOffset },   { angle : 20, speed : 4, y: yOffset},
                    { angle : 40, speed : 4, y: yOffset },  { angle : 60, speed : 4, y: yOffset },
                    { angle : 80, speed : 4, y: yOffset },  { angle : 100, speed : 4, y: yOffset },
                    { angle : 120, speed : 4, y: yOffset }, { angle : 140, speed : 4, y: yOffset },
                    { angle : 160, speed : 4, y: yOffset }, { angle : 180, speed : 4, y: yOffset },
                    { angle : 200, speed : 4, y: yOffset }, { angle : 220, speed : 4, y: yOffset },
                    { angle : 240, speed : 4, y: yOffset }, { angle : 260, speed : 4, y: yOffset },
                    { angle : 280, speed : 4, y: yOffset }, { angle : 300, speed : 4, y: yOffset },
                    { angle : 320, speed : 4, y: yOffset }, { angle : 340, speed : 4, y: yOffset },
                ],
                fireRate : 50
            }
        ]

        this.currentPattern = this.patterns[0].pattern;
        this.patternIndex = 0;

        var attack = function(){
            this.attack(this.currentPattern);
        }.bind(this);

        // Define and begin attacking
        this.attackIndex = 0;
        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(200, attack);

        this.bulletInterval = setInterval(function(){
            var patterns = this.patterns;
            if (this.health < this.maxHealth/3) {
                patterns = this.hurtPatterns;
            }
            this.patternIndex = (this.patternIndex + 1)%patterns.length;
            this.currentPattern = patterns[this.patternIndex].pattern;
            this.bulletTimer.stop();
            this.bulletTimer.loop(patterns[this.patternIndex].fireRate || 200,
                                  attack);
            this.bulletTimer.start();
        }.bind(this), 5000);

        this.enterScreen();
    }

    TriangleBoss.prototype.killBullet = Unit.prototype.killBullet;
    TriangleBoss.prototype.onUnitHitPlayer = Unit.prototype.onUnitHitPlayer;
    TriangleBoss.prototype.constructTweenChain = Unit.prototype.constructTweenChain;
    TriangleBoss.prototype.attack = Unit.prototype.attack;

    Object.defineProperty(TriangleBoss.prototype, "position", {
        get : function() {
            return this.graphics.position;
        },
        set : function(value) {
            this.graphics.position = value;
        }
    });

    TriangleBoss.prototype.updateHealth = function(){
        var percent = this.health / this.maxHealth;
        this.healthGraphic.clear();
        this.healthGraphic.lineStyle(1, 0x000000, 1);
        if (this.health >= this.maxHealth/3) {
            this.healthGraphic.beginFill(0xDDDDDD, 0.8);
        } else {
            this.healthGraphic.beginFill(0xDD0000, 0.8);
        }
        this.healthGraphic.drawRect(0, (this.left) ? 3 : 15,
                                    Math.floor(1000*percent), 10);
        this.healthGraphic.endFill();
    }

    TriangleBoss.prototype.destroy = function(offscreen, bomb, reset) {
        if (reset) {
            this.graphics.destroy();
            this.healthGraphic.destroy();
            return;
        }
        // bomb does nothing to the boss
        if (bomb || this.destroyed)
            return;
        this.destroyed = true;
        this.healthGraphic.clear();
        this.animation.frame = 1;
        this.prohibitHitGraphic = true;
        this.bulletTimer.stop();
        this.tween.stop();
        clearInterval(this.bulletInterval);
        clearInterval(this.spawnInterval);
        utils.shakeScreen(this.game, 5000);

        var explosions = []
        for (var i=0; i < 7; ++i) {
            setTimeout(function(){
                this.animation.frame = 1;
                var explosion = this.game.add.sprite(this.position.x + this.game.rnd.integerInRange(-this.graphics.width/2, this.graphics.width/2),
                                                     this.position.y + this.game.rnd.integerInRange(-this.graphics.height/2, this.graphics.height/2),
                                                     'explosion');
                explosions.push(explosion);
                explosion.anchor.set(0.5, 0.5);
                explosion.animations.add('explode');
                explosion.play('explode', 30, true);
            }.bind(this), 100*i);
        }

        // done exploding
        setTimeout(function(){
            explosions.forEach(function(explosion){
                explosion.destroy();
            });
            this.graphics.destroy();
            this.healthGraphic.destroy();
            player.updateScore(1500, 1);
            this.emitter.x = this.graphics.position.x;
            this.emitter.y = this.graphics.position.y;
            this.emitter.start(true, 1400, null, 120);
        }.bind(this), 5000)

        this.onDestroy.forEach(function(callback){
            callback();
        });
    }

    TriangleBoss.prototype.enterScreen = function() {
        var self = this;
        var tween = this.game.add.tween(this.graphics);
        if (this.left) {
            tween.to({x : config.game.width/2-150, y: 100}, 5000).start();
        } else {
            tween.to({x : config.game.width/2+150, y: 100}, 5000).start();
        }

        if (this.left) {
            utils.shakeScreen(this.game, 5000);
        }

        this.spawnInterval = setInterval(function() {
            self.holdFire = true;
            var count = 0;
            var interval = setInterval(function(){
                ++count;
                if (self.left || self.otherDestroyed) {
                    new enemies.triangle1(self.game, config.game.width/2, -50,
                                          count % 2 == 0, true);
                }
                if (count == 10) {
                    clearInterval(interval);
                    self.holdFire = false;
                }
            }, 330);
        }, 23000);

        setTimeout(function(){
            var offset = (this.left) ? -150 : 150

            // Being the movement animations
            this.constructTweenChain([
                { options : { x : "+200" }, duration : 2000 },
                { options : { y : "+200" }, duration : 2000 },
                { options : { x : "-200" }, duration : 2000 },
                { options : { y : "-200" }, duration : 2000 },
                { options : { x : "+200" }, duration : 2000 },
                { options : { y : "+200" }, duration : 2000 },
                { options : { x : "-200" }, duration : 2000 },
                { options : { y : "-200" }, duration : 2000 },
                { options : { x : config.game.width/2 + offset }, duration : 2000 },
                { options : { y : 50, x : ((self.left) ? 200 : 800) }, duration : 2000 },
                { options : {}, duration : 3000 },
                { options : { x : config.game.width/2 + offset, y: 100 }, duration : 2000 },
            ]);

            this.bulletTimer.start();
            this.invulnerable = false;
        }.bind(this), 5000);
    }

    TriangleBoss.prototype.onPlayerHitUnit = function(unitSprite, bullet) {
        if (bullet.hasHit || this.invulnerable)
            return;
        bullet.hasHit = true;

        setTimeout(function(){
            if (!bullet.noDieOnHit) {
                bullet.kill();
            }
            bullet.hasHit = false;
        }, 100);

        this.health -= bullet.attack;
        if (this.health < 0) {
            this.destroy();
            return;
        }

        if (!this.prohibitHitGraphic) {
            this.prohibitHitGraphic = true;

            setTimeout(function(){
                this.prohibitHitGraphic = false;
            }.bind(this), 100)

            var tweenScale = this.game.add.tween(this.graphics);
            tweenScale.to({alpha : 0.7}, 50)
                .to({alpha : 1.0}, 50).start();
        }
    }

    return TriangleBoss;
})
