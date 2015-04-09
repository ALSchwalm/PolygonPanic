/**
 * A module which defines a type representing levels in the game
 * @module app/level
 */
define(["app/config", "app/background"],
function(config, background){
    "use strict"

    var Level = function(phases, backgroundKey){
        this.phases = phases;
        this.currentPhase = null;
        this.nextLevel = null;
        this.backgroundKey = backgroundKey || "CheckerWave";
    };

    Level.prototype.init = function(game) {
        this.game = game;
        var l = this.nextLevel;
        while(l) {
            l.init(game);
            l = l.nextLevel;
        }
        return this;
    }

    Level.prototype.start = function(){
        this.nextPhase();
        background.setBackground(this.backgroundKey);
    };

    Level.prototype.stop = function(){
        this.currentPhase.stop();
    };

    Level.prototype.nextPhase = function(){
        if (this.currentPhase)
            this.currentPhase.stop();
        this.currentPhase = this.phases.shift(1);
        if (this.currentPhase) {
            this.currentPhase.start(this, this.game);
        } else {
            this.endLevel();
        }
    };

    Level.prototype.endLevel = function() {
        $("#level-transition").fadeIn(2000);
        $("#level-transition button").unbind();
        $("#level-transition button").click(function(){
            $("#level-transition").fadeOut(1000);
            this.nextLevel.start();
        }.bind(this));
    }

    Level.prototype.then = function(level) {
        this.nextLevel = level;
        return level;
    }

    return Level;
});
