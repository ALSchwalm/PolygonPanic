/**
 * A module defines the final boss
 * @module app/bosses/rhombusboss
 */
define(["Phaser", "app/config", "app/utils", "app/music", "app/player", "app/unit",
        "app/enemies"],
function(Phaser, config, utils, music, player, Unit, enemies){
    var RhombusBoss = function(game, number) {
        this.game = game;
        Unit.prototype.units.push(this);

        this.number = number;
        this.graphics = this.game.add.sprite(config.game.width/2, -200, "rhombusboss");
        this.collisionBody = this.graphics;
        this.game.physics.enable(this.collisionBody, Phaser.Physics.ARCADE);
        this.graphics.anchor.set(0.5, 0.5);
        this.animation = this.graphics.animations.add('face');
        this.animation.frame = 0;
        this.oneDestroyed = false;
		this.twoDestroyed = false;
		this.threeDestroyed = false;
		this.fourDestroyed = false;

        this.maxHealth = 1700;
        this.health = this.maxHealth;
        this.invulnerable = true;
        this.healthGraphic = this.game.add.graphics(0, 0);

        this.emitter = game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('particle-boss3');
        this.emitter.gravity = 0;
        this.emitter.setAlpha(0.95, 0.2, 1200, Phaser.Easing.Exponential.In);
        this.emitter.setRotation(-720, 720);
        this.emitter.setScale(2.0, 1.0, 2.0, 1.0, 1200);
        this.emitter.setYSpeed(-300, 300);
        this.emitter.setXSpeed(-300, 300);

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

            var bullet = this.game.add.sprite(0, 0, "green_oval");
            bullet.anchor.set(0.5, 0.5);
            body.addChild(bullet);
        }

        this.graphics.update = function(){
            this.updateHealth();
            Unit.prototype.update.bind(this)();
        }.bind(this);

        this.prohibitHitGraphic = false;

        var patterns = [
            {
                pattern:[
                    { angle : 90, speed : 4, y: 0 }, { angle : 75, speed : 4, y: 0},
                    { angle : 60, speed : 4, y: 0 }, { angle : 45, speed : 4, y: 0 },
                    { angle : 30, speed : 4, y: 0 }, { angle : 15, speed : 4, y: 0 },
                    { angle : 0, speed : 4, y: 0 }, { angle : 345, speed : 4, y: 0 },
                    { angle : 330, speed : 4, y: 0 }, { angle : 315, speed : 4, y: 0 },
                    { angle : 300, speed : 4, y: 0 }, { angle : 285, speed : 4, y: 0 },
                    { angle : 270, speed : 4, y: 0 }, { angle : 255, speed : 4, y: 0 },
                    { angle : 240, speed : 4, y: 0 }, { angle : 225, speed : 4, y: 0 },
                    { angle : 210, speed : 4, y: 0 }, { angle : 180, speed : 4, y: 0 },
                    { angle : 165, speed : 4, y: 0 }, { angle : 150, speed : 4, y: 0 },
                    { angle : 135, speed : 4, y: 0 }, { angle : 110, speed : 4, y: 0 }
                ],
                fireRate : 170
            },
            {
                pattern:[
                    { angle : 90, speed : 4, y: 0 }, { angle : 75, speed : 4, y: 0},
                    { angle : 60, speed : 4, y: 0 }, { angle : 45, speed : 4, y: 0 },
                    { angle : 30, speed : 4, y: 0 }, { angle : 15, speed : 4, y: 0 },
                    { angle : 0, speed : 4, y: 0 }, { angle : 345, speed : 4, y: 0 },
                    { angle : 330, speed : 4, y: 0 }, { angle : 315, speed : 4, y: 0 },
                    { angle : 300, speed : 4, y: 0 }, { angle : 285, speed : 4, y: 0 },
                    { angle : 270, speed : 4, y: 0 }, { angle : 255, speed : 4, y: 0 },
                    { angle : 240, speed : 4, y: 0 }, { angle : 225, speed : 4, y: 0 },
                    { angle : 210, speed : 4, y: 0 }, { angle : 180, speed : 4, y: 0 },
                    { angle : 165, speed : 4, y: 0 }, { angle : 150, speed : 4, y: 0 },
                    { angle : 135, speed : 4, y: 0 }, { angle : 110, speed : 4, y: 0 }
                ],
                fireRate : 170
            },
            {
                pattern: [
                    { angle : "player", speed : 4, y: 0 }, { angle : "player", speed : 4, y: 0 },
                    { angle : "player", speed : 4, y: 0 }, { angle : "player", speed : 4, y: 0 },
                    { angle : "player", speed : 4, y: 0 }, { angle : "player", speed : 4, y: 0 },
                    { angle : "player", speed : 4, y: 0 }, { angle : "player", speed : 4, y: 0 }
                ],
                fireRate : 250
            }
        ]

        this.patterns = patterns;

        this.currentPattern = this.patterns[0].pattern;
        this.patternIndex = 0;

        var attack = function(){
            this.attack(this.currentPattern);
        }.bind(this);

        // Define and begin attacking
        this.attackIndex = 0;
        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(200, attack);

        setTimeout(function(){
            this.bulletInterval = setInterval(function(){
                var patterns = this.patterns;
                this.patternIndex = (this.patternIndex + 1)%patterns.length;
                this.currentPattern = patterns[this.patternIndex].pattern;
                this.bulletTimer.stop();
                this.bulletTimer.loop(patterns[this.patternIndex].fireRate || 200,
                                      attack);
                this.bulletTimer.start();
            }.bind(this), 6800);
        }.bind(this), 5000);

        this.enterScreen();
    }

    RhombusBoss.prototype.killBullet = Unit.prototype.killBullet;
    RhombusBoss.prototype.onUnitHitPlayer = Unit.prototype.onUnitHitPlayer;
    RhombusBoss.prototype.constructTweenChain = Unit.prototype.constructTweenChain;
    RhombusBoss.prototype.attack = Unit.prototype.attack;

    Object.defineProperty(RhombusBoss.prototype, "position", {
        get : function() {
            return this.graphics.position;
        },
        set : function(value) {
            this.graphics.position = value;
        }
    });

    RhombusBoss.prototype.updateHealth = function(){
        var percent = this.health / this.maxHealth;
        this.healthGraphic.clear();
        this.healthGraphic.lineStyle(1, 0x000000, 1);
        if (this.health >= this.maxHealth/3) {
            this.healthGraphic.beginFill(0xDDDDDD, 0.8);
        } else {
            this.healthGraphic.beginFill(0xDD0000, 0.8);
        }
        var barHeight;
        if (this.number == 1) {barHeight = 3;}
        else if (this.number == 2) {barHeight = 15;}
        else if (this.number == 3) {barHeight = 27;}
        else {barHeight = 39;}
        this.healthGraphic.drawRect(0, barHeight, Math.floor(1000*percent), 10);
        this.healthGraphic.endFill();
    }

    RhombusBoss.prototype.destroy = function(offscreen, bomb, reset) {
        if (reset) {
            this.graphics.destroy();
            this.healthGraphic.destroy();
            this.collisionGroup.destroy();
            clearInterval(this.bulletInterval);
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
        utils.shakeScreen(this.game, 1500);

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
            player.updateScore(1000, 1);
            this.emitter.x = this.graphics.position.x;
            this.emitter.y = this.graphics.position.y;
            this.emitter.start(true, 1200, null, 100);
        }.bind(this), 2700)

        this.onDestroy.forEach(function(callback){
            callback();
        });
    }

    RhombusBoss.prototype.enterScreen = function() {
        var self = this;
        var tween = this.game.add.tween(this.graphics);
        if (this.number == 1) {
            tween.to({x : config.game.width/2, y: 100}, 5000).start();
        } else if (this.number == 2) {
            tween.to({x : 150, y: 250}, 5000).start();
        } else if (this.number == 3) {
            tween.to({x : config.game.width/2, y: 400}, 5000).start();
        } else {
            tween.to({x : config.game.width-150, y: 250}, 5000).start();
        }

        if (this.number == 1) {
            utils.shakeScreen(this.game, 5000);
        }

        setTimeout(function(){
            // Begin the movement animations (2 loops then join in center)
            if (this.number == 1) {
                this.constructTweenChain([
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { y : 180 }, duration : 1700 }, // 1 ends at top
                    { options : { }, duration : 3400 },
                    { options : { y : 100 }, duration : 1700 }
                ]);
            }
            else if (this.number == 2) {
                this.constructTweenChain([
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : 350 }, duration : 1700 }, // 2 ends on left
                    { options : { }, duration : 3400 },
                    { options : { x : 150 }, duration : 1700 }
                ]);
            }
            else if (this.number == 3) {
                this.constructTweenChain([
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { y : 320 }, duration : 1700 }, // 3 ends at bottom
                    { options : { }, duration : 3400 },
                    { options : { y : 400 }, duration : 1700 }
                ]);
            }
            else if (this.number == 4){
                this.constructTweenChain([
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width/2, y : 100 }, duration : 1700 },
                    { options : { x : 150, y : 250}, duration : 1700 },
                    { options : { x : config.game.width/2, y : 400 }, duration : 1700 },
                    { options : { x : config.game.width-150, y : 250 }, duration : 1700 },
                    { options : { x : config.game.width-350 }, duration : 1700 }, // 4 ends on right
                    { options : { }, duration : 3400 },
                    { options : { x : config.game.width-150 }, duration : 1700 }
                ]);
            }

            this.bulletTimer.start();
            this.invulnerable = false;
        }.bind(this), 5000);
    }

    RhombusBoss.prototype.onPlayerHitUnit = function(unitSprite, bullet) {
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
                this.animation.frame = 0;
                this.prohibitHitGraphic = false;
            }.bind(this), 100)

            var tweenScale = this.game.add.tween(this.graphics);
            tweenScale.to({alpha : 0.7}, 50)
                .to({alpha : 1.0}, 50).start();
        }
    }

    return RhombusBoss;
})
