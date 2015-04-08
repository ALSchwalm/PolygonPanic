/**
 * A module which defines a type representing levels in the game
 * @module app/level
 */
define(["app/config"],
function(config){
    "use strict"

    var Level = function(phases){
        this.phases = phases;
        this.currentPhase = null;
    };

    Level.prototype.init = function(game) {
        this.game = game;
    }

    Level.prototype.start = function(){
        this.nextPhase();
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
        }
    };

    return Level;
});
