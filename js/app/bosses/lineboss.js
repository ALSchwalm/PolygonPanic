/**
 * A module defines the boss at the end of level 1
 * @module app/bosses/lineboss
 */
define(["Phaser", "app/config", "app/utils", "app/music", "app/player", "app/unit"],
function(Phaser, config, utils, music, player, Unit){
    var LineBoss = function(game) {
        this.game = game;
        Unit.prototype.units.push(this);
        this.graphics = this.game.add.sprite(0, -200, "lineboss");
        this.collisionBody = this.graphics;
        this.game.physics.enable(this.collisionBody, Phaser.Physics.ARCADE);
        this.graphics.anchor.set(0.5, 0.5);
        this.animation = this.graphics.animations.add('face');

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;
        this.onScreen = true;

        this.maxHealth = 6000;
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

        this.onDestroy = [];

        for (var i=0; i < 160; ++i) {
            var bullet = this.group.create(-100, -100, "blue_oval");
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.events.onOutOfBounds.add(this.killBullet, this);
        }

        this.graphics.update = function(){
            this.updateHealth();
            Unit.prototype.update.bind(this)();
        }.bind(this);

        this.prohibitHitGraphic = false;

        this.patterns = [
            {
                pattern: [
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                    { angle : "player", speed : 4 }, { angle : "player", speed : 4 },
                ],
                fireRate : 200
            },
            {
                pattern:[
                    { angle : 0, speed : 4 },   { angle : 20, speed : 4 },
                    { angle : 40, speed : 4 },  { angle : 60, speed : 4 },
                    { angle : 80, speed : 4 },  { angle : 100, speed : 4 },
                    { angle : 120, speed : 4 }, { angle : 140, speed : 4 },
                    { angle : 160, speed : 4 }, { angle : 180, speed : 4 },
                    { angle : 200, speed : 4 }, { angle : 220, speed : 4 },
                    { angle : 240, speed : 4 }, { angle : 260, speed : 4 },
                    { angle : 280, speed : 4 }, { angle : 300, speed : 4 },
                    { angle : 320, speed : 4 }, { angle : 340, speed : 4 },
                ],
                fireRate : 100
            }
        ]

        var xOffset = 100;
        this.hurtPatterns = [
            {
                pattern: [
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },

                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                    { x: -xOffset, angle : "player", speed : 4 }, { x: xOffset, angle : "player", speed : 4 },
                ],
                fireRate : 50
            },
            {
                pattern : [
                    { x: -xOffset, angle : 0, speed : 4 },   { x: xOffset, angle : 340, speed : 4 },
                    { x: -xOffset, angle : 20, speed : 4 },  { x: xOffset, angle : 320, speed : 4 },
                    { x: -xOffset, angle : 40, speed : 4 },  { x: xOffset, angle : 300, speed : 4 },
                    { x: -xOffset, angle : 80, speed : 4 },  { x: xOffset, angle : 280, speed : 4 },
                    { x: -xOffset, angle : 100, speed : 4 }, { x: xOffset, angle : 260, speed : 4 },
                    { x: -xOffset, angle : 120, speed : 4 }, { x: xOffset, angle : 240, speed : 4 },
                    { x: -xOffset, angle : 140, speed : 4 }, { x: xOffset, angle : 200, speed : 4 },
                    { x: -xOffset, angle : 160, speed : 4 }, { x: xOffset, angle : 180, speed : 4 },
                    { x: -xOffset, angle : 180, speed : 4 }, { x: xOffset, angle : 160, speed : 4 },

                    { x: -xOffset, angle : 200, speed : 4 }, { x: xOffset, angle : 140, speed : 4 },
                    { x: -xOffset, angle : 220, speed : 4 }, { x: xOffset, angle : 120, speed : 4 },
                    { x: -xOffset, angle : 240, speed : 4 }, { x: xOffset, angle : 100, speed : 4 },
                    { x: -xOffset, angle : 260, speed : 4 }, { x: xOffset, angle : 80, speed : 4 },
                    { x: -xOffset, angle : 280, speed : 4 }, { x: xOffset, angle : 60, speed : 4 },
                    { x: -xOffset, angle : 300, speed : 4 }, { x: xOffset, angle : 40, speed : 4 },
                    { x: -xOffset, angle : 320, speed : 4 }, { x: xOffset, angle : 20, speed : 4 },
                    { x: -xOffset, angle : 340, speed : 4 }, { x: xOffset, angle : 0, speed : 4 }
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

    LineBoss.prototype.killBullet = Unit.prototype.killBullet;
    LineBoss.prototype.onUnitHitPlayer = Unit.prototype.onUnitHitPlayer;
    LineBoss.prototype.constructTweenChain = Unit.prototype.constructTweenChain;
    LineBoss.prototype.attack = Unit.prototype.attack;

    Object.defineProperty(LineBoss.prototype, "position", {
        get : function() {
            return this.graphics.position;
        },
        set : function(value) {
            this.graphics.position = value;
        }
    });

    LineBoss.prototype.updateHealth = function(){
        var percent = this.health / this.maxHealth;
        this.healthGraphic.clear();
        this.healthGraphic.lineStyle(1, 0x000000, 1);
        if (this.health >= this.maxHealth/3) {
            this.healthGraphic.beginFill(0xDDDDDD, 0.8);
        } else {
            this.healthGraphic.beginFill(0xDD0000, 0.8);
        }
        this.healthGraphic.drawRect(0, 3, Math.floor(1000*percent), 10);
        this.healthGraphic.endFill();
    }

    LineBoss.prototype.destroy = function(offscreen, bomb) {
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
            player.updateScore(1500, 1);
            this.emitter.x = this.graphics.position.x;
            this.emitter.y = this.graphics.position.y;
            this.emitter.start(true, 1400, null, 120);
        }.bind(this), 5000)

        this.onDestroy.forEach(function(callback){
            callback();
        });
    }

    LineBoss.prototype.enterScreen = function() {
        var tween = this.game.add.tween(this.graphics);
        tween.to({x : config.game.width/2, y: 100}, 5000).start();

        utils.shakeScreen(this.game, 5000);
        setTimeout(function(){
            this.game.camera.x = 0;
            // Being the movement animations
            this.constructTweenChain([
                {
                    options : { x : "+200" },
                    duration : 2000
                },
                {
                    options : { y : "+200" },
                    duration : 2000
                },
                {
                    options : { x : "-200"},
                    duration : 2000
                },
                {
                    options : { y : "-200" },
                    duration : 2000
                },
            ]);

            this.bulletTimer.start();
            this.invulnerable = false;
        }.bind(this), 5000);
    }

    LineBoss.prototype.onPlayerHitUnit = function(unitSprite, bullet) {
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
            this.animation.frame = 1;
            this.prohibitHitGraphic = true;

            setTimeout(function(){
                this.prohibitHitGraphic = false;
            }.bind(this), 100)

            setTimeout(function(){
                this.animation.frame = 0;
            }.bind(this), 100);

            var tweenScale = this.game.add.tween(this.graphics.scale);
            tweenScale.to({x: "-0.04", y:"-0.04"}, 50)
                .to({x: "+0.045", y:"+0.045"}, 50).start();
        }
    }

    return LineBoss;
})
