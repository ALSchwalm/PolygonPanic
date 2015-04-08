/**
 * A module which displays a background for the game
 * @module app/background
 */
define(["app/config", "Phaser", "app/music"],
function(config, Phaser, music){

    var BackgroundBlock = function(game, x, y) {
        this.game = game;

        var x = x || (Math.random() * config.game.width) - config.game.width/2;
        var y = y || (Math.random() * config.game.height) - config.game.height/2;
        this.graphics = this.game.add.graphics(x, y);
        this.game.world.sendToBack(this.graphics);
        this.graphics.alpha = 0;
        this.graphics.scale.set(0.5, 0.5);

        this.graphics.lineStyle(2, 0x222222, 0.4);
        this.graphics.beginFill(0xFFFFFF, 0.2);
        this.graphics.drawRect(0, 0,
                               config.game.width,
                               config.game.height);
        this.graphics.endFill();

        // Fade in the blocks
        this.game.add.tween(this.graphics).to({alpha : 0.5}, 2000).start();

        music.onBeat.push(function(){
            this.pulse();
        }.bind(this));

        this.target = {
            x: Math.random(),
            y: Math.random()
        }

        this.updateFrequency = Math.floor(7*Math.random());
        this.updateCounter = 0;
    }

    BackgroundBlock.prototype.withinEpsilon = function(value1, value2) {
        return Math.abs(value1 - value2) < 0.01;
    }

    BackgroundBlock.prototype.update = function(){
        this.graphics.y += 0.5;
        return this;
    }

    BackgroundBlock.prototype.pulse = function(){
        var tween = this.game.add.tween(this.graphics);
        tween.to({alpha : 0.7}, 75).to({alpha:0.5}, 100).start();

        var tweenScale = this.game.add.tween(this.graphics.scale);
        tweenScale.to({x: "+0.02", y:"+0.02"}, 75)
            .to({x: "-0.02", y:"-0.02"}, 100).start();
        return this;
    }

    /**
     * A class which displays a background for the game
     * @constructor
     * @alias module:app/background
     */
    var Background = function(){
        this.body = document.getElementsByTagName("body")[0];
        this.color = config.color.background[0];
    }

    /**
     * Start displaying the background
     *
     * @param {Phaser.Game} game - A reference to the current game object
     */
    Background.prototype.start = function(game) {
        this.game = game;
        this.filter = game.add.filter('CheckerWave', config.game.width,
                                      config.game.height);
	this.filter.alpha = 0.2;

        this.background = game.add.sprite(0, 0);
	this.background.width = config.game.width;
	this.background.height = config.game.height;
        this.background.filters = [this.filter];

        this.blocks = [];
        this.createGrids();

        // for (var i=0; i < 7; ++i) {
        //     var block = new BackgroundBlock(this.game);
        //     this.blocks.push(block);
        // }

        // setInterval(function(){
        //     var block =
        //         new BackgroundBlock(this.game, Math.random()*config.game.width,
        //                             -400*Math.random()+-300);
        //     this.blocks.push(block);
        // }.bind(this), 3000);
    }

    Background.prototype.createGrids = function() {

        // Strange Phaser behavior requires the use of two grids here
        this.gridGraphics1 = this.game.add.graphics(0, -config.game.height);
        this.gridGraphics2 = this.game.add.graphics(0, 0);

        this.gridGraphics1.beginFill(0x000000, 0);
        this.gridGraphics1.lineStyle(1, 0x111111, 0.7);
        this.gridGraphics2.beginFill(0x000000, 0);
        this.gridGraphics2.lineStyle(1, 0x111111, 0.7);

        this.cellSize = config.game.height/config.grid.cellCount;
        this.verticalCells = config.game.width / this.cellSize;
        this.horizontalCells = config.game.height / this.cellSize;

        for (var j=0; j < this.horizontalCells; ++j) {
            for (var i=0; i < this.verticalCells; ++i) {
                if (j % 2 == 0) {
                    this.gridGraphics1.beginFill(0x000000, 0.2);
                    this.gridGraphics2.beginFill(0x000000, 0.2);
                }
                this.gridGraphics1.drawRect(i*this.cellSize, j*this.cellSize,
                                            this.cellSize, this.cellSize);
                this.gridGraphics2.drawRect(i*this.cellSize, j*this.cellSize,
                                            this.cellSize, this.cellSize);
                if (j % 2 == 0) {
                    this.gridGraphics1.beginFill(0x000000, 0);
                    this.gridGraphics2.beginFill(0x000000, 0);
                }
            }
        }

        this.gridGraphics1.endFill();
        this.gridGraphics2.endFill();

        var pulse = function(graphics) {
            return function(){
                var tween = this.game.add.tween(graphics);
                tween.to({alpha : 0.7}, 300).to({alpha:0.5}, 200).start();
            }.bind(this);
        }.bind(this);

        music.onBeat.push(pulse(this.gridGraphics1));
        music.onBeat.push(pulse(this.gridGraphics2));
    }

    /**
     * Update the background
     */
    Background.prototype.update = function(){
        this.filter.update();
        this.gridGraphics1.y += config.grid.speed;
        this.gridGraphics2.y += config.grid.speed;
        if (this.gridGraphics1.y >= 0) {
            this.gridGraphics1.y = -config.game.height;
            this.gridGraphics2.y = 0;
        }
        this.blocks = this.blocks.map(function(block){
            if (block.graphics.y > config.game.height) {
                return null;
            } else {
                block.update();
                return block;
            }
        }).filter(function(block){
            return block != null;
        });
    }

    /**
     * Switch to using 'color' as a basis for a new background
     *
     * @param {number} targetColor - Color to use as a base for the background
     */
    Background.prototype.newColor = function(targetColor) {
        var count = 0;
        var setColor = null;

        var timer = this.game.time.create(false);
        timer.loop(30,
            function(){
                ++count;
                if (count == 1500/30) {
                    this.color = setColor;
                    timer.stop();
                }
                setColor = Phaser.Color.interpolateColor(this.color,
                                                         targetColor,
                                                         1500/30,
                                                         count);

                var color = Phaser.Color.getWebRGB(setColor);
                var newColor = "radial-gradient(white, " + color + ", " + color + ")";
                this.body.style["background-image"] = newColor;
            }.bind(this));
        timer.start();
    }

    return new Background();

})
