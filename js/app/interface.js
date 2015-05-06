/**
 * A module which defines the user interface
 * @module app/interface
 */
define(["app/config"],
function(config){

    var UI = function(){}
    UI.prototype.init = function(game) {
        this.game = game;
        this.bmd = this.generateInterface();
        this.graphics = this.game.add.sprite(0, 0, this.bmd);
        this.graphics.visible = false;
    }

    UI.prototype.generateInterface = function() {
        var bmd = this.game.add.bitmapData(config.game.width, 200);
        var ctx = bmd.context;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 80);
        ctx.lineTo(120, 50);
        ctx.lineTo(120, 0);
        ctx.fillStyle = 'rgba(225,225,225,0.5)';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        ctx.moveTo(config.game.width, 0);
        ctx.lineTo(config.game.width, 80);
        ctx.lineTo(config.game.width-120, 50);
        ctx.lineTo(config.game.width-120, 0);
        ctx.fill();
        ctx.stroke();
        return bmd;
    }

    UI.prototype.display = function(){
        this.graphics.visible = true;
    }

    UI.prototype.hide = function(){
        this.graphics.visible = false;
    }

    UI.prototype.update = function(){
        this.game.world.bringToTop(this.graphics);
    }

    var ui = new UI();
    return ui;
});
